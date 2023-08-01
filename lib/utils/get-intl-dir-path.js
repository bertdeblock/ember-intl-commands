"use strict";

import fsExtra from "fs-extra";
import { createRequire } from "node:module";
import path from "node:path";

/**
 * Get the absolute path to the intl directory.
 *
 * @param {string} projectPath
 * @returns {string}
 */
export default function getIntlDirPath(projectPath) {
  const emberIntlConfigPath = path.join(projectPath, "config", "ember-intl.js");

  let intlDir = "translations";

  if (fsExtra.pathExistsSync(emberIntlConfigPath)) {
    const require = createRequire(import.meta.url);
    const emberIntlConfig = require(emberIntlConfigPath);

    intlDir = emberIntlConfig().inputPath;
  }

  return path.join(projectPath, intlDir);
}
