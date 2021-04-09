'use strict';

const fsExtra = require('fs-extra');
const path = require('path');

/**
 * Get the absolute path to the intl directory.
 *
 * @param {string} projectPath
 * @returns {string}
 */
function getIntlDirPath(projectPath) {
  const emberIntlConfigPath = path.join(projectPath, 'config', 'ember-intl.js');

  let intlDir = 'translations';

  if (fsExtra.pathExistsSync(emberIntlConfigPath)) {
    const emberIntlConfig = require(emberIntlConfigPath);

    intlDir = emberIntlConfig().inputPath;
  }

  return path.join(projectPath, intlDir);
}

module.exports = getIntlDirPath;
