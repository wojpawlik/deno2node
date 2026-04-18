import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";

test({ skip: "Deno" in globalThis }, function shimming() {
  assert(
    readFileSync("lib/init.js", { encoding: "utf-8" }).endsWith(
      'import { fetch } from "./shim.node.js";\n',
    ),
  );
});
