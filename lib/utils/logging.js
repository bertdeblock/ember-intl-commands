import chalk from "chalk";

export function success() {
  log(chalk.greenBright, ...arguments);
}

export function warning() {
  log(chalk.yellowBright, ...arguments);
}

function log(color, ...parts) {
  console.log(color(prefixMessage(parts.join(" "))));
}

function prefixMessage(message) {
  return `${chalk.inverse(" ember-intl-commands ")} ${message}`;
}
