# Claude Code Book GitHub Pages 发布设计

**目标**

把当前静态书籍网站发布到一个公开 GitHub 仓库，并启用 GitHub Pages 项目页，让外部用户既能访问网页，也能查看、Fork、Star 仓库。

**发布形态**

- 仓库名：`claude-code-book`
- 可见性：公开
- 访问地址：`https://<github-username>.github.io/claude-code-book/`
- 发布方式：从仓库默认分支发布根目录静态文件

**为什么这样做**

当前项目已经是标准静态站，页面与资源都使用相对路径，不依赖服务端渲染，也不需要单独的构建产物目录。直接用 GitHub Pages 托管仓库根目录，路径最简单，后续维护成本最低。

**实施范围**

1. 初始化本地 Git 仓库
2. 添加基础仓库文件，如 `.gitignore` 与 `README.md`
3. 运行类型检查与构建，确认站点可以稳定发布
4. 创建公开 GitHub 仓库并推送
5. 启用 GitHub Pages 并验证最终地址

**风险与注意事项**

- 如果本机未安装或未登录 GitHub CLI，则需要补齐发布工具链
- 当前全局 Git 邮箱为 `foxclaw@local`，首次提交可能不会自动关联到 GitHub 个人资料
- GitHub Pages 启用后通常需要数分钟生效

