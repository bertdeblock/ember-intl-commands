"use strict";

const util = require("util");
const IntlDir = require("../models/intl-dir");
const getIntlDirPath = require("../utils/get-intl-dir-path");

async function listLocales(projectPath) {
  const intlDirPath = getIntlDirPath(projectPath);
  const intlDir = new IntlDir(intlDirPath);
  const locales = await intlDir.map((intlFile) => intlFile.locale);
  const count = locales.length;

  console.log(`${count} ${count === 1 ? "locale" : "locales"} found:`);
  console.log(util.inspect(locales, { colors: true, compact: false }));

  return locales;
}

module.exports = listLocales;
