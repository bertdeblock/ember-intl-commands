import fsExtra from "fs-extra";
import IntlFile from "./intl-file.js";

export default class IntlFileJson extends IntlFile {
  static ext = ".json";

  parseContent(content) {
    return JSON.parse(content);
  }

  async writeFile() {
    await fsExtra.writeJson(this.path, this.content, { spaces: this.indent });
  }
}
