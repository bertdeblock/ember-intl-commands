import { flatten } from "flat";
import IntlDir from "../models/intl-dir.js";
import getIntlConfig from "../utils/get-intl-config.js";
import getIntlDirPath from "../utils/get-intl-dir-path.js";
import { success, warning } from "../utils/logging.js";

// TODO: Support `locale` CLI option.
export default async function listDuplicates(projectPath, locale) {
  if (typeof locale === "undefined") {
    locale = getIntlConfig(projectPath).fallbackLocale;
  }

  const intlDirPath = getIntlDirPath(projectPath);
  const intlDir = new IntlDir(intlDirPath);
  const intlFile = await intlDir.find(locale);

  await intlFile.readFile();

  const flattened = flatten(intlFile.content);
  const translations = new Map();

  Object.keys(flattened).forEach((key) => {
    const translation = flattened[key];

    if (translations.has(translation)) {
      translations.get(translation).push(key);
    } else {
      translations.set(translation, [key]);
    }
  });

  const duplicates = [...translations.keys()].filter(
    (translation) => translations.get(translation).length > 1,
  );

  if (duplicates.length > 0) {
    warning(
      [
        `The following duplicate translations were found (${duplicates.length} total):`,
        ...duplicates
        .sort((a, b) => translations.get(b).length - translations.get(a).length)
        .map((translation) =>
          [
            `  • "${translation}":`,
            ...translations.get(translation).map((key) => `    • ${key}`),
          ].join("\n"),
        ),
      ].join("\n"),
    );
  } else {
    success("No duplicate translations were found.");
  }
}
