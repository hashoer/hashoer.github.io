'use strict';
/**
 * hashoer 多语言静态站点生成器（与 druomu 同标准）
 * 为每种语言生成独立 URL 目录（/es/ /fr/ ...），预渲染成对应语言，
 * 加 hreflang + canonical，禁用按国家自动切换，语言切换器改为跳目录（含记忆）。
 * 根目录覆盖为英文固定（x-default）。
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const SITE = 'D:/外贸行资料库/06_独立站/建站搭子/hashoer-en';
const BASE = 'https://hashoer.com';
const LANGS = ['zh','ja','ko','ru','en','fr','es','pt','th','vi','bn','ur','fa','ar','de','it'];
const ANYLANG = 'en|zh|ja|ko|ru|fr|es|pt|th|vi|bn|ur|fa|ar|de|it';

function read(f) { return fs.readFileSync(path.join(SITE, f), 'utf8'); }

// 从 HTML 中抽取 const X = {...}; 对象字面量（平衡括号扫描）
function extractObject(html, varName) {
  const marker = 'const ' + varName + ' = {';
  const start = html.indexOf(marker);
  if (start < 0) return null;
  let i = start + marker.length - 1;
  let depth = 0, ended = -1;
  for (; i < html.length; i++) {
    const c = html[i];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { ended = i; break; } }
  }
  const lit = html.slice(start + marker.length - 1, ended + 1);
  try { return (new Function('return ' + lit))(); }
  catch (e) { console.error('解析 ' + varName + ' 失败:', e.message); return null; }
}

function absolutizeInlineVideo(doc) {
  doc.querySelectorAll('[onclick]').forEach(function (el) {
    var v = el.getAttribute('onclick');
    if (v && v.indexOf("openModal('videos/") >= 0) {
      el.setAttribute('onclick', v.replace(/openModal\('videos\//g, "openModal('/videos/"));
    }
  });
}

function absolutizeAssets(doc) {
  absolutizeInlineVideo(doc);
  doc.querySelectorAll('[src],[href]').forEach(function (el) {
    ['src','href'].forEach(function (attr) {
      const v = el.getAttribute(attr);
      if (!v) return;
      if (/^(https?:|mailto:|tel:|#|data:|\/\/)/.test(v)) return;
      if (/^(images\/|videos\/|\.\/images\/|\.\/videos\/|favicon\.ico|favicon\.png|products\.js)/.test(v)) {
        el.setAttribute(attr, '/' + v.replace(/^\.\//, ''));
      }
    });
  });
}

function patchScripts(doc, lang) {
  doc.querySelectorAll('script').forEach(function (s) {
    let t = s.textContent;
    if (!t) return;
    t = t.replace(/applyLang\((?:detectInitialLang\(\)|'[a-z]{2}')\);/g, "applyLang('" + lang + "');");
    t = t.replace(/pApplyLang\((?:pInitialLang\(\)|'[a-z]{2}')\);/g, "pApplyLang('" + lang + "');");
    t = t.replace(/autoDetectLang\(\);/g, '/* autoDetect disabled: static lang page */');
    t = t.replace(/pAutoDetect\(\);/g, '/* pAutoDetect disabled: static lang page */');
    // onLangChange / pOnLangChange -> 跳转对应语言目录（记忆手动选择）
    const remember = "try { localStorage.setItem('hashoer_lang', code); localStorage.setItem('hashoer_lang_manual', '1'); } catch (e) {}";
    const jump = "var p = location.pathname.replace(/^\\/(" + ANYLANG + ")\\//, '');\n      " +
      remember + "\n      window.location.href = (code === 'en' ? '/' : ('/' + code + '/')) + p;";
    t = t.replace(/function onLangChange\(code\) \{[\s\S]*?\n    \}/,
      "function onLangChange(code) {\n      " + jump + "\n    }");
    t = t.replace(/function pOnLangChange\(code\) \{[\s\S]*?\n    \}/,
      "function pOnLangChange(code) {\n      " + jump + "\n    }");
    s.textContent = t;
  });
}

function injectHreflang(doc, basePath) {
  doc.querySelectorAll('link[rel="alternate"]').forEach(function (el) { el.remove(); });
  let block = '';
  LANGS.forEach(function (l) {
    const url = BASE + (l === 'en' ? basePath : ('/' + l + basePath));
    block += '<link rel="alternate" hreflang="' + l + '" href="' + url + '" />\n  ';
  });
  block += '<link rel="alternate" hreflang="x-default" href="' + BASE + basePath + '" />\n  ';
  doc.querySelector('head').insertAdjacentHTML('beforeend', block);
}

function setCanonical(doc, urlPath) {
  let c = doc.querySelector('link[rel="canonical"]');
  if (!c) {
    c = doc.createElement('link');
    c.setAttribute('rel', 'canonical');
    doc.querySelector('head').appendChild(c);
  }
  c.setAttribute('href', BASE + urlPath);
}

function processPage(file, dict, lang, outRelPath, hreflangBase, canonicalUrl) {
  const html = srcCache[file]; // 用启动时缓存的原始 HTML（en 覆盖根页后不影响后续语言）
  const dom = new JSDOM(html, { runScripts: 'outside-only', pretendToBeVisual: true });
  const doc = dom.window.document;
  doc.documentElement.lang = lang;
  if (dict) {
    doc.querySelectorAll('[data-i18n]').forEach(function (el) {
      const k = el.getAttribute('data-i18n');
      if (dict[k] != null) el.textContent = dict[k];
    });
    doc.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      const k = el.getAttribute('data-i18n-html');
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    doc.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      const k = el.getAttribute('data-i18n-ph');
      if (dict[k] != null) el.setAttribute('placeholder', dict[k]);
    });
  }
  absolutizeAssets(doc);
  patchScripts(doc, lang);
  injectHreflang(doc, hreflangBase);
  setCanonical(doc, canonicalUrl);
  const outAbs = path.join(SITE, outRelPath);
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  fs.writeFileSync(outAbs, '<!DOCTYPE html>\n' + doc.documentElement.outerHTML.replace(/^<!DOCTYPE html[^>]*>\s*/i, ''), 'utf8');
  return outAbs;
}

// 抽取字典（传入单层字典）；同时缓存原始页面 HTML
const I18N = extractObject(read('index.html'), 'I18N');
const NAVI18N = extractObject(read('products.html'), 'NAVI18N');
if (!I18N) { console.error('I18N 未解析'); process.exit(1); }
const srcCache = { 'index.html': read('index.html'), 'products.html': read('products.html'), 'privacy.html': read('privacy.html') };

const pages = [
  { file: 'index.html', dict: I18N, langPath: '' },
  { file: 'products.html', dict: NAVI18N, langPath: 'products' },
  { file: 'privacy.html', dict: null, langPath: 'privacy' }
];

const results = [];
LANGS.forEach(function (lang) {
  const isEn = lang === 'en';
  pages.forEach(function (p) {
    const outRel = isEn ? p.file : (lang + '/' + p.file);
    const base = p.langPath === '' ? '/' : ('/' + p.langPath);
    const canonicalUrl = isEn ? base : ('/' + lang + base);
    const perLangDict = p.dict ? (p.dict[lang] || (p.dict.en ? p.dict.en : null)) : null;
    const out = processPage(p.file, perLangDict, lang, outRel, base, canonicalUrl);
    results.push(out);
  });
});

console.log('生成完成，文件数:', results.length);
