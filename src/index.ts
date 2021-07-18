import * as Ap from "fp-ts/Apply";
import * as M from "fp-ts/Map";
import * as O from "fp-ts/Option";
import { constVoid, pipe } from "fp-ts/function";
import * as Str from "fp-ts/string";
import * as D from "io-ts/Decoder";

import { formatDocument } from "./commands/formatDocument";
import { isFalse } from "./typeGuards";

/*
 * Types
 */

enum ExtensionConfigKeys {
  FormatterPath = "hansjhoffman.nix.config.nixFormatPath",
  FormatOnSave = "hansjhoffman.nix.config.formatOnSave",
  FormatDocument = "hansjhoffman.nix.commands.formatDocument",
}

interface ExtensionSettings {
  formatterPath: O.Option<string>;
  formatOnSave: boolean;
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

/*
 * Main
 */

let nixExtension: O.Option<NixExtension> = O.none;

class NixExtension {
  private formatterPath: O.Option<string>;
  private formatOnSave: boolean;
  private saveListeners: Map<string, Disposable>;

  constructor() {
    this.formatterPath = O.none;
    this.formatOnSave = false;
    this.saveListeners = new Map();
  }

  private didAddTextEditor = (editor: TextEditor): void => {
    pipe(
      O.fromNullable(editor.document.syntax),
      O.chain(O.fromPredicate((syntax) => Str.Eq.equals(syntax, "nix"))),
      O.map((_) => {
        this.saveListeners = pipe(
          this.saveListeners,
          M.upsertAt(Str.Eq)(editor.document.uri, editor.onWillSave(this.didInvokeFormatCommand)),
        );
      }),
    );
  };

  private didInvokeFormatCommand = (editor: TextEditor): void => {
    pipe(
      this.formatterPath,
      O.fold(
        () => console.log("Skipping... No formatter set."),
        (path) => formatDocument(editor, path),
      ),
    );
  };

  private getConfigs(): ExtensionSettings {
    return {
      formatterPath: pipe(
        O.fromNullable(nova.workspace.config.get(ExtensionConfigKeys.FormatterPath)),
        O.alt(() => O.fromNullable(nova.config.get(ExtensionConfigKeys.FormatterPath))),
        O.chain((path) => O.fromEither(D.string.decode(path))),
        O.chain(O.fromPredicate((path) => isFalse(Str.isEmpty(path)))),
      ),
      formatOnSave: pipe(
        Ap.sequenceT(O.Applicative)(
          O.fromEither(
            D.boolean.decode(nova.workspace.config.get(ExtensionConfigKeys.FormatOnSave)),
          ),
          O.fromEither(D.boolean.decode(nova.config.get(ExtensionConfigKeys.FormatOnSave))),
        ),
        O.map(([workspaceFormatOnSave, extensionFormatOnSave]) => {
          if (workspaceFormatOnSave) return true;
          if (extensionFormatOnSave) return true;
          return false;
        }),
        O.getOrElseW(() => false),
      ),
    };
  }

  private setupObservers = (): void => {
    nova.workspace.config.observe<unknown>(ExtensionConfigKeys.FormatterPath, () => {
      this.formatterPath = this.getConfigs().formatterPath;
    });
    nova.config.observe<unknown>(ExtensionConfigKeys.FormatterPath, () => {
      this.formatterPath = this.getConfigs().formatterPath;
    });

    nova.workspace.config.observe<unknown>(ExtensionConfigKeys.FormatOnSave, () => {
      this.formatOnSave = this.getConfigs().formatOnSave;

      if (this.formatOnSave) {
        nova.workspace.textEditors.forEach(this.didAddTextEditor);
      } else {
        pipe(
          this.saveListeners,
          M.map((disposable) => disposable.dispose()),
        );
        this.saveListeners.clear();
      }
    });
    nova.config.observe<unknown>(ExtensionConfigKeys.FormatOnSave, () => {
      this.formatOnSave = this.getConfigs().formatOnSave;

      if (this.formatOnSave) {
        nova.workspace.textEditors.forEach(this.didAddTextEditor);
      } else {
        pipe(
          this.saveListeners,
          M.map((disposable) => disposable.dispose()),
        );
        this.saveListeners.clear();
      }
    });
  };

  public start = (): void => {
    this.setupObservers();

    nova.workspace.onDidAddTextEditor(this.didAddTextEditor);
    nova.commands.register(ExtensionConfigKeys.FormatDocument, this.didInvokeFormatCommand);

    console.log("Activated 🎉");
  };

  public stop = (): void => {
    // do something
  };
}

export const activate = (): void => {
  console.log("Activating...");
  showNotification("Starting extension...");

  const extension = new NixExtension();
  extension.start();

  nixExtension = O.some(extension);
};

export const deactivate = (): void => {
  console.log("Deactivating...");

  pipe(
    nixExtension,
    O.fold(constVoid, (extension) => {
      extension.stop();
      nixExtension = O.none;
    }),
  );
};
