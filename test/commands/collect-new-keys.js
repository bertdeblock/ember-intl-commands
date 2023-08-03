import test from "ava";
import { cleanupOutput, copyBlueprint } from "../helpers.js";
import collectNewKeys from "../../lib/commands/collect-new-keys.js";
import IntlFileYml from "../../lib/models/intl-file-yml.js";

test("it collects newly added keys", async function (t) {
  const blueprint = await copyBlueprint("app");
  const intlFile = new IntlFileYml(blueprint.intlDirPath, "en-US");

  await intlFile.readFile();

  t.false(intlFile.hasKey("new.key.in.component.hbs.one"));
  t.false(intlFile.hasKey("new.key.in.component.hbs.two"));
  t.false(intlFile.hasKey("new.key.in.component.hbs.three"));
  t.false(intlFile.hasKey("new.key.in.component.js.one"));
  t.false(intlFile.hasKey("new.key.in.component.js.two"));
  t.false(intlFile.hasKey("new.key.in.component.js.three"));
  t.false(intlFile.hasKey("new.key.in.template.one"));
  t.false(intlFile.hasKey("new.key.in.template.two"));
  t.false(intlFile.hasKey("new.key.in.template.three"));

  await collectNewKeys(blueprint.path, "en-US");
  await intlFile.readFile();

  t.is(intlFile.getKey("new.key.in.component.hbs.one"), "One {foo} {bar}");
  t.is(intlFile.getKey("new.key.in.component.hbs.two"), "Two {foo} {bar}");
  t.is(intlFile.getKey("new.key.in.component.hbs.three"), "Three");
  t.is(intlFile.getKey("new.key.in.component.js.one"), "One {foo} {bar}");
  t.is(intlFile.getKey("new.key.in.component.js.two"), "Two {foo} {bar}");
  t.is(intlFile.getKey("new.key.in.component.js.three"), "Three");
  t.is(intlFile.getKey("new.key.in.template.one"), "One {foo} {bar}");
  t.is(intlFile.getKey("new.key.in.template.two"), "Two {foo} {bar}");
  t.is(intlFile.getKey("new.key.in.template.three"), "Three");

  await cleanupOutput(blueprint.dir);
});
