import fsExtra from "fs-extra";
import path from "path";
import recursiveCopy from "recursive-copy";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

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
