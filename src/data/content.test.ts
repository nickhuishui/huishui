import { describe, expect, test } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { knowledgeItems } from "./knowledge";
import { wechatCollections } from "./wechat";
import { imaKnowledgeBases } from "./ima";

const oldDisplayName = ["任", "辉涛"].join("");
const ignoredDirectories = new Set([".astro", ".git", "dist", "node_modules"]);
const textFilePattern = /\.(astro|cjs|js|json|md|mjs|ts|yml)$/;

function listTextFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) {
        return [];
      }

      return listTextFiles(fullPath);
    }

    return statSync(fullPath).isFile() && textFilePattern.test(fullPath) ? [fullPath] : [];
  });
}

describe("content metadata", () => {
  test("lists the expected local knowledge documents", () => {
    expect(knowledgeItems).toHaveLength(7);
    expect(knowledgeItems.map((item) => item.category)).toEqual([
      "写作与工具",
      "写作与工具",
      "物理笔记",
      "物理笔记",
      "英语学习",
      "英语学习",
      "英语学习",
    ]);
    expect(knowledgeItems.map((item) => item.title)).toContain("考研复试英文自我介绍模板");
    expect(knowledgeItems.map((item) => item.title)).toContain("考研复试英文问答汇总");
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
    expect(
      wechatCollections.every((item) =>
        item.url.startsWith("https://mp.weixin.qq.com/mp/appmsgalbum"),
      ),
    ).toBe(true);
  });

  test("lists all IMA knowledge base links", () => {
    expect(imaKnowledgeBases).toHaveLength(6);
    expect(
      imaKnowledgeBases.every((item) =>
        item.url.startsWith("https://ima.qq.com/wiki/"),
      ),
    ).toBe(true);
  });

  test("uses the public pen name on the homepage hero", () => {
    const homePage = readFileSync(join(process.cwd(), "src/pages/index.astro"), "utf8");

    expect(homePage).toContain(">辉水先生</h1>");
  });

  test("uses the public pen name throughout source content", () => {
    const sourceFiles = listTextFiles(process.cwd());
    const filesWithOldDisplayName = sourceFiles.filter((filePath) =>
      readFileSync(filePath, "utf8").includes(oldDisplayName),
    );

    expect(filesWithOldDisplayName).toEqual([]);
  });
});
