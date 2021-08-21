import * as O from "fp-ts/Option";

export enum ExtensionConfigKeys {
  FormatterPath = "hansjhoffman.nix.config.nixFormatPath",
  FormatOnSave = "hansjhoffman.nix.config.formatOnSave",
  FormatDocument = "hansjhoffman.nix.commands.formatDocument",
}

export interface Preferences {
  readonly formatterPath: O.Option<string>;
  readonly formatOnSave: O.Option<boolean>;
}

export interface UserPreferences {
  readonly workspace: Readonly<Preferences>;
  readonly global: Readonly<Preferences>;
}
