import IntlDir from "../models/intl-dir.js";
import getIntlDirPath from "../utils/get-intl-dir-path.js";

export default async function moveKey(projectPath, key, to) {
  const intlDirPath = getIntlDirPath(projectPath);
  const intlDir = new IntlDir(intlDirPath);

  await intlDir.forEach(async (intlFile) => {
    await intlFile.readFile();

    intlFile.setKey(to, intlFile.getKey(key));
    intlFile.removeKey(key);
    intlFile.sortKeys();

    await intlFile.writeFile();
  });
}
