import IntlDir from "../models/intl-dir.js";
import getIntlDirPath from "../utils/get-intl-dir-path.js";

export default async function sortKeys(projectPath) {
  const intlDirPath = getIntlDirPath(projectPath);
  const intlDir = new IntlDir(intlDirPath);

  await intlDir.forEach(async (intlFile) => {
    await intlFile.readFile();

    intlFile.sortKeys();

    await intlFile.writeFile();
  });
}
