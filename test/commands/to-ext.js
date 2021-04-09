'use strict';

const test = require('ava');
const { cleanupOutput, copyBlueprint, outputPathExists } = require('../helpers');
const toExt = require('../../lib/commands/to-ext');

test('it converts all files to `json`', async function (t) {
  const blueprint = await copyBlueprint('app');

  await toExt(blueprint.path, 'json');

  t.true(await outputPathExists(blueprint.dir, 'translations', 'en-AU.json'));
  t.true(await outputPathExists(blueprint.dir, 'translations', 'en-GB.json'));
  t.true(await outputPathExists(blueprint.dir, 'translations', 'en-US.json'));

  t.false(await outputPathExists(blueprint.dir, 'translations', 'en-GB.yaml'));
  t.false(await outputPathExists(blueprint.dir, 'translations', 'en-US.yml'));

  await cleanupOutput(blueprint.dir);
});

test('it converts all files to `yaml`', async function (t) {
  const blueprint = await copyBlueprint('app');

  await toExt(blueprint.path, 'yaml');

  t.true(await outputPathExists(blueprint.dir, 'translations', 'en-AU.yaml'));
  t.true(await outputPathExists(blueprint.dir, 'translations', 'en-GB.yaml'));
  t.true(await outputPathExists(blueprint.dir, 'translations', 'en-US.yaml'));

  t.false(await outputPathExists(blueprint.dir, 'translations', 'en-AU.json'));
  t.false(await outputPathExists(blueprint.dir, 'translations', 'en-US.yml'));

  await cleanupOutput(blueprint.dir);
});

test('it converts all files to `yml`', async function (t) {
  const blueprint = await copyBlueprint('app');

  await toExt(blueprint.path, 'yml');

  t.true(await outputPathExists(blueprint.dir, 'translations', 'en-AU.yml'));
  t.true(await outputPathExists(blueprint.dir, 'translations', 'en-GB.yml'));
  t.true(await outputPathExists(blueprint.dir, 'translations', 'en-US.yml'));

  t.false(await outputPathExists(blueprint.dir, 'translations', 'en-AU.json'));
  t.false(await outputPathExists(blueprint.dir, 'translations', 'en-GB.yaml'));

  await cleanupOutput(blueprint.dir);
});
