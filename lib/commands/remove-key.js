import IntlDir from "../models/intl-dir.js";
import getIntlDirPath from "../utils/get-intl-dir-path.js";
import { success, warning } from "../utils/logging.js";

export default async function removeKey(projectPath, key) {
  const intlDirPath = getIntlDirPath(projectPath);
  const intlDir = new IntlDir(intlDirPath);

  await intlDir.forEach(async (intlFile) => {
    await intlFile.readFile();

    if (intlFile.hasKey(key) === false) {
      return warning(
        `Key "${key}" does not exist for the "${intlFile.locale}" locale.`,
      );
    }

    intlFile.removeKey(key);

    await intlFile.writeFile();

    success(`Key "${key}" was removed for the "${intlFile.locale}" locale.`);
  });
}
