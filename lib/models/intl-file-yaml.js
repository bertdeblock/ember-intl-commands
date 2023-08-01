"use strict";

const fs = require("fs");
const jsYaml = require("js-yaml");
const util = require("util");
const IntlFile = require("./intl-file");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class IntlFileYaml extends IntlFile {
  static ext = ".yaml";

  async readFile() {
    this.content = jsYaml.load(await readFile(this.path, "utf8"));
  }

  async writeFile() {
    await writeFile(this.path, jsYaml.dump(this.content));
  }
}

module.exports = IntlFileYaml;
