import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";

import { UserPreferences } from "./types";

/**
 * Gets a value giving precedence to workspace over global extension values.
 * @param {UserPreferences} preferences - extension settings
 */
export const selectFormatOnSave = (preferences: UserPreferences): boolean => {
  return O.isSome(preferences.workspace.formatOnSave) || O.isSome(preferences.global.formatOnSave);
};

/**
 * Gets a value giving precedence to workspace over global extension values.
 * @param {UserPreferences} preferences - extension settings
 */
export const selectFormatterPath = (preferences: UserPreferences): O.Option<string> => {
  return pipe(
    preferences.workspace.formatterPath,
    O.alt(() => preferences.global.formatterPath),
  );
};
