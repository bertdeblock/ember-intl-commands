import fsExtra from "fs-extra";
import IntlFile from "./intl-file.js";

export default class IntlFileJson extends IntlFile {
  static ext = ".json";

  async readFile() {
    this.content = await fsExtra.readJson(this.path);
  }

  async writeFile() {
    await fsExtra.writeJson(this.path, this.content, { spaces: 2 });
  }
}
