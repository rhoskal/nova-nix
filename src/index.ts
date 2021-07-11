import * as Ap from "fp-ts/Apply";
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
  private formatter: Formatter;

  constructor() {
    this.formatter = new Formatter();
  }

  start() {
    nova.commands.register(ExtensionConfigKeys.FormatDocument, this.formatter.format);

    nova.workspace.config.observe(
      ExtensionConfigKeys.FormatterPath,
      (newValue: string, oldValue: string) => {
        if (isFalse(Str.Eq.equals(newValue, oldValue))) {
          this.formatter.refresh();
        }
      },
    );
    nova.config.observe(ExtensionConfigKeys.FormatterPath, (newValue: string, oldValue: string) => {
      if (isFalse(Str.Eq.equals(newValue, oldValue))) {
        this.formatter.refresh();
      }
    });

    nova.workspace.config.observe(ExtensionConfigKeys.FormatOnSave, () => {
      this.formatter.refresh();
    });
    nova.config.observe(ExtensionConfigKeys.FormatOnSave, () => {
      this.formatter.refresh();
    });

    console.log("Activated 🎉");
  }

  stop() {
    // do something
  }
}

class Formatter {
  private path: O.Option<string> = O.none;
  private formatOnSave: boolean = false;

  constructor() {
    this.refresh();

    nova.workspace.onDidAddTextEditor((editor: TextEditor): void => {
      if (isFalse(this.formatOnSave)) return;

      editor.onWillSave(this.format);
    });
  }

  private getSettings(): ExtensionSettings {
    return {
      formatterPath: pipe(
        O.fromNullable(nova.workspace.config.get(ExtensionConfigKeys.FormatterPath)),
        O.alt(() => O.fromNullable(nova.config.get(ExtensionConfigKeys.FormatterPath))),
        O.chain((path) => O.fromEither(D.string.decode(path))),
        O.chain(O.fromPredicate((path) => path !== "")),
      ),
      formatOnSave: pipe(
        Ap.sequenceT(O.Applicative)(
          O.fromEither(
            D.boolean.decode(nova.workspace.config.get(ExtensionConfigKeys.FormatOnSave)),
          ),
          O.fromEither(D.boolean.decode(nova.config.get(ExtensionConfigKeys.FormatOnSave))),
        ),
        O.map(
          ([workspaceFormatOnSave, globalFormatOnSave]) =>
            workspaceFormatOnSave || globalFormatOnSave,
        ),
        O.getOrElseW(() => false),
      ),
    };
  }

  refresh = (): void => {
    const settings = this.getSettings();

    this.path = settings.formatterPath;
    this.formatOnSave = settings.formatOnSave;
  };

  format = (editor: TextEditor): void => {
    pipe(
      this.path,
      O.fold(
        () => console.log("Skipping... No formatter set."),
        (formatterPath) => formatDocument(editor, formatterPath),
      ),
    );
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
