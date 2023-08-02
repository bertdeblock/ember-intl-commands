import path from "node:path";
import getIntlConfig from "./get-intl-config.js";

/**
 * Get the absolute path to the intl directory.
 *
 * @param {string} projectPath
 * @returns {string}
 */
export default function getIntlDirPath(projectPath) {
  const intlConfig = getIntlConfig(projectPath);

  return path.join(projectPath, intlConfig.inputPath);
}
