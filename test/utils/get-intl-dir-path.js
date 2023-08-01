import test from "ava";
import path from "node:path";
import { cleanupOutput, copyBlueprint } from "../helpers.js";
import getIntlDirPath from "../../lib/utils/get-intl-dir-path.js";

test("it gets the absolute path to the intl directory", async function (t) {
  const blueprint = await copyBlueprint("app-with-config");
  const intlDirPath = getIntlDirPath(blueprint.path);

  t.is(intlDirPath, path.join(blueprint.path, "foo/bar/baz"));

  await cleanupOutput(blueprint.dir);
});

test("it falls back to using `translations`", async function (t) {
  const blueprint = await copyBlueprint("app");
  const intlDirPath = getIntlDirPath(blueprint.path);

  t.is(intlDirPath, path.join(blueprint.path, "translations"));

  await cleanupOutput(blueprint.dir);
});
