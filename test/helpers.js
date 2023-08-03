import fsExtra from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";
import recursiveCopy from "recursive-copy";
import { v4 as uuidv4 } from "uuid";
import getIntlDirPath from '../lib/utils/get-intl-dir-path.js';

function cleanupOutput() {
  return fsExtra.remove(outputPath(...arguments));
}

async function copyBlueprint(blueprintName) {
  const sourcePath = testPath("blueprints", blueprintName);
  const targetDir = uuidv4();
  const targetPath = outputPath(targetDir);

  await recursiveCopy(sourcePath, targetPath);

  return {
    dir: targetDir,
    intlDirPath: getIntlDirPath(targetPath),
    path: targetPath,
  };
}

function outputPathExists() {
  return fsExtra.pathExistsSync(outputPath(...arguments));
}

function outputPath() {
  return testPath("output", ...arguments);
}

function testPath() {
  return path.join(path.dirname(fileURLToPath(import.meta.url)), ...arguments);
}

export { cleanupOutput, copyBlueprint, outputPathExists, outputPath, testPath };
