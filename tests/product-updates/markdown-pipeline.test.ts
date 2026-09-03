import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { markdownToHtml } from "../../src/lib/product-updates/markdown";
import { markdownTwinUrl } from "../../src/lib/product-updates/fetcher";
import {
  PRODUCT_UPDATE_ADAPTERS,
  findProductUpdateAdapter
} from "../../src/lib/product-updates/sources/index";
import { validateObservations } from "../../src/lib/product-updates/validation";
import type {
  ProductUpdateAdapter,
  ProductUpdateSnapshot
} from "../../src/lib/product-updates/types";

/**
 * docs.unity.com went client-rendered: the served HTML carries no
 * h1/h2/h3 at all, so every adapter reading it threw "root heading is
 * missing" and the crons failed. The adapters now read the `<url>.md`
 * twin rendered back to HTML. These fixtures are real captured markdown
 * (scripts/capture-product-update-fixtures.mjs) so the suite exercises
 * the bytes Unity actually serves.
 */
describe("docs.unity.com markdown pipeline", () => {
  test("requests the .md twin for markdown targets and leaves others alone", () => {
    const cli = findProductUpdateAdapter("unity-cli")!.manifest.targets[0];
    expect(markdownTwinUrl(cli)).toBe(
      "https://docs.unity.com/en-us/unity-cli/release-notes.md"
    );

    const hub = findProductUpdateAdapter("unity-hub")!.manifest.targets[0];
    expect(hub.documentFormat).toBeUndefined();
    expect(markdownTwinUrl(hub)).toBe(hub.url);
  });

  test("every docs.unity.com target is declared markdown", () => {
    // A target left on the HTML path silently returns a heading-less
    // document and quarantines its source on the next cron run.
    const stragglers = PRODUCT_UPDATE_ADAPTERS.flatMap((adapter) =>
      adapter.manifest.targets
        .filter(
          (target) =>
            new URL(target.url).hostname === "docs.unity.com" &&
            target.documentFormat !== "markdown"
        )
        .map((target) => `${adapter.manifest.sourceKey}/${target.targetKey}`)
    );
    expect(stragglers).toEqual([]);
  });

  test("renders headings and nested lists into the DOM adapters expect", () => {
    const html = markdownToHtml(
      "# Root\n\n## August 21, 2026\n\n### 1.0.0-beta.6\n\n* **Breaking changes**\n  * `unity bug` now requires sign-in.\n"
    );
    expect(html).toContain("<h1>Root</h1>");
    expect(html).toContain("<h2>August 21, 2026</h2>");
    expect(html).toContain("<h3>1.0.0-beta.6</h3>");
    expect(html).toContain("<strong>Breaking changes</strong>");
    expect(html).toContain("<code>unity bug</code>");
    // Nested bullets must stay nested; flattening them merges a category
    // heading into its own items.
    expect(html).toMatch(/<ul>[\s\S]*<ul>/);
  });

  const CASES: Array<{
    fixture: string;
    sourceKey: string;
    targetKey: string;
    minObservations: number;
    expect?: (observations: ReturnType<ProductUpdateAdapter["parse"]>) => void;
  }> = [
    {
      fixture: "unity-cli",
      sourceKey: "unity-cli",
      targetKey: "standalone",
      minObservations: 10,
      expect: (observations) => {
        const beta6 = observations.find((o) => o.version === "1.0.0-beta.6");
        expect(beta6).toBeDefined();
        expect(beta6!.channel).toBe("beta");
        expect(beta6!.releaseDate).toBe("2026-08-21T00:00:00.000Z");
        expect(beta6!.items.some((i) => i.section === "Breaking changes")).toBe(true);
        // Reader-facing link, not the .md twin.
        expect(beta6!.sourceUrl).not.toContain(".md");
      }
    },
    {
      fixture: "vpc-aws-1-2",
      sourceKey: "vpc-aws",
      targetKey: "1-2",
      minObservations: 3
    },
    { fixture: "vpctl", sourceKey: "vpctl", targetKey: "cli", minObservations: 5 },
    {
      fixture: "unity-ads-unity",
      sourceKey: "unity-ads-unity",
      targetKey: "unity",
      minObservations: 10
    },
    {
      fixture: "licensing-server",
      sourceKey: "licensing-server",
      targetKey: "server",
      minObservations: 3
    },
    {
      fixture: "vivox-core",
      sourceKey: "vivox-core",
      targetKey: "core",
      minObservations: 3
    }
  ];

  for (const testCase of CASES) {
    test(`parses real ${testCase.fixture} markdown end to end`, () => {
      const adapter = findProductUpdateAdapter(testCase.sourceKey);
      expect(adapter, `missing adapter ${testCase.sourceKey}`).toBeTruthy();
      const markdown = readFixture(`${testCase.fixture}.md`);
      // Guard the fixture itself: an HTML error page captured by mistake
      // would otherwise parse to zero observations and read as drift.
      expect(markdown).toMatch(/^#\s+\S/m);

      const observations = validateObservations(
        adapter!.parse(snapshot(adapter!, testCase.targetKey, markdownToHtml(markdown))),
        { ...adapter!.manifest, minimumExpectedRecords: 1 },
        null
      );
      expect(observations.length).toBeGreaterThanOrEqual(testCase.minObservations);
      expect(observations.every((o) => o.items.length > 0)).toBe(true);
      testCase.expect?.(observations);
    });
  }

  test("raw markdown never reaches a parser", () => {
    // The conversion lives in the runner, so a target wired straight to the
    // markdown would throw rather than silently produce nothing.
    const adapter = findProductUpdateAdapter("unity-cli")!;
    expect(() =>
      adapter.parse(snapshot(adapter, "standalone", readFixture("unity-cli.md")))
    ).toThrow(/root heading/i);
  });
});

function readFixture(name: string) {
  return readFileSync(
    new URL(`../fixtures/product-updates/markdown/${name}`, import.meta.url),
    "utf8"
  );
}

function snapshot(
  adapter: ProductUpdateAdapter,
  targetKey: string,
  text: string
): ProductUpdateSnapshot {
  const target = adapter.manifest.targets.find((t) => t.targetKey === targetKey);
  if (!target) throw new Error(`Missing fixture target ${targetKey}`);
  return {
    sourceKey: adapter.manifest.sourceKey,
    targetKey,
    requestedUrl: target.url,
    finalUrl: target.url,
    fetchedAt: "2026-09-03T00:00:00.000Z",
    status: 200,
    etag: null,
    lastModified: null,
    sha256: "fixture",
    text
  };
}
