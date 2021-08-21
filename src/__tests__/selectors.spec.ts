import * as O from "fp-ts/Option";

import { selectFormatOnSave, selectFormatterPath } from "../selectors";
import { UserPreferences } from "../types";

describe("[Selectors]", () => {
  describe("Formatter Path", () => {
    test("(N) Workspace & (N) Global", () => {
      const preferences: UserPreferences = {
        workspace: {
          formatterPath: O.none,
          formatOnSave: O.none,
        },
        global: {
          formatterPath: O.none,
          formatOnSave: O.none,
        },
      };

      const actual: O.Option<string> = selectFormatterPath(preferences);
      const expected: O.Option<string> = O.none;

      expect(actual).toStrictEqual(expected);
    });

    test("(N) Workspace & (Y) Global", () => {
      const globalPath: string = "/path/to/global/formatter";

      const preferences: UserPreferences = {
        workspace: {
          formatterPath: O.none,
          formatOnSave: O.none,
        },
        global: {
          formatterPath: O.some(globalPath),
          formatOnSave: O.none,
        },
      };

      const actual: O.Option<string> = selectFormatterPath(preferences);
      const expected: O.Option<string> = O.some(globalPath);

      expect(actual).toStrictEqual(expected);
    });

    test("(Y) Workspace & (N) Global", () => {
      const workspacePath: string = "/path/to/workspace/formatter";

      const preferences: UserPreferences = {
        workspace: {
          formatterPath: O.some(workspacePath),
          formatOnSave: O.none,
        },
        global: {
          formatterPath: O.none,
          formatOnSave: O.none,
        },
      };

      const actual: O.Option<string> = selectFormatterPath(preferences);
      const expected: O.Option<string> = O.some(workspacePath);

      expect(actual).toStrictEqual(expected);
    });

    test("(Y) Workspace & (Y) Global", () => {
      const workspacePath: string = "/path/to/workspace/formatter";
      const globalPath: string = "/path/to/global/formatter";

      const preferences: UserPreferences = {
        workspace: {
          formatterPath: O.some(workspacePath),
          formatOnSave: O.none,
        },
        global: {
          formatterPath: O.some(globalPath),
          formatOnSave: O.none,
        },
      };

      const actual: O.Option<string> = selectFormatterPath(preferences);
      const expected: O.Option<string> = O.some(workspacePath);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe("Format on Save", () => {
    test("(N) Workspace & (N) Global", () => {
      const preferences: UserPreferences = {
        workspace: {
          formatterPath: O.none,
          formatOnSave: O.none,
        },
        global: {
          formatterPath: O.none,
          formatOnSave: O.none,
        },
      };

      const actual: boolean = selectFormatOnSave(preferences);
      const expected: boolean = false;

      expect(actual).toBe(expected);
    });

    test("(N) Workspace & (Y) Global", () => {
      const globalFormatOnSave: boolean = true;

      const preferences: UserPreferences = {
        workspace: {
          formatterPath: O.none,
          formatOnSave: O.none,
        },
        global: {
          formatterPath: O.none,
          formatOnSave: O.some(globalFormatOnSave),
        },
      };

      const actual: boolean = selectFormatOnSave(preferences);
      const expected: boolean = true;

      expect(actual).toBe(expected);
    });

    test("(Y) Workspace & (N) Global", () => {
      const workspaceFormatOnSave: boolean = true;

      const preferences: UserPreferences = {
        workspace: {
          formatterPath: O.none,
          formatOnSave: O.some(workspaceFormatOnSave),
        },
        global: {
          formatterPath: O.none,
          formatOnSave: O.none,
        },
      };

      const actual: boolean = selectFormatOnSave(preferences);
      const expected: boolean = true;

      expect(actual).toBe(expected);
    });

    test("(Y) Workspace & (Y) Global", () => {
      const globalFormatOnSave: boolean = true;
      const workspaceFormatOnSave: boolean = true;

      const preferences: UserPreferences = {
        workspace: {
          formatterPath: O.none,
          formatOnSave: O.some(workspaceFormatOnSave),
        },
        global: {
          formatterPath: O.none,
          formatOnSave: O.some(globalFormatOnSave),
        },
      };

      const actual: boolean = selectFormatOnSave(preferences);
      const expected: boolean = true;

      expect(actual).toBe(expected);
    });
  });
});
