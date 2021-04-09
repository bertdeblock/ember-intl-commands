'use strict';

const fsExtra = require('fs-extra');
const path = require('path');
const recursiveCopy = require('recursive-copy');
const { v4: uuidv4 } = require('uuid');

function cleanupOutput() {
  return fsExtra.remove(outputPath(...arguments));
}

async function copyBlueprint(blueprintName) {
  const sourcePath = testPath('blueprints', blueprintName);
  const targetDir = uuidv4();
  const targetPath = outputPath(targetDir);

  await recursiveCopy(sourcePath, targetPath);

  return {
    dir: targetDir,
    path: targetPath,
  };
}

function outputPathExists() {
  return fsExtra.pathExists(outputPath(...arguments));
}

function outputPath() {
  return testPath('output', ...arguments);
}

function testPath() {
  return path.join(__dirname, ...arguments);
}

module.exports = {
  cleanupOutput,
  copyBlueprint,
  outputPathExists,
  outputPath,
  testPath,
};
