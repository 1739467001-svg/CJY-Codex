# CJY-Codex

CJY 陈俊烨的 AI 时代个人作品集展示网站。

这个项目不是传统简历页，而是一个面向 AI 时代的交互式作品展厅。它用作品块、时间线和内置预览窗口，展示 CJY 在 Vibe Coding、AI 教育系统数字化、未来课堂探索、AI 多模态和黑客松行动中的实践。

## 个人定位

- Vibe Coder
- AI 教育系统数字化实践者
- 浙江工商大学信电智慧学院开发贡献者
- 浙江工商大学“未来课堂”智能体开发者
- AI 助教、课程智能体与多模态应用探索者
- AI 黑客松参赛者、志愿者、工作人员、负责人

## 项目结构

```text
.
├── public
│   ├── assets
│   │   └── hero-lab.png
│   ├── data
│   │   └── portfolio.json
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── scripts
│   ├── build.js
│   └── check.js
├── server.js
├── package.json
└── Dockerfile
```

## 本地运行

```bash
npm start
```

默认地址：

```text
http://127.0.0.1:4173
```

如果需要指定端口：

```bash
PORT=3000 npm start
```

## 云服务器部署

这是零依赖 Node 静态站项目，Node 18+ 即可运行。

通用部署命令：

```bash
npm install
npm start
```

常见平台配置：

```text
Build Command: npm run build
Start Command: npm start
Port: 使用平台自动注入的 PORT 环境变量
```

如果平台支持纯静态托管，也可以使用：

```bash
npm run build
```

然后把 `dist/` 作为静态目录部署。

## 更新作品

作品数据集中在：

```text
public/data/portfolio.json
```

每个作品支持：

```json
{
  "title": "作品名",
  "date": "时间或阶段",
  "category": ["campus", "education", "agent", "hackathon"],
  "tags": ["标签"],
  "role": "我的角色",
  "accent": "rgba(82, 214, 200, 0.24)",
  "description": "一句话介绍",
  "url": "https://example.com"
}
```

`url` 填入后，点击作品块会在页面内置窗口中尝试 iframe 预览。部分网站可能因安全策略禁止内嵌，届时可以保留备用打开按钮或添加封面图。

## 当前内容

- 校园系统建设：智慧学院、研究生院督导管理系统
- 未来课堂：课程智能体、小龙虾课程场景、AI 助教
- 企业与校园培训：AI Agent 搭建培训
- 黑客松行动：从第一次参赛到协办、志愿者、工作人员、负责人
- 志愿服务线索：图书馆、博物馆、雷锋队、古建筑博物馆、AI 活动全链路参与

## 检查

```bash
npm run check
```

## 构建

```bash
npm run build
```
