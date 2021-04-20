'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const IntlFileClassMap = require('./intl-file-class-map');

const readDir = util.promisify(fs.readdir);

class IntlDir {
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
   * Execute a callback for each intl file in the directory.
   *
   * @method forEach
   * @param {function} callback
   * @returns {Promise}
   */
  async forEach(callback) {
    const files = await readDir(this.path);
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

module.exports = IntlDir;
