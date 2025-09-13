#!/usr/bin/env node
export * from "./src/mod.ts";
if (import.meta.main) {
  await import("./src/cli.ts");
}
