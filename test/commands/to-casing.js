import test from "ava";
import path from "node:path";
import { cleanupOutput, copyBlueprint } from "../helpers.js";
import toCasing from "../../lib/commands/to-casing.js";
import IntlFileJson from "../../lib/models/intl-file-json.js";
import IntlFileYaml from "../../lib/models/intl-file-yaml.js";
import IntlFileYml from "../../lib/models/intl-file-yml.js";

test("it converts all keys to `camelCase`", async function (t) {
  const blueprint = await copyBlueprint("app");
  const intlDirPath = path.join(blueprint.path, "translations");

  const intlFileJson = new IntlFileJson(intlDirPath, "en-AU");
  const intlFileYaml = new IntlFileYaml(intlDirPath, "en-GB");
  const intlFileYml = new IntlFileYml(intlDirPath, "en-US");

  await intlFileJson.readFile();
  await intlFileYaml.readFile();
  await intlFileYml.readFile();

  intlFileJson.content.foo_bar = "Foo Bar";
  intlFileYaml.content.foo_bar = "Foo Bar";
  intlFileYml.content.foo_bar = "Foo Bar";

  await intlFileJson.writeFile();
  await intlFileYaml.writeFile();
  await intlFileYml.writeFile();

  await toCasing(blueprint.path, "camel");

  await intlFileJson.readFile();
  await intlFileYaml.readFile();
  await intlFileYml.readFile();

  t.is(intlFileJson.content.fooBar, "Foo Bar");
  t.is(intlFileYaml.content.fooBar, "Foo Bar");
  t.is(intlFileYml.content.fooBar, "Foo Bar");

  await cleanupOutput(blueprint.dir);
});

test("it converts all keys to `param-case`", async function (t) {
  const blueprint = await copyBlueprint("app");
  const intlDirPath = path.join(blueprint.path, "translations");

  const intlFileJson = new IntlFileJson(intlDirPath, "en-AU");
  const intlFileYaml = new IntlFileYaml(intlDirPath, "en-GB");
  const intlFileYml = new IntlFileYml(intlDirPath, "en-US");

  await intlFileJson.readFile();
  await intlFileYaml.readFile();
  await intlFileYml.readFile();

  intlFileJson.content.foo_bar = "Foo Bar";
  intlFileYaml.content.foo_bar = "Foo Bar";
  intlFileYml.content.foo_bar = "Foo Bar";

  await intlFileJson.writeFile();
  await intlFileYaml.writeFile();
  await intlFileYml.writeFile();

  await toCasing(blueprint.path, "param");

  await intlFileJson.readFile();
  await intlFileYaml.readFile();
  await intlFileYml.readFile();

  t.is(intlFileJson.content["foo-bar"], "Foo Bar");
  t.is(intlFileYaml.content["foo-bar"], "Foo Bar");
  t.is(intlFileYml.content["foo-bar"], "Foo Bar");

  await cleanupOutput(blueprint.dir);
});

test("it converts all keys to `snake_case`", async function (t) {
  const blueprint = await copyBlueprint("app");
  const intlDirPath = path.join(blueprint.path, "translations");

  const intlFileJson = new IntlFileJson(intlDirPath, "en-AU");
  const intlFileYaml = new IntlFileYaml(intlDirPath, "en-GB");
  const intlFileYml = new IntlFileYml(intlDirPath, "en-US");

  await intlFileJson.readFile();
  await intlFileYaml.readFile();
  await intlFileYml.readFile();

  intlFileJson.content.fooBar = "Foo Bar";
  intlFileYaml.content.fooBar = "Foo Bar";
  intlFileYml.content.fooBar = "Foo Bar";

  await intlFileJson.writeFile();
  await intlFileYaml.writeFile();
  await intlFileYml.writeFile();

  await toCasing(blueprint.path, "snake");

  await intlFileJson.readFile();
  await intlFileYaml.readFile();
  await intlFileYml.readFile();

  t.is(intlFileJson.content.foo_bar, "Foo Bar");
  t.is(intlFileYaml.content.foo_bar, "Foo Bar");
  t.is(intlFileYml.content.foo_bar, "Foo Bar");

  await cleanupOutput(blueprint.dir);
});
