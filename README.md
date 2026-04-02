# 《Claude Code：面向产品经理的深度拆解与产品白盒》

这是一本围绕 Claude Code 展开的在线书。它并不满足于解释“Claude Code 有哪些功能”，而是试图从产品、运行时与源码三个层面，系统拆解 Claude Code 为什么成立、为什么强，以及它对产品经理、技术负责人和 AI 产品设计者到底意味着什么。

本书基于 Claude Code 2.1.88 源码快照与 Anthropic 官方公开资料整理而成。目标不是做表面介绍，而是把 Claude Code 拆成一套可以被理解、被借鉴、被迁移的方法论。

## 这本书想回答的 3 个核心问题

1. Claude Code 作为产品，为什么成立？
2. Claude Code 作为运行时，为什么看起来比普通 CLI agent 更成熟？
3. Claude Code 作为源码系统，哪些地方值得产品经理直接学习与借鉴？

## 适合谁阅读

- 想系统理解 Claude Code 的产品经理
- 正在做 AI / Agent / 开发工具产品的人
- 希望把 Claude Code 引入团队流程的人
- 想从优秀源码中提炼产品方法与设计启发的人

## 你会在这本书里看到什么

- Claude Code 的产品定位与系统心智模型
- QueryEngine、工具循环、权限治理与记忆机制的白盒理解
- Claude Code 为什么能持续推进复杂任务，而不只是“回答一个问题”
- Claude Code 与其他 CLI agent 的关键差异、边界与限制
- 对产品经理真正有启发的设计原则、组织采用方式与落地路径

## 全书内容概览

全书共 16 章正文与 4 个附录，大致可以沿着四条主线阅读：

- 产品定位：Claude Code 是什么，它在 Anthropic 产品体系里处于什么位置
- 运行时骨架：启动链路、主循环、工具系统、权限治理、Prompt 栈、上下文与记忆
- 平台能力：状态、UI、恢复机制、远程、多代理、CLAUDE.md、hooks、MCP、SDK 与 GitHub Actions
- 组织采用：Claude Code 的边界、适用场景，以及产品经理能从中学到什么

## 为什么值得读

Claude Code 值得研究的地方，不只是“它很好用”，而是它把模型能力、工具调用、权限治理、上下文管理和多入口体验，真正做成了一个可持续运行、可恢复、可扩展的 agent 执行底座。

如果你关心的不是“怎么用一个 AI 工具”，而是“未来 AI 产品为什么会这样被构建”，那么这本书会更适合你。

## 在线阅读

- 网站首页: [https://foxtailsss-andy.github.io/claude-code-book-4PM/](https://foxtailsss-andy.github.io/claude-code-book-4PM/)
- 在线正文: [https://foxtailsss-andy.github.io/claude-code-book-4PM/book.html](https://foxtailsss-andy.github.io/claude-code-book-4PM/book.html)
- Markdown 书稿: [manuscript.md](/Users/foxtailsss/Desktop/Thats%20Claude%20Code/claude-code-book/manuscript.md)

## 仓库内容

- [index.html](/Users/foxtailsss/Desktop/Thats%20Claude%20Code/claude-code-book/index.html): 书籍封面页与首页介绍
- [book.html](/Users/foxtailsss/Desktop/Thats%20Claude%20Code/claude-code-book/book.html): 在线阅读正文
- [manuscript.md](/Users/foxtailsss/Desktop/Thats%20Claude%20Code/claude-code-book/manuscript.md): Markdown 书稿
- [assets/style.css](/Users/foxtailsss/Desktop/Thats%20Claude%20Code/claude-code-book/assets/style.css): 页面样式
- [src/app.ts](/Users/foxtailsss/Desktop/Thats%20Claude%20Code/claude-code-book/src/app.ts): 页面交互脚本源码

## 如何维护内容

- 想修改仓库主页给读者看的介绍文案：编辑 [README.md](/Users/foxtailsss/Desktop/Thats%20Claude%20Code/claude-code-book/README.md)
- 想修改网站首页的书籍介绍：编辑 [index.html](/Users/foxtailsss/Desktop/Thats%20Claude%20Code/claude-code-book/index.html)
- 想修改在线阅读正文：编辑 [book.html](/Users/foxtailsss/Desktop/Thats%20Claude%20Code/claude-code-book/book.html)
- 想修改下载版书稿：编辑 [manuscript.md](/Users/foxtailsss/Desktop/Thats%20Claude%20Code/claude-code-book/manuscript.md)

注意：当前项目里，[manuscript.md](/Users/foxtailsss/Desktop/Thats%20Claude%20Code/claude-code-book/manuscript.md) 不是自动生成网页的源文件，只改它不会自动同步到 [book.html](/Users/foxtailsss/Desktop/Thats%20Claude%20Code/claude-code-book/book.html)。

如果你修改了 [src/app.ts](/Users/foxtailsss/Desktop/Thats%20Claude%20Code/claude-code-book/src/app.ts)，需要重新构建：

```bash
npm run build
```

然后推送更新：

```bash
git add .
git commit -m "更新书籍介绍或正文"
git push
```

## License

MIT. See [LICENSE](/Users/foxtailsss/Desktop/Thats%20Claude%20Code/claude-code-book/LICENSE).
