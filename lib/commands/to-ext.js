import IntlDir from "../models/intl-dir.js";
import IntlFileClassMap from "../models/intl-file-class-map.js";
import getIntlDirPath from "../utils/get-intl-dir-path.js";

export default async function toExt(projectPath, ext) {
  const intlDirPath = getIntlDirPath(projectPath);
  const intlDir = new IntlDir(intlDirPath);
  const IntlFileClass = IntlFileClassMap[`.${ext}`];

  await intlDir.forEach(async (intlFile) => {
    if (intlFile.constructor === IntlFileClass) {
      return;
    }

    const intlFileNew = new IntlFileClass(intlDirPath, intlFile.locale);

    await intlFile.readFile();

    intlFileNew.content = intlFile.content;

    await intlFile.removeFile();
    await intlFileNew.writeFile();
  });
}
