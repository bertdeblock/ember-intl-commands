import babelParser from "@babel/parser";
import babelTraverse from "@babel/traverse";
import { preprocess, traverse } from "@glimmer/syntax";
import { capitalCase } from "change-case";
import fsExtra from "fs-extra";
import { globby } from "globby";
import IntlDir from "../models/intl-dir.js";
import getIntlConfig from "../utils/get-intl-config.js";
import getIntlDirPath from "../utils/get-intl-dir-path.js";
import { success, warning } from "../utils/logging.js";

const EMBER_INTL_ARGS = new Set(["htmlSafe"]);

export default async function collectNewKeys(projectPath, locale) {
  if (typeof locale === "undefined") {
    locale = getIntlConfig(projectPath).fallbackLocale;
  }

  const intlDirPath = getIntlDirPath(projectPath);
  const intlDir = new IntlDir(intlDirPath);
  const intlFile = await intlDir.find(locale);
  const intlKeys = [];

  await intlFile.readFile();

  await collectNewKeysFromHbsFiles(intlKeys, projectPath);
  await collectNewKeysFromJsFiles(intlKeys, projectPath);

  let newIntlKeysCount = 0;

  intlKeys.forEach(({ namedArgs, key }) => {
    if (intlFile.hasKey(key) === false) {
      const keySegments = key.split(".");
      const translationArgs = namedArgs.filter((arg) => {
        return EMBER_INTL_ARGS.has(arg) === false;
      });

      const translation = [capitalCase(keySegments.at(-1))];

      if (translationArgs.length > 0) {
        translation.push(...translationArgs.map((arg) => `{${arg}}`));
      }

      intlFile.setKey(key, translation.join(" "));

      newIntlKeysCount++;
    }
  });

  intlFile.sortKeys();

  await intlFile.writeFile();

  if (newIntlKeysCount === 0) {
    warning("No new keys found.");
  } else if (newIntlKeysCount === 1) {
    success(`Added ${newIntlKeysCount} new key to the "${locale}" locale.`);
  } else {
    success(`Added ${newIntlKeysCount} new keys to the "${locale}" locale.`);
  }
}

async function collectNewKeysFromHbsFiles(intlKeys, projectPath) {
  const files = await globby(["app/**/*.hbs"], {
    absolute: true,
    cwd: projectPath,
  });

  function analyzeNode(node) {
    if (node.path.original !== "t") {
      return;
    }

    const firstParam = node.params[0];

    if (firstParam?.type === "StringLiteral") {
      intlKeys.push({
        namedArgs: node.hash.pairs.map((pair) => pair.key),
        key: firstParam.original,
      });
    }
  }

  files.forEach((file) => {
    const content = fsExtra.readFileSync(file, { encoding: "utf-8" });
    const AST = preprocess(content);

    traverse(AST, {
      MustacheStatement: analyzeNode,
      SubExpression: analyzeNode,
    });
  });
}

async function collectNewKeysFromJsFiles(intlKeys, projectPath) {
  const files = await globby(["app/**/*.js"], {
    absolute: true,
    cwd: projectPath,
  });

  files.forEach((file) => {
    const content = fsExtra.readFileSync(file, { encoding: "utf-8" });
    const AST = babelParser.parse(content, {
      plugins: ["decorators-legacy"],
      sourceType: "module",
    });

    babelTraverse.default(AST, {
      CallExpression({ node }) {
        if (
          node.callee.type !== "MemberExpression" ||
          node.callee.property.type !== "Identifier" ||
          node.callee.property.name !== "t"
        ) {
          return;
        }

        const firstParam = node.arguments[0];

        if (firstParam?.type === "StringLiteral") {
          const secondParam = node.arguments[1];

          intlKeys.push({
            namedArgs: (secondParam?.properties || []).map((property) => {
              return property.key.name;
            }),
            key: firstParam.value,
          });
        }
      },
    });
  });
}
