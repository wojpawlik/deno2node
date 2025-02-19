#!/usr/bin/env node
export * from "./src/mod.ts";
import { extname } from "node:path";
import { argv } from "node:process";
if (import.meta.main ?? import.meta.filename === argv[1]) {
  await import("./src/cli" + extname(argv[1]));
}
