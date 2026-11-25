// best-meal — make.fun entry: one sentence (<=200 chars) about the best meal.
// Node 22 stdlib only. No network, no randomness, no clock: fully deterministic.
// Writes the entry to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt),
// byte-identical to the BEST_MEAL_ENTRY constant (no trailing newline added).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BEST_MEAL_ENTRY =
  "My grandmother's rendang in Padang, eaten cross-legged at 2 a.m. off a plastic table, fell apart before my spoon reached it, and no restaurant since has ever caught up.";

const MAX_CHARS = 200;

function validateEntry(text: string): void {
  const trimmed = text.trim();
  if (trimmed.length < 1 || trimmed.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${trimmed.length}`);
  }
  if (trimmed !== text) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  // One clean sentence: ends with a period and holds no sentence break inside
  // (a sentence-ending mark followed by a space and a capital letter).
  // Periods inside abbreviations such as "2 a.m." are not sentence breaks.
  if (!text.endsWith(".")) {
    throw new Error("entry must end with a period");
  }
  if (/[.!?]\s+[A-Z]/.test(text)) {
    throw new Error("entry must be exactly one sentence");
  }
}

function main(): void {
  validateEntry(BEST_MEAL_ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), BEST_MEAL_ENTRY, "utf8");
  console.log(`wrote entry.txt (${BEST_MEAL_ENTRY.length} characters)`);
}

main();
