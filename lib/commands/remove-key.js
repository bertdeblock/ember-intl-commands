import IntlDir from "../models/intl-dir.js";
import getIntlDirPath from "../utils/get-intl-dir-path.js";

export default async function removeKey(projectPath, key) {
  const intlDirPath = getIntlDirPath(projectPath);
  const intlDir = new IntlDir(intlDirPath);

  await intlDir.forEach(async (intlFile) => {
    await intlFile.readFile();

    intlFile.removeKey(key);

    await intlFile.writeFile();
  });
}
