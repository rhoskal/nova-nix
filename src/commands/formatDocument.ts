import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import { match } from "ts-pattern";

/*
 * Types
 */

interface InvokeFormatterError {
  _tag: "invokeFormatterErrror";
  reason: string;
}

/*
 * Main
 */

export const formatDocument = (editor: TextEditor, formatterPath: string): void => {
  const documentPath = editor.document.path;

  const safeFormat = TE.tryCatch<InvokeFormatterError, void>(
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

  safeFormat().then(
    E.fold(
      (err) => {
        return match(err)
          .with({ _tag: "invokeFormatterErrror" }, ({ reason }) => console.error(reason))
          .exhaustive();
      },
      () => console.log(`Formatted: ${documentPath}`),
    ),
  );
};
