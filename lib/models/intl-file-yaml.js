import fsExtra from "fs-extra";
import jsYaml from "js-yaml";
import IntlFile from "./intl-file.js";

export default class IntlFileYaml extends IntlFile {
  static ext = ".yaml";

  parseContent(content) {
    return jsYaml.load(content);
  }

  async writeFile() {
    await fsExtra.writeFile(
      this.path,
      jsYaml.dump(this.content, { indent: this.indent }),
    );
  }
}
