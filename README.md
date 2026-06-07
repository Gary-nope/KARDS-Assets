# KARDS-Decker Assets Repository

[简体中文](#简体中文) | [English](#english)

---

## 简体中文

### 📢 免责声明 (Disclaimer)
**KARDS-Decker 使用了 1939 Games 的相关资产，基于官方 "Community Content Policy"。1939 Games 并不认可或赞助此项目。**

本仓库托管之所有游戏图片、音频、音效及数据资产，其底层版权均归 **1939 Games** 所有。本仓库仅供个人学习、研究及 KARDS 游戏同好非商业性二创交流使用（如 KARDS-Decker 辅助工具及自定义卡牌社区）。任何人不得将本仓库资产用于任何形式的商业盈利。若官方或版权方认为有所不妥，请通过邮件（gary28114514@gmail.com）联系我，我将立即配合删除相关内容。

---

### 📝 项目简介
本仓库是 `KARDS-Decker` 的官方静态资源托管库。主要用于集中整理、分类和存储 KARDS 游戏内的官方静态素材（如卡背、勋章、阵营图标、短音频等），以便在前端或 DIY 工具中进行高频、稳定的调用。

### 📂 目录结构规范
为了保证素材的条理清晰，仓库资源严格按照以下目录进行归类：

```text
kards-assets/
├── ui/                 # 基础 UI 图标（阵营图标、金币、稀有度标志等）
├── CardBacks_Resized/  # 官方卡背图片 (.png / .webp)
├── medals/             # 游戏内勋章及成就图标
├── audio/              # 游戏内音频资源
│   └── sfx/            # 1~3秒的短音效（卡牌部署、攻击、消灭音效等）
└── data/               # 官方固定的静态 .json 数据集

```

### 🚀 生产环境调用方式（方案一：Cloudflare Functions 中转）

本项目的生产环境采用了 **Cloudflare Pages Functions 代理中转 + 边缘强缓存** 架构，前端**请勿直接硬编码指向 GitHub 原始直链**。

**推荐调用示例：**
在前端代码中，使用**相对路径**请求你站点的 Functions 路由：

```javascript
// 浏览器会自动补全你当前绑定的国内/国外域名，更换域名无需修改代码
const assetUrl = `/asset-proxy?path=card-backs/standard_back.png`;

// 在你的 Cloudflare Function (asset-proxy.js) 中
// 会自动前往本仓库拉取原始文件，并套用 cf: { cacheTtl: 31536000, cacheEverything: true } 实施全网一年长缓存

```

---

## English

### 📢 Disclaimer

**KARDS-Decker is created using assets owned by 1939 Games following their "Community content policy". 1939 Games does not endorse or sponsor this project.**

All game images, audio tracks, sound effects, and data assets hosted in this repository are the property of **1939 Games**. This repository is strictly for personal learning, research, and non-commercial fan-created community communication (such as the KARDS-Decker tool and DIY custom card platform). Any commercial use of the assets in this repository is strictly prohibited. If the official developers or copyright holders find any issues with this repository, please contact me via email (gary28114514@gmail.com), and I will remove the relevant content immediately.

---

### 📝 About the Project

This repository serves as the official static asset hosting registry for `KARDS-Decker`. It centralizes, categorizes, and stores official static assets from KARDS (such as card backs, medals, faction icons, and short audio clips) for high-frequency and stable fetching by frontend applications and DIY tools.

### 📂 Directory Structure

To ensure clean management, all assets are organized under the following standard:

```text
kards-assets/
├── ui/                 # General UI icons (factions, currency, rarities, etc.)
├── CardBacks_Resized/  # Official card back images (.png / .webp)
├── medals/             # In-game medals and achievement badges
├── audio/              # In-game audio clips
│   └── sfx/            # Short sound effects (deploy, attack, destroy, etc.)
└── data/               # Fixed static .json datasets

```

### 🚀 Production Fetching Method (Cloudflare Functions Proxy)

The production environment of this project utilizes the **Cloudflare Pages Functions Proxy + Aggressive Edge Caching** architecture. **Do not hardcode or direct link to GitHub raw URLs** in the frontend code.

**Recommended Implementation:**
Fetch assets using **relative paths** via your site's Functions router:

```javascript
// The browser will automatically resolve your current custom domain. 
// No code modification is needed if you change domains later.
const assetUrl = `/asset-proxy?path=card-backs/standard_back.png`;

// Within your Cloudflare Function (asset-proxy.js):
// The worker fetches the file from this repository and applies `cf: { cacheTtl: 31536000, cacheEverything: true }`
// to cache the asset across Cloudflare's global edge network for 1 year.

```

---

## 🤝 贡献与参与 (Contributing)

如果你发现了缺失的官方素材、音频，或者有更高清的提取版本，欢迎告知！
If you notice any missing official assets or have higher-quality extractions, feel free to tell me!
