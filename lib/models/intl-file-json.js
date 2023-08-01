import fsExtra from "fs-extra";
import IntlFile from "./intl-file.js";

export default class IntlFileJson extends IntlFile {
  static ext = ".json";

  spaces = 2;

  async readFile() {
    const content = await fsExtra.readFile(this.path, { encoding: "utf-8" });
    const secondLine = content.split("\n").at(1);

    this.content = JSON.parse(content);
    this.spaces = secondLine.length - secondLine.trim().length;
  }

  async writeFile() {
    await fsExtra.writeJson(this.path, this.content, { spaces: this.spaces });
  }
}
