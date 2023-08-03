import IntlDir from "../models/intl-dir.js";
import getIntlDirPath from "../utils/get-intl-dir-path.js";
import { success, warning } from "../utils/logging.js";

export default async function moveKey(projectPath, key, to) {
  const intlDirPath = getIntlDirPath(projectPath);
  const intlDir = new IntlDir(intlDirPath);

  await intlDir.forEach(async (intlFile) => {
    await intlFile.readFile();

    if (intlFile.hasKey(key) === false) {
      return warning(
        `Key "${key}" does not exist for the "${intlFile.locale}" locale.`,
      );
    }

    intlFile.setKey(to, intlFile.getKey(key));
    intlFile.removeKey(key);
    intlFile.sortKeys();

    await intlFile.writeFile();

    success(
      `Key "${key}" was moved to "${to}" for the "${intlFile.locale}" locale.`,
    );
  });
}
