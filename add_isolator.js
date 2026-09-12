// fp9 占位卡 → 隔离器系统（HTML 卡片 + 13 语字典）
const fs = require('fs');
const p = 'index.html';
let s = fs.readFileSync(p, 'utf8');
let fail = [];
function rep(o, n) {
  if (!s.includes(o)) { fail.push(o.slice(0, 70)); return; }
  s = s.replace(o, n);
}

// ── HTML：占位卡 → 隔离器卡 ──
const oldCard = `      <div class="featured-card">
        <div class="featured-img featured-img-soon">+</div>
        <div class="featured-body">
          <span class="featured-badge" data-i18n="fp9_badge">Coming Soon</span>
          <h3 data-i18n="fp9_name">More Products Coming Soon</h3>
        </div>
      </div>`;
const newCard = `      <div class="featured-card">
        <img class="featured-img" src="images/p16-isolator.jpg" alt="Isolator System"
             onerror="this.style.display='none'">
        <div class="featured-body">
          <span class="featured-badge" data-i18n="fp9_badge">Pharmaceutical</span>
          <h3 data-i18n="fp9_name">Isolator System</h3>
          <p data-i18n="fp9_desc">Hard-wall sealed enclosure maintaining dynamic Grade A for aseptic processing.</p>
          <a href="#contact" class="view-link" onclick="openProduct('fp9','images/p16-isolator.jpg');return false;" data-i18n="fp9_link">View Details →</a>
        </div>
      </div>`;
rep(oldCard, newCard);

// ── 13 语字典 ──
const L = [
  // [旧badge, 旧name, 新badge, 新name, 新desc, 新link]
  ['敬请期待', '更多产品陆续上线', '制药', '隔离器系统', '硬墙式密闭系统，内部维持动态 A 级无菌环境。', '查看详情 →'],
  ['Coming Soon', 'More Products Coming Soon', 'Pharmaceutical', 'Isolator System', 'Hard-wall sealed enclosure maintaining dynamic Grade A for aseptic processing.', 'View Details →'],
  ['近日公開', '新製品続々登場', '製薬', 'アイソレータシステム', '硬質壁の密閉エンクロージャ。動的グレードAを維持し無菌処理に対応。', '詳細を見る →'],
  ['곧 공개', '더 많은 제품 곧 공개', '제약', '아이솔레이터 시스템', '경질벽 밀폐 인클로저. 동적 그레이드A를 유지해 무균 공정에 대응.', '자세히 보기 →'],
  ['Скоро', 'Новые продукты скоро', 'Фармацевтика', 'Изоляторная система', 'Жёсткая герметичная камера, поддерживающая динамический класс A для асептического процесса.', 'Подробнее →'],
  ['Bientôt', 'D’autres produits bientôt', 'Pharmaceutique', 'Système d’isolateur', 'Enceinte étanche à parois rigides maintenant un grade A dynamique pour le procédé aseptique.', 'Voir détails →'],
  ['Próximamente', 'Más productos próximamente', 'Farmacéutico', 'Sistema de aislador', 'Recinto estanco de paredes rígidas que mantiene grado A dinámico para el proceso aséptico.', 'Ver detalles →'],
  ['Em breve', 'Mais produtos em breve', 'Farmacêutico', 'Sistema de isolador', 'Câmara estanque de paredes rígidas que mantém grau A dinâmico para o processo asséptico.', 'Ver detalhes →'],
  ['เร็วๆ นี้', 'ผลิตภัณฑ์เพิ่มเติมเร็วๆ นี้', 'เภสัชกรรม', 'ระบบไอโซเลเตอร์', 'ห้องปิดผนึกแข็ง รักษาสภาพเกรด A แบบไดนามิกสำหรับกระบวนการปลอดเชื้อ', 'ดูรายละเอียด →'],
  ['Sắp ra mắt', 'Thêm sản phẩm sắp ra mắt', 'Dược phẩm', 'Hệ thống isolator', 'Buồng kín vách cứng duy trì cấp A động cho quy trình vô trùng.', 'Xem chi tiết →'],
  ['শীঘ্রই আসছে', 'আরও পণ্য শীঘ্রই আসছে', 'ফার্মাসিউটিক্যাল', 'আইসোলেটর সিস্টেম', 'হার্ড-ওয়াল সিলড এনক্লোজার, অ্যাসেপটিক প্রক্রিয়ার জন্য ডাইনামিক গ্রেড-এ বজায় রাখে।', 'বিস্তারিত দেখুন →'],
  ['جلد آ رہا ہے', 'مزید مصنوعات جلد آ رہی ہیں', 'فارماسیوٹیکل', 'آئسولیٹر سسٹم', 'سخت دیواروں والا بند انکلوژر جو ایسپٹک عمل کے لیے متحرک گریڈ A برقرار رکھتا ہے۔', 'تفصیلات دیکھیں →'],
  ['به‌زودی', 'محصولات بیشتر به‌زودی', 'دارویی', 'سیستم ایزولاتور', 'محفظه درزبندی‌شده با دیواره صلب که گرید A پویا را برای فرایند آسپتیک حفظ می‌کند.', 'مشاهده جزئیات →'],
];
L.forEach(([ob, on, nb, nn, nd, nl]) => {
  rep(`fp9_badge:"${ob}", fp9_name:"${on}"`,
      `fp9_badge:"${nb}", fp9_name:"${nn}", fp9_desc:"${nd}", fp9_link:"${nl}"`);
});

fs.writeFileSync(p, s);
if (fail.length) { console.log('❌ 未匹配:'); fail.forEach(f => console.log('  ' + f)); process.exit(1); }
const desc = (s.match(/fp9_desc:"/g) || []).length;
const soon = (s.match(/Coming Soon|featured-img-soon/g) || []).length;
console.log('fp9_desc 条目:', desc, '| 残留占位:', soon, '| OK');
