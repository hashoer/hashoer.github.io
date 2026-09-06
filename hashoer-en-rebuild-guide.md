# Hashoer 英文站 — 完整重建指南

## 一、项目概述

- **目标**：为中文站 https://www.huashuhe.com/ 创建英文测试版，仅用于测试建站能力，不上线
- **品牌名**：Hashoer（用户指定）
- **标语**：Hashoer Intelligent Technology Ltd
- **建站时间**：2026-08-14
- **技术方案**：纯 HTML/CSS/JS 单文件，无框架依赖

## 二、文件结构

```
hashoer-en/
├── index.html              ← 主页面（~35KB，含全部 CSS/JS 内联）
├── images/                  ← 12 张本地图片
│   ├── hero-bg.jpg         ← Hero 首屏背景（制药车间）
│   ├── product1.jpg         ← Vial Filling Machine 产品图
│   ├── product2.jpg         ← Bottle Washing Machine 产品图
│   ├── product3.jpg         ← Lyophilizer 产品图
│   ├── product4.jpg         ← Liquid Charging System 产品图
│   ├── video-thumb1.jpg     ← 视频1封面（生产线）
│   ├── video-thumb2.jpg     ← 视频2封面（灌装线）
│   ├── video-thumb3.jpg     ← 视频3封面（工厂）
│   ├── news1.jpg            ← 新闻1配图（医疗器械）
│   ├── news2.jpg            ← 新闻2配图（医药分类）
│   ├── news3.jpg            ← 新闻3配图（家用医疗）
│   └── about-bg.jpg         ← About 区背景图
├── videos/                  ← 5 个本地视频
│   ├── video1.mp4           ← 自动包装线总览（原站播放量12）
│   ├── video2.mp4           ← 西林瓶灌装封口机演示（原站播放量10）
│   ├── video3.mp4           ← 洗瓶灭菌线（原站播放量124，最高）
│   ├── video4.mp4           ← 生产线集成实况（原站播放量14）
│   └── video5.mp4           ← 定制方案展示（原站播放量10）
└── hashoer-en-rebuild-guide.md  ← 本文件
```

## 三、数据来源（原始 URL）

### 视频（来源：huashuhe.com/video.html）
| 本地文件 | 原站视频页 | MP4 原始 URL |
|----------|-----------|-------------|
| video1.mp4 | video-item-37 | https://img03.71360.com/w3/pj549k/20250410/664b2cdcc71aba799adfff832c904a03.mp4 |
| video2.mp4 | video-item-30 | https://img03.71360.com/w3/pj549k/20240407/3144d1ffa8b8e634fddcd1dc63510370.mp4 |
| video3.mp4 | video-item-29 | https://img03.71360.com/w3/pj549k/20240407/c9f22dc6460a6dbc073df0ef62f9b40e.mp4 |
| video4.mp4 | video-item-28 | https://img03.71360.com/w3/pj549k/20240407/1386b8496b97893bbb43b34f75f01e61.mp4 |
| video5.mp4 | video-item-27 | https://img03.71360.com/w3/pj549k/20240407/0b967e9bc976c1ef2841bdc622a1f5ef.mp4 |

> ⚠️ 视频下载需加 Referer: https://www.huashuhe.com/video.html 否则被防盗链拦截返回 1KB 错误页

### 图片（来源：Unsplash 免费商用）
| 本地文件 | Unsplash 原始 URL |
|----------|------------------|
| hero-bg.jpg | https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=80 |
| product1.jpg | https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=800&q=80 |
| product2.jpg | https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80 |
| product3.jpg | https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80 |
| product4.jpg | https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80 |
| video-thumb1.jpg | https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80 |
| video-thumb2.jpg | https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80 |
| video-thumb3.jpg | https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80 |
| news1.jpg | https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80 |
| news2.jpg | https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80 |
| news3.jpg | https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80 |
| about-bg.jpg | https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80 |

### 原站产品（来源：huashuhe.com/product.html）
| 产品中文名 | 英文名 | 原站详情页 |
|-----------|--------|-----------|
| 西林瓶灌装机 | Vial Filling Machine | product-item-8.html |
| 西林瓶洗瓶机 | Bottle Washing Machine | product-item-5.html |
| 配液系统 | Liquid Charging System | product-item-4.html |
| 生产型冻干机 | Lyophilizer (Freeze Dryer) | product-item-3.html |
| 实验型冻干机 | Lab-scale Freeze Dryer | product-item-2.html |
| 安瓿瓶洗瓶机 | Ampoule Washing Machine | product-item-6.html |

### 联系信息（原站真实信息）
- 联系人：徐经理 (Mr. Xu)
- 电话：+86 137 9527 8116
- 邮箱：huashuhe021@163.com
- 地址：上海市松江区洞泾镇洞业路2号一层1003室
- 备案号：沪ICP备2023014520号-1

## 四、页面结构（共10个区块）

1. **Nav** — 粘性导航栏，含 Products / Videos / News / About / Contact + Get a Quote 按钮
2. **Hero** — 首屏，带背景图，标题 + 副标题 + 两个 CTA 按钮
3. **Product Categories** — 5 个分类卡片（制药/食品/实验室/包装/仓储），emoji 图标
4. **Featured Products** — 4 个核心产品卡，带真实图片 + 链接到原站详情页
5. **Videos** — 5 个视频卡片，深色背景区，点击弹出全屏播放器
6. **News** — 3 篇新闻文章卡片，带配图
7. **About** — 公司介绍 + 4 个数据统计 + 背景图
8. **Why Choose Us** — 4 个优势卡片
9. **Contact** — 4 个联系信息卡 + 联系表单（前端模拟提交）
10. **Footer** — 品牌简介 + 三列链接 + 版权 + 备案号

## 五、交互功能

- 视频弹窗播放器：点击封面 → 全屏播放，ESC/点击外部关闭
- 联系表单：提交后显示成功动画（纯前端，不发数据）
- 平滑滚动导航
- 响应式设计（768px 断点，移动端隐藏导航链接）
- 所有图片有 onerror 兜底

## 六、重建步骤

1. 解压 hashoer-en-website.zip 到任意目录
2. 双击 index.html 即可在浏览器中查看
3. 如需修改内容：用文本编辑器打开 index.html，CSS/JS 全部内联
4. 如需部署：上传整个 hashoer-en/ 目录到 Vercel / Netlify / Cloudflare Pages
5. 如需替换视频/图片：替换 images/ 或 videos/ 下同名文件即可，无需改代码

## 七、技术约束备忘

- 原站视频有防盗链，下载需加 Referer header
- Unsplash 图片可免费商用，无需署名（但建议保留来源）
- 本站为单页 HTML，无后端，表单不会真正发送
- 原站产品图片 URL: https://img03.71360.com/w3/q12ddm/20231012/2af74726f46d55952f3fe9e5cf1adfbf.jpg （未使用，此处仅记录）
