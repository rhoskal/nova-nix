import * as Ap from "fp-ts/Apply";
import * as Eq from "fp-ts/Eq";
import * as O from "fp-ts/Option";
import * as S from "fp-ts/Set";
import { pipe } from "fp-ts/function";
import * as D from "io-ts/Decoder";

import { formatDocument } from "./commands/formatDocument";
import { isFalse } from "./typeGuards";
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
    Ap.sequenceT(O.option)(
      O.fromEither(D.boolean.decode(nova.workspace.config.get(ExtensionConfigKeys.FormatOnSave))),
      O.fromEither(D.boolean.decode(nova.config.get(ExtensionConfigKeys.FormatOnSave))),
    ),
    O.map(
      ([workspaceFormatOnSave, globalFormatOnSave]) => workspaceFormatOnSave || globalFormatOnSave,
    ),
    O.getOrElseW(() => false),
  ),
});

const invokeFormatDocumentCommand = (settings: ExtensionSettings) => (editor: TextEditor) =>
  formatDocument(editor, settings);

/*
 * Main
 */

const saveListeners: Set<TextEditor> = new Set();

const eqTextEditor: Eq.Eq<TextEditor> = {
  // Since editors have no unique identifier exposed, we have to resort to a nested property on another type
  equals: (e1, e2) => Str.Eq.equals(e1.document.uri, e2.document.uri),
};

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

  nova.workspace.onDidAddTextEditor((editor: TextEditor): void => {
    if (isFalse(settings.formatOnSave)) return;

    editor.onWillSave(invokeFormatDocumentCommand(settings));

    // keep track of editors to later remove if formatOnSave is disabled while plugin is activated
    pipe(saveListeners, S.insert(eqTextEditor)(editor));
  });
};

export const deactivate = () => {
  // do necessary cleanup
};
