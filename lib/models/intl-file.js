import { camelCase, paramCase, snakeCase } from "change-case";
import deepSortObject from "deep-sort-object";
import fsExtra from "fs-extra";
import lodash from "lodash";
import path from "node:path";
import omitEmpty from "omit-empty";

const CASING_HELPER = {
  camel: camelCase,
  param: paramCase,
  snake: snakeCase,
};

export default class IntlFile {
  static ext = "The static `ext` property needs to be defined on a subclass.";

  content = null;
  dir = null;
  indent = 2;
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
   * Check if the provided key exists.
   *
   * @method hasKey
   * @param {string} key
   * @returns {boolean}
   */
  hasKey(key) {
    return lodash.has(this.content, key);
  }

  /**
   * Parse the intl file's content.
   *
   * @method parseContent
   * @param {string} content
   * @returns {object}
   */
  parseContent(/* content */) {
    throw new Error(
      "The `parseContent` method needs to be implemented on a subclass.",
    );
  }

  /**
   * Strip keys that have empty values (`""`, `null` or `{}`).
   *
   * @method stripEmptyKeys
   */
  stripEmptyKeys() {
    this.content = omitEmpty(this.content);
  }

  /**
   * Read the intl file.
   *
   * @method readFile
   */
  async readFile() {
    const content = await fsExtra.readFile(this.path, { encoding: "utf-8" });
    const secondLine = content.split("\n").at(1);

    this.content = this.parseContent(content);
    this.indent = secondLine.length - secondLine.trim().length;
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
   * Sort all keys.
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
   * Remove the intl file.
   *
   * @method removeFile
   * @returns {Promise}
   */
  removeFile() {
    return fsExtra.remove(this.path);
  }

  /**
   * Convert all keys to `camelCase`, `param-case` or `snake_case`.
   *
   * @method toCasing
   */
  toCasing(casing) {
    this.content = toCasing(this.content, casing);
  }

  /**
   * Write the intl file.
   *
   * @method writeFile
   */
  writeFile() {
    throw new Error(
      "The `writeFile` method needs to be implemented on a subclass.",
    );
  }
}

function toCasing(object, casing) {
  return Object.keys(object).reduce((result, key) => {
    const modifiedKey = CASING_HELPER[casing](key);
    const value = object[key];

    if (typeof value === "object" && value !== null) {
      result[modifiedKey] = toCasing(value, casing);
    } else {
      result[modifiedKey] = value;
    }

    return result;
  }, {});
}
