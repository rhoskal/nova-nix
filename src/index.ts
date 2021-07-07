import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";
import * as D from "io-ts/Decoder";

import { formatDocument } from "./commands/formatDocument";
import { ExtensionSettings } from "./types";

/*
 * Types
 */

enum ExtensionConfigKeys {
  FormatterPath = "hansjhoffman.nix.config.nixFormatPath",
  FormatOnSave = "hansjhoffman.nix.config.formatOnSave",
  FormatDocument = "hansjhoffman.nix.commands.formatDocument",
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

const getSettings = (): ExtensionSettings => ({
  formatterPath: pipe(
    O.fromNullable(nova.workspace.config.get(ExtensionConfigKeys.FormatterPath)),
    O.alt(() => O.fromNullable(nova.config.get(ExtensionConfigKeys.FormatterPath))),
    O.chain((path) => O.fromEither(D.string.decode(path))),
    O.getOrElse(() => ""),
  ),
  formatOnSave: pipe(
    O.fromNullable(nova.workspace.config.get(ExtensionConfigKeys.FormatOnSave)),
    O.alt(() => O.fromNullable(nova.config.get(ExtensionConfigKeys.FormatOnSave))),
    O.chain((value) => O.fromEither(D.boolean.decode(value))),
    O.getOrElseW(() => false),
  ),
});

const invokeFormatDocumentCommand = (settings: ExtensionSettings) => (editor: TextEditor) =>
  formatDocument(editor, settings);

/*
 * Main
 */

export const activate = () => {
  console.log("Activating...");
  showNotification("Starting extension...");

  const settings = getSettings();

  nova.workspace.config.observe(ExtensionConfigKeys.FormatterPath, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      console.log("workspace formatterPath changed");
    }
  });
  nova.config.observe(ExtensionConfigKeys.FormatterPath, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      console.log("config formatterPath changed");
    }
  });
  nova.workspace.config.observe(ExtensionConfigKeys.FormatOnSave, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      console.log("workspace formatOnSave changed");
    }
  });
  nova.config.observe(ExtensionConfigKeys.FormatOnSave, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      console.log("config formatOnSave changed");
    }
  });

  nova.commands.register(ExtensionConfigKeys.FormatDocument, invokeFormatDocumentCommand(settings));
};

export const deactivate = () => {
  // do necessary cleanup
};
