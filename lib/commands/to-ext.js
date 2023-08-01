"use strict";

const IntlDir = require("../models/intl-dir");
const IntlFileClassMap = require("../models/intl-file-class-map");
const getIntlDirPath = require("../utils/get-intl-dir-path");

async function toExt(projectPath, ext) {
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

module.exports = toExt;
