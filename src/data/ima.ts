export interface ImaKnowledgeBase {
  title: string;
  topic: string;
  summary: string;
  tags: string[];
  url: string;
  source: "IMA 知识库";
}

export const imaKnowledgeBases: ImaKnowledgeBase[] = [
  {
    title: "物理学",
    topic: "物理",
    summary: "面向物理学习与资料整理的 IMA 知识库入口。",
    tags: ["物理", "知识库"],
    url: "https://ima.qq.com/wiki/?shareId=85ac3ea58cb72e51bec2155150cce2b08e0ffdb84183f93523feb54b3bb44178",
    source: "IMA 知识库",
  },
  {
    title: "物理学 2",
    topic: "物理",
    summary: "第二个物理主题 IMA 知识库入口，可与物理学主库互为补充。",
    tags: ["物理", "资料整理"],
    url: "https://ima.qq.com/wiki/?shareId=99f72ea2c8a56ac8ba55c52bbd5a8b7987d5f82700ba4c60434208ea942b2232",
    source: "IMA 知识库",
  },
  {
    title: "数学",
    topic: "数学",
    summary: "数学学习资料和知识条目的 IMA 知识库入口。",
    tags: ["数学", "知识库"],
    url: "https://ima.qq.com/wiki/?shareId=de862798d60e8189d8429860cf31fc16acb8b2366a6157e7b705c009179c52c4",
    source: "IMA 知识库",
  },
  {
    title: "物理考研资料",
    topic: "考研资料",
    summary: "围绕物理考研资料整理的 IMA 知识库入口。",
    tags: ["物理考研", "复习资料"],
    url: "https://ima.qq.com/wiki/?shareId=6b0adee87102711d48691f9be5c4a37db1a3616c25bdd4bbf425ddb12f0ca320",
    source: "IMA 知识库",
  },
  {
    title: "数学建模",
    topic: "数学建模",
    summary: "数学建模相关资料、方法和案例的 IMA 知识库入口。",
    tags: ["数学建模", "竞赛"],
    url: "https://ima.qq.com/wiki/?shareId=02196262037a4b2eccf107c8b96dc20b01e9840af99acf04176dc849729134d1",
    source: "IMA 知识库",
  },
  {
    title: "大学生数学竞赛",
    topic: "数学竞赛",
    summary: "大学生数学竞赛相关资料与复习内容的 IMA 知识库入口。",
    tags: ["数学竞赛", "大学数学"],
    url: "https://ima.qq.com/wiki/?shareId=11a2252885aee8e8790dd6065c51073038408f62d947a03715cd146515236904",
    source: "IMA 知识库",
  },
];
