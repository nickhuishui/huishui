export type KnowledgeCategory = "写作与工具" | "物理笔记" | "英语学习";

export interface KnowledgeItem {
  title: string;
  slug: string;
  category: KnowledgeCategory;
  tags: string[];
  summary: string;
  file: string;
  fileType: "PDF";
  size: string;
  updatedAt: string;
  status: "published";
  series?: string;
  order?: number;
}

export const knowledgeItems: KnowledgeItem[] = [
  {
    title: "GitHub 使用指南",
    slug: "github-guide",
    category: "写作与工具",
    tags: ["GitHub", "版本管理", "工具"],
    summary: "面向日常学习和项目整理的 GitHub 入门说明，适合作为个人知识库与网页部署的基础参考。",
    file: "files/knowledge/github-guide.pdf",
    fileType: "PDF",
    size: "701 KB",
    updatedAt: "2026-05-19",
    status: "published",
  },
  {
    title: "Markdown 基础语法",
    slug: "markdown-basics",
    category: "写作与工具",
    tags: ["Markdown", "写作", "排版"],
    summary: "整理 Markdown 常用语法和写作格式，适合快速查阅标题、列表、链接、代码块等基础用法。",
    file: "files/knowledge/markdown-basics.pdf",
    fileType: "PDF",
    size: "1.39 MB",
    updatedAt: "2025-12-31",
    status: "published",
  },
  {
    title: "一维谐振子递推公式推导",
    slug: "harmonic-oscillator-recursion",
    category: "物理笔记",
    tags: ["量子力学", "谐振子", "递推公式"],
    summary: "围绕一维量子谐振子的递推公式展开推导，适合作为量子力学学习中的短笔记。",
    file: "files/knowledge/harmonic-oscillator-recursion.pdf",
    fileType: "PDF",
    size: "530 KB",
    updatedAt: "2026-07-05",
    status: "published",
    series: "量子力学笔记",
    order: 1,
  },
  {
    title: "几种常见势场的波函数",
    slug: "common-potential-wavefunctions",
    category: "物理笔记",
    tags: ["量子力学", "势场", "波函数"],
    summary: "汇总几类常见势场下的波函数形式，便于复习和对比不同模型的物理图像。",
    file: "files/knowledge/common-potential-wavefunctions.pdf",
    fileType: "PDF",
    size: "677 KB",
    updatedAt: "2026-07-05",
    status: "published",
    series: "量子力学笔记",
    order: 2,
  },
  {
    title: "考研英语同义替换 2",
    slug: "english-synonym-replacement-2",
    category: "英语学习",
    tags: ["考研英语", "同义替换", "词汇"],
    summary: "整理考研英语阅读中常见的同义替换表达，方便集中复习词义转换和语义识别。",
    file: "files/knowledge/english-synonym-replacement-2.pdf",
    fileType: "PDF",
    size: "624 KB",
    updatedAt: "2025-11-16",
    status: "published",
  },
];

export const knowledgeCategories = ["全部", "写作与工具", "物理笔记", "英语学习"] as const;
