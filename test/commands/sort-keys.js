import test from "ava";
import { cleanupOutput, copyBlueprint } from "../helpers.js";
import sortKeys from "../../lib/commands/sort-keys.js";
import IntlFileJson from "../../lib/models/intl-file-json.js";
import IntlFileYaml from "../../lib/models/intl-file-yaml.js";
import IntlFileYml from "../../lib/models/intl-file-yml.js";

test("it sorts keys", async function (t) {
  const blueprint = await copyBlueprint("app");

  const intlFileJson = new IntlFileJson(blueprint.intlDirPath, "en-AU");
  const intlFileYaml = new IntlFileYaml(blueprint.intlDirPath, "en-GB");
  const intlFileYml = new IntlFileYml(blueprint.intlDirPath, "en-US");

  await intlFileJson.readFile();
  await intlFileYaml.readFile();
  await intlFileYml.readFile();

  const intlFileJsonContentBefore = JSON.stringify(intlFileJson.content);
  const intlFileYamlContentBefore = JSON.stringify(intlFileYaml.content);
  const intlFileYmlContentBefore = JSON.stringify(intlFileYml.content);

  await sortKeys(blueprint.path);

  await intlFileJson.readFile();
  await intlFileYaml.readFile();
  await intlFileYml.readFile();

  const intlFileJsonContentAfter = JSON.stringify(intlFileJson.content);
  const intlFileYamlContentAfter = JSON.stringify(intlFileYaml.content);
  const intlFileYmlContentAfter = JSON.stringify(intlFileYml.content);

  t.not(intlFileJsonContentBefore, intlFileJsonContentAfter);
  t.not(intlFileYamlContentBefore, intlFileYamlContentAfter);
  t.not(intlFileYmlContentBefore, intlFileYmlContentAfter);

  await cleanupOutput(blueprint.dir);
});
