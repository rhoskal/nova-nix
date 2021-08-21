import * as M from "fp-ts/Map";
import * as O from "fp-ts/Option";
import { constVoid, pipe } from "fp-ts/function";
import * as Str from "fp-ts/string";
import * as D from "io-ts/Decoder";
import { Lens } from "monocle-ts";

import { formatDocument } from "./commands/formatDocument";
import { selectFormatOnSave } from "./selectors";
import { isFalse } from "./typeGuards";
import { ExtensionConfigKeys, UserPreferences } from "./types";

/*
 * Helpers
 */

const showNotification = (body: string): void => {
  if (nova.inDevMode()) {
    const notification = new NotificationRequest("nix-nova-notification");

    notification.title = nova.extension.name;
    notification.body = body;

    nova.notifications.add(notification);
  }
};

/*
 * Main
 */

let preferences: UserPreferences = {
  workspace: {
    formatOnSave: pipe(
      O.fromNullable(nova.workspace.config.get(ExtensionConfigKeys.FormatOnSave)),
      O.chain((value) => O.fromEither(D.boolean.decode(value))),
    ),
    formatterPath: pipe(
      O.fromNullable(nova.workspace.config.get(ExtensionConfigKeys.FormatterPath)),
      O.chain((path) => O.fromEither(D.string.decode(path))),
      O.chain(O.fromPredicate((path) => isFalse(Str.isEmpty(path)))),
    ),
  },
  global: {
    formatOnSave: pipe(
      O.fromNullable(nova.config.get(ExtensionConfigKeys.FormatOnSave)),
      O.chain((value) => O.fromEither(D.boolean.decode(value))),
    ),
    formatterPath: pipe(
      O.fromNullable(nova.config.get(ExtensionConfigKeys.FormatterPath)),
      O.chain((path) => O.fromEither(D.string.decode(path))),
      O.chain(O.fromPredicate((path) => isFalse(Str.isEmpty(path)))),
    ),
  },
};

const workspaceConfigsLens = Lens.fromPath<UserPreferences>()(["workspace"]);
const globalConfigsLens = Lens.fromPath<UserPreferences>()(["global"]);

const extensionDisposable: CompositeDisposable = new CompositeDisposable();
let saveListeners: Map<string, Disposable> = new Map();

const addSaveListener = (editor: TextEditor): void => {
  pipe(
    O.fromNullable(editor.document.syntax),
    O.chain(O.fromPredicate((syntax) => Str.Eq.equals(syntax, "nix"))),
    O.fold(constVoid, (_) => {
      saveListeners = M.upsertAt(Str.Eq)(
        editor.document.uri,
        editor.onWillSave(formatDocument(preferences)),
      )(saveListeners);
    }),
  );
};

const clearSaveListeners = (): void => {
  pipe(
    saveListeners,
    M.map((disposable) => disposable.dispose()),
  );

  saveListeners = new Map();
};

export const activate = (): void => {
  console.log(`${nova.localize("Activating")}...`);
  showNotification(`${nova.localize("Starting extension")}...`);

  extensionDisposable.add(
    nova.workspace.onDidAddTextEditor((editor: TextEditor): void => {
      const shouldFormatOnSave = selectFormatOnSave(preferences);

      if (shouldFormatOnSave) {
        addSaveListener(editor);
      }
    }),
  );

  extensionDisposable.add(
    nova.commands.register(ExtensionConfigKeys.FormatDocument, formatDocument(preferences)),
  );

  extensionDisposable.add(
    nova.workspace.config.onDidChange<unknown>(
      ExtensionConfigKeys.FormatterPath,
      (newValue, _oldValue): void => {
        preferences = workspaceConfigsLens.modify((prevWorkspace) => ({
          ...prevWorkspace,
          formatterPath: O.fromEither(D.string.decode(newValue)),
        }))(preferences);

        const shouldFormatOnSave = selectFormatOnSave(preferences);

        if (shouldFormatOnSave) {
          clearSaveListeners();
          nova.workspace.textEditors.forEach(addSaveListener);
        }
      },
    ),
  );

  extensionDisposable.add(
    nova.workspace.config.onDidChange<unknown>(
      ExtensionConfigKeys.FormatOnSave,
      (newValue, _oldValue): void => {
        preferences = workspaceConfigsLens.modify((prevWorkspace) => ({
          ...prevWorkspace,
          formatOnSave: O.fromEither(D.boolean.decode(newValue)),
        }))(preferences);

        const shouldFormatOnSave = selectFormatOnSave(preferences);

        clearSaveListeners();

        if (shouldFormatOnSave) {
          nova.workspace.textEditors.forEach(addSaveListener);
        }
      },
    ),
  );

  extensionDisposable.add(
    nova.config.onDidChange<unknown>(
      ExtensionConfigKeys.FormatterPath,
      (newValue, _oldValue): void => {
        preferences = globalConfigsLens.modify((prevGlobal) => ({
          ...prevGlobal,
          formatterPath: O.fromEither(D.string.decode(newValue)),
        }))(preferences);

        const shouldFormatOnSave = selectFormatOnSave(preferences);

        if (shouldFormatOnSave) {
          clearSaveListeners();
          nova.workspace.textEditors.forEach(addSaveListener);
        }
      },
    ),
  );

  extensionDisposable.add(
    nova.config.onDidChange<unknown>(
      ExtensionConfigKeys.FormatOnSave,
      (newValue, _oldValue): void => {
        preferences = globalConfigsLens.modify((prevGlobal) => ({
          ...prevGlobal,
          formatOnSave: O.fromEither(D.boolean.decode(newValue)),
        }))(preferences);

        const shouldFormatOnSave = selectFormatOnSave(preferences);

        clearSaveListeners();

        if (shouldFormatOnSave) {
          nova.workspace.textEditors.forEach(addSaveListener);
        }
      },
    ),
  );

  console.log(`${nova.localize("Activated")} 🎉`);
};

export const deactivate = (): void => {
  console.log(`${nova.localize("Deactivating")}...`);

  clearSaveListeners();
  extensionDisposable.dispose();
};
