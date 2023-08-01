"use strict";

const fsExtra = require("fs-extra");
const IntlFile = require("./intl-file");

class IntlFileJson extends IntlFile {
  static ext = ".json";

  async readFile() {
    this.content = await fsExtra.readJson(this.path);
  }

  async writeFile() {
    await fsExtra.writeJson(this.path, this.content, { spaces: 2 });
  }
}

module.exports = IntlFileJson;
