import fsExtra from "fs-extra";
import jsYaml from "js-yaml";
import IntlFile from "./intl-file.js";

export default class IntlFileYaml extends IntlFile {
  static ext = ".yaml";

  spaces = 2;

  async readFile() {
    const content = await fsExtra.readFile(this.path, { encoding: "utf-8" });
    const secondLine = content.split("\n").at(1);

    this.content = jsYaml.load(content);
    this.spaces = secondLine.length - secondLine.trim().length;
  }

  async writeFile() {
    await fsExtra.writeFile(this.path, jsYaml.dump(this.content));
  }
}
