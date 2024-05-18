import fsExtra from "fs-extra";
import path from "node:path";
import IntlFileClassMap from "./intl-file-class-map.js";

export default class IntlDir {
  path = null;

  /**
   * Create an `IntlDir` instance.
   *
   * @param {string} path
   */
  constructor(path) {
    this.path = path;
  }

  /**
   * Find the intl file for the provided locale.
   *
   * @param {string} locale
   * @returns {Promise<IntlFile>}
   */
  async find(locale) {
    let intlFile;

    await this.forEach((iFile) => {
      if (iFile.locale === locale) {
        intlFile = iFile;
      }
    });

    if (intlFile === undefined) {
      throw new Error(`Locale "${locale}" not found.`);
    }

    return intlFile;
  }

  /**
   * Execute a callback for each intl file in the directory.
   *
   * @method forEach
   * @param {function} callback
   * @returns {Promise}
   */
  async forEach(callback) {
    const files = await fsExtra.readdir(this.path);
    const promises = files.map((file) => {
      const { ext, name } = path.parse(file);
      const IntlFileClass = IntlFileClassMap[ext];
      const intlFile = new IntlFileClass(this.path, name);

      return callback(intlFile);
    });

    return Promise.all(promises);
  }

  /**
   * Execute a callback for each intl file in the directory
   * and create a new array with the returned results.
   *
   * @method map
   * @param {function} callback
   * @returns {Promise<array>}
   */
  async map(callback) {
    const result = [];

    await this.forEach((intlFile) => {
      result.push(callback(intlFile));
    });

    return result;
  }
}
