import fsExtra from "fs-extra";
import { createRequire } from "node:module";
import path from "node:path";

const DEFAULT_INTL_CONFIG = {
  fallbackLocale: "en",
  inputPath: "translations",
};

/**
 * Get the intl config.
 *
 * @param {string} projectPath
 * @returns {object}
 */
export default function getIntlConfig(projectPath) {
  const intlConfigPath = path.join(projectPath, "config", "ember-intl.js");

  if (fsExtra.pathExistsSync(intlConfigPath)) {
    const require = createRequire(import.meta.url);
    const emberIntlConfig = require(intlConfigPath);

    return { ...DEFAULT_INTL_CONFIG, ...emberIntlConfig() };
  }

  return { ...DEFAULT_INTL_CONFIG };
}
