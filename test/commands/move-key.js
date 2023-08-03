import test from "ava";
import { cleanupOutput, copyBlueprint } from "../helpers.js";
import moveKey from "../../lib/commands/move-key.js";
import IntlFileJson from "../../lib/models/intl-file-json.js";
import IntlFileYaml from "../../lib/models/intl-file-yaml.js";
import IntlFileYml from "../../lib/models/intl-file-yml.js";

test("it moves keys", async function (t) {
  const blueprint = await copyBlueprint("app");

  await moveKey(blueprint.path, "foo", "fooMoved");
  await moveKey(blueprint.path, "qux.foo", "qux.fooMoved");

  const intlFileJson = new IntlFileJson(blueprint.intlDirPath, "en-AU");
  const intlFileYaml = new IntlFileYaml(blueprint.intlDirPath, "en-GB");
  const intlFileYml = new IntlFileYml(blueprint.intlDirPath, "en-US");

  await intlFileJson.readFile();
  await intlFileYaml.readFile();
  await intlFileYml.readFile();

  const newContent = {
    fooMoved: "foo",
    bar: "",
    baz: null,
    qux: {
      fooMoved: "foo",
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
