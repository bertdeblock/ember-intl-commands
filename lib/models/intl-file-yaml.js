import fs from "fs";
import jsYaml from "js-yaml";
import util from "util";
import IntlFile from "./intl-file.js";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export default class IntlFileYaml extends IntlFile {
  static ext = ".yaml";

  async readFile() {
    this.content = jsYaml.load(await readFile(this.path, "utf8"));
  }

  async writeFile() {
    await writeFile(this.path, jsYaml.dump(this.content));
  }
}
