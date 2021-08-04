import * as E from "fp-ts/Either";
import * as M from "fp-ts/Map";
import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import { constVoid, pipe } from "fp-ts/function";
import * as Str from "fp-ts/string";
import * as D from "io-ts/Decoder";
import { Lens } from "monocle-ts";
import { match } from "ts-pattern";

import { isFalse } from "./typeGuards";

/*
 * Types
 */

enum ExtensionConfigKeys {
  FormatterPath = "hansjhoffman.nix.config.nixFormatPath",
  FormatOnSave = "hansjhoffman.nix.config.formatOnSave",
  FormatDocument = "hansjhoffman.nix.commands.formatDocument",
}

interface Preferences {
  readonly formatterPath: O.Option<string>;
  readonly formatOnSave: O.Option<boolean>;
}

interface UserPreferences {
  readonly workspace: Readonly<Preferences>;
  readonly global: Readonly<Preferences>;
}

interface InvokeFormatterError {
  readonly _tag: "invokeFormatterError";
  readonly reason: string;
}

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

const safeFormat = (
  editor: TextEditor,
  formatterPath: string,
): TE.TaskEither<InvokeFormatterError, void> => {
  const documentPath = editor.document.path;

  return TE.tryCatch<InvokeFormatterError, void>(
    () => {
      return new Promise<void>((resolve, reject) => {
        const process = new Process("/usr/bin/env", {
          args: [`${formatterPath}`, `${documentPath}`],
        });

        process.onDidExit((status) => (status === 0 ? resolve() : reject()));

        process.start();
      });
    },
    () => ({
      _tag: "invokeFormatterError",
      reason: `${nova.localize("Failed to format the document")}.`,
    }),
  );
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

/**
 * Gets a value giving precedence to workspace over global extension values.
 * @param {UserPreferences} preferences - extension settings
 */
const selectFormatOnSave = (preferences: UserPreferences): boolean => {
  const workspace = workspaceConfigsLens.get(preferences);
  const global = globalConfigsLens.get(preferences);

  return O.isSome(workspace.formatOnSave) || O.isSome(global.formatOnSave);
};

/**
 * Gets a value giving precedence to workspace over global extension values.
 * @param {UserPreferences} preferences - extension settings
 */
const selectFormatterPath = (preferences: UserPreferences): O.Option<string> => {
  const workspace = workspaceConfigsLens.get(preferences);
  const global = globalConfigsLens.get(preferences);

  return pipe(
    workspace.formatterPath,
    O.alt(() => global.formatterPath),
  );
};

const addSaveListener = (editor: TextEditor): void => {
  pipe(
    O.fromNullable(editor.document.syntax),
    O.chain(O.fromPredicate((syntax) => Str.Eq.equals(syntax, "nix"))),
    O.fold(constVoid, (_) => {
      saveListeners = M.upsertAt(Str.Eq)(editor.document.uri, editor.onWillSave(formatDocument))(
        saveListeners,
      );
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

const formatDocument = (editor: TextEditor): void => {
  pipe(
    selectFormatterPath(preferences),
    O.fold(
      () => console.log(`${nova.localize("Skipping")}... ${nova.localize("No formatter set")}.`),
      (path) => {
        safeFormat(editor, path)().then(
          E.fold(
            (err) => {
              return match(err)
                .with({ _tag: "invokeFormatterError" }, ({ reason }) => console.error(reason))
                .exhaustive();
            },
            () => console.log(`${nova.localize("Formatted")} ${editor.document.path}`),
          ),
        );
      },
    ),
  );
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
    nova.commands.register(ExtensionConfigKeys.FormatDocument, formatDocument),
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
