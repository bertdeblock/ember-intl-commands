"use strict";

const IntlDir = require("../models/intl-dir");
const getIntlDirPath = require("../utils/get-intl-dir-path");

async function moveKey(projectPath, key, to) {
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

module.exports = moveKey;
