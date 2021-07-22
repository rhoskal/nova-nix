import * as Ap from "fp-ts/Apply";
import * as E from "fp-ts/Either";
import * as M from "fp-ts/Map";
import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import { constVoid, pipe } from "fp-ts/function";
import * as Bool from "fp-ts/boolean";
import * as Str from "fp-ts/string";
import * as D from "io-ts/Decoder";
import { Lens } from "monocle-ts";
import { match } from "ts-pattern";

import { isFalse, isTrue } from "./typeGuards";

/*
 * Types
 */

enum ExtensionConfigKeys {
  FormatterPath = "hansjhoffman.nix.config.nixFormatPath",
  FormatOnSave = "hansjhoffman.nix.config.formatOnSave",
  FormatDocument = "hansjhoffman.nix.commands.formatDocument",
}

interface ExtensionSettings {
  workspace: {
    formatterPath: O.Option<string>;
    formatOnSave: boolean;
  };
  global: {
    formatterPath: O.Option<string>;
    formatOnSave: boolean;
  };
}

interface InvokeFormatterError {
  _tag: "invokeFormatterErrror";
  reason: string;
}

/*
 * Helpers
 */

const showNotification = (body: string): void => {
  if (nova.inDevMode()) {
    const notification = new NotificationRequest("nix-nova-notification");
    notification.title = nova.localize(nova.extension.name);
    notification.body = nova.localize(body);
    nova.notifications.add(notification);
  }
};

export const safeFormat = (
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
      _tag: "invokeFormatterErrror",
      reason: "Failed to format the document. This is likely a bug with nixfmt.",
    }),
  );
};

/*
 * Main
 */

let configs: ExtensionSettings = {
  workspace: {
    formatOnSave: pipe(
      O.fromNullable(nova.workspace.config.get(ExtensionConfigKeys.FormatOnSave)),
      O.chain((value) => O.fromEither(D.boolean.decode(value))),
      O.getOrElseW(() => false),
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
      O.getOrElseW(() => false),
    ),
    formatterPath: pipe(
      O.fromNullable(nova.config.get(ExtensionConfigKeys.FormatterPath)),
      O.chain((path) => O.fromEither(D.string.decode(path))),
      O.chain(O.fromPredicate((path) => isFalse(Str.isEmpty(path)))),
    ),
  },
};

const workspaceConfigsLens = Lens.fromPath<ExtensionSettings>()(["workspace"]);
const globalConfigsLens = Lens.fromPath<ExtensionSettings>()(["global"]);

let saveListeners: Map<string, Disposable> = new Map();

/**
 * Gets a value giving precedence to workspace over global extension values.
 * @param {ExtensionSettings} configs - extension settings
 */
const selectFormatOnSave = (configs: ExtensionSettings): boolean => {
  const workspace = workspaceConfigsLens.get(configs);
  const global = globalConfigsLens.get(configs);

  return workspace.formatOnSave || global.formatOnSave;
};

/**
 * Gets a value giving precedence to workspace over global extension values.
 * @param {ExtensionSettings} configs - extension settings
 */
const selectFormatterPath = (configs: ExtensionSettings): O.Option<string> => {
  const workspace = workspaceConfigsLens.get(configs);
  const global = globalConfigsLens.get(configs);

  return O.isSome(workspace.formatterPath)
    ? workspace.formatterPath
    : O.isSome(global.formatterPath)
    ? global.formatterPath
    : O.none;
};

const addSaveListener = (editor: TextEditor): void => {
  pipe(
    O.fromNullable(editor.document.syntax),
    O.chain(O.fromPredicate((syntax) => Str.Eq.equals(syntax, "nix"))),
    O.fold(constVoid, (_) => {
      saveListeners = pipe(
        saveListeners,
        M.upsertAt(Str.Eq)(editor.document.uri, editor.onWillSave(formatDocument)),
      );
    }),
  );
};

const clearSaveListeners = (): void => {
  pipe(
    saveListeners,
    M.map((disposable) => disposable.dispose()),
  );
};

const formatDocument = (editor: TextEditor): void => {
  pipe(
    selectFormatterPath(configs),
    O.fold(
      () => console.log("Skipping... No formatter set."),
      (path) => {
        safeFormat(editor, path)().then(
          E.fold(
            (err) => {
              return match(err)
                .with({ _tag: "invokeFormatterErrror" }, ({ reason }) => console.error(reason))
                .exhaustive();
            },
            () => console.log(`Formatted: ${editor.document.uri}`),
          ),
        );
      },
    ),
  );
};

export const activate = (): void => {
  console.log("Activating...");
  showNotification("Starting extension...");

  nova.workspace.onDidAddTextEditor((editor: TextEditor): void => {
    const shouldFormatOnSave = selectFormatOnSave(configs);

    if (isTrue(shouldFormatOnSave)) {
      addSaveListener(editor);
    }
  });

  nova.commands.register(ExtensionConfigKeys.FormatDocument, formatDocument);

  nova.workspace.config.observe<unknown>(
    ExtensionConfigKeys.FormatterPath,
    (newValue, oldValue): void => {
      pipe(
        Ap.sequenceT(O.Applicative)(
          O.fromEither(D.string.decode(newValue)),
          O.fromEither(D.string.decode(oldValue)),
        ),
        O.chain(
          O.fromPredicate(([newValue_, oldValue_]) => isFalse(Str.Eq.equals(newValue_, oldValue_))),
        ),
        O.chain(O.fromPredicate(([newValue_, _]) => isFalse(Str.isEmpty(newValue_)))),
        O.fold(constVoid, ([newValue_, _]) => {
          configs = workspaceConfigsLens.modify((workspace) => ({
            ...workspace,
            formatterPath: O.some(newValue_),
          }))(configs);
        }),
      );
    },
  );

  nova.config.observe<unknown>(ExtensionConfigKeys.FormatterPath, (newValue, oldValue): void => {
    pipe(
      Ap.sequenceT(O.Applicative)(
        O.fromEither(D.string.decode(newValue)),
        O.fromEither(D.string.decode(oldValue)),
      ),
      O.chain(
        O.fromPredicate(([newValue_, oldValue_]) => isFalse(Str.Eq.equals(newValue_, oldValue_))),
      ),
      O.chain(O.fromPredicate(([newValue_, _]) => isFalse(Str.isEmpty(newValue_)))),
      O.fold(constVoid, ([newValue_, _]) => {
        configs = globalConfigsLens.modify((global) => ({
          ...global,
          formatterPath: O.some(newValue_),
        }))(configs);
      }),
    );
  });

  nova.workspace.config.observe<unknown>(
    ExtensionConfigKeys.FormatOnSave,
    (newValue, oldValue): void => {
      pipe(
        Ap.sequenceT(O.Applicative)(
          O.fromEither(D.boolean.decode(newValue)),
          O.fromEither(D.boolean.decode(oldValue)),
        ),
        O.chain(
          O.fromPredicate(([newValue_, oldValue_]) =>
            isFalse(Bool.Eq.equals(newValue_, oldValue_)),
          ),
        ),
        O.fold(constVoid, ([newValue_, _]) => {
          configs = workspaceConfigsLens.modify((workspace) => ({
            ...workspace,
            formatOnSave: newValue_,
          }))(configs);

          const shouldFormatOnSave = selectFormatOnSave(configs);

          if (isFalse(shouldFormatOnSave)) {
            clearSaveListeners();
          } else {
            nova.workspace.textEditors.forEach(addSaveListener);
          }
        }),
      );
    },
  );

  nova.config.observe<unknown>(ExtensionConfigKeys.FormatOnSave, (newValue, oldValue): void => {
    pipe(
      Ap.sequenceT(O.Applicative)(
        O.fromEither(D.boolean.decode(newValue)),
        O.fromEither(D.boolean.decode(oldValue)),
      ),
      O.chain(
        O.fromPredicate(([newValue_, oldValue_]) => isFalse(Bool.Eq.equals(newValue_, oldValue_))),
      ),
      O.fold(constVoid, ([newValue_, _]) => {
        configs = globalConfigsLens.modify((global) => ({
          ...global,
          formatOnSave: newValue_,
        }))(configs);

        const shouldFormatOnSave = selectFormatOnSave(configs);

        if (isFalse(shouldFormatOnSave)) {
          clearSaveListeners();
        } else {
          nova.workspace.textEditors.forEach(addSaveListener);
        }
      }),
    );
  });

  console.log("Activated 🎉");
};

export const deactivate = (): void => {
  console.log("Deactivating...");

  clearSaveListeners();
};
