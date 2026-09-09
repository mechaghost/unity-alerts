import { describe, expect, test } from "vitest";
import { ProductUpdateHttpError } from "../../src/lib/product-updates/fetcher";
import { classifyProductUpdateFailure , dueToleranceMs } from "../../src/lib/product-updates/runner";

describe("Product Updates failure classification", () => {
  test("distinguishes volatile upstream states from parser drift", () => {
    expect(
      classifyProductUpdateFailure(
        new ProductUpdateHttpError(429, "https://unity.com/source", 1_000),
        "fetch"
      )
    ).toBe("rate-limited");
    expect(
      classifyProductUpdateFailure(
        new ProductUpdateHttpError(404, "https://unity.com/source", null),
        "fetch"
      )
    ).toBe("not-found-candidate");
    expect(
      classifyProductUpdateFailure(
        new ProductUpdateHttpError(403, "https://unity.com/source", null),
        "fetch"
      )
    ).toBe("access-configuration-blocked");
    expect(
      classifyProductUpdateFailure(
        new ProductUpdateHttpError(503, "https://unity.com/source", null),
        "fetch"
      )
    ).toBe("transient");
    expect(
      classifyProductUpdateFailure(new Error("markup changed"), "parse")
    ).toBe("parser-drift");
  });
});

describe("dueToleranceMs", () => {
  const MIN = 60_000;
  test("is 10% of the cadence, clamped to 5 minutes - 1 hour", () => {
    expect(dueToleranceMs(24)).toBe(60 * MIN);   // 2.4h capped at 1h
    expect(dueToleranceMs(168)).toBe(60 * MIN);  // weekly: still 1h
    expect(dueToleranceMs(6)).toBe(36 * MIN);    // 10% of 6h
    expect(dueToleranceMs(12)).toBe(60 * MIN);   // 1.2h capped at 1h
    expect(dueToleranceMs(0.5)).toBe(5 * MIN);   // floor: never below 5 min
  });
});
