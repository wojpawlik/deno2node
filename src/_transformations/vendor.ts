import type { Context } from "../context.ts";
import type { SourceFile } from "../deps.deno.ts";
import { replaceSpecifiers } from "./specifiers.ts";

const https = /^https:\//;

/**
 * Rewrites `https:` specifiers in `sourceFile`
 * to point into the specified `vendorDir`.
 */
export const vendorSpecifiers =
  (vendorDir: string) => (sourceFile: SourceFile) => {
    const relativePath = "./" + sourceFile.getRelativePathTo(vendorDir);
    replaceSpecifiers(sourceFile, (specifier) => {
      return specifier.replace(https, relativePath);
    });
  };

export function vendorEverything(ctx: Context) {
  if (!ctx.config.vendorDir) return;
  console.time("Vendoring");
  ctx.project.getSourceFiles().forEach(vendorSpecifiers(
    ctx.resolve(ctx.config.vendorDir),
  ));
  console.timeEnd("Vendoring");
}
