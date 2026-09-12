// 副标题去掉写死的"五大核心行业"（现在 8 张卡），13 语改为不写死数量
const fs = require('fs');
const p = 'index.html';
let s = fs.readFileSync(p, 'utf8');
let fail = [];
function rep(o, n) {
  if (!s.includes(o)) { fail.push(o.slice(0, 50)); return; }
  s = s.replace(o, n);
}
rep('>Complete packaging solutions across five core industries<', '>Complete filling, packaging &amp; containment solutions<');
rep('products_subtitle:"覆盖五大核心行业的完整包装解决方案"', 'products_subtitle:"覆盖灌装、包装与隔离的完整解决方案"');
rep('products_subtitle:"Complete packaging solutions across five core industries"', 'products_subtitle:"Complete filling, packaging & containment solutions"');
rep('products_subtitle:"5つの主要業界を網羅する総合包装ソリューション"', 'products_subtitle:"充填・包装・アイソレーションを網羅する総合ソリューション"');
rep('products_subtitle:"5대 핵심 산업을 아우르는 완전한 포장 솔루션"', 'products_subtitle:"충전·포장·격리를 아우르는 완전한 솔루션"');
rep('products_subtitle:"Полные упаковочные решения для пяти ключевых отраслей"', 'products_subtitle:"Полные решения: наполнение, упаковка и изоляция"');
rep("products_subtitle:\"Solutions d'emballage complètes pour cinq industries clés\"", "products_subtitle:\"Solutions complètes : remplissage, emballage et confinement\"");
rep('products_subtitle:"Soluciones de envasado completas para cinco industrias clave"', 'products_subtitle:"Soluciones completas: llenado, envasado y confinamiento"');
rep('products_subtitle:"Soluções de embalagem completas para cinco indústrias-chave"', 'products_subtitle:"Soluções completas: enchimento, embalagem e confinamento"');
rep('products_subtitle:"โซลูชันการบรรจุภัณฑ์ครบวงจรสำหรับ 5 อุตสาหกรรมหลัก"', 'products_subtitle:"โซลูชันครบวงจรด้านการบรรจุ บรรจุภัณฑ์ และระบบปลอดเชื้อ"');
rep('products_subtitle:"Giải pháp đóng gói hoàn chỉnh cho năm ngành công nghiệp cốt lõi"', 'products_subtitle:"Giải pháp hoàn chỉnh: chiết rót, đóng gói và không gian vô trùng"');
rep('products_subtitle:"পাঁচটি মূল শিল্প জুড়ে সম্পূর্ণ প্যাকেজিং সমাধান"', 'products_subtitle:"পূর্ণাঙ্গ সমাধান: ভরাট, প্যাকেজিং ও কনটেইনমেন্ট"');
rep('products_subtitle:"پانچ کور صنعتوں میں مکمل پیکجنگ حل"', 'products_subtitle:"مکمل حل: بھرائی، پیکجنگ اور کنٹینمنٹ"');
rep('products_subtitle:"راهکارهای کامل بسته‌بندی برای پنج صنعت اصلی"', 'products_subtitle:"راهکار کامل: پرکردن، بسته‌بندی و جداسازی"');
fs.writeFileSync(p, s);
if (fail.length) { console.log('❌ 未匹配:'); fail.forEach(f => console.log('  ' + f)); process.exit(1); }
console.log('副标题 13+1 处全部替换 OK');
