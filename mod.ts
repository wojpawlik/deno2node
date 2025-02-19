#!/usr/bin/env node
export * from "./src/mod.ts";
import { argv } from "node:process";
if (import.meta.main ?? import.meta.filename === argv[1]) {
  await import("./src/cli" + argv[1].slice(-3));
}
