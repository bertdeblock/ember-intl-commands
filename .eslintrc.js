"use strict";

module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:n/recommended"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    requireConfigFile: false,
    sourceType: "script",
  },
  root: true,
  rules: {
    strict: "error",
  },
};
