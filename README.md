# GitHub News Show

[English](./README.md) | [简体中文](./README.zh-CN.md)

A command-line tool for retrieving information about trending GitHub repositories.

## Features

- Search GitHub repositories by keywords
- Automatically extract repository details including:
  - Repository name and link
  - Project description
  - Programming language
  - Star count
  - Last update time
  - Related topics
- Generate formatted Markdown documents
- Sort by star count
- Support multi-language search queries

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the program:

```bash
node index.js
```

3. Enter search keyword when prompted, e.g.: "java"

4. The program will generate a result file in the current directory, e.g.: `repos_java_2024_03_24_10_30_00.md`

## Output Example

```markdown
# GitHub Java Trending Projects

> Last updated: 2024/3/24 10:30:00
> Data source: [GitHub](https://github.com/search?q=java+stars:>100000&type=Repositories&s=stars&o=desc)

## 1. Snailclimb/JavaGuide

"Java Learning + Interview Guide" A comprehensive knowledge base covering most of the core knowledge that Java programmers need to master.

🌟 Stars: 149k | 💻 Language: Java | 📅 Updated: 2024-03-24

🏷️ Topics: mysql, java, redis, spring, system

🔗 Repository: https://github.com/Snailclimb/JavaGuide

---
```

## Contributing

Feel free to submit Issues and Pull Requests to improve this project.

## License

MIT License

