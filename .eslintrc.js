'use strict';

module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'script',
  },
  plugins: ['node', 'prettier'],
  root: true,
  rules: {
    strict: 'error',
  },
};
