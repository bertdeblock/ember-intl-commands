import test from "ava";
import { cleanupOutput, copyBlueprint } from "../helpers.js";
import listLocales from "../../lib/commands/list-locales.js";

test("it lists all locales", async function (t) {
  const blueprint = await copyBlueprint("app");
  const locales = await listLocales(blueprint.path);

  t.deepEqual(locales, ["en-AU", "en-GB", "en-US"]);

  await cleanupOutput(blueprint.dir);
});
