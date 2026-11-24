import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

// One Emoji, One Smile: a single warm emoji for a stranger.
const text = "🫶";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");

// Self-check: 1–8 code points, no whitespace, not whitespace-only,
// and the file reads back byte-identically to what was intended.
const codePoints = [...text].length;
if (codePoints < 1 || codePoints > 8) {
  throw new Error(`entry must be 1-8 code points, got ${codePoints}`);
}
if (/\s/.test(text) || text.trim().length === 0) {
  throw new Error("entry must contain no whitespace and must not be blank");
}
const written = readFileSync(outPath, "utf8");
if (written !== text) {
  throw new Error("entry.txt does not match the embedded emoji");
}
