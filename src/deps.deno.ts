// Deno-only, see https://doc.deno.land/https/deno.land/x/deno2node/src/mod.ts#deno2node
// please keep sorted
export { z } from "https://cdn.skypack.dev/zod@v3.11.6?dts";
export * as path from "https://deno.land/std@0.115.0/path/mod.ts";
export * from "https://deno.land/x/ts_morph@12.2.0/mod.ts";
import { dirname, join } from "https://deno.land/std@0.115.0/path/mod.ts";

export async function getOwnVersion(): Promise<string> {
  const thisDir = dirname(import.meta.url);
  const path = join(thisDir, "..", "package.json");
  const res = await fetch(path);
  const packageJson = await res.json();
  return packageJson.version;
}
