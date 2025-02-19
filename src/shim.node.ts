// Node-only, see https://github.com/fromdeno/deno2node#shimming
import { chmod, readFile } from "node:fs/promises";
import * as process from "node:process";
import { isatty } from "node:tty";

const os = process.platform === "win32" ? "windows" : process.platform;

export const Deno = {
  // please keep sorted
  build: { os },
  chmod,
  exit: process.exit,
  get noColor() {
    return Boolean(process.env.NO_COLOR);
  },
  stdout: {
    isTerminal: () => isatty(process.stdout.fd),
  },
};

export async function fetch(fileUrl: URL) {
  return new Response(await readFile(fileUrl));
}
