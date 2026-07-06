# Astrofy Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a GitHub Pages-ready personal site based on Astrofy with a homepage, blog shell, PDF knowledge library, WeChat collections, and IMA knowledge base links.

**Architecture:** Use Astrofy's Astro + Tailwind + DaisyUI structure as the site foundation. Keep content in typed TypeScript data modules and Astro content collections so short documents, external collections, and future book-like series can evolve without a CMS.

**Tech Stack:** Astro 4, TypeScript, Tailwind CSS, DaisyUI, Vitest for metadata tests, GitHub Actions for Pages deployment.

---

## File Structure

- Create/bring in template files: `package.json`, `pnpm-lock.yaml`, `astro.config.mjs`, `tailwind.config.cjs`, `tsconfig.json`, `.npmrc`, `.gitignore`, `src/**`, `public/**`, `.github/workflows/deploy.yml`.
- Create: `src/data/knowledge.ts` for five local PDF document records.
- Create: `src/data/wechat.ts` for seven WeChat album records.
- Create: `src/data/ima.ts` for six IMA knowledge base records.
- Create: `src/data/siteStats.ts` for small derived counts used on the homepage.
- Create: `src/data/content.test.ts` for data completeness and file existence checks.
- Modify: `src/config.ts` for the personal site title and description.
- Modify: `src/components/Header.astro`, `src/components/SideBarMenu.astro`, `src/components/SideBarFooter.astro`, and `src/components/SideBar.astro` for Chinese navigation and editable contact defaults.
- Modify: `src/layouts/BaseLayout.astro` for Chinese document language and a slightly wider content area.
- Modify: `src/pages/index.astro` for the personal homepage.
- Create: `src/pages/knowledge.astro`, `src/pages/wechat.astro`, and `src/pages/ima.astro`.
- Copy existing source PDFs into stable public URLs under `public/files/knowledge/` without deleting the original Chinese-named files.

## Task 1: Scaffold Astrofy Foundation

**Files:**
- Create: Astrofy template files listed above.
- Modify: `package.json`

- [ ] **Step 1: Import Astrofy template into the current directory**

Copy the current Astrofy template files into `D:\codex program\个人网页`, preserving the user's existing PDFs, txt files, and `docs` directory.

- [ ] **Step 2: Add test tooling to `package.json`**

Ensure `package.json` contains these scripts and dev dependency:

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "test": "vitest run"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.10",
    "vitest": "^1.6.1"
  }
}
```

- [ ] **Step 3: Install dependencies**

Run: `pnpm install`

Expected: dependencies install and lockfile updates if Vitest is added.

## Task 2: Test-First Content Metadata

**Files:**
- Create: `src/data/content.test.ts`
- Create: `src/data/knowledge.ts`
- Create: `src/data/wechat.ts`
- Create: `src/data/ima.ts`

- [ ] **Step 1: Write failing metadata tests**

Create `src/data/content.test.ts` with assertions that the site has exactly five knowledge PDFs, seven WeChat albums, and six IMA links; also assert local PDF paths exist under `public/files/knowledge/`.

```ts
import { describe, expect, test } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { knowledgeItems } from "./knowledge";
import { wechatCollections } from "./wechat";
import { imaKnowledgeBases } from "./ima";

describe("content metadata", () => {
  test("lists the expected local knowledge documents", () => {
    expect(knowledgeItems).toHaveLength(5);
    expect(knowledgeItems.map((item) => item.category)).toEqual([
      "写作与工具",
      "写作与工具",
      "物理笔记",
      "物理笔记",
      "英语学习",
    ]);
  });

  test("points every knowledge document at an existing public PDF", () => {
    for (const item of knowledgeItems) {
      expect(item.fileType).toBe("PDF");
      expect(item.file.endsWith(".pdf")).toBe(true);
      expect(existsSync(join(process.cwd(), "public", item.file))).toBe(true);
    }
  });

  test("lists all WeChat album links", () => {
    expect(wechatCollections).toHaveLength(7);
    expect(wechatCollections.every((item) => item.url.startsWith("https://mp.weixin.qq.com/mp/appmsgalbum"))).toBe(true);
  });

  test("lists all IMA knowledge base links", () => {
    expect(imaKnowledgeBases).toHaveLength(6);
    expect(imaKnowledgeBases.every((item) => item.url.startsWith("https://ima.qq.com/wiki/"))).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `pnpm test`

Expected: fail because `src/data/knowledge.ts`, `src/data/wechat.ts`, and `src/data/ima.ts` do not exist yet.

- [ ] **Step 3: Add metadata and public PDF copies**

Create the three data files with typed records and copy the five existing PDFs to stable ASCII file names under `public/files/knowledge/`.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `pnpm test`

Expected: all metadata tests pass.

## Task 3: Build Knowledge, WeChat, and IMA Pages

**Files:**
- Create: `src/pages/knowledge.astro`
- Create: `src/pages/wechat.astro`
- Create: `src/pages/ima.astro`
- Modify: `src/components/SideBarMenu.astro`

- [ ] **Step 1: Add navigation entries**

The sidebar should link to `/knowledge`, `/wechat`, `/ima`, `/blog/`, and `/cv`.

- [ ] **Step 2: Create `knowledge.astro`**

Render category filter links, document cards, title, summary, tags, file size, update date, `在线阅读`, and `下载` actions.

- [ ] **Step 3: Create `wechat.astro`**

Render seven external album cards using the metadata from `src/data/wechat.ts`.

- [ ] **Step 4: Create `ima.astro`**

Render six external IMA knowledge base cards using the metadata from `src/data/ima.ts`.

- [ ] **Step 5: Run build**

Run: `pnpm build`

Expected: Astro build succeeds and outputs static files to `dist/`.

## Task 4: Personalize Homepage and Layout

**Files:**
- Modify: `src/config.ts`
- Modify: `src/pages/index.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/SideBar.astro`
- Modify: `src/components/SideBarFooter.astro`

- [ ] **Step 1: Replace template branding**

Use a Chinese personal-site title and description. Keep contact links as clear editable defaults when exact contact information is not provided.

- [ ] **Step 2: Replace homepage content**

Make the first screen an actual personal content dashboard: self-introduction, quick links to knowledge documents, WeChat collections, IMA knowledge bases, and latest blog posts if present.

- [ ] **Step 3: Remove hardcoded sales/store language from visible UI**

Do not delete template files unless the user confirms. Hide or stop linking to store pages instead.

- [ ] **Step 4: Run build**

Run: `pnpm build`

Expected: Astro build succeeds.

## Task 5: GitHub Pages Deployment and Verification

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Add GitHub Pages workflow**

Create a GitHub Actions workflow that installs pnpm dependencies, builds Astro, and deploys `dist`.

- [ ] **Step 2: Configure Astro site URL conservatively**

Use `https://example.com` as the temporary `site` value and document that it should be replaced after the final GitHub repository URL is known.

- [ ] **Step 3: Run full verification**

Run:

```bash
pnpm test
pnpm build
pnpm astro check
```

Expected: tests pass, build succeeds, and Astro check succeeds or reports actionable issues to fix.

- [ ] **Step 4: Visual verification**

Start a local dev server and inspect desktop and mobile layouts for `/`, `/knowledge`, `/wechat`, and `/ima`. Confirm no obvious overlap, truncation, or blank pages.

## Self-Review Checklist

- The plan covers all five local PDFs from the spec.
- The plan covers all seven WeChat links from `公众号常用合集.txt`.
- The plan covers all six IMA links from `ima知识库.txt`.
- The plan keeps existing source files and explicitly avoids deletion.
- The plan includes test-first metadata validation for custom site data.
- The plan includes build and visual verification before completion.
