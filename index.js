import axios from 'axios';
import path from 'path';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// user input   
const readline = createInterface({
    input: process.stdin,
    output: process.stdout
})

class Url {
    constructor(query, stars, type, s, o) {
        this.query = query;
        this.stars = stars;
        this.type = type;
        this.s = s;
        this.o = o;
        this.url = `https://github.com/search?q=${query}+stars:>${stars}&type=${type}&s=${s}&o=${o}`
    }

    // Get the HTML content of the URL
    async getHtml() {
        let response = await axios.get(this.url);
        return response.data;
    }

    formattedDate() {
        // format the date like 2021_07_01_12_30_45
        const date = new Date();
        return date.getFullYear() +
            '_' + String(date.getMonth() + 1).padStart(2, '0') +
            '_' + String(date.getDate()).padStart(2, '0') +
            '_' + String(date.getHours()).padStart(2, '0') +
            '_' + String(date.getMinutes()).padStart(2, '0') +
            '_' + String(date.getSeconds()).padStart(2, '0');
    }

    // Parse HTML and extract repository information
    parseRepos(html) {
        const $ = cheerio.load(html);
        const repos = [];

        $('.flszRz').each((i, elem) => {
            const $elem = $(elem);
            
            // 获取标题和链接
            const title = $elem.find('.search-title a').text().trim();
            const link = 'https://github.com' + $elem.find('.search-title a').attr('href');
            
            // 获取描述
            const description = $elem.find('.dcdlju').text().trim();
            
            // 获取统计信息
            const stats = $elem.find('.bZkODq');
            const language = stats.find('li:first').text().trim();
            const stars = stats.find('a[href$="/stargazers"]').text().trim();
            const updateTimeText = stats.find('relative-time').attr('title') || 
                                 stats.find('.liVpTx').attr('title') || '';
            
            // 获取标签
            const topics = [];
            $elem.find('.hgRXpf').each((i, topic) => {
                topics.push($(topic).text().trim());
            });

            repos.push({
                title,
                description,
                stars,
                link,
                language,
                updateTime: updateTimeText,
                topics
            });
        });

        return repos;
    }

    // Generate markdown content from repos
    generateMarkdown(repos) {
        let md = `# GitHub ${this.query} 热门项目\n\n`;
        md += `> 更新时间：${new Date().toLocaleString('zh-CN')}\n`;
        md += `> 数据来源：[GitHub](${this.url})\n\n`;
        md += `🌟 星标数大于 ${this.stars} 的 ${this.query} 项目\n\n`;

        repos.forEach((repo, index) => {
            md += `## ${index + 1}. ${repo.title}\n\n`;
            if (repo.description) {
                md += `${repo.description}\n\n`;
            }
            md += `🌟 星标：${repo.stars}`;
            if (repo.language) {
                md += ` | 💻 语言：${repo.language}`;
            }
            if (repo.updateTime) {
                md += ` | 📅 更新：${repo.updateTime}`;
            }
            md += `\n\n`;
            
            if (repo.topics.length > 0) {
                md += `🏷️ 标签：${repo.topics.join(', ')}\n\n`;
            }
            
            md += `🔗 仓库链接：${repo.link}\n\n---\n\n`;
        });

        return md;
    }

    // Get the HTML content of the URL and save it as markdown
    async saveHtml() {
        // request the HTML content
        let data = await this.getHtml();

        // parse repos from HTML
        const repos = this.parseRepos(data);

        // generate markdown content
        const markdown = this.generateMarkdown(repos);

        // get formatted date and name the file
        let formattedDate = this.formattedDate();
        let fileName = `repos_${this.query}_${formattedDate}.md`;

        // save the markdown content to a file
        writeFileSync(path.join(__dirname, fileName), markdown);
        console.log(`仓库信息已保存到 ${fileName}`);
    }
}

readline.question('请输入 GitHub 搜索关键词：', (topic) => {
    let url = new Url(topic, 100000, 'Repositories', 'stars', 'desc');
    readline.close();
    console.log(`fetching data from ${url.url}`);
    url.saveHtml();
})
