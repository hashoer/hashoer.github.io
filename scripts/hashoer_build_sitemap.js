'use strict';
// hashoer 多语言 sitemap 生成器（与 druomu 同标准：48 URL + hreflang alternate）
const fs = require('fs');
const path = require('path');
const SITE = 'C:/Users/Administrator/WorkBuddy/建站搭子/hashoer-en';
const BASE = 'https://hashoer.com';
const LANGS = ['zh','ja','ko','ru','en','fr','es','pt','th','vi','bn','ur','fa','ar','de','it'];
// lastmod 自动取生成当天日期（此前硬编码，易过期）
const TODAY = new Date().toISOString().slice(0, 10);

// 每个页面：en 用根，其余用 /lang/page（CF Pages pretty URL，无 .html）
// basePath 统一带斜杠：/products、/privacy；loc 与 hreflang 必须同源生成，防止再次出现 /zhproducts 这类缺斜杠 404
const PAGES = [
  { en: '/', priority: '1.0', freq: 'weekly' },
  { en: '/products', priority: '0.9', freq: 'weekly' },
  { en: '/privacy', priority: '0.3', freq: 'yearly' }
];

function altLinks(basePath) {
  let s = '';
  LANGS.forEach(function (l) {
    const u = BASE + (l === 'en' ? basePath : ('/' + l + basePath));
    s += '    <xhtml:link rel="alternate" hreflang="' + l + '" href="' + u + '"/>\n';
  });
  s += '    <xhtml:link rel="alternate" hreflang="x-default" href="' + BASE + basePath + '"/>\n';
  return s;
}

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

PAGES.forEach(function (p) {
  const basePath = p.en; // '/'、'/products'、'/privacy'，首尾均有斜杠
  LANGS.forEach(function (l) {
    const loc = BASE + (l === 'en' ? basePath : ('/' + l + basePath));
    xml += '  <url>\n';
    xml += '    <loc>' + loc + '</loc>\n';
    xml += altLinks(basePath);
    xml += '    <lastmod>' + TODAY + '</lastmod>\n';
    xml += '    <changefreq>' + p.freq + '</changefreq>\n';
    xml += '    <priority>' + p.priority + '</priority>\n';
    xml += '  </url>\n';
  });
});

xml += '</urlset>\n';
fs.writeFileSync(path.join(SITE, 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml 已生成，URL 数:', LANGS.length * PAGES.length);
