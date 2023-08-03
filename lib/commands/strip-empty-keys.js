import IntlDir from "../models/intl-dir.js";
import getIntlDirPath from "../utils/get-intl-dir-path.js";
import { success } from "../utils/logging.js";

export default async function stripEmptyKeys(projectPath) {
  const intlDirPath = getIntlDirPath(projectPath);
  const intlDir = new IntlDir(intlDirPath);

  await intlDir.forEach(async (intlFile) => {
    await intlFile.readFile();

    intlFile.stripEmptyKeys();

    await intlFile.writeFile();
  });

  success("All empty keys were stripped.");
}
