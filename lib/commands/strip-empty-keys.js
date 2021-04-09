'use strict';

const IntlDir = require('../models/intl-dir');
const getIntlDirPath = require('../utils/get-intl-dir-path');

async function stripEmptyKeys(projectPath) {
  const intlDirPath = getIntlDirPath(projectPath);
  const intlDir = new IntlDir(intlDirPath);

  await intlDir.forEach(async (intlFile) => {
    await intlFile.readFile();

    intlFile.stripEmptyKeys();

    await intlFile.writeFile();
  });
}

module.exports = stripEmptyKeys;
