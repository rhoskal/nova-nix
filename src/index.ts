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

const configs: ExtensionSettings = {
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

  return isTrue(workspace.formatOnSave) ? true : isTrue(global.formatOnSave) ? true : false;
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
  saveListeners = pipe(
    saveListeners,
    M.upsertAt(Str.Eq)(editor.document.uri, editor.onWillSave(formatDocument)),
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

    pipe(
      O.fromNullable(editor.document.syntax),
      O.chain(O.fromPredicate((syntax) => Str.Eq.equals(syntax, "nix"))),
      O.chain(O.fromPredicate(() => isTrue(shouldFormatOnSave))),
      O.fold(constVoid, (_) => addSaveListener(editor)),
    );
  });

  nova.commands.register(ExtensionConfigKeys.FormatDocument, (editor: TextEditor): void =>
    formatDocument(editor),
  );

  nova.workspace.config.observe<unknown>(
    ExtensionConfigKeys.FormatterPath,
    (newValue, oldValue): void => {
      const hasChanged: boolean = pipe(
        Ap.sequenceT(O.Applicative)(
          O.fromEither(D.string.decode(newValue)),
          O.fromEither(D.string.decode(oldValue)),
        ),
        O.map(([newValue_, oldValue_]) => Str.Eq.equals(newValue_, oldValue_)),
        O.getOrElseW(() => false),
      );

      if (hasChanged) {
        console.log("global.formatterPath changed");
      }
    },
  );

  nova.config.observe<unknown>(ExtensionConfigKeys.FormatterPath, (newValue, oldValue): void => {
    const hasChanged: boolean = pipe(
      Ap.sequenceT(O.Applicative)(
        O.fromEither(D.string.decode(newValue)),
        O.fromEither(D.string.decode(oldValue)),
      ),
      O.map(([newValue_, oldValue_]) => Str.Eq.equals(newValue_, oldValue_)),
      O.getOrElseW(() => false),
    );

    if (hasChanged) {
      console.log("global.formatterPath changed");
    }
  });

  nova.workspace.config.observe<unknown>(
    ExtensionConfigKeys.FormatOnSave,
    (newValue, oldValue): void => {
      const hasChanged: boolean = pipe(
        Ap.sequenceT(O.Applicative)(
          O.fromEither(D.boolean.decode(newValue)),
          O.fromEither(D.boolean.decode(oldValue)),
        ),
        O.map(([newValue_, oldValue_]) => Bool.Eq.equals(newValue_, oldValue_)),
        O.getOrElseW(() => false),
      );

      if (hasChanged) {
        console.log("workspace.formatOnSave changed");
      }
    },
  );

  nova.config.observe<unknown>(ExtensionConfigKeys.FormatOnSave, (newValue, oldValue): void => {
    const hasChanged: boolean = pipe(
      Ap.sequenceT(O.Applicative)(
        O.fromEither(D.boolean.decode(newValue)),
        O.fromEither(D.boolean.decode(oldValue)),
      ),
      O.map(([newValue_, oldValue_]) => Bool.Eq.equals(newValue_, oldValue_)),
      O.getOrElseW(() => false),
    );

    if (hasChanged) {
      console.log("global.formatOnSave changed");
    }
  });

  console.log("Activated 🎉");
};

export const deactivate = (): void => {
  console.log("Deactivating...");

  pipe(
    saveListeners,
    M.map((disposable) => disposable.dispose()),
  );
};
