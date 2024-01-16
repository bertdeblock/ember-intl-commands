import chalk from "chalk";
import { env } from "node:process";

export function info() {
  log(chalk.blueBright, ...arguments);
}

export function success() {
  log(chalk.greenBright, ...arguments);
}

export function warning() {
  log(chalk.yellowBright, ...arguments);
}

function log(color, ...parts) {
  if (env.EMBER_INTL_COMMANDS_LOGGING === "false") {
    return;
  }

  console.log(color(prefixMessage(parts.join(" "))));
}

function prefixMessage(message) {
  return `${chalk.inverse(" ember-intl-commands ")} ${message}`;
}
