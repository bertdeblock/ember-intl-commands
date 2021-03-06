'use strict';

const test = require('ava');
const path = require('path');
const { cleanupOutput, copyBlueprint } = require('../helpers');
const stripEmptyKeys = require('../../lib/commands/strip-empty-keys');
const IntlFileJson = require('../../lib/models/intl-file-json');
const IntlFileYaml = require('../../lib/models/intl-file-yaml');
const IntlFileYml = require('../../lib/models/intl-file-yml');

test('it strips empty keys', async function (t) {
  const blueprint = await copyBlueprint('app');
  const intlDirPath = path.join(blueprint.path, 'translations');

  await stripEmptyKeys(blueprint.path);

  const intlFileJson = new IntlFileJson(intlDirPath, 'en-AU');
  const intlFileYaml = new IntlFileYaml(intlDirPath, 'en-GB');
  const intlFileYml = new IntlFileYml(intlDirPath, 'en-US');

  await intlFileJson.readFile();
  await intlFileYaml.readFile();
  await intlFileYml.readFile();

  const newContent = {
    foo: 'foo',
    qux: {
      foo: 'foo',
    },
  };

  t.deepEqual(intlFileJson.content, newContent);
  t.deepEqual(intlFileYaml.content, newContent);
  t.deepEqual(intlFileYml.content, newContent);

  await cleanupOutput(blueprint.dir);
});
