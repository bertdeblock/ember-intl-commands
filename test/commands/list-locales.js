"use strict";

const test = require("ava");
const { cleanupOutput, copyBlueprint } = require("../helpers");
const listLocales = require("../../lib/commands/list-locales");

test("it lists all locales", async function (t) {
  const blueprint = await copyBlueprint("app");
  const locales = await listLocales(blueprint.path);

  t.deepEqual(locales, ["en-AU", "en-GB", "en-US"]);

  await cleanupOutput(blueprint.dir);
});
