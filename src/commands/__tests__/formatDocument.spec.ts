import * as O from "fp-ts/Option";

import { formatDocument } from "../formatDocument";
import { UserPreferences } from "../../types";

const editor = {
  document: {
    path: "path/to/some/file",
  },
} as TextEditor;

describe("[Command] Format Document", () => {
  test("Failure - No formatter", () => {
    const preferences: UserPreferences = {
      workspace: {
        formatOnSave: O.none,
        formatterPath: O.none,
      },
      global: {
        formatOnSave: O.none,
        formatterPath: O.none,
      },
    };
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    formatDocument(preferences)(editor);

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("Skipping... No formatter set.");

    consoleSpy.mockRestore();
  });

  test.only("Failure - General Error", () => {
    const preferences: UserPreferences = {
      workspace: {
        formatOnSave: O.none,
        formatterPath: O.some("path/to/some/formatter"),
      },
      global: {
        formatOnSave: O.none,
        formatterPath: O.none,
      },
    };
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    formatDocument(preferences)(editor);

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith("Failed to format the document.");

    consoleSpy.mockRestore();
  });
});
