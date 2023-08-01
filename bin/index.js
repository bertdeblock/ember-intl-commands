#!/usr/bin/env node

import { cwd } from "node:process";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

import listLocales from "../lib/commands/list-locales.js";
import moveKey from "../lib/commands/move-key.js";
import removeKey from "../lib/commands/remove-key.js";
import sortKeys from "../lib/commands/sort-keys.js";
import stripEmptyKeys from "../lib/commands/strip-empty-keys.js";
import toCasing from "../lib/commands/to-casing.js";
import toExt from "../lib/commands/to-ext.js";

yargs(hideBin(process.argv))
  .command({
    command: "list-locales",
    describe: "List all locales",

    handler() {
      listLocales(cwd());
    },
  })
  .command({
    command: "move-key [key] [to]",
    describe: "Move a key",

    builder(yargs) {
      return yargs
        .positional("key", {
          description: "The key to move",
          type: "string",
        })
        .positional("to", {
          description: "The new key",
          type: "string",
        })
        .demandOption(["key", "to"]);
    },
    handler(options) {
      moveKey(cwd(), options.key, options.to);
    },
  })
  .command({
    command: "remove-key [key]",
    describe: "Remove a key",

    builder(yargs) {
      return yargs
        .positional("key", {
          description: "The key to remove",
          type: "string",
        })
        .demandOption(["key"]);
    },
    handler(options) {
      removeKey(cwd(), options.key);
    },
  })
  .command({
    command: "sort-keys",
    describe: "Sort keys",

    handler() {
      sortKeys(cwd());
    },
  })
  .command({
    command: "strip-empty-keys",
    describe: 'Strip empty keys (`""`, `null` or `{}`)',

    handler() {
      stripEmptyKeys(cwd());
    },
  })
  .command({
    command: "to-casing [casing]",
    describe: "Convert all keys to `camelCase`, `param-case` or `snake_case`",

    builder(yargs) {
      return yargs
        .positional("casing", {
          choices: ["camel", "param", "snake"],
          description: "The casing",
          type: "string",
        })
        .demandOption(["casing"]);
    },
    handler(options) {
      toCasing(cwd(), options.casing);
    },
  })
  .command({
    command: "to-ext [ext]",
    describe: "Convert all files to `json`, `yaml` or `yml`",

    builder(yargs) {
      return yargs
        .positional("ext", {
          choices: ["json", "yaml", "yml"],
          description: "The extension",
          type: "string",
        })
        .demandOption(["ext"]);
    },
    handler(options) {
      toExt(cwd(), options.ext);
    },
  })
  .demandCommand()
  .strict().argv;
