# Knowledge Library Module Design

## Context

The personal site will use Astrofy as the base template and deploy as a static site on GitHub Pages. The first content module to design is a public knowledge library for short self-authored documents, with room to grow into longer book-like series later.

Current source documents:

- `github使用指南.pdf`
- `markdown基础语法.pdf`
- `一维谐振子递推公式推导.pdf`
- `几种常见势场的波函数.pdf`
- `考研英语同义替换2.pdf`

The user confirmed these PDFs are self-authored and can be publicly shared.

Related site input:

- `公众号常用合集.txt` contains seven WeChat public account album links. This file should seed the future WeChat page as a set of collection cards.
- `ima知识库.txt` contains six IMA knowledge base share links. This file should seed an external knowledge base section or route.

## Goals

- Present short PDFs as polished personal knowledge documents, not as a generic file dump.
- Make each item easy to scan by title, category, tags, summary, file type, size, and update time.
- Support both online reading and direct download.
- Keep the first version lightweight and GitHub Pages friendly.
- Leave a clean path for future expansion into series, small books, and resource collections.

## Non-Goals

- No user accounts, comments, payments, or private file access in the first version.
- No large file hosting workflow beyond small self-authored PDFs.
- No automatic conversion from PDF to Markdown in the first version.
- No deletion or cleanup of existing files without explicit user confirmation.
- No automatic crawling of WeChat album metadata in the first version; collection titles and descriptions can be manually maintained if needed.
- No automatic crawling of IMA knowledge base metadata in the first version; titles can come from `ima知识库.txt`.

## Recommended Approach

Use a `Knowledge Library` page built from structured metadata. Each document appears as a card with clear reading actions.

The first version should group documents into three visible categories:

- Writing and tools: Markdown and GitHub guides.
- Physics notes: quantum mechanics and wave function documents.
- English study: exam English synonym replacement notes.

This is the preferred approach because it matches the current document set, is fast to implement, and avoids overbuilding. The metadata model should still include optional fields for future series and external resources.

## Content Model

Each knowledge item should have:

- `title`: display title.
- `slug`: stable URL or identifier.
- `category`: broad grouping.
- `tags`: short labels for filtering and context.
- `summary`: one or two sentences.
- `file`: path to the PDF in the public assets folder.
- `fileType`: initially `PDF`.
- `size`: human-readable file size.
- `updatedAt`: date shown on the card.
- `status`: `published`, `draft`, or `planned`.
- `series`: optional future grouping, such as `Quantum Mechanics Notes`.
- `order`: optional future ordering inside a series.

## User Experience

The page should feel like a personal knowledge desk: clean, readable, and slightly academic, without looking like a cloud drive or marketplace.

Primary interactions:

- Category filter: `All`, `Writing and Tools`, `Physics Notes`, `English Study`.
- Tag display on each card.
- `Read` button opens the PDF in the browser.
- `Download` button downloads or opens the PDF, depending on browser behavior.

The page should also include a short intro explaining that these are self-authored notes and small documents.

## File Placement

For GitHub Pages compatibility, PDFs should eventually live under Astro's `public` directory, for example:

```text
public/files/knowledge/
  github-guide.pdf
  markdown-basics.pdf
  harmonic-oscillator-recursion.pdf
  common-potential-wavefunctions.pdf
  english-synonym-replacement-2.pdf
```

The current Chinese filenames can remain in the workspace. During implementation, copied public filenames should use stable ASCII names for URLs. Existing files must not be deleted unless the user explicitly confirms.

## Future Expansion

When one topic grows, the same model can support a series view:

```text
Knowledge Library
  Quantum Mechanics Notes
    1. Harmonic Oscillator Recursion Formula
    2. Common Potential Field Wave Functions
```

Later additions may include Markdown source articles, book drafts, external links, reading notes, and public-domain references. These should reuse the same card and metadata model rather than creating separate ad hoc pages.

The WeChat page can use a similar card model for article collections:

- title
- summary
- topic tags
- external WeChat album URL
- optional cover or icon

The current text file is only a seed source. Implementation should convert it into structured metadata so the page remains easy to maintain.

The IMA knowledge base module should be a distinct external resource area, because those links point away from the site rather than to local PDFs. It can use cards with:

- title
- topic area
- summary
- external IMA URL
- source label, such as `IMA Knowledge Base`

Initial IMA topics should include physics, mathematics, physics exam preparation, mathematical modeling, and college mathematics competition materials. The current text file should be converted into structured metadata during implementation.

## Implementation Notes

- Base the site on Astrofy.
- Add a dedicated `Knowledge` or `Library` route.
- Add a separate WeChat collections route or section using the album links from `公众号常用合集.txt`.
- Add a separate IMA knowledge base route or section using the links from `ima知识库.txt`.
- Store document metadata in a typed data file or Astro content collection.
- Keep file actions as simple links in the first version.
- Avoid custom server logic, because GitHub Pages is static hosting.

## Validation

Before considering the module complete:

- The page renders on desktop and mobile.
- All five PDFs appear with correct titles and categories.
- The seven WeChat album links are represented as collection cards or a clearly labeled WeChat section.
- The six IMA knowledge base links are represented as external resource cards or a clearly labeled IMA section.
- `Read` links open the expected files.
- No text overlaps or overflows in document cards.
- The GitHub Pages build succeeds.
