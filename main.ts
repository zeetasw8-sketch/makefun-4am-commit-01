import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Entry program for "The 4AM Commit" (make.fun).
// Reads the single commit message from line.txt and writes it verbatim
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output), with no trailing
// newline, so the sealed scorer sees exactly 1-200 characters.
const repoRoot = dirname(fileURLToPath(import.meta.url)), destination = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const raw = readFileSync(join(repoRoot, "line.txt"), "utf8");
const message = raw.replace(/\r?\n+$/, "").trim();

if (message.length < 1 || message.length > 200) {
  throw new Error(
    `commit message must be 1-200 characters, got ${message.length}`,
  );
}
if (message.includes("\n")) {
  throw new Error("commit message must be a single line");
}

mkdirSync(destination, { recursive: true });
writeFileSync(join(destination, "entry.txt"), message, "utf8");
console.log(message);
