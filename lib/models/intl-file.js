import deepSortObject from "deep-sort-object";
import fsExtra from "fs-extra";
import lodash from "lodash";
import omitEmpty from "omit-empty";
import path from "path";

export default class IntlFile {
  static ext = "The static `ext` property needs to be defined on a subclass.";

  content = null;
  dir = null;
  locale = null;
  path = null;

  /**
   * Create an `IntlFile` instance.
   *
   * @param {string} dir
   * @param {string} locale
   */
  constructor(dir, locale) {
    this.dir = dir;
    this.locale = locale;
    this.path = path.format({
      dir,
      ext: this.constructor.ext,
      name: locale,
    });
  }

  /**
   * Get the value for a key.
   *
   * @method getKey
   * @param {string} key
   * @returns {string}
   */
  getKey(key) {
    return lodash.get(this.content, key);
  }

  /**
   * Recursively strip keys that have empty values (`""`, `null` or `{}`).
   *
   * @method stripEmptyKeys
   */
  stripEmptyKeys() {
    this.content = omitEmpty(this.content);
  }

  /**
   * Read the file.
   *
   * @method readFile
   */
  readFile() {
    throw new Error(
      "The `readFile` method needs to be implemented on a subclass.",
    );
  }

  /**
   * Set the value for a key.
   *
   * @method setKey
   * @param {string} key
   * @param {string} value
   */
  setKey(key, value) {
    lodash.set(this.content, key, value);
  }

  /**
   * Recursively sort keys.
   *
   * @method sortKeys
   */
  sortKeys() {
    this.content = deepSortObject(this.content);
  }

  /**
   * Remove a key.
   *
   * @method removeKey
   * @param {string} key
   */
  removeKey(key) {
    lodash.unset(this.content, key);
  }

  /**
   * Remove the file.
   *
   * @method removeFile
   * @returns {Promise}
   */
  removeFile() {
    return fsExtra.remove(this.path);
  }

  /**
   * Write the file.
   *
   * @method writeFile
   */
  writeFile() {
    throw new Error(
      "The `writeFile` method needs to be implemented on a subclass.",
    );
  }
}
