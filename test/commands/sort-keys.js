'use strict';

const test = require('ava');
const path = require('path');
const { cleanupOutput, copyBlueprint } = require('../helpers');
const sortKeys = require('../../lib/commands/sort-keys');
const IntlFileJson = require('../../lib/models/intl-file-json');
const IntlFileYaml = require('../../lib/models/intl-file-yaml');
const IntlFileYml = require('../../lib/models/intl-file-yml');

test('it sorts keys', async function (t) {
  const blueprint = await copyBlueprint('app');
  const intlDirPath = path.join(blueprint.path, 'translations');

  const intlFileJson = new IntlFileJson(intlDirPath, 'en-AU');
  const intlFileYaml = new IntlFileYaml(intlDirPath, 'en-GB');
  const intlFileYml = new IntlFileYml(intlDirPath, 'en-US');

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
