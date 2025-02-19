import type { Diagnostic, MemoryEmitResultFile, Project } from "./deps.deno.ts";

const anyShebang = /^#!.*/;
const nodeShebang = "#!/usr/bin/env node";

function transpileShebang(file: MemoryEmitResultFile) {
  const replacement = file.filePath.endsWith("js") ? nodeShebang : "";
  file.text = file.text.replace(anyShebang, replacement);
}

/**
 * Replaces shebangs.
 * Emits project to the filesystem.
 * Returns diagnostics.
 */
export async function emit(project: Project): Promise<Diagnostic[]> {
  const result = project.emitToMemory();
  const files = result.getFiles();
  files.forEach(transpileShebang);
  await result.saveFiles();
  const preEmitDiagnostics = project.getPreEmitDiagnostics();
  if (preEmitDiagnostics.length !== 0) return preEmitDiagnostics;
  return result.getDiagnostics();
}
