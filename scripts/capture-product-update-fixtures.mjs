#!/usr/bin/env node
/**
 * Capture golden fixtures for the Product Updates markdown pipeline from
 * LIVE docs.unity.com pages.
 *
 * docs.unity.com is client-rendered: its HTML ships zero h1/h2/h3, and the
 * article survives only as compiled MDX inside a React Flight payload. The
 * adapters therefore read the `<url>.md` twin, rendered back to HTML by
 * `src/lib/product-updates/markdown.ts`.
 *
 * These fixtures are the real markdown bytes. A hand-authored stand-in
 * would encode a belief about Unity's markdown rather than its behaviour,
 * which is precisely how the resource-parser bugs survived a green suite.
 *
 * One fixture per *distinct page shape* the adapters have to survive, not
 * one per target - the giant catalogues (UGS, Version Control) are left
 * out on purpose so the repo doesn't carry megabytes of changelog.
 *
 * Usage:  node scripts/capture-product-update-fixtures.mjs [sourceKey …]
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Each entry covers a structure the pipeline has to handle.
const FIXTURES = [
  // date h2 above a version h3, categorised nested bullets
  { name: "unity-cli", url: "https://docs.unity.com/en-us/unity-cli/release-notes" },
  // "Version X — Date" h2 with h3 category sections
  { name: "vpc-aws-1-2", url: "https://docs.unity.com/en-us/self-hosted-deployment/aws/release-notes-1-2" },
  // keep-a-changelog style "[x.y.z] - date" headings
  { name: "vpctl", url: "https://docs.unity.com/en-us/self-hosted-deployment/vpctl/changelog" },
  // flat version list, one bullet per release
  { name: "unity-ads-unity", url: "https://docs.unity.com/en-us/grow/ads/changelog" },
  // one table whose Notes cells span many lines - the exporter dumps the
  // continuation lines after the row, which marked reads as end-of-table
  { name: "levelplay-android", url: "https://docs.unity.com/en-us/grow/levelplay/sdk/android/changelog" },
  // small whats-new page
  { name: "licensing-server", url: "https://docs.unity.com/en-us/licensing-server/whats-new" },
  // release-notes page with per-version prose + lists
  { name: "vivox-core", url: "https://docs.unity.com/vivox-core/core-release-notes" }
];

const outDir = new URL("../tests/fixtures/product-updates/markdown/", import.meta.url);

const wanted = process.argv.slice(2);
const selected = wanted.length
  ? FIXTURES.filter((f) => wanted.includes(f.name))
  : FIXTURES;
if (selected.length === 0) {
  console.error(`No fixture matches ${wanted.join(", ")}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
for (const fixture of selected) {
  const url = `${fixture.url}.md`;
  const response = await fetch(url, { headers: { accept: "text/markdown,text/plain" } });
  if (!response.ok) {
    console.error(`FAIL ${fixture.name}: HTTP ${response.status} ${url}`);
    process.exitCode = 1;
    continue;
  }
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/markdown")) {
    // The whole approach rests on Unity serving markdown here. If that
    // changes, fail loudly rather than capturing an HTML error page.
    console.error(`FAIL ${fixture.name}: expected text/markdown, got ${contentType}`);
    process.exitCode = 1;
    continue;
  }
  const body = await response.text();
  const path = join(outDir.pathname.replace(/^\//, ""), `${fixture.name}.md`);
  writeFileSync(new URL(`${fixture.name}.md`, outDir), body, "utf8");
  console.log(`captured ${fixture.name} (${body.length} bytes) from ${url}`);
}
