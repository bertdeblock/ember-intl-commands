import test from "ava";
import path from "node:path";
import { cleanupOutput, copyBlueprint } from "../helpers.js";
import removeKey from "../../lib/commands/remove-key.js";
import IntlFileJson from "../../lib/models/intl-file-json.js";
import IntlFileYaml from "../../lib/models/intl-file-yaml.js";
import IntlFileYml from "../../lib/models/intl-file-yml.js";

test("it removes keys", async function (t) {
  const blueprint = await copyBlueprint("app");
  const intlDirPath = path.join(blueprint.path, "translations");

  await removeKey(blueprint.path, "foo");
  await removeKey(blueprint.path, "qux.foo");

  const intlFileJson = new IntlFileJson(intlDirPath, "en-AU");
  const intlFileYaml = new IntlFileYaml(intlDirPath, "en-GB");
  const intlFileYml = new IntlFileYml(intlDirPath, "en-US");

  await intlFileJson.readFile();
  await intlFileYaml.readFile();
  await intlFileYml.readFile();

  const newContent = {
    bar: "",
    baz: null,
    qux: {
      bar: "",
      baz: null,
      qux: {
        foo: {},
      },
    },
  };

  t.deepEqual(intlFileJson.content, newContent);
  t.deepEqual(intlFileYaml.content, newContent);
  t.deepEqual(intlFileYml.content, newContent);

  await cleanupOutput(blueprint.dir);
});
