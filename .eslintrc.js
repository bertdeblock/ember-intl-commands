"use strict";

module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:n/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    requireConfigFile: false,
    sourceType: "script",
  },
  plugins: ["prettier"],
  root: true,
  rules: {
    strict: "error",
  },
};
