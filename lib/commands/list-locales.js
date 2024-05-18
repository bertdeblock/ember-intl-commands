import IntlDir from "../models/intl-dir.js";
import getIntlDirPath from "../utils/get-intl-dir-path.js";
import { success } from "../utils/logging.js";

export default async function listLocales(projectPath) {
  const intlDirPath = getIntlDirPath(projectPath);
  const intlDir = new IntlDir(intlDirPath);
  const locales = await intlDir.map((intlFile) => intlFile.locale);
  const count = locales.length;

  success(
    [
      `The following ${count} ${
        count === 1 ? "locale was" : "locales were"
      } found:`,
      ...locales.map((locale) => `  • ${locale}`),
    ].join("\n"),
  );

  return locales;
}
