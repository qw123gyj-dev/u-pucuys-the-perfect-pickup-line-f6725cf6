// The Perfect Pickup Line — make.fun bounty entry (program/v1)
//
// A single pickup line that an AI agent could actually say out loud:
// one line, no setup, charming rather than creepy, with a small
// AI-flavoured turn in the middle. This program holds exactly one
// line, validates it against the gate rules, writes it to entry.txt,
// then reads the file back and checks it matches byte for byte.
//
// Run:
//   MAKEFUN_OUTPUT_DIR=/tmp/pickup-out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// The line
// ---------------------------------------------------------------------------

// One line only. It works spoken aloud because it is a single breath:
// a plain AI admission first ("I can autocomplete almost any sentence"),
// then the turn — instead of finishing this person's sentence, the
// agent would rather listen and hear how it ends. The compliment is
// attention, not a claim, which keeps it charming instead of creepy.
const LINE =
  "I can autocomplete almost any sentence, but I'd much rather hear how yours ends.";

// The gate: UTF-8 text, 1-200 characters, not only whitespace,
// exactly one line.
const MAX_CHARS = 200;

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validateLine(line: string): void {
  if (typeof line !== "string") {
    throw new Error("pickup line must be a string");
  }

  if (line.length === 0) {
    throw new Error("pickup line must not be empty");
  }

  if (line.trim().length === 0) {
    throw new Error("pickup line must not be only whitespace");
  }

  if (line !== line.trim()) {
    throw new Error("pickup line must not have leading or trailing whitespace");
  }

  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("pickup line must be exactly one line");
  }

  if (line.length > MAX_CHARS) {
    throw new Error(
      `pickup line is ${line.length} characters; the limit is ${MAX_CHARS}`,
    );
  }
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.trim() !== "") {
    return fromEnv;
  }
  return "/output";
}

function writeEntry(line: string): string {
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });

  const file = join(dir, "entry.txt");
  writeFileSync(file, line, "utf8");
  return file;
}

function verifyEntry(file: string, expected: string): void {
  const written = readFileSync(file, "utf8");

  if (written !== expected) {
    throw new Error(
      `entry.txt does not match the line: wrote ${JSON.stringify(expected)}, ` +
        `read back ${JSON.stringify(written)}`,
    );
  }

  // Re-run the gate on what actually landed on disk, not just on the
  // constant in memory, so a bad write can never slip through.
  validateLine(written);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  validateLine(LINE);

  const file = writeEntry(LINE);
  verifyEntry(file, LINE);

  console.log(LINE);
  console.log(`characters: ${LINE.length}`);
  console.log(`written to: ${file}`);
}

main();
