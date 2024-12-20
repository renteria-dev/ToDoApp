import glob from "fast-glob";
import fs from "fs-extra";
import path from "path";

async function generateTestFiles() {
  // Find all TypeScript/React files in src
  const files = await glob([
    "src/**/*.{ts,tsx}", // Include all TypeScript files
    "!src/**/*.test.{ts,tsx}", // Exclude test files with .test.ts or .test.tsx suffix
    "!src/**/test/**/*", // Exclude any files inside `test` folders
    "!src/*.d.{ts,tsx}", // Exclude files with .d.ts suffix
  ]);

  files.forEach((file) => {
    const testPath = file
      .replace("src/", "src/test/vitest/")
      .replace(/\.(ts|tsx)$/, ".test.$1");

    // Ensure test directory exists
    fs.ensureDirSync(path.dirname(testPath));

    // Only create if test file doesn't exist
    if (!fs.existsSync(testPath)) {
      const content = `import { describe, it, expect } from 'vitest';

describe('${path.basename(file)}', () => {
  it('should pass initial test', () => {
    expect(true).toBe(true);
  });
});`;

      fs.writeFileSync(testPath, content);
    }
  });
}

generateTestFiles();
