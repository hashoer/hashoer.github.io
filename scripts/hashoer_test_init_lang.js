/* jsdom 实测 hashoer：模拟浏览器加载页面并执行内联 JS，验证语言不被刷回英文 */
const { JSDOM } = require('jsdom');
const path = require('path');

const SITE = 'D:/外贸行资料库/06_独立站/建站搭子/hashoer-en';

async function testPage(file, url, expectText, label) {
  const dom = await JSDOM.fromFile(path.join(SITE, file), {
    url,
    runScripts: 'dangerously',
    resources: undefined,
    pretendToBeVisual: true,
  });
  const w = dom.window;
  w.fetch = () => Promise.reject(new Error('blocked'));
  await new Promise((r) => setTimeout(r, 800));
  const el = w.document.querySelector('[data-i18n="nav_products"]');
  const got = el ? el.textContent.trim() : '(element not found)';
  const ok = got === expectText;
  console.log((ok ? 'PASS' : 'FAIL') + ' | ' + label + ' | nav_products="' + got + '" (期望 "' + expectText + '")');
  w.close();
  return ok;
}

(async () => {
  const results = [];
  results.push(await testPage('es/index.html', 'https://hashoer.com/es/', 'Productos', '/es/ 页 JS 执行后保持西语'));
  results.push(await testPage('fr/index.html', 'https://hashoer.com/fr/', 'Produits', '/fr/ 页保持法语'));
  results.push(await testPage('index.html', 'https://hashoer.com/', 'Products', '根目录固定英语'));
  results.push(await testPage('es/products.html', 'https://hashoer.com/es/products.html', 'Productos', '/es/products.html 保持西语'));
  const allOk = results.every(Boolean);
  console.log(allOk ? 'ALL OK' : 'SOME FAILED');
  process.exit(allOk ? 0 : 1);
})().catch((e) => { console.error('ERROR:', e.message); process.exit(2); });
