import { marked } from "marked";

/**
 * docs.unity.com went client-rendered: its HTML shell now carries zero
 * `h1`/`h2`/`h3` elements, and the article body only survives inside a
 * React Flight payload as *compiled MDX JavaScript*
 * (`_jsx(_components.li, …)`) - source code, not serialised data, so the
 * Flight decoder in `src/lib/ingest/rsc-flight.ts` can't recover it and
 * a regex over compiled JSX would be exactly the pattern-matching that
 * CLAUDE.md forbids.
 *
 * Every affected page does publish a markdown twin at `<url>.md`
 * (`text/markdown`), whose `#`/`##`/`###` + list structure maps onto the
 * same DOM shape the adapters were already written against. So we render
 * that markdown to HTML here and hand it to the existing parsers
 * unchanged - the site's rewrite costs us one conversion step instead of
 * twelve rewritten adapters.
 *
 * The raw markdown is what gets stored as the snapshot, so evidence stays
 * verbatim and a replay re-runs this conversion rather than trusting a
 * derived artefact.
 */
export function markdownToHtml(markdown: string): string {
  const html = marked.parse(markdown, {
    async: false,
    // GFM keeps tables and strikethrough, which several changelogs use.
    gfm: true,
    // Unity's markdown uses hard line breaks inside list items purely for
    // source wrapping; treating them as <br> would split sentences mid-item.
    breaks: false
  }) as string;
  // The adapters navigate with sibling selectors (`prevAll("h2")`,
  // `nextUntil("h2,h3")`) and expect one common parent, which marked's
  // flat top-level output gives them once wrapped.
  return `<div data-unity-docs-markdown="1">${html}</div>`;
}
