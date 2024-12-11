import { describe, it, expect } from "vitest";
import { humanize } from "../utils/dates";

describe("humanize", () => {
  it("should format valid seconds input correctly", () => {
    expect(humanize("3600")).toBe("1h");
  });

  it("should handle string input with leading zeros", () => {
    expect(humanize("0003600")).toBe("1h");
  });

  it('should return "N/A" for non-numeric string input', () => {
    expect(humanize("invalid")).toBe("N/A");
  });

  it("should handle edge case of zero seconds", () => {
    expect(humanize("0")).toBe("0s");
  });

  it("should handle very large durations gracefully", () => {
    expect(humanize("31557600")).toBe("1y");
  });

  it("should handle negative values correctly", () => {
    expect(humanize("-3600")).toBe("N/A");
  });

  it("should omit zero units when larger units are present", () => {
    expect(humanize("31557660")).toBe("1y 1m");
  });
});
