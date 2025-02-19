// Node-only, see https://github.com/wojpawlik/deno2node#shimming
import { readFile } from "node:fs/promises";
import * as process from "node:process";

export const Deno = {
  // please keep sorted
  get noColor() {
    return Boolean(process.env.NO_COLOR);
  },
  stdout: {
    isTerminal: () => Boolean(process.stdout.isTTY),
  },
};

export async function fetch(fileUrl: URL) {
  return new Response(await readFile(fileUrl));
}
