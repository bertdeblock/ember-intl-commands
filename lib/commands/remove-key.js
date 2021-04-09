'use strict';

const IntlDir = require('../models/intl-dir');
const getIntlDirPath = require('../utils/get-intl-dir-path');

async function removeKey(projectPath, key) {
  const intlDirPath = getIntlDirPath(projectPath);
  const intlDir = new IntlDir(intlDirPath);

  await intlDir.forEach(async (intlFile) => {
    await intlFile.readFile();

    intlFile.removeKey(key);

    await intlFile.writeFile();
  });
}

module.exports = removeKey;
