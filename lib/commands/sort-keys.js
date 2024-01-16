import IntlDir from "../models/intl-dir.js";
import getIntlDirPath from "../utils/get-intl-dir-path.js";
import { info, success } from "../utils/logging.js";

export default async function sortKeys(projectPath) {
  const intlDirPath = getIntlDirPath(projectPath);
  const intlDir = new IntlDir(intlDirPath);

  await intlDir.forEach(async (intlFile) => {
    await intlFile.readFile();

    const contentBefore = JSON.stringify(intlFile.content);

    intlFile.sortKeys();

    const contentAfter = JSON.stringify(intlFile.content);

    await intlFile.writeFile();

    if (contentBefore === contentAfter) {
      info(`All keys were already sorted for the "${intlFile.locale}" locale.`);
    } else {
      success(`All keys were sorted for the "${intlFile.locale}" locale.`);
    }
  });
}
