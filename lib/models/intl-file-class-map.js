import IntlFileJson from "./intl-file-json.js";
import IntlFileYaml from "./intl-file-yaml.js";
import IntlFileYml from "./intl-file-yml.js";

export default {
  [IntlFileJson.ext]: IntlFileJson,
  [IntlFileYaml.ext]: IntlFileYaml,
  [IntlFileYml.ext]: IntlFileYml,
};
