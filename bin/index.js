#!/usr/bin/env node

'use strict';

const { cwd } = require('process');
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs/yargs');

const listLocales = require('../lib/commands/list-locales');
const moveKey = require('../lib/commands/move-key');
const removeKey = require('../lib/commands/remove-key');
const sortKeys = require('../lib/commands/sort-keys');
const stripEmptyKeys = require('../lib/commands/strip-empty-keys');
const toExt = require('../lib/commands/to-ext');

yargs(hideBin(process.argv))
  .command({
    command: 'list-locales',
    describe: 'List all locales',

    handler() {
      listLocales(cwd());
    },
  })
  .command({
    command: 'move-key [key] [to]',
    describe: 'Move a key',

    builder(yargs) {
      return yargs
        .positional('key', {
          description: 'The key to move',
          type: 'string',
        })
        .positional('to', {
          description: 'The new key',
          type: 'string',
        })
        .demandOption(['key', 'to']);
    },
    handler(options) {
      moveKey(cwd(), options.key, options.to);
    },
  })
  .command({
    command: 'remove-key [key]',
    describe: 'Remove a key',

    builder(yargs) {
      return yargs
        .positional('key', {
          description: 'The key to remove',
          type: 'string',
        })
        .demandOption(['key']);
    },
    handler(options) {
      removeKey(cwd(), options.key);
    },
  })
  .command({
    command: 'sort-keys',
    describe: 'Sort keys',

    handler() {
      sortKeys(cwd());
    },
  })
  .command({
    command: 'strip-empty-keys',
    describe: 'Strip empty keys',

    handler() {
      stripEmptyKeys(cwd());
    },
  })
  .command({
    command: 'to-ext [ext]',
    describe: 'Convert all files to `json`, `yaml` or `yml`',

    builder(yargs) {
      return yargs
        .positional('ext', {
          choices: ['json', 'yaml', 'yml'],
          description: 'The extension',
          type: 'string',
        })
        .demandOption(['ext']);
    },
    handler(options) {
      toExt(cwd(), options.ext);
    },
  })
  .demandCommand()
  .strict().argv;
