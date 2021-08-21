import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { match } from "ts-pattern";

import { selectFormatterPath } from "../selectors";
import { UserPreferences } from "../types";

/*
 * Types
 */

interface InvokeFormatterError {
  readonly _tag: "invokeFormatterError";
  readonly reason: string;
}

/*
 * Helpers
 */

const safeFormat = (
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
      _tag: "invokeFormatterError",
      reason: `${nova.localize("Failed to format the document")}.`,
    }),
  );
};

/*
 * Main
 */

export const formatDocument =
  (preferences: UserPreferences) =>
  (editor: TextEditor): void => {
    pipe(
      selectFormatterPath(preferences),
      O.fold(
        () => console.log(`${nova.localize("Skipping")}... ${nova.localize("No formatter set")}.`),
        (path) => {
          safeFormat(editor, path)().then(
            E.fold(
              (err) => {
                return match(err)
                  .with({ _tag: "invokeFormatterError" }, ({ reason }) => console.error(reason))
                  .exhaustive();
              },
              () => console.log(`${nova.localize("Formatted")} ${editor.document.path}`),
            ),
          );
        },
      ),
    );
  };
