'use strict';

const IntlFileJson = require('./intl-file-json');
const IntlFileYaml = require('./intl-file-yaml');
const IntlFileYml = require('./intl-file-yml');

const IntlFileClassMap = {
  [IntlFileJson.ext]: IntlFileJson,
  [IntlFileYaml.ext]: IntlFileYaml,
  [IntlFileYml.ext]: IntlFileYml,
};

module.exports = IntlFileClassMap;
