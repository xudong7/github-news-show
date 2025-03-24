# GitHub 热门项目查看工具

[English](./README.md) | [简体中文](./README.zh-CN.md)

一个命令行工具，用于获取 GitHub 上热门仓库的信息。

## 功能特点

- 按关键词搜索 GitHub 仓库
- 自动提取仓库详细信息，包括：
  - 仓库名称和链接
  - 项目描述
  - 编程语言
  - 星标数量
  - 最近更新时间
  - 相关主题标签
- 生成格式化的 Markdown 文档
- 按星标数量排序
- 支持中文搜索关键词

## 使用方法

1. 安装依赖:

```bash
npm install
```

2. 运行程序:

```bash
node index.js
```

3. 根据提示输入搜索关键词，例如: "java"

4. 程序会在当前目录生成结果文件，例如: `repos_java_2024_03_24_10_30_00.md`

## 输出示例

```markdown
# GitHub Java 热门项目

> 更新时间：2024/3/24 10:30:00
> 数据来源：[GitHub](https://github.com/search?q=java+stars:>100000&type=Repositories&s=stars&o=desc)
> 收录仓库数：10

## 1. Snailclimb/JavaGuide

「Java学习+面试指南」一份涵盖大部分 Java 程序员所需要掌握的核心知识。

- 🌟 收藏数：149k
- 💻 开发语言：Java
- 📅 最近更新：2024-03-24
- 🏷️ 相关主题：mysql, java, redis, spring, system
- 🔗 项目地址：https://github.com/Snailclimb/JavaGuide

---
```

## 贡献

欢迎提交 Issues 和 Pull Requests 来改进这个项目。

## 开源协议

MIT License
