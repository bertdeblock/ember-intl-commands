import util from "node:util";
import IntlDir from "../models/intl-dir.js";
import getIntlDirPath from "../utils/get-intl-dir-path.js";

export default async function listLocales(projectPath) {
  const intlDirPath = getIntlDirPath(projectPath);
  const intlDir = new IntlDir(intlDirPath);
  const locales = await intlDir.map((intlFile) => intlFile.locale);
  const count = locales.length;

  console.log(`${count} ${count === 1 ? "locale" : "locales"} found:`);
  console.log(util.inspect(locales, { colors: true, compact: false }));

  return locales;
}
