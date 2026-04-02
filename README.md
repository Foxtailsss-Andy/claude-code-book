# Claude Code Book

一个基于 Claude Code 2.1.88 源码快照与 Anthropic 官方资料整理的在线书籍站点。

## 本地使用

```bash
npm install
npm run check
npm run build
python3 -m http.server 5501
```

然后访问 `http://localhost:5501/index.html`。

## 仓库内容

- `index.html`: 书籍封面页
- `book.html`: 在线阅读页
- `manuscript.md`: Markdown 书稿
- `assets/`: 样式、脚本与图示资源
- `src/`: 前端交互脚本源码

## 发布

这个项目适合直接托管在 GitHub Pages 项目页：

`https://<github-username>.github.io/claude-code-book/`

