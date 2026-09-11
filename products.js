/* ══════════════════════════════════════════════════════════
   Hashoer 完整设备目录 —— 搜索 / 分类 / 参数弹窗
   数据来自 2026 版产品介绍 PPT；参数只收录 PPT 中明确标注的项。
   多语：13 语种全量（zh en ja ko ru fr es pt th vi bn ur fa）
   规格数值（型号/速度/精度）本身是数字与单位，13 语通用。
   ══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ---------- 规格标签多语 ---------- */
  var LABELS = {
    model: {
      zh: '型号', en: 'Model', ja: '型式', ko: '모델', ru: 'Модель', fr: 'Modèle',
      es: 'Modelo', pt: 'Modelo', th: 'รุ่น', vi: 'Model', bn: 'মডেল', ur: 'ماڈل', fa: 'مدل'
    },
    output: {
      zh: '生产速度', en: 'Output', ja: '処理能力', ko: '생산 속도', ru: 'Производительность', fr: 'Cadence',
      es: 'Producción', pt: 'Produção', th: 'กำลังการผลิต', vi: 'Năng suất', bn: 'উৎপাদন ক্ষমতা', ur: 'پیداواری رفتار', fa: 'ظرفیت تولید'
    },
    container: {
      zh: '适用规格', en: 'Container', ja: '容器', ko: '용기', ru: 'Тара', fr: 'Contenant',
      es: 'Envase', pt: 'Recipiente', th: 'ภาชนะ', vi: 'Dạng bao bì', bn: 'পাত্র', ur: 'کنٹینر', fa: 'ظرف'
    },
    accuracy: {
      zh: '灌装精度', en: 'Accuracy', ja: '充填精度', ko: '충전 정밀도', ru: 'Точность дозирования', fr: 'Précision',
      es: 'Precisión', pt: 'Precisão', th: 'ความแม่นยำ', vi: 'Độ chính xác', bn: 'নির্ভুলতা', ur: 'درستی', fa: 'دقت'
    },
    config: {
      zh: '设备组成', en: 'Line configuration', ja: 'ライン構成', ko: '라인 구성', ru: 'Состав линии', fr: 'Configuration',
      es: 'Configuración', pt: 'Configuração', th: 'การจัดสายการผลิต', vi: 'Cấu hình dây chuyền', bn: 'লাইন কনফিগারেশন', ur: 'لائن کی ترتیب', fa: 'پیکربندی خط'
    },
    feature: {
      zh: '主要特点', en: 'Key feature', ja: '主な特長', ko: '주요 특징', ru: 'Особенность', fr: 'Point clé',
      es: 'Característica', pt: 'Característica', th: 'จุดเด่น', vi: 'Đặc điểm nổi bật', bn: 'প্রধান বৈশিষ্ট্য', ur: 'اہم خصوصیت', fa: 'ویژگی کلیدی'
    },
    size: {
      zh: '外形尺寸', en: 'Dimensions', ja: '外形寸法', ko: '외형 치수', ru: 'Габариты', fr: 'Dimensions',
      es: 'Dimensiones', pt: 'Dimensões', th: 'ขนาด', vi: 'Kích thước', bn: 'মাত্রা', ur: 'ابعاد', fa: 'ابعاد'
    },
    weight: {
      zh: '重量', en: 'Weight', ja: '重量', ko: '무게', ru: 'Масса', fr: 'Poids',
      es: 'Peso', pt: 'Peso', th: 'น้ำหนัก', vi: 'Trọng lượng', bn: 'ওজন', ur: 'وزن', fa: 'وزن'
    },
    power: {
      zh: '供电电源', en: 'Power supply', ja: '電源', ko: '전원', ru: 'Питание', fr: 'Alimentation',
      es: 'Alimentación', pt: 'Alimentação', th: 'แหล่งจ่ายไฟ', vi: 'Nguồn điện', bn: 'বিদ্যুৎ সরবরাহ', ur: 'بجلی کی فراہمی', fa: 'منبع تغذیه'
    },
    filter: {
      zh: '过滤', en: 'Filtration', ja: 'ろ過', ko: '여과', ru: 'Фильтрация', fr: 'Filtration',
      es: 'Filtración', pt: 'Filtração', th: 'การกรอง', vi: 'Lọc', bn: 'পরিস্রাবণ', ur: 'فلٹریشن', fa: 'فیلتراسیون'
    },
    cert: {
      zh: '法规符合', en: 'Compliance', ja: '適合規格', ko: '규격 준수', ru: 'Соответствие', fr: 'Conformité',
      es: 'Cumplimiento', pt: 'Conformidade', th: 'การรับรองมาตรฐาน', vi: 'Tuân thủ', bn: 'সম্মতি', ur: 'تعمیل', fa: 'انطباق'
    },
    decontam: {
      zh: '生物去污', en: 'Decontamination', ja: '除染', ko: '오염 제거', ru: 'Деконтаминация', fr: 'Décontamination',
      es: 'Descontaminación', pt: 'Descontaminação', th: 'การกำจัดเชื้อ', vi: 'Khử khuẩn', bn: 'জীবাণুমুক্তকরণ', ur: 'جراثیم کشی', fa: 'آلودگی‌زدایی'
    }
  };

  /* ---------- 界面文案 ---------- */
  var UI = {
    badge: {
      zh: '产品目录', en: 'Product catalogue', ja: '製品カタログ', ko: '제품 카탈로그', ru: 'Каталог продукции', fr: 'Catalogue produits',
      es: 'Catálogo de productos', pt: 'Catálogo de produtos', th: 'แคตตาล็อกสินค้า', vi: 'Danh mục sản phẩm', bn: 'পণ্য ক্যাটালগ', ur: 'پروڈکٹ کیٹلاگ', fa: 'کاتالوگ محصولات'
    },
    title: {
      zh: '完整设备清单', en: 'Full equipment range', ja: '全製品ラインアップ', ko: '전체 장비 라인업', ru: 'Полный перечень оборудования', fr: 'Gamme complète',
      es: 'Gama completa de equipos', pt: 'Gama completa de equipamentos', th: 'อุปกรณ์ทั้งหมด', vi: 'Danh sách thiết bị đầy đủ', bn: 'সম্পূর্ণ সরঞ্জাম তালিকা', ur: 'مکمل آلات کی فہرست', fa: 'فهرست کامل تجهیزات'
    },
    subtitle: {
      zh: '18 类设备 —— 可按名称、剂型或型号搜索',
      en: '18 machine types — search by name, container or model',
      ja: '18 機種 — 名称・容器・型式で検索',
      ko: '18종 장비 — 이름·용기·모델로 검색',
      ru: '18 тип машин — поиск по названию, таре или модели',
      fr: '18 types de machines — recherche par nom, contenant ou modèle',
      es: '18 tipos de máquina: busque por nombre, envase o modelo',
      pt: '18 tipos de máquina: pesquise por nome, recipiente ou modelo',
      th: '18 ประเภทเครื่องจักร — ค้นหาด้วยชื่อ ภาชนะ หรือรุ่น',
      vi: '18 loại máy — tìm theo tên, dạng bao bì hoặc model',
      bn: '২১ ধরনের যন্ত্র — নাম, পাত্র বা মডেল দিয়ে খুঁজুন',
      ur: 'مشینوں کی 21 اقسام — نام، کنٹینر یا ماڈل سے تلاش کریں',
      fa: '۲۱ نوع دستگاه — جستجو بر اساس نام، ظرف یا مدل'
    },
    searchPh: {
      zh: '搜索 —— 试试“西林瓶”“安瓿”“预充针”“粉末”“FFV”…',
      en: 'Search — try "vial", "ampoule", "PFS", "powder", "FFV"…',
      ja: '検索 — «バイアル» «アンプル» «PFS» «粉末» «FFV»…',
      ko: '검색 — «바이알» «앰플» «PFS» «분말» «FFV»…',
      ru: 'Поиск: «vial», «ampoule», «PFS», «powder», «FFV»…',
      fr: 'Recherche : essayez « vial », « ampoule », « PFS », « powder », « FFV »…',
      es: 'Busque: pruebe «vial», «ampoule», «PFS», «powder», «FFV»…',
      pt: 'Pesquise: tente «vial», «ampoule», «PFS», «powder», «FFV»…',
      th: 'ค้นหา — ลอง «vial» «ampoule» «PFS» «powder» «FFV»…',
      vi: 'Tìm kiếm — thử «vial» «ampoule» «PFS» «powder» «FFV»…',
      bn: 'খুঁজুন — চেষ্টা করুন «vial» «ampoule» «PFS» «powder» «FFV»…',
      ur: 'تلاش کریں — «vial»، «ampoule»، «PFS»، «powder»، «FFV» آزمائیں…',
      fa: 'جستجو — «vial»، «ampoule»، «PFS»، «powder»، «FFV» را امتحان کنید…'
    },
    tabAll: {
      zh: '全部', en: 'All', ja: 'すべて', ko: '전체', ru: 'Все', fr: 'Tous',
      es: 'Todo', pt: 'Todos', th: 'ทั้งหมด', vi: 'Tất cả', bn: 'সব', ur: 'سب', fa: 'همه'
    },
    tabLines: {
      zh: '整线', en: 'Complete lines', ja: 'ターンキーライン', ko: '완성 라인', ru: 'Комплексные линии', fr: 'Lignes complètes',
      es: 'Líneas completas', pt: 'Linhas completas', th: 'สายการผลิตครบชุด', vi: 'Dây chuyền hoàn chỉnh', bn: 'সম্পূর্ণ লাইন', ur: 'مکمل لائنیں', fa: 'خطوط کامل'
    },
    tabFill: {
      zh: '灌装计量', en: 'Filling & dosing', ja: '充填・定量', ko: '충전·정량', ru: 'Наполнение и дозирование', fr: 'Remplissage & dosage',
      es: 'Llenado y dosificación', pt: 'Enchimento e dosagem', th: 'การบรรจุและตวง', vi: 'Chiết rót & định lượng', bn: 'ভরাট ও ডোজিং', ur: 'بھرائی اور خوراک', fa: 'پرکردن و دوزینگ'
    },
    tabWash: {
      zh: '洗烘灭菌', en: 'Wash & sterilize', ja: '洗浄・滅菌', ko: '세척·멸균', ru: 'Мойка и стерилизация', fr: 'Lavage & stérilisation',
      es: 'Lavado y esterilización', pt: 'Lavagem e esterilização', th: 'การล้างและฆ่าเชื้อ', vi: 'Rửa & tiệt trùng', bn: 'ধোয়া ও জীবাণুমুক্ত', ur: 'دھلائی اور جراثیم کشی', fa: 'شست‌وشو و استریل'
    },
    tabCap: {
      zh: '轧盖灯检与隔离', en: 'Cap, inspect & containment', ja: '打栓・検査・封じ込め', ko: '캡핑·검사·아이솔레이터', ru: 'Укупорка, инспекция и изоляция', fr: 'Capsulage, inspection & confinement',
      es: 'Tapado, inspección y contención', pt: 'Fechamento, inspeção e contenção', th: 'ปิดฝา ตรวจสอบ และแยก', vi: 'Đóng nắp, kiểm tra & cách ly', bn: 'ক্যাপিং, পরিদর্শন ও কনটেইনমেন্ট', ur: 'کیپنگ، معائنہ اور کنٹینمنٹ', fa: 'دربندی، بازرسی و ایزولاسیون'
    },
    tabLab: {
      zh: '实验室小试', en: 'Lab & R&D', ja: 'ラボ・研究開発', ko: '연구소·R&D', ru: 'Лаборатория и НИОКР', fr: 'Labo & R&D',
      es: 'Laboratorio e I+D', pt: 'Laboratório e P&D', th: 'ห้องปฏิบัติการและวิจัย', vi: 'Phòng thí nghiệm & R&D', bn: 'ল্যাব ও গবেষণা', ur: 'لیبارٹری اور R&D', fa: 'آزمایشگاه و تحقیق'
    },
    unit: {
      zh: '款设备', en: 'machines', ja: '機種', ko: '종', ru: 'машин', fr: 'machines',
      es: 'máquinas', pt: 'máquinas', th: 'เครื่อง', vi: 'máy', bn: 'যন্ত্র', ur: 'مشینیں', fa: 'دستگاه'
    },
    noResult: {
      zh: '没有匹配的设备 —— 换个关键词，或直接联系我们。',
      en: 'No match — try another keyword, or contact us directly.',
      ja: '該当なし — 別のキーワードで検索するか、直接お問い合わせください。',
      ko: '해당 없음 — 다른 키워드로 검색하거나 직접 문의하세요.',
      ru: 'Ничего не найдено — измените запрос или свяжитесь с нами.',
      fr: 'Aucun résultat — essayez un autre mot-clé ou contactez-nous.',
      es: 'Sin resultados: pruebe otra palabra o contáctenos directamente.',
      pt: 'Sem resultados: tente outra palavra ou contate-nos diretamente.',
      th: 'ไม่พบเครื่องที่ตรงกัน — ลองคำอื่น หรือติดต่อเราโดยตรง',
      vi: 'Không có kết quả — thử từ khóa khác hoặc liên hệ trực tiếp.',
      bn: 'কোনো মিল নেই — অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন, বা সরাসরি যোগাযোগ করুন।',
      ur: 'کوئی نتیجہ نہیں — دوسرا لفظ آزمائیں، یا براہ راست رابطہ کریں۔',
      fa: 'موردی یافت نشد — واژه دیگری امتحان کنید یا مستقیماً با ما تماس بگیرید.'
    },
    viewSpec: {
      zh: '查看参数', en: 'View specs', ja: '仕様を見る', ko: '사양 보기', ru: 'Характеристики', fr: 'Voir les specs',
      es: 'Ver especificaciones', pt: 'Ver especificações', th: 'ดูสเปก', vi: 'Xem thông số', bn: 'স্পেস দেখুন', ur: 'تفصیلات دیکھیں', fa: 'مشاهده مشخصات'
    },
    cta: {
      zh: '咨询这台设备', en: 'Inquire about this machine', ja: 'この機械について問い合わせる', ko: '이 기계 문의하기', ru: 'Запросить эту машину', fr: 'Demander cette machine',
      es: 'Consultar sobre esta máquina', pt: 'Consultar sobre esta máquina', th: 'สอบถามเครื่องนี้', vi: 'Hỏi về máy này', bn: 'এই যন্ত্র সম্পর্কে জানতে', ur: 'اس مشین کے بارے میں پوچھیں', fa: 'استعلام درباره این دستگاه'
    },
    clear: {
      zh: '清空', en: 'Clear', ja: 'クリア', ko: '지우기', ru: 'Очистить', fr: 'Effacer',
      es: 'Borrar', pt: 'Limpar', th: 'ล้าง', vi: 'Xóa', bn: 'খালি করুন', ur: 'صاف کریں', fa: 'پاک‌کردن'
    }
  };

  /* ---------- 剂型快捷入口 ---------- */
  var CONTAINERS = [
    {
      q: 'vial', icon: '\uD83D\uDC8A',
      en: 'Vials', zh: '西林瓶', ja: 'バイアル', ko: '바이알', ru: 'Флаконы', fr: 'Flacons',
      es: 'Viales', pt: 'Frascos', th: 'ขวดไวอัล', vi: 'Lọ vial', bn: 'ভায়াল', ur: 'شیشیاں', fa: 'ویال‌ها',
      dEn: '2–100 ml injectable vials', dZh: '2–100ml 注射剂西林瓶',
      dJa: '2〜100ml 注射用バイアル', dKo: '2~100ml 주사제 바이알', dRu: 'Флаконы 2–100 мл для инъекций',
      dFr: 'Flacons injectables 2–100 ml', dEs: 'Viales inyectables de 2–100 ml', dPt: 'Frascos injetáveis de 2–100 ml',
      dTh: 'ขวดไวอัลฉีด 2–100 มล.', dVi: 'Lọ vial tiêm 2–100 ml', dBn: '২–১০০ মিলি ইনজেক্টেবল ভায়াল',
      dUr: '2–100 ملی لیٹر انجیکشن والی شیشیاں', dFa: 'ویال‌های تزریقی ۲–۱۰۰ میلی‌لیتر'
    },
    {
      q: 'ampoule', icon: '\uD83E\uDDEA',
      en: 'Ampoules', zh: '安瓿瓶', ja: 'アンプル', ko: '앰플', ru: 'Ампулы', fr: 'Ampoules',
      es: 'Ampollas', pt: 'Ampolas', th: 'หลอดแอมพูล', vi: 'Ống ampoule', bn: 'অ্যাম্পুল', ur: 'ایمپول', fa: 'آمپول‌ها',
      dEn: '1–20 ml ampoules', dZh: '1–20ml 安瓿瓶',
      dJa: '1〜20ml アンプル', dKo: '1~20ml 앰플', dRu: 'Ампулы 1–20 мл',
      dFr: 'Ampoules 1–20 ml', dEs: 'Ampollas de 1–20 ml', dPt: 'Ampolas de 1–20 ml',
      dTh: 'หลอดแอมพูล 1–20 มล.', dVi: 'Ống ampoule 1–20 ml', dBn: '১–২০ মিলি অ্যাম্পুল',
      dUr: '1–20 ملی لیٹر ایمپول', dFa: 'آمپول‌های ۱–۲۰ میلی‌لیتر'
    },
    {
      q: 'pfs', icon: '\uD83D\uDC89',
      en: 'Prefilled syringes', zh: '预充针', ja: 'プレフィルドシリンジ', ko: '프리필드시린지', ru: 'Предзаполненные шприцы', fr: 'Seringues préremplies',
      es: 'Jeringas precargadas', pt: 'Seringas pré-cheias', th: 'กระบอกฉีดยาพร้อมใช้', vi: 'Ống tiêm đóng sẵn', bn: 'প্রিফিলড সিরিঞ্জ', ur: 'پہلے سے بھری سرنجیں', fa: 'سرنگ‌های از پیش پرشده',
      dEn: 'RTU nested syringes', dZh: '即用型巢板预充针',
      dJa: 'RTU ネスト式シリンジ', dKo: 'RTU 네스트 시린지', dRu: 'Готовые шприцы в гнёздах',
      dFr: 'Seringues RTU en nid', dEs: 'Jeringas RTU en nido', dPt: 'Seringas RTU em ninho',
      dTh: 'กระบอกฉีดยา RTU แบบถาด', dVi: 'Ống tiêm RTU dạng khay', dBn: 'RTU নেস্টেড সিরিঞ্জ',
      dUr: 'RTU نیسٹڈ سرنجیں', dFa: 'سرنگ‌های RTU در سینی'
    },
    {
      q: 'powder', icon: '\u2697\uFE0F',
      en: 'Powder', zh: '粉针', ja: '粉末', ko: '분말', ru: 'Порошок', fr: 'Poudre',
      es: 'Polvo', pt: 'Pó', th: 'ผง', vi: 'Bột', bn: 'পাউডার', ur: 'پاؤڈر', fa: 'پودر',
      dEn: 'Screw & airflow filling', dZh: '螺杆与气流粉末分装',
      dJa: 'スクリュー式・気流式充填', dKo: '스크류 및 기류 충전', dRu: 'Шнековое и воздушное дозирование',
      dFr: 'Dosage à vis et à air', dEs: 'Dosificación por tornillo y por aire', dPt: 'Dosagem por rosca e por ar',
      dTh: 'การบรรจุแบบสกรูและลม', dVi: 'Chiết rót trục vít & khí nén', dBn: 'স্ক্রু ও এয়ারফ্লো ভরাট',
      dUr: 'سکرو اور ایئر فلو بھرائی', dFa: 'پرکردن اسکرو و جریان هوا'
    },
    {
      q: 'lab', icon: '🔬',
      en: 'Lab equipment', zh: '实验室设备', ja: '実験室設備', ko: '실험실 장비', ru: 'Лабораторное оборудование', fr: 'Équipement de laboratoire',
      es: 'Equipo de laboratorio', pt: 'Equipamento de laboratório', th: 'อุปกรณ์ห้องปฏิบัติการ', vi: 'Thiết bị phòng thí nghiệm', bn: 'ল্যাবরেটরি সরঞ্জাম', ur: 'لیبارٹری کا سامان', fa: 'تجهیزات آزمایشگاهی',
      dEn: 'Bench-top R&D machines', dZh: '小试与研发用设备',
      dJa: 'ベンチトップ研究開発機', dKo: '벤치탑 R&D 장비', dRu: 'Настольные машины для R&D',
      dFr: 'Machines de paillasse pour R&D', dEs: 'Equipos de mesa para I+D', dPt: 'Máquinas de bancada para P&D',
      dTh: 'เครื่อง R&D แบบตั้งบนโต๊ะ', dVi: 'Máy R&D kiểu bàn', dBn: 'বেঞ্চ-টপ R&D মেশিন',
      dUr: 'بینچ ٹاپ R&D مشینیں', dFa: 'دستگاه‌های R&D رومیزی'
    }
      ,
    {
      q: 'cartridge', icon: '\uD83E\uDDF4',
      en: 'Cartridges', zh: '卡式瓶', ja: 'カートリッジ', ko: '카트리지', ru: 'Картриджи', fr: 'Cartouches',
      es: 'Cartuchos', pt: 'Cartuchos', th: 'คาร์ทริดจ์', vi: 'Cartridge', bn: 'কার্ট্রিজ', ur: 'کارٹریج', fa: 'کارتریج',
      dEn: '1–5 ml cartridge filling', dZh: '1–5ml 卡式瓶灌装',
      dJa: '1〜5ml カートリッジ充填', dKo: '1~5ml 카트리지 충전', dRu: 'Картриджи 1–5 мл',
      dFr: 'Cartouches 1–5 ml', dEs: 'Cartuchos de 1–5 ml', dPt: 'Cartuchos de 1–5 ml',
      dTh: 'คาร์ทริดจ์ 1–5 มล.', dVi: 'Cartridge 1–5 ml', dBn: '১–৫ মিলি কার্ট্রিজ',
      dUr: '1–5 ملی کارٹریج', dFa: 'کارتریج ۱–۵ میلی‌لیتر'
    }
    ,{
      q: 'spray', icon: '\uD83D\uDCA7',
      en: 'Sprays & eye drops', zh: '喷雾剂滴眼液', ja: 'スプレー・点眼液', ko: '스프레이·안약', ru: 'Спреи и глазные капли', fr: 'Sprays et collyres',
      es: 'Sprays y colirios', pt: 'Sprays e colírios', th: 'สเปรย์และยาหยอดตา', vi: 'Xịt & thuốc nhỏ mắt', bn: 'স্প্রে ও চোখের ড্রপ', ur: 'اسپرے اور آنکھ کے قطرے', fa: 'اسپری و قطره چشم',
      dEn: 'Nasal spray & eye drop filling', dZh: '喷雾剂与滴眼液灌装',
      dJa: 'スプレー・点眼液の充填', dKo: '스프레이·안약 충전', dRu: 'Наполнение спреев и глазных капель',
      dFr: 'Remplissage sprays et collyres', dEs: 'Llenado de sprays y colirios', dPt: 'Enchimento de sprays e colírios',
      dTh: 'บรรจุสเปรย์และยาหยอดตา', dVi: 'Chiết rót xịt & thuốc nhỏ mắt', dBn: 'স্প্রে ও চোখের ড্রপ ভরাট',
      dUr: 'اسپرے اور آنکھ کے قطروں کی بھرائی', dFa: 'پرکردن اسپری و قطره چشم'
    }
  ];

  /* ---------- 18 条产品线 ---------- */
  var CATALOG = [
                {
      id: 'washer', cat: 'washing', img: 'images/p04-washer.jpg',
      kw: 'washing machine washer vial ampoule ultrasonic rotary cleaning FWV',
      name: {
        en: 'Vertical vial & ampoule washing machine', zh: '立式洗瓶机',
        ja: '立型バイアル・アンプル洗浄機', ko: '수직 바이알·앰플 세척기',
        ru: 'Вертикальная моечная машина для флаконов и ампул', fr: 'Laveuse verticale pour flacons et ampoules',
        es: 'Lavadora vertical para viales y ampollas', pt: 'Lavadora vertical para frascos e ampolas',
        th: 'เครื่องล้างขวดไวอัลและหลอดแอมพูลแนวตั้ง', vi: 'Máy rửa vial & ampoule đứng',
        bn: 'ভায়াল ও অ্যাম্পুল উল্লম্ব ওয়াশিং মেশিন', ur: 'شیشی اور ایمپول کی عمودی دھلائی مشین',
        fa: 'دستگاه شست‌وشوی عمودی ویال و آمپول'
      },
      desc: {
        en: 'Rotary vertical washer using ultrasonic plus alternating WFI and clean compressed air.',
        zh: '立式回转结构，超声波配合注射水与无菌压缩空气交替清洗。',
        ja: '回転式立型洗浄機。超音波と注射用水・清浄圧縮空気を交互に使用。',
        ko: '회전식 수직 세척기. 초음파와 주사용수·청정 압축공기를 교대로 사용.',
        ru: 'Роторная вертикальная мойка: ультразвук плюс чередование воды для инъекций и чистого сжатого воздуха.',
        fr: 'Laveuse rotative verticale associant ultrasons et alternance d’eau pour préparations injectables et d’air comprimé propre.',
        es: 'Lavadora rotativa vertical con ultrasonidos y alternancia de agua para inyectables y aire comprimido limpio.',
        pt: 'Lavadora rotativa vertical com ultrassom e alternância de água para injetáveis e ar comprimido limpo.',
        th: 'เครื่องล้างแนวตั้งแบบหมุน ใช้คลื่นอัลตราโซนิกสลับกับน้ำสำหรับฉีดและลมอัดสะอาด',
        vi: 'Máy rửa đứng dạng quay, dùng siêu âm kết hợp luân phiên nước pha tiêm và khí nén sạch.',
        bn: 'ঘূর্ণায়মান উল্লম্ব ওয়াশার: আল্ট্রাসোনিক ও ডব্লিউএফআই এবং পরিষ্কার সংকুচিত বাতাস পর্যায়ক্রমে।',
        ur: 'روٹری عمودی واشر، الٹراسونک کے ساتھ انجیکشن پانی اور صاف کمپریسڈ ہوا باری باری۔',
        fa: 'واشر چرخشی عمودی با اولتراسونیک و تناوب آب تزریقی و هوای فشرده تمیز.'
      },
      specs: { model: 'FWV-100 / 200 / 300 / 400 / 500 / 600', output: '40–160 washing needles', container: 'Vials & ampoules', feature: '≥3-log particle removal, WFI recirculation, silicone option' }
    },
    {
      id: 'tunnel', cat: 'washing', img: 'images/p05-tunnel.jpg',
      kw: 'sterilizing depyrogenation tunnel oven dryer hot air FTV vial ampoule',
      name: {
        en: 'Sterilizing & depyrogenation tunnel', zh: '隧道烘箱',
        ja: '滅菌・脱パイロジェントンネル', ko: '멸균·발열물질 제거 터널',
        ru: 'Туннель стерилизации и депирогенизации', fr: 'Tunnel de stérilisation et dépyrogénation',
        es: 'Túnel de esterilización y despirogenización', pt: 'Túnel de esterilização e despirogenização',
        th: 'อุโมงค์ฆ่าเชื้อและกำจัดไพโรเจน', vi: 'Đường hầm tiệt trùng & khử pyrogen',
        bn: 'স্টেরিলাইজিং ও ডিপাইরোজেনেশন টানেল', ur: 'جراثیم کشی اور ڈیپائروجینیشن ٹنل',
        fa: 'تونل استریل و حذف پیروژن'
      },
      desc: {
        en: 'Hot dry-air tunnel that sterilizes and depyrogenates containers under Grade A laminar flow.',
        zh: '干热空气隧道，在百级层流保护下对包材灭菌去热原。',
        ja: '熱風乾燥トンネル。グレードA層流下で容器を滅菌・脱パイロジェン。',
        ko: '열풍 건조 터널. 그레이드A 층류 하에서 용기를 멸균·발열물질 제거.',
        ru: 'Туннель горячего сухого воздуха: стерилизация и депирогенизация тары в ламинарном потоке класса A.',
        fr: 'Tunnel à air chaud sec stérilisant et dépyrogénant les contenants sous flux laminaire de grade A.',
        es: 'Túnel de aire seco caliente que esteriliza y despirogeniza los envases bajo flujo laminar grado A.',
        pt: 'Túnel de ar seco quente que esteriliza e despirogeniza recipientes sob fluxo laminar grau A.',
        th: 'อุโมงค์ลมร้อนแห้ง ฆ่าเชื้อและกำจัดไพโรเจนภายใต้ลามินาร์โฟลว์เกรด A',
        vi: 'Đường hầm khí nóng khô, tiệt trùng và khử pyrogen dưới dòng chảy tầng cấp A.',
        bn: 'গরম শুকনো বাতাসের টানেল, গ্রেড-এ ল্যামিনার ফ্লোতে কনটেইনার স্টেরিলাইজ ও ডিপাইরোজেন করে।',
        ur: 'خشک گرم ہوا کا ٹنل جو گریڈ A لیمینر فلو کے تحت کنٹینرز کو جراثیم سے پاک اور ڈیپائروجنیٹ کرتا ہے۔',
        fa: 'تونل هوای گرم خشک که ظروف را در جریان آرام گرید A استریل و عاری از پیروژن می‌کند.'
      },
      specs: { model: 'FTV-100 / 200 / 300 / 400 / 500', output: '100–600 containers/min', feature: '320 °C hot air, 3.0–5.5 m tunnel, auto pressure balance', cert: 'Validated with PAO-tested H14 HEPA' }
    },
    {
      id: 'vial-filler', cat: 'filling', img: 'images/p06-vial-filler.jpg',
      kw: 'vial filling machine filler stoppering isolator servo FFV aseptic',
      name: {
        en: 'Vial filling machine', zh: '西林瓶灌装机',
        ja: 'バイアル充填機', ko: '바이알 충전기',
        ru: 'Машина наполнения флаконов', fr: 'Machine de remplissage de flacons',
        es: 'Máquina llenadora de viales', pt: 'Máquina de enchimento de frascos',
        th: 'เครื่องบรรจุขวดไวอัล', vi: 'Máy chiết rót lọ vial',
        bn: 'ভায়াল ভরাট মেশিন', ur: 'شیشی بھرنے کی مشین',
        fa: 'دستگاه پرکردن ویال'
      },
      desc: {
        en: 'Servo-driven aseptic filler for vials, integrable with isolator or RABS.',
        zh: '全伺服无菌灌装机，可配套隔离器或 RABS。',
        ja: 'サーボ駆動の無菌充填機。アイソレータやRABSと統合可能。',
        ko: '서보 구동 무균 충전기. 아이솔레이터·RABS 통합 가능.',
        ru: 'Сервоприводный асептический наполнитель для флаконов, интегрируется с изолятором или RABS.',
        fr: 'Remplisseuse aseptique à servomoteurs pour flacons, intégrable à un isolateur ou un RABS.',
        es: 'Llenadora aséptica servoaccionada para viales, integrable con aislador o RABS.',
        pt: 'Enchedora asséptica servoacionada para frascos, integrável com isolador ou RABS.',
        th: 'เครื่องบรรจุปลอดเชื้อขับเคลื่อนด้วยเซอร์โว รองรับการเชื่อมต่อไอโซเลเตอร์หรือ RABS',
        vi: 'Máy chiết rót vô trùng truyền động servo, tích hợp được với isolator hoặc RABS.',
        bn: 'সার্ভো-চালিত অ্যাসেপটিক ভায়াল ফিলার, আইসোলেটর বা RABS-এর সাথে সংযোগযোগ্য।',
        ur: 'سروو ڈرائیون ایسپٹک فلر، آئسولیٹر یا RABS کے ساتھ مربوط کیا جا سکتا ہے۔',
        fa: 'پرکن آسپتیک سروو برای ویال، قابل ادغام با ایزولاتور یا RABS.'
      },
      specs: { model: 'FFV-100 / 200 / 300 / 400 / 500', output: '100–500 vials/min', container: '2–30 ml vial', accuracy: '±0.5% (2 ml water-like)', feature: 'Robot-compatible, CIP/SIP, nitrogen purging, 100% check-weigh' }
    },
    {
      id: 'ampoule-filler', cat: 'filling', img: 'images/p07-ampoule-filler.jpg',
      kw: 'ampoule filling sealing machine filler gassing FFA flame',
      name: {
        en: 'Ampoule filling & sealing machine', zh: '安瓿瓶灌装机',
        ja: 'アンプル充填密封機', ko: '앰플 충전 밀봉기',
        ru: 'Машина наполнения и запайки ампул', fr: 'Machine de remplissage et scellage d’ampoules',
        es: 'Máquina de llenado y sellado de ampollas', pt: 'Máquina de enchimento e selagem de ampolas',
        th: 'เครื่องบรรจุและปิดผนึกหลอดแอมพูล', vi: 'Máy chiết rót & hàn kín ampoule',
        bn: 'অ্যাম্পুল ভরাট ও সিলিং মেশিন', ur: 'ایمپول بھرنے اور سیل کرنے کی مشین',
        fa: 'دستگاه پرکردن و پلمپ آمپول'
      },
      desc: {
        en: 'Infeed, pre-gassing, filling, post-gassing, pre-heating and sealing under Grade A airflow.',
        zh: '进瓶、前充气、灌装、后充气、预热、封口，全程 A 级层流保护。',
        ja: '供給・前ガス・充填・後ガス・予熱・密封まで、グレードA気流下で実施。',
        ko: '공급·전 가스·충전·후 가스·예열·밀봉까지 그레이드A 기류 하에서 수행.',
        ru: 'Подача, предварительная продувка газом, наполнение, повторная продувка, подогрев и запайка в потоке класса A.',
        fr: 'Alimentation, pré-gazage, remplissage, post-gazage, préchauffage et scellage sous flux d’air de grade A.',
        es: 'Alimentación, pregasificado, llenado, postgasificado, precalentamiento y sellado bajo flujo de aire grado A.',
        pt: 'Alimentação, pré-gaseificação, enchimento, pós-gaseificação, pré-aquecimento e selagem sob fluxo de ar grau A.',
        th: 'ป้อน จ่ายแก๊สก่อน บรรจุ จ่ายแก๊สหลัง อุ่น และปิดผนึก ภายใต้กระแสลมเกรด A',
        vi: 'Cấp liệu, sục khí trước, chiết rót, sục khí sau, gia nhiệt và hàn kín dưới luồng khí cấp A.',
        bn: 'ইনফিড, প্রি-গ্যাসিং, ভরাট, পোস্ট-গ্যাসিং, প্রি-হিটিং ও সিলিং—সবই গ্রেড-এ বায়ুপ্রবাহে।',
        ur: 'فیڈ، پری گیسنگ، بھرائی، پوسٹ گیسنگ، پری ہیٹنگ اور سیلنگ، سب گریڈ A ہوا کے بہاؤ میں۔',
        fa: 'تغذیه، پیش‌گازدهی، پرکردن، پس‌گازدهی، پیش‌گرم‌کردن و پلمپ در جریان هوای گرید A.'
      },
      specs: { model: 'FFA-100 / 200 / 300 / 400 / 500', output: '100–500 ampoules/min', container: '1–20 ml ampoule', feature: 'Servo ceramic pump, curved needle lift to reduce splashing' }
    },
    {
      id: 'oral-filler', cat: 'filling', img: 'images/p08-oral-filler.jpg',
      kw: 'oral liquid filling capping machine syrup cap sorting FFK',
      name: {
        en: 'Oral liquid filling & capping machine', zh: '口服液灌装轧盖机',
        ja: '経口液充填・打栓機', ko: '경구액 충전 캡핑기',
        ru: 'Машина наполнения и укупорки пероральных жидкостей', fr: 'Machine de remplissage et capsulage de liquides oraux',
        es: 'Máquina de llenado y tapado de líquidos orales', pt: 'Máquina de enchimento e fechamento de líquidos orais',
        th: 'เครื่องบรรจุและปิดฝายาน้ำ', vi: 'Máy chiết rót & đóng nắp thuốc nước',
        bn: 'ওরাল লিকুইড ভরাট ও ক্যাপিং মেশিন', ur: 'زبانی مائع بھرنے اور کیپنگ مشین',
        fa: 'دستگاه پرکردن و دربندی مایع خوراکی'
      },
      desc: {
        en: 'Unscrambling, filling, cap sorting, cap placing and rolling for oral liquid bottles.',
        zh: '自动完成理瓶、灌装、理盖、扣盖与轧盖。',
        ja: '整列・充填・キャップ整列・キャップ供給・巻き締めを自動化。',
        ko: '정렬·충전·캡 정렬·캡 공급·롤링을 자동화.',
        ru: 'Автоматическая ориентация флаконов, наполнение, сортировка, установка и обжим колпачков.',
        fr: 'Démêlage, remplissage, tri, pose et sertissage des capsules pour flacons de liquides oraux.',
        es: 'Desembrollado, llenado, orientación, colocación y cerrado de tapones para frascos de líquidos orales.',
        pt: 'Desembaraço, enchimento, separação, colocação e fechamento de tampas para frascos de líquidos orais.',
        th: 'เรียงขวด บรรจุ เรียงฝา วางฝา และจีบฝา โดยอัตโนมัติ',
        vi: 'Tự động sắp xếp chai, chiết rót, phân loại nắp, đặt nắp và ép nắp.',
        bn: 'বোতল সাজানো, ভরাট, ক্যাপ সাজানো, ক্যাপ বসানো ও রোলিং স্বয়ংক্রিয়ভাবে।',
        ur: 'بوتلوں کی ترتیب، بھرائی، کیپ کی چھانٹی، کیپ لگانا اور رولنگ خودکار۔',
        fa: 'مرتب‌سازی بطری، پرکردن، مرتب‌سازی درپوش، قرارگیری و پرس درپوش به‌طور خودکار.'
      },
      specs: { model: 'FFK-100 / 200 / 300 / 400', output: '100–400 bottles/min', container: '5–30 ml oral liquid bottle', feature: 'Piston, stainless piston, ceramic or peristaltic pump options' }
    },
    {
      id: 'powder-screw', cat: 'filling', img: 'images/p09-powder-screw.jpg',
      kw: 'powder filling machine screw auger dosing vial sterile FF',
      name: {
        en: 'Screw powder filling machine', zh: '螺杆粉末灌装机',
        ja: 'スクリュー式粉末充填機', ko: '스크류 분말 충전기',
        ru: 'Шнековая машина наполнения порошком', fr: 'Remplisseuse de poudre à vis',
        es: 'Llenadora de polvo por tornillo', pt: 'Enchedora de pó por rosca',
        th: 'เครื่องบรรจุผงแบบสกรู', vi: 'Máy chiết rót bột trục vít',
        bn: 'স্ক্রু পাউডার ভরাট মেশিন', ur: 'سکرو پاؤڈر بھرنے کی مشین',
        fa: 'دستگاه پرکردن پودر اسکرو'
      },
      desc: {
        en: 'cGMP screw filler with interchangeable pitch, diameter and helix for different doses.',
        zh: '符合 cGMP 的螺杆分装机，螺距、直径与螺旋形状可按需更换。',
        ja: 'cGMP準拠のスクリュー充填機。ピッチ・直径・螺旋形状を交換可能。',
        ko: 'cGMP 준수 스크류 충전기. 피치·직경·나선 형상 교체 가능.',
        ru: 'Шнековый дозатор cGMP: сменные шаг, диаметр и форма спирали под разные дозы.',
        fr: 'Doseur à vis cGMP avec pas, diamètre et hélice interchangeables selon les doses.',
        es: 'Dosificador de tornillo cGMP con paso, diámetro y hélice intercambiables según la dosis.',
        pt: 'Dosador de rosca cGMP com passo, diâmetro e hélice intercambiáveis conforme a dose.',
        th: 'เครื่องบรรจุแบบสกรูตาม cGMP เปลี่ยนระยะเกลียว เส้นผ่านศูนย์กลาง และรูปเกลียวได้',
        vi: 'Máy định lượng trục vít đạt cGMP, có thể thay đổi bước, đường kính và dạng xoắn.',
        bn: 'সিজিএমপি স্ক্রু ফিলার, বিভিন্ন ডোজের জন্য পিচ, ব্যাস ও হেলিক্স বদলানো যায়।',
        ur: 'cGMP سکرو فلر، مختلف خوراکوں کے لیے پچ، قطر اور ہیلکس تبدیل کیا جا سکتا ہے۔',
        fa: 'پرکن اسکرو cGMP با گام، قطر و مارپیچ قابل تعویض برای دوزهای مختلف.'
      },
      specs: { model: 'FF-100 / 200 / 300', output: '50–200 vials/min', container: '1–100 ml vial', accuracy: '±1% – ±8%', feature: 'Dosing range 50–5000 mg, 1 / 2 / 4 heads' }
    },
    {
      id: 'powder-air', cat: 'filling', img: 'images/p10-powder-air.jpg',
      kw: 'powder filling machine airflow vacuum porous filter dosing vial',
      name: {
        en: 'Airflow powder filling machine', zh: '气流粉末分装机',
        ja: '気流式粉末充填機', ko: '기류식 분말 충전기',
        ru: 'Вакуумно-воздушная машина наполнения порошком', fr: 'Remplisseuse de poudre à air',
        es: 'Llenadora de polvo por aire', pt: 'Enchedora de pó por ar',
        th: 'เครื่องบรรจุผงแบบลม', vi: 'Máy chiết rót bột khí nén',
        bn: 'এয়ারফ্লো পাউডার ভরাট মেশিন', ur: 'ایئر فلو پاؤڈر بھرنے کی مشین',
        fa: 'دستگاه پرکردن پودر با جریان هوا'
      },
      desc: {
        en: 'Vacuum draws a metered dose through a porous filter, then dry compressed air blows it into the vial.',
        zh: '真空经多孔滤网吸取定量粉剂，再由干燥压缩空气吹入瓶内。',
        ja: '真空で多孔質フィルター越しに定量吸引し、乾燥圧縮空気でバイアルへ吹き込む。',
        ko: '진공으로 다공성 필터를 통해 정량 흡입 후, 건조 압축공기로 바이알에 불어넣음.',
        ru: 'Вакуум втягивает дозу через пористый фильтр, затем сухой сжатый воздух переносит её во флакон.',
        fr: 'Le vide aspire la dose à travers un filtre poreux, puis l’air comprimé sec la propulse dans le flacon.',
        es: 'El vacío aspira la dosis a través de un filtro poroso y el aire comprimido seco la impulsa al vial.',
        pt: 'O vácuo aspira a dose através de um filtro poroso e o ar comprimido seco a impulsiona para o frasco.',
        th: 'ใช้สุญญากาศดูดผงผ่านแผ่นกรองพรุน แล้วใช้ลมอัดแห้งเป่าเข้าขวด',
        vi: 'Dùng chân không hút liều qua màng lọc xốp, rồi khí nén khô thổi vào lọ.',
        bn: 'ভ্যাকুয়াম ছিদ্রযুক্ত ফিল্টার দিয়ে ডোজ টেনে নেয়, এরপর শুকনো সংকুচিত বাতাসে ভায়ালে ফুঁক দেয়।',
        ur: 'ویکیوم غیرمحفوظ فلٹر کے ذریعے خوراک کھینچتا ہے، پھر خشک کمپریسڈ ہوا اسے شیشی میں پھونک دیتی ہے۔',
        fa: 'خلأ دوز را از صافی متخلخل می‌کشد، سپس هوای فشرده خشک آن را به درون ویال می‌دمد.'
      },
      specs: { model: 'FF-100 / 200 / 300', output: '20–80 vials/min', container: '2–100 ml vial', accuracy: '±1% – ±8%', feature: 'Dosing range 20–1000 mg, minimal mechanical friction' }
    },
    {
      id: 'cartridge-filler', cat: 'filling', img: 'images/p11-cartridge-filler.jpg',
      kw: 'cartridge filling machine filler dental insulin pen FFC',
      name: {
        en: 'Cartridge filling machine', zh: '卡式瓶灌装机',
        ja: 'カートリッジ充填機', ko: '카트리지 충전기',
        ru: 'Машина наполнения картриджей', fr: 'Machine de remplissage de cartouches',
        es: 'Máquina llenadora de cartuchos', pt: 'Máquina de enchimento de cartuchos',
        th: 'เครื่องบรรจุคาร์ทริดจ์', vi: 'Máy chiết rót cartridge',
        bn: 'কার্ট্রিজ ভরাট মেশিন', ur: 'کارٹریج بھرنے کی مشین',
        fa: 'دستگاه پرکردن کارتریج'
      },
      desc: {
        en: 'Aseptic filler for cartridges, designed to cGMP and FDA requirements.',
        zh: '面向卡式瓶的无菌灌装机，符合 cGMP 与 FDA 要求。',
        ja: 'カートリッジ用無菌充填機。cGMP・FDA要件に準拠。',
        ko: '카트리지용 무균 충전기. cGMP·FDA 요건 준수.',
        ru: 'Асептический наполнитель картриджей, соответствующий требованиям cGMP и FDA.',
        fr: 'Remplisseuse aseptique pour cartouches, conforme aux exigences cGMP et FDA.',
        es: 'Llenadora aséptica para cartuchos, conforme a los requisitos cGMP y FDA.',
        pt: 'Enchedora asséptica para cartuchos, conforme requisitos cGMP e FDA.',
        th: 'เครื่องบรรจุปลอดเชื้อสำหรับคาร์ทริดจ์ ตามข้อกำหนด cGMP และ FDA',
        vi: 'Máy chiết rót vô trùng cho cartridge, đáp ứng cGMP và FDA.',
        bn: 'কার্ট্রিজের জন্য অ্যাসেপটিক ফিলার, cGMP ও FDA প্রয়োজনীয়তা অনুযায়ী।',
        ur: 'کارٹریج کے لیے ایسپٹک فلر، cGMP اور FDA تقاضوں کے مطابق۔',
        fa: 'پرکن آسپتیک کارتریج مطابق الزامات cGMP و FDA.'
      },
      specs: { model: 'FFC-100 / 150 / 200', output: '100–200 cartridges/min', container: 'Cartridge 1–5 ml', accuracy: '±1%', feature: 'Filling range 2–30 ml, nitrogen purging, CIP/SIP' }
    },
    {
      id: 'spray-filler', cat: 'filling', img: 'images/p12-spray-filler.jpg',
      kw: 'spray filling capping machine nasal spray eye drop vial FFD',
      name: {
        en: 'Spray filling & capping machine', zh: '喷雾剂灌装轧盖机',
        ja: 'スプレー充填・打栓機', ko: '스프레이 충전 캡핑기',
        ru: 'Машина наполнения и укупорки спреев', fr: 'Machine de remplissage et capsulage de sprays',
        es: 'Máquina de llenado y tapado de sprays', pt: 'Máquina de enchimento e fechamento de sprays',
        th: 'เครื่องบรรจุและปิดฝาสเปรย์', vi: 'Máy chiết rót & đóng nắp dạng xịt',
        bn: 'স্প্রে ভরাট ও ক্যাপিং মেশিন', ur: 'سپرے بھرنے اور کیپنگ مشین',
        fa: 'دستگاه پرکردن و دربندی اسپری'
      },
      desc: {
        en: 'Servo filling and capping for spray vials, with nitrogen purging and CIP/SIP options.',
        zh: '喷雾剂瓶的伺服灌装与轧盖，可配前后充氮与 CIP/SIP。',
        ja: 'スプレー容器のサーボ充填・打栓。前後窒素置換・CIP/SIP対応可。',
        ko: '스프레이 용기 서보 충전·캡핑. 전후 질소 퍼지·CIP/SIP 옵션.',
        ru: 'Сервонаполнение и укупорка флаконов-спреев, опции продувки азотом и CIP/SIP.',
        fr: 'Remplissage et capsulage servo pour flacons spray, avec options de purge à l’azote et NEP/SEP.',
        es: 'Llenado y tapado servo para frascos de spray, con opciones de purga de nitrógeno y CIP/SIP.',
        pt: 'Enchimento e fechamento servo para frascos de spray, com opções de purga de nitrogênio e CIP/SIP.',
        th: 'บรรจุและปิดฝาด้วยเซอร์โวสำหรับขวดสเปรย์ มีตัวเลือกไล่ไนโตรเจนและ CIP/SIP',
        vi: 'Chiết rót & đóng nắp servo cho chai xịt, có tùy chọn sục nitơ và CIP/SIP.',
        bn: 'স্প্রে ভায়ালের সার্ভো ভরাট ও ক্যাপিং, নাইট্রোজেন পার্জিং ও CIP/SIP অপশনসহ।',
        ur: 'سپرے شیشیوں کے لیے سروو بھرائی اور کیپنگ، نائٹروجن پرج اور CIP/SIP کے آپشنز کے ساتھ۔',
        fa: 'پرکردن و دربندی سروو برای ویال اسپری با گزینه‌های پرج نیتروژن و CIP/SIP.'
      },
      specs: { model: 'FFD-100 / 150 / 200', output: '100–200 vials/min', container: '2–30 ml vial', accuracy: '±1%', feature: 'Nitrogen purging, CIP/SIP, tool-free format change' }
    },
    {
      id: 'capper', cat: 'capping', img: 'images/p13-capper.jpg',
      kw: 'capping machine capper crimping vial aluminium cap RABS isolator FC',
      name: {
        en: 'Vial capping machine', zh: '西林瓶轧盖机',
        ja: 'バイアル打栓機', ko: '바이알 캡핑기',
        ru: 'Машина обжима колпачков флаконов', fr: 'Capsuleuse pour flacons',
        es: 'Capsuladora para viales', pt: 'Fechadora para frascos',
        th: 'เครื่องปิดฝาขวดไวอัล', vi: 'Máy đóng nắp lọ vial',
        bn: 'ভায়াল ক্যাপিং মেশিন', ur: 'شیشی کیپنگ مشین',
        fa: 'دستگاه دربندی ویال'
      },
      desc: {
        en: 'cGMP capper for medium to large vial lines, integrable with isolator or RABS.',
        zh: '符合 cGMP 的中大型西林瓶轧盖机，可配套隔离器或 RABS。',
        ja: 'cGMP準拠の中〜大型バイアル打栓機。アイソレータ・RABSと統合可能。',
        ko: 'cGMP 준수 중대형 바이알 캡핑기. 아이솔레이터·RABS 통합 가능.',
        ru: 'Укупорочная машина cGMP для средних и крупных линий, интегрируется с изолятором или RABS.',
        fr: 'Capsuleuse cGMP pour lignes de flacons moyennes et grandes, intégrable à un isolateur ou RABS.',
        es: 'Capsuladora cGMP para líneas de viales medianas y grandes, integrable con aislador o RABS.',
        pt: 'Fechadora cGMP para linhas de frascos médias e grandes, integrável com isolador ou RABS.',
        th: 'เครื่องปิดฝาสำหรับสายการผลิตขนาดกลางถึงใหญ่ ตาม cGMP รองรับไอโซเลเตอร์หรือ RABS',
        vi: 'Máy đóng nắp đạt cGMP cho dây chuyền vial trung bình – lớn, tích hợp được isolator hoặc RABS.',
        bn: 'মাঝারি থেকে বড় ভায়াল লাইনের জন্য সিজিএমপি ক্যাপার, আইসোলেটর বা RABS-এর সাথে সংযোগযোগ্য।',
        ur: 'درمیانے سے بڑے شیشی لائنوں کے لیے cGMP کیپر، آئسولیٹر یا RABS کے ساتھ مربوط۔',
        fa: 'دربندنمای cGMP برای خطوط متوسط تا بزرگ ویال، قابل ادغام با ایزولاتور یا RABS.'
      },
      specs: { model: 'FC-020 / 040 / 120 / 300', output: '20–500 vials/min', container: '2–100 ml vial', feature: 'Breakage rate 0.05%, rejection of missing stopper/cap, vision option' }
    },
    {
      id: 'pfs-filler', cat: 'filling', img: 'images/p14-pfs-filler.jpg',
      kw: 'PFS prefilled syringe nest filling machine RTU stoppering vacuum cartridge vial',
      name: {
        en: 'Nest syringe (PFS) filling machine', zh: 'PFS 预充针灌装机',
        ja: 'ネスト式シリンジ（PFS）充填機', ko: '네스트 시린지(PFS) 충전기',
        ru: 'Машина наполнения шприцев PFS в гнёздах', fr: 'Machine de remplissage de seringues en nid (PFS)',
        es: 'Máquina llenadora de jeringas en nido (PFS)', pt: 'Máquina de enchimento de seringas em ninho (PFS)',
        th: 'เครื่องบรรจุกระบอกฉีดยาแบบถาด (PFS)', vi: 'Máy chiết rót ống tiêm dạng khay (PFS)',
        bn: 'নেস্ট সিরিঞ্জ (PFS) ভরাট মেশিন', ur: 'نیسٹ سرنج (PFS) بھرنے کی مشین',
        fa: 'دستگاه پرکردن سرنگ سینی‌ای (PFS)'
      },
      desc: {
        en: 'Three-in-one aseptic filler for RTU nested syringes, vials and cartridges.',
        zh: '三合一无菌灌装机，处理巢板包装的即用型预充针、西林瓶与卡式瓶。',
        ja: 'RTUネスト式シリンジ・バイアル・カートリッジに対応する3in1無菌充填機。',
        ko: 'RTU 네스트 시린지·바이알·카트리지 대응 3in1 무균 충전기.',
        ru: 'Асептический наполнитель «три в одном» для готовых шприцев, флаконов и картриджей в гнёздах.',
        fr: 'Remplisseuse aseptique trois-en-un pour seringues, flacons et cartouches RTU en nid.',
        es: 'Llenadora aséptica tres en uno para jeringas, viales y cartuchos RTU en nido.',
        pt: 'Enchedora asséptica três em um para seringas, frascos e cartuchos RTU em ninho.',
        th: 'เครื่องบรรจุปลอดเชื้อ 3-in-1 สำหรับกระบอกฉีดยา ขวดไวอัล และคาร์ทริดจ์แบบ RTU',
        vi: 'Máy chiết rót vô trùng 3-trong-1 cho ống tiêm, vial và cartridge RTU dạng khay.',
        bn: 'RTU নেস্টেড সিরিঞ্জ, ভায়াল ও কার্ট্রিজের জন্য থ্রি-ইন-ওয়ান অ্যাসেপটিক ফিলার।',
        ur: 'RTU نیسٹڈ سرنجوں، شیشیوں اور کارٹریجز کے لیے تین میں ایک ایسپٹک فلر۔',
        fa: 'پرکن آسپتیک سه‌کاره برای سرنگ، ویال و کارتریج RTU در سینی.'
      },
      specs: { model: 'PFS-M / PFS-P (1–10 filling heads)', container: 'RTU nest: syringe, vial, cartridge', feature: 'Mechanical or vacuum stoppering, submerged filling, modular' }
    },
    {
      id: 'lyophilizer', cat: 'lab', img: 'images/p15-lyophilizer.jpg',
      kw: 'lyophilizer freeze dryer lyophilisation laboratory vaccine API CIP SIP',
      name: {
        en: 'Lyophilizer (freeze dryer)', zh: '冻干机',
        ja: '凍結乾燥機（ライオフィライザー）', ko: '동결건조기',
        ru: 'Лиофилизатор (сублимационная сушка)', fr: 'Lyophilisateur',
        es: 'Liofilizador', pt: 'Liofilizador',
        th: 'เครื่องทำแห้งเยือกแข็ง', vi: 'Máy sấy thăng hoa (đông khô)',
        bn: 'লায়োফিলাইজার (ফ্রিজ ড্রায়ার)', ur: 'لائوفلائزر (فریز ڈرائر)',
        fa: 'لیوفیلایزر (خشک‌کن انجمادی)'
      },
      desc: {
        en: 'Freeze dryer for temperature-sensitive products: vaccines, antibodies, diagnostics, APIs.',
        zh: '面向疫苗、抗体、诊断试剂与原料药等热敏产品的冻干设备。',
        ja: 'ワクチン・抗体・診断薬・原薬など熱に弱い製品向け凍結乾燥機。',
        ko: '백신·항체·진단시약·원료의약품 등 열에 약한 제품용 동결건조기.',
        ru: 'Сублимационная сушка для термочувствительных продуктов: вакцин, антител, диагностикумов и АФИ.',
        fr: 'Lyophilisateur pour produits thermosensibles : vaccins, anticorps, diagnostics et principes actifs.',
        es: 'Liofilizador para productos termosensibles: vacunas, anticuerpos, diagnósticos y API.',
        pt: 'Liofilizador para produtos termossensíveis: vacinas, anticorpos, diagnósticos e APIs.',
        th: 'สำหรับผลิตภัณฑ์ไวต่ออุณหภูมิ: วัคซีน แอนติบอดี น้ำยาวินิจฉัย และ API',
        vi: 'Dành cho sản phẩm nhạy nhiệt: vắc-xin, kháng thể, chẩn đoán và API.',
        bn: 'তাপ-সংবেদনশীল পণ্যের জন্য: ভ্যাকসিন, অ্যান্টিবডি, ডায়াগনস্টিক ও এপিআই।',
        ur: 'درجہ حرارت سے حساس مصنوعات کے لیے: ویکسین، اینٹی باڈیز، تشخیصی کٹس اور APIs۔',
        fa: 'برای محصولات حساس به دما: واکسن، آنتی‌بادی، تشخیصی و API.'
      },
      specs: { feature: 'Precise temperature & vacuum control, integrated CIP/SIP', cert: 'FDA, cGMP, 21 CFR Part 11', container: 'Vial & API bulk' }
    },
    {
      id: 'isolator', cat: 'capping', img: 'images/p16-isolator.jpg',
      kw: 'isolator containment RABS glove HEPA grade A aseptic RTP airlock',
      name: {
        en: 'Isolator system', zh: '隔离器系统',
        ja: 'アイソレータシステム', ko: '아이솔레이터 시스템',
        ru: 'Изоляторная система', fr: 'Système d’isolateur',
        es: 'Sistema de aislador', pt: 'Sistema de isolador',
        th: 'ระบบไอโซเลเตอร์', vi: 'Hệ thống isolator',
        bn: 'আইসোলেটর সিস্টেম', ur: 'آئسولیٹر سسٹم',
        fa: 'سیستم ایزولاتور'
      },
      desc: {
        en: 'Hard-wall sealed enclosure maintaining dynamic Grade A for aseptic processing.',
        zh: '硬墙式密闭系统，内部维持动态 A 级无菌环境。',
        ja: '硬質壁の密閉エンクロージャ。動的グレードAを維持し無菌処理に対応。',
        ko: '경질벽 밀폐 인클로저. 동적 그레이드A를 유지해 무균 공정에 대응.',
        ru: 'Жёсткая герметичная камера, поддерживающая динамический класс A для асептического процесса.',
        fr: 'Enceinte étanche à parois rigides maintenant un grade A dynamique pour le procédé aseptique.',
        es: 'Recinto estanco de paredes rígidas que mantiene grado A dinámico para el proceso aséptico.',
        pt: 'Câmara estanque de paredes rígidas que mantém grau A dinâmico para o processo asséptico.',
        th: 'ห้องปิดผนึกแข็ง รักษาสภาพเกรด A แบบไดนามิกสำหรับกระบวนการปลอดเชื้อ',
        vi: 'Buồng kín vách cứng duy trì cấp A động cho quy trình vô trùng.',
        bn: 'হার্ড-ওয়াল সিলড এনক্লোজার, অ্যাসেপটিক প্রক্রিয়ার জন্য ডাইনামিক গ্রেড-এ বজায় রাখে।',
        ur: 'سخت دیواروں والا بند انکلوژر جو ایسپٹک عمل کے لیے متحرک گریڈ A برقرار رکھتا ہے۔',
        fa: 'محفظه درزبندی‌شده با دیواره صلب که گرید A پویا را برای فرایند آسپتیک حفظ می‌کند.'
      },
      specs: { filter: 'H14 HEPA, PAO scan-tested', decontam: 'H₂O₂ vapour, 6-log reduction', feature: 'Stainless steel + toughened glass, RTP or airlock transfer' }
    },
    {
      id: 'inspection', cat: 'capping', img: 'images/p17-inspection.jpg',
      kw: 'visual inspection machine camera vial ampoule particle check HGA VI',
      name: {
        en: 'Visual inspection machine', zh: '灯检机',
        ja: '外観検査機', ko: '외관 검사기',
        ru: 'Машина визуального контроля', fr: 'Machine d’inspection visuelle',
        es: 'Máquina de inspección visual', pt: 'Máquina de inspeção visual',
        th: 'เครื่องตรวจสอบด้วยภาพ', vi: 'Máy soi kiểm tra',
        bn: 'ভিজ্যুয়াল পরিদর্শন মেশিন', ur: 'بصری معائنہ مشین',
        fa: 'دستگاه بازرسی چشمی'
      },
      desc: {
        en: 'Automated inspection for vials, ampoules and oral liquid bottles.',
        zh: '适用于西林瓶、安瓿瓶与口服液瓶的自动检测设备。',
        ja: 'バイアル・アンプル・経口液ボトルの自動外観検査。',
        ko: '바이알·앰플·경구액 병의 자동 외관 검사.',
        ru: 'Автоматический контроль флаконов, ампул и флаконов для пероральных жидкостей.',
        fr: 'Inspection automatique des flacons, ampoules et flacons de liquides oraux.',
        es: 'Inspección automática de viales, ampollas y frascos de líquidos orales.',
        pt: 'Inspeção automática de frascos, ampolas e frascos de líquidos orais.',
        th: 'ตรวจสอบอัตโนมัติสำหรับขวดไวอัล หลอดแอมพูล และขวดยาน้ำ',
        vi: 'Kiểm tra tự động cho lọ vial, ống ampoule và chai thuốc nước.',
        bn: 'ভায়াল, অ্যাম্পুল ও ওরাল লিকুইড বোতলের স্বয়ংক্রিয় পরিদর্শন।',
        ur: 'شیشیوں، ایمپولوں اور زبانی مائع کی بوتلوں کا خودکار معائنہ۔',
        fa: 'بازرسی خودکار ویال، آمپول و بطری‌های مایع خوراکی.'
      },
      specs: { model: 'VI-100 / 200 / 400 / 500', output: '100–500 containers/min', container: '2–30 ml', feature: 'Up to 5 camera stations, optional HGA headspace analysis' }
    },
    {
      id: 'lab-vial-filler', cat: 'lab', img: 'images/p18-lab-vial-filler.jpg',
      kw: 'laboratory bench-top vial filling machine small batch R&D peristaltic',
      name: {
        en: 'Laboratory vial filling machine', zh: '西林瓶小试灌装机',
        ja: '実験室用バイアル充填機', ko: '실험실용 바이알 충전기',
        ru: 'Лабораторная машина наполнения флаконов', fr: 'Remplisseuse de flacons de laboratoire',
        es: 'Llenadora de viales de laboratorio', pt: 'Enchedora de frascos de laboratório',
        th: 'เครื่องบรรจุขวดไวอัลระดับห้องปฏิบัติการ', vi: 'Máy chiết rót vial phòng thí nghiệm',
        bn: 'ল্যাবরেটরি ভায়াল ভরাট মেশিন', ur: 'لیبارٹری شیشی بھرنے کی مشین',
        fa: 'دستگاه پرکردن ویال آزمایشگاهی'
      },
      desc: {
        en: 'Portable bench-top filler for installation inside an isolator or biosafety cabinet.',
        zh: '便携式台式设备，可置于隔离器或生物安全柜内操作。',
        ja: '可搬型卓上充填機。アイソレータや安全キャビネット内に設置可能。',
        ko: '이동식 탁상 충전기. 아이솔레이터·생물안전캐비닛 내 설치 가능.',
        ru: 'Портативный настольный наполнитель для установки внутри изолятора или бокса биобезопасности.',
        fr: 'Remplisseuse de paillasse portable, installable dans un isolateur ou une enceinte de biosécurité.',
        es: 'Llenadora de sobremesa portátil, instalable en aislador o cabina de bioseguridad.',
        pt: 'Enchedora de bancada portátil, instalável em isolador ou cabine de biossegurança.',
        th: 'เครื่องตั้งโต๊ะแบบพกพา ติดตั้งในไอโซเลเตอร์หรือตู้ความปลอดภัยชีวภาพได้',
        vi: 'Thiết bị để bàn di động, lắp được bên trong isolator hoặc tủ an toàn sinh học.',
        bn: 'পোর্টেবল বেঞ্চ-টপ ফিলার, আইসোলেটর বা বায়োসেফটি ক্যাবিনেটের ভেতরে বসানো যায়।',
        ur: 'پورٹیبل بینچ ٹاپ فلر، آئسولیٹر یا بائیو سیفٹی کیبنٹ کے اندر نصب کیا جا سکتا ہے۔',
        fa: 'پرکن رومیزی قابل‌حمل، قابل نصب در ایزولاتور یا کابینت ایمنی زیستی.'
      },
      specs: { size: '≈750 × 550 × 600 mm', weight: '≈50 kg', power: '2P / 220 V', output: '10–15 vials/min', container: '2–20 ml' }
    },
    {
      id: 'pfs-semi', cat: 'lab', img: 'images/p19-pfs-semi.jpg',
      kw: 'PFS semi-automatic filling machine syringe nest laboratory R&D small batch',
      name: {
        en: 'PFS semi-automatic filling machine', zh: 'PFS 半自动灌装机',
        ja: 'PFS半自動充填機', ko: 'PFS 반자동 충전기',
        ru: 'Полуавтоматическая машина наполнения шприцев PFS', fr: 'Machine de remplissage semi-automatique PFS',
        es: 'Máquina llenadora semiautomática PFS', pt: 'Máquina de enchimento semiautomática PFS',
        th: 'เครื่องบรรจุ PFS กึ่งอัตโนมัติ', vi: 'Máy chiết rót PFS bán tự động',
        bn: 'পিএফএস আধা-স্বয়ংক্রিয় ভরাট মেশিন', ur: 'PFS نیم خودکار بھرنے کی مشین',
        fa: 'دستگاه نیمه‌خودکار پرکردن PFS'
      },
      desc: {
        en: 'Manual load/unload with automatic filling and stoppering for development batches.',
        zh: '人工上下料，自动完成灌装与压塞，适用于研发小批量。',
        ja: '手動での投入・取出し、充填・打栓は自動。開発用小ロット向け。',
        ko: '수동 투입·배출, 충전·마개는 자동. 개발용 소로트 대응.',
        ru: 'Ручная загрузка и выгрузка при автоматическом наполнении и укупорке — для опытных серий.',
        fr: 'Chargement et déchargement manuels avec remplissage et bouchage automatiques pour lots de développement.',
        es: 'Carga y descarga manuales con llenado y taponado automáticos para lotes de desarrollo.',
        pt: 'Carga e descarga manuais com enchimento e batoque automáticos para lotes de desenvolvimento.',
        th: 'โหลดและถอดด้วยมือ แต่บรรจุและใส่จุกอัตโนมัติ สำหรับล็อตพัฒนา',
        vi: 'Nạp/tháo liệu thủ công, chiết rót và đậy nút tự động cho lô R&D.',
        bn: 'ম্যানুয়াল লোড/আনলোড, স্বয়ংক্রিয় ভরাট ও স্টপারিং—ডেভেলপমেন্ট ব্যাচের জন্য।',
        ur: 'دستی لوڈ/ان لوڈ، خودکار بھرائی اور سٹاپرنگ—ڈیولپمنٹ بیچز کے لیے۔',
        fa: 'بارگیری/تخلیه دستی با پرکردن و درپوش‌گذاری خودکار برای بچ‌های توسعه.'
      },
      specs: { container: '0.5–20 ml prefilled syringe', feature: 'Peristaltic or ceramic pump, mechanical or vacuum stoppering', size: 'Portable — fits inside isolator or RABS' }
    },
    {
      id: 'softbag-filler', cat: 'lab', img: 'images/p20-softbag-filler.jpg',
      kw: 'soft bag filling machine laboratory weighing gravimetric IV bag',
      name: {
        en: 'Laboratory soft-bag filling machine', zh: '软袋小试灌装机',
        ja: '実験室用ソフトバッグ充填機', ko: '실험실용 소프트백 충전기',
        ru: 'Лабораторная машина наполнения мягких контейнеров', fr: 'Remplisseuse de poches souples de laboratoire',
        es: 'Llenadora de bolsas flexibles de laboratorio', pt: 'Enchedora de bolsas flexíveis de laboratório',
        th: 'เครื่องบรรจุถุงนิ่มระดับห้องปฏิบัติการ', vi: 'Máy chiết rót túi mềm phòng thí nghiệm',
        bn: 'ল্যাবরেটরি নরম-ব্যাগ ভরাট মেশিন', ur: 'لیبارٹری نرم تھیلا بھرنے کی مشین',
        fa: 'دستگاه پرکردن کیسه نرم آزمایشگاهی'
      },
      desc: {
        en: 'Gravimetric filling for soft bags during lab-scale development.',
        zh: '面向实验室开发阶段软袋类产品的称重灌装设备。',
        ja: 'ラボスケール開発時のソフトバッグ向け重量式充填機。',
        ko: '랩 규모 개발 시 소프트백용 중량식 충전기.',
        ru: 'Гравиметрическое наполнение мягких контейнеров на стадии лабораторной разработки.',
        fr: 'Remplissage gravimétrique de poches souples en phase de développement au laboratoire.',
        es: 'Llenado gravimétrico de bolsas flexibles en fase de desarrollo de laboratorio.',
        pt: 'Enchimento gravimétrico de bolsas flexíveis na fase de desenvolvimento em laboratório.',
        th: 'การบรรจุแบบชั่งน้ำหนักสำหรับถุงนิ่มในขั้นตอนพัฒนาระดับห้องปฏิบัติการ',
        vi: 'Chiết rót theo trọng lượng cho túi mềm ở giai đoạn phát triển trong phòng thí nghiệm.',
        bn: 'ল্যাব-স্কেল ডেভেলপমেন্টে নরম ব্যাগের জন্য ওজন-ভিত্তিক ভরাট।',
        ur: 'لیبارٹری پیمانے پر ترقی کے دوران نرم تھیلوں کی وزنی بھرائی۔',
        fa: 'پرکردن وزنی کیسه‌های نرم در مرحله توسعه آزمایشگاهی.'
      },
      specs: { feature: 'Gravimetric (weighing) filling, stable and repeatable', container: 'Mainstream soft-bag formats', size: 'Tool-free format changeover, portable' }
    },
    {
      id: 'lab-capper', cat: 'lab', img: 'images/p21-lab-capper.jpg',
      kw: 'laboratory capping machine crimper bench-top vial small batch R&D',
      name: {
        en: 'Laboratory automatic capping machine', zh: '小试轧盖机',
        ja: '実験室用自動打栓機', ko: '실험실용 자동 캡핑기',
        ru: 'Лабораторная автоматическая укупорочная машина', fr: 'Capsuleuse automatique de laboratoire',
        es: 'Capsuladora automática de laboratorio', pt: 'Fechadora automática de laboratório',
        th: 'เครื่องปิดฝาอัตโนมัติระดับห้องปฏิบัติการ', vi: 'Máy đóng nắp tự động phòng thí nghiệm',
        bn: 'ল্যাবরেটরি স্বয়ংক্রিয় ক্যাপিং মেশিন', ur: 'لیبارٹری خودکار کیپنگ مشین',
        fa: 'دستگاه دربندی خودکار آزمایشگاهی'
      },
      desc: {
        en: 'Compact bench-top crimper for aluminium caps on vials in development and small batches.',
        zh: '紧凑型台式轧盖机，用于研发与小批量西林瓶铝盖轧压。',
        ja: 'コンパクトな卓上巻き締め機。開発・小ロットのバイアルアルミキャップ用。',
        ko: '컴팩트 탁상 캡핑기. 개발·소로트 바이알 알루미늄 캡용.',
        ru: 'Компактный настольный обжимщик алюминиевых колпачков для флаконов в разработке и мелкосерийном производстве.',
        fr: 'Sertisseuse de paillasse compacte pour capsules aluminium sur flacons en développement et petits lots.',
        es: 'Engarzadora de sobremesa compacta para cápsulas de aluminio en viales, en desarrollo y lotes pequeños.',
        pt: 'Fechadora de bancada compacta para cápsulas de alumínio em frascos, em desenvolvimento e lotes pequenos.',
        th: 'เครื่องจีบฝาตั้งโต๊ะขนาดกะทัดรัด สำหรับฝาอะลูมิเนียมขวดไวอัลในงานพัฒนาและล็อตเล็ก',
        vi: 'Máy ép nắp để bàn nhỏ gọn cho nắp nhôm lọ vial trong R&D và lô nhỏ.',
        bn: 'ডেভেলপমেন্ট ও ছোট ব্যাচে ভায়ালের অ্যালুমিনিয়াম ক্যাপের জন্য কমপ্যাক্ট বেঞ্চ-টপ ক্রিম্পার।',
        ur: 'ترقی اور چھوٹے بیچز میں شیشیوں کی ایلومینیم کیپ کے لیے کمپیکٹ بینچ ٹاپ کرمپر۔',
        fa: 'پرس دربندی رومیزی فشرده برای درپوش‌های آلومینیومی ویال در توسعه و بچ‌های کوچک.'
      },
      specs: { size: '≈500 × 350 × 600 mm', weight: '≈35 kg', power: '2P / 220 V', container: '2–20 ml vial' }
    }
  ];

  /* ---------- 规格值翻译 ----------
     键 = 英文原文（与 CATALOG.specs 中的值精确对应）；
     值 = 其余 12 语翻译。纯数字/型号/单位类值（FFV-100、10–600 vials/min、±1%、220 V）
     属行业通用写法，不翻译，直接显示原文。 */
  var SPEC_T = {
    /* --- 设备组成 --- */
    'Washer + tunnel + filler/stopperer + capper': {
      zh: '洗瓶机 + 隧道烘箱 + 灌装加塞机 + 轧盖机', ja: '洗浄機＋トンネル＋充填打栓機＋キャッパー',
      ko: '세척기 + 터널 + 충전/마개기 + 캡핑기', ru: 'Мойка + туннель + наполнитель/укупорщик + обжимщик',
      fr: 'Laveuse + tunnel + remplisseuse/boucheuse + capsuleuse', es: 'Lavadora + túnel + llenadora/taponadora + capsuladora',
      pt: 'Lavadora + túnel + enchedora/batoqueira + fechadora', th: 'เครื่องล้าง + อุโมงค์ + เครื่องบรรจุ/ใส่จุก + เครื่องปิดฝา',
      vi: 'Máy rửa + đường hầm + máy rót/đậy nút + máy đóng nắp', bn: 'ওয়াশার + টানেল + ফিলার/স্টপারার + ক্যাপার',
      ur: 'واشر + ٹنل + فلر/سٹاپرر + کیپر', fa: 'واشر + تونل + پرکن/درپوش‌زن + دربندنما'
    },
    'Washer + tunnel + filling & sealing': {
      zh: '洗瓶机 + 隧道烘箱 + 灌装封口机', ja: '洗浄機＋トンネル＋充填密封機',
      ko: '세척기 + 터널 + 충전 밀봉기', ru: 'Мойка + туннель + наполнение и запайка',
      fr: 'Laveuse + tunnel + remplissage et scellage', es: 'Lavadora + túnel + llenado y sellado',
      pt: 'Lavadora + túnel + enchimento e selagem', th: 'เครื่องล้าง + อุโมงค์ + เครื่องบรรจุปิดผนึก',
      vi: 'Máy rửa + đường hầm + máy chiết rót hàn kín', bn: 'ওয়াশার + টানেল + ভরাট ও সিলিং',
      ur: 'واشر + ٹنل + بھرائی اور سیلنگ', fa: 'واشر + تونل + پرکردن و پلمپ'
    },
    'Washer + hot-air tunnel + filler & capper': {
      zh: '洗瓶机 + 热风隧道烘箱 + 灌装轧盖机', ja: '洗浄機＋熱風トンネル＋充填キャッパー',
      ko: '세척기 + 열풍 터널 + 충전 캡핑기', ru: 'Мойка + туннель горячего воздуха + наполнитель и укупорщик',
      fr: 'Laveuse + tunnel à air chaud + remplisseuse et capsuleuse', es: 'Lavadora + túnel de aire caliente + llenadora y capsuladora',
      pt: 'Lavadora + túnel de ar quente + enchedora e fechadora', th: 'เครื่องล้าง + อุโมงค์ลมร้อน + เครื่องบรรจุปิดฝา',
      vi: 'Máy rửa + đường hầm khí nóng + máy rót và đóng nắp', bn: 'ওয়াশার + হট-এয়ার টানেল + ফিলার ও ক্যাপার',
      ur: 'واشر + گرم ہوا ٹنل + فلر اور کیپر', fa: 'واشر + تونل هوای گرم + پرکن و دربندنما'
    },
    /* --- 适用规格 --- */
    '2–100 ml vial': {
      zh: '2–100ml 西林瓶', ja: '2〜100ml バイアル', ko: '2~100ml 바이알',
      ru: 'Флакон 2–100 мл', fr: 'Flacon 2–100 ml', es: 'Vial de 2–100 ml', pt: 'Frasco de 2–100 ml',
      th: 'ขวดไวอัล 2–100 มล.', vi: 'Lọ vial 2–100 ml', bn: '২–১০০ মিলি ভায়াল',
      ur: '2–100 ملی لیٹر شیشی', fa: 'ویال ۲–۱۰۰ میلی‌لیتر'
    },
    '2–30 ml vial': {
      zh: '2–30ml 西林瓶', ja: '2〜30ml バイアル', ko: '2~30ml 바이알',
      ru: 'Флакон 2–30 мл', fr: 'Flacon 2–30 ml', es: 'Vial de 2–30 ml', pt: 'Frasco de 2–30 ml',
      th: 'ขวดไวอัล 2–30 มล.', vi: 'Lọ vial 2–30 ml', bn: '২–৩০ মিলি ভায়াল',
      ur: '2–30 ملی لیٹر شیشی', fa: 'ویال ۲–۳۰ میلی‌لیتر'
    },
    '1–100 ml vial': {
      zh: '1–100ml 西林瓶', ja: '1〜100ml バイアル', ko: '1~100ml 바이알',
      ru: 'Флакон 1–100 мл', fr: 'Flacon 1–100 ml', es: 'Vial de 1–100 ml', pt: 'Frasco de 1–100 ml',
      th: 'ขวดไวอัล 1–100 มล.', vi: 'Lọ vial 1–100 ml', bn: '১–১০০ মিলি ভায়াল',
      ur: '1–100 ملی لیٹر شیشی', fa: 'ویال ۱–۱۰۰ میلی‌لیتر'
    },
    '2–20 ml vial': {
      zh: '2–20ml 西林瓶', ja: '2〜20ml バイアル', ko: '2~20ml 바이알',
      ru: 'Флакон 2–20 мл', fr: 'Flacon 2–20 ml', es: 'Vial de 2–20 ml', pt: 'Frasco de 2–20 ml',
      th: 'ขวดไวอัล 2–20 มล.', vi: 'Lọ vial 2–20 ml', bn: '২–২০ মিলি ভায়াল',
      ur: '2–20 ملی لیٹر شیشی', fa: 'ویال ۲–۲۰ میلی‌لیتر'
    },
    '1–20 ml ampoule': {
      zh: '1–20ml 安瓿瓶', ja: '1〜20ml アンプル', ko: '1~20ml 앰플',
      ru: 'Ампула 1–20 мл', fr: 'Ampoule 1–20 ml', es: 'Ampolla de 1–20 ml', pt: 'Ampola de 1–20 ml',
      th: 'หลอดแอมพูล 1–20 มล.', vi: 'Ống ampoule 1–20 ml', bn: '১–২০ মিলি অ্যাম্পুল',
      ur: '1–20 ملی لیٹر ایمپول', fa: 'آمپول ۱–۲۰ میلی‌لیتر'
    },
    '5–20 ml oral liquid bottle': {
      zh: '5–20ml 口服液瓶', ja: '5〜20ml 経口液ボトル', ko: '5~20ml 경구액 병',
      ru: 'Флакон для пероральных жидкостей 5–20 мл', fr: 'Flacon liquide oral 5–20 ml', es: 'Frasco de líquido oral 5–20 ml', pt: 'Frasco de líquido oral 5–20 ml',
      th: 'ขวดยาน้ำ 5–20 มล.', vi: 'Chai thuốc nước 5–20 ml', bn: '৫–২০ মিলি ওরাল লিকুইড বোতল',
      ur: '5–20 ملی لیٹر زبانی مائع کی بوتل', fa: 'بطری مایع خوراکی ۵–۲۰ میلی‌لیتر'
    },
    '5–30 ml oral liquid bottle': {
      zh: '5–30ml 口服液瓶', ja: '5〜30ml 経口液ボトル', ko: '5~30ml 경구액 병',
      ru: 'Флакон для пероральных жидкостей 5–30 мл', fr: 'Flacon liquide oral 5–30 ml', es: 'Frasco de líquido oral 5–30 ml', pt: 'Frasco de líquido oral 5–30 ml',
      th: 'ขวดยาน้ำ 5–30 มล.', vi: 'Chai thuốc nước 5–30 ml', bn: '৫–৩০ মিলি ওরাল লিকুইড বোতল',
      ur: '5–30 ملی لیٹر زبانی مائع کی بوتل', fa: 'بطری مایع خوراکی ۵–۳۰ میلی‌لیتر'
    },
    'Vials & ampoules': {
      zh: '西林瓶与安瓿瓶', ja: 'バイアル・アンプル', ko: '바이알·앰플',
      ru: 'Флаконы и ампулы', fr: 'Flacons et ampoules', es: 'Viales y ampollas', pt: 'Frascos e ampolas',
      th: 'ขวดไวอัลและหลอดแอมพูล', vi: 'Lọ vial & ampoule', bn: 'ভায়াল ও অ্যাম্পুল',
      ur: 'شیشیاں اور ایمپول', fa: 'ویال و آمپول'
    },
    'Cartridge 1–5 ml': {
      zh: '卡式瓶 1–5ml', ja: 'カートリッジ 1〜5ml', ko: '카트리지 1~5ml',
      ru: 'Картридж 1–5 мл', fr: 'Cartouche 1–5 ml', es: 'Cartucho de 1–5 ml', pt: 'Cartucho de 1–5 ml',
      th: 'คาร์ทริดจ์ 1–5 มล.', vi: 'Cartridge 1–5 ml', bn: 'কার্ট্রিজ ১–৫ মিলি',
      ur: 'کارٹریج 1–5 ملی لیٹر', fa: 'کارتریج ۱–۵ میلی‌لیتر'
    },
    'Vial & API bulk': {
      zh: '西林瓶与原料药散装', ja: 'バイアル・原薬バルク', ko: '바이알·원료의약품 벌크',
      ru: 'Флаконы и насыпные АФИ', fr: 'Flacons et principes actifs en vrac', es: 'Viales y API a granel', pt: 'Frascos e API a granel',
      th: 'ขวดไวอัลและ API แบบก้อน', vi: 'Lọ vial & API dạng bulk', bn: 'ভায়াল ও এপিআই বাল্ক',
      ur: 'شیشیاں اور APIs بلک', fa: 'ویال و API فله'
    },
    'RTU nest: syringe, vial, cartridge': {
      zh: 'RTU 巢板：预充针、西林瓶、卡式瓶', ja: 'RTUネスト：シリンジ・バイアル・カートリッジ', ko: 'RTU 네스트: 시린지·바이알·카트리지',
      ru: 'Гнёзда RTU: шприцы, флаконы, картриджи', fr: 'Nid RTU : seringues, flacons, cartouches', es: 'Nido RTU: jeringas, viales, cartuchos', pt: 'Ninho RTU: seringas, frascos, cartuchos',
      th: 'ถาด RTU: กระบอกฉีดยา ขวดไวอัล คาร์ทริดจ์', vi: 'Khay RTU: ống tiêm, vial, cartridge', bn: 'RTU নেস্ট: সিরিঞ্জ, ভায়াল, কার্ট্রিজ',
      ur: 'RTU نیسٹ: سرنج، شیشی، کارٹریج', fa: 'سینی RTU: سرنگ، ویال، کارتریج'
    },
    '0.5–20 ml prefilled syringe': {
      zh: '0.5–20ml 预充式注射器', ja: '0.5〜20ml プレフィルドシリンジ', ko: '0.5~20ml 프리필드 시린지',
      ru: 'Предзаполненный шприц 0,5–20 мл', fr: 'Seringue préremplie 0,5–20 ml', es: 'Jeringa precargada de 0,5–20 ml', pt: 'Seringa pré-cheia de 0,5–20 ml',
      th: 'กระบอกฉีดยาพร้อมใช้ 0.5–20 มล.', vi: 'Ống tiêm đóng sẵn 0,5–20 ml', bn: '০.৫–২০ মিলি প্রিফিলড সিরিঞ্জ',
      ur: '0.5–20 ملی لیٹر پہلے سے بھری سرنج', fa: 'سرنگ از پیش پرشده ۰٫۵–۲۰ میلی‌لیتر'
    },
    'Mainstream soft-bag formats': {
      zh: '主流软袋规格', ja: '主流ソフトバッグ規格', ko: '주류 소프트백 규격',
      ru: 'Стандартные форматы мягких контейнеров', fr: 'Formats de poches souples courants', es: 'Formatos estándar de bolsas flexibles', pt: 'Formatos padrão de bolsas flexíveis',
      th: 'รูปแบบถุงนิ่มทั่วไป', vi: 'Các định dạng túi mềm phổ biến', bn: 'প্রচলিত নরম ব্যাগ ফরম্যাট',
      ur: 'عام سافٹ بیگ فارمیٹس', fa: 'فرمت‌های رایج کیسه نرم'
    },
    /* --- 生产速度 --- */
    '40–160 washing needles': {
      zh: '40–160 根洗瓶针', ja: '洗浄ニードル40〜160本', ko: '세척 니들 40–160개',
      ru: '40–160 моечных игл', fr: '40–160 aiguilles de lavage', es: '40–160 agujas de lavado', pt: '40–160 agulhas de lavagem',
      th: 'เข็มล้าง 40–160 ตัว', vi: '40–160 kim rửa', bn: '৪০–১৬০টি ওয়াশিং নিডল',
      ur: '40–160 واشنگ نیدلز', fa: '۴۰–۱۶۰ سوزن شست‌وشو'
    },
    /* --- 灌装精度 --- */
    '±0.5% (2 ml water-like)': {
      zh: '±0.5%（2ml 水样液）', ja: '±0.5%（2ml 水様液）', ko: '±0.5% (2ml 수용액 기준)',
      ru: '±0,5% (2 мл, водоподобный раствор)', fr: '±0,5 % (2 ml liquide aqueux)', es: '±0,5% (2 ml líquido acuoso)', pt: '±0,5% (2 ml líquido aquoso)',
      th: '±0.5% (2 มล. ของเหลวคล้ายน้ำ)', vi: '±0,5% (2 ml dung dịch dạng nước)', bn: '±০.৫% (২ মিলি পানি-সদৃশ)',
      ur: '±0.5% (2 ملی لیٹر پانی جیسا)', fa: '±۰٫۵٪ (۲ میلی‌لیتر محلول آبی)'
    },
    /* --- 型号 --- */
    'PFS-M / PFS-P (1–10 filling heads)': {
      zh: 'PFS-M / PFS-P（1–10 个灌装头）', ja: 'PFS-M / PFS-P（1〜10充填ヘッド）', ko: 'PFS-M / PFS-P (1–10 충전 헤드)',
      ru: 'PFS-M / PFS-P (1–10 наполнителей)', fr: 'PFS-M / PFS-P (1–10 têtes de remplissage)', es: 'PFS-M / PFS-P (1–10 cabezales de llenado)', pt: 'PFS-M / PFS-P (1–10 cabeças de enchimento)',
      th: 'PFS-M / PFS-P (หัวบรรจุ 1–10 หัว)', vi: 'PFS-M / PFS-P (1–10 đầu chiết rót)', bn: 'পিএফএস-এম / পিএফএস-পি (১–১০ ভরাট হেড)',
      ur: 'PFS-M / PFS-P (1–10 فلنگ ہیڈز)', fa: 'PFS-M / PFS-P (۱–۱۰ نازل پرکن)'
    },
    /* --- 主要特点 --- */
    'Ceramic piston pump, peristaltic or time-pressure filling': {
      zh: '陶瓷柱塞泵，可选蠕动泵或时压式灌装', ja: 'セラミックピストンポンプ、チューブポンプまたは時圧式充填に対応', ko: '세라믹 피스톤 펌프, 튜브 펌프 또는 시간-압력 충전',
      ru: 'Керамический плунжерный насос, перистальтическое или время-давностное дозирование', fr: 'Pompe à piston céramique, remplissage péristaltique ou temps-pression', es: 'Bomba de pistón cerámico, llenado peristáltico o tiempo-presión', pt: 'Bomba de pistão cerâmico, enchimento peristáltico ou tempo-pressão',
      th: 'ปั๊มลูกสูบเซรามิก รองรับบรรจุแบบเพริสตอลติกหรือเวลา-แรงดัน', vi: 'Bơm piston gốm, chiết rót kiểu ống lót hoặc thời gian-áp suất', bn: 'সিরামিক পিস্টন পাম্প, পেরিস্টলটিক বা টাইম-প্রেসার ভরাট',
      ur: 'سیرامک پسٹن پمپ، پرستالٹک یا ٹائم پریشر بھرائی', fa: 'پمپ پیستون سرامیکی، پرکردن پریستالتیک یا زمان-فشار'
    },
    'Ceramic or peristaltic pump filling': {
      zh: '陶瓷泵或蠕动泵灌装', ja: 'セラミックポンプまたはチューブポンプ充填', ko: '세라믹 펌프 또는 튜브 펌프 충전',
      ru: 'Дозирование керамическим или перистальтическим насосом', fr: 'Remplissage par pompe céramique ou péristaltique', es: 'Llenado con bomba cerámica o peristáltica', pt: 'Enchimento com bomba cerâmica ou peristáltica',
      th: 'บรรจุด้วยปั๊มเซรามิกหรือเพริสตอลติก', vi: 'Chiết rót bằng bơm gốm hoặc ống lót', bn: 'সিরামিক বা পেরিস্টলটিক পাম্প ভরাট',
      ur: 'سیرامک یا پرستالٹک پمپ بھرائی', fa: 'پرکردن با پمپ سرامیکی یا پریستالتیک'
    },
    '≥3-log particle removal, WFI recirculation, silicone option': {
      zh: '≥3 级微粒去除，注射水循环，可选硅胶管', ja: '3ログ以上の粒子除去、注射用水循環、シリコンオプション', ko: '3-log 이상 입자 제거, 주사용수 순환, 실리콘 옵션',
      ru: 'Удаление частиц ≥3-log, рециркуляция WFI, опция силикона', fr: 'Élimination des particules ≥3-log, recirculation d’eau pour injection, option silicone', es: 'Eliminación de partículas ≥3-log, recirculación de agua para inyectables, opción de silicona', pt: 'Remoção de partículas ≥3-log, recirculação de água para injetáveis, opção de silicone',
      th: 'กำจัดอนุภาค ≥3-log หมุนเวียนน้ำสำหรับฉีด มีตัวเลือกท่อซิลิโคน', vi: 'Loại bỏ hạt ≥3-log, tuần hoàn nước pha tiêm, tùy chọn silicone', bn: '≥৩-লগ কণা অপসারণ, ডব্লিউএফআই পুনঃসঞ্চালন, সিলিকন অপশন',
      ur: '≥3-لاگ ذرات کا اخراج، انجیکشن پانی کی گردش، سلکون آپشن', fa: 'حذف ذرات ≥3-log، گردش آب تزریقی، گزینه سیلیکون'
    },
    '320 °C hot air, 3.0–5.5 m tunnel, auto pressure balance': {
      zh: '320°C 热风，隧道长 3.0–5.5 米，自动压力平衡', ja: '320℃熱風、トンネル長3.0〜5.5m、自動圧力バランス', ko: '320°C 열풍, 터널 길이 3.0~5.5m, 자동 압력 균형',
      ru: 'Горячий воздух 320 °C, туннель 3,0–5,5 м, автоматический баланс давления', fr: 'Air chaud 320 °C, tunnel 3,0–5,5 m, équilibrage automatique de pression', es: 'Aire caliente a 320 °C, túnel de 3,0–5,5 m, equilibrio automático de presión', pt: 'Ar quente a 320 °C, túnel de 3,0–5,5 m, balanceamento automático de pressão',
      th: 'ลมร้อน 320°C อุโมงค์ยาว 3.0–5.5 ม. สมดุลแรงดันอัตโนมัติ', vi: 'Khí nóng 320 °C, đường hầm 3,0–5,5 m, cân bằng áp suất tự động', bn: '৩২০°সে গরম বাতাস, ৩.০–৫.৫ মি টানেল, স্বয়ংক্রিয় চাপ ভারসাম্য',
      ur: '320° سینٹی گریڈ گرم ہوا، 3.0–5.5 میٹر ٹنل، خودکار پریشر بیلنس', fa: 'هوای گرم ۳۲۰ درجه، تونل ۳٫۰–۵٫۵ متر، تعادل فشار خودکار'
    },
    'Validated with PAO-tested H14 HEPA': {
      zh: '经 PAO 检测的 H14 高效过滤器验证', ja: 'PAO 試験済み H14 HEPA で検証', ko: 'PAO 시험 완료 H14 HEPA로 검증',
      ru: 'Валидировано с H14 HEPA, проверенным PAO-тестом', fr: 'Validé avec un H14 HEPA testé au PAO', es: 'Validado con H14 HEPA probado con PAO', pt: 'Validado com H14 HEPA testado com PAO',
      th: 'ผ่านการตรวจสอบด้วย H14 HEPA ที่ทดสอบด้วย PAO', vi: 'Được xác nhận bằng H14 HEPA thử nghiệm PAO', bn: 'PAO-পরীক্ষিত H14 HEPA দিয়ে যাচাইকৃত',
      ur: 'PAO ٹیسٹ شدہ H14 HEPA کے ساتھ توثیق شدہ', fa: 'اعتبارسنجی‌شده با H14 HEPA آزمون PAO'
    },
    'Robot-compatible, CIP/SIP, nitrogen purging, 100% check-weigh': {
      zh: '兼容机器人，CIP/SIP，充氮，100% 在线检重', ja: 'ロボット対応、CIP/SIP、窒素置換、100%重量検査', ko: '로봇 호환, CIP/SIP, 질소 퍼지, 100% 중량 검사',
      ru: 'Совместимость с роботами, CIP/SIP, продувка азотом, 100% контроль массы', fr: 'Compatible robot, NEP/SEP, purge à l’azote, pesée de contrôle 100 %', es: 'Compatible con robot, CIP/SIP, purga de nitrógeno, pesaje de control del 100%', pt: 'Compatível com robô, CIP/SIP, purga de nitrogênio, pesagem de controle de 100%',
      th: 'รองรับหุ่นยนต์ CIP/SIP ไล่ไนโตรเจน ตรวจชั่งน้ำหนัก 100%', vi: 'Tương thích robot, CIP/SIP, sục nitơ, cân kiểm tra 100%', bn: 'রোবট-সামঞ্জস্যপূর্ণ, CIP/SIP, নাইট্রোজেন পার্জিং, ১০০% চেক-ওয়েই',
      ur: 'روبوٹ مطابقت، CIP/SIP، نائٹروجن پرج، 100% چیک ویئنگ', fa: 'سازگار با ربات، CIP/SIP، پرج نیتروژن، توزین کنترل ۱۰۰٪'
    },
    'Servo ceramic pump, curved needle lift to reduce splashing': {
      zh: '伺服陶瓷泵，弧形针升降减少飞溅', ja: 'サーボセラミックポンプ、湾曲針昇降で飛散低減', ko: '서보 세라믹 펌프, 곡선 니들 리프트로 비산 감소',
      ru: 'Сервоприводный керамический насос, изогнутый подъём иглы против брызг', fr: 'Pompe céramique servo, levée d’aiguille courbée pour réduire les éclaboussures', es: 'Bomba cerámica servo, elevación de aguja curva para reducir salpicaduras', pt: 'Bomba cerâmica servo, elevação de agulha curva para reduzir respingos',
      th: 'ปั๊มเซรามิกเซอร์โว ยกเข็มแบบโค้งเพื่อลดการกระเซ็น', vi: 'Bơm gốm servo, nâng kim cong giúp giảm bắn tóe', bn: 'সার্ভো সিরামিক পাম্প, বাঁকা সুই লিফট দিয়ে ছিটকে যাওয়া কমায়',
      ur: 'سروو سیرامک پمپ، خمیدہ سوئی لفٹ سے چھینٹے کم', fa: 'پمپ سرامیکی سروو، بالا رفتن سوزن خمیده برای کاهش پاشش'
    },
    'Piston, stainless piston, ceramic or peristaltic pump options': {
      zh: '活塞、不锈钢活塞、陶瓷泵或蠕动泵可选', ja: 'ピストン・ステンレスピストン・セラミックポンプ・チューブポンプから選択可', ko: '피스톤, 스테인리스 피스톤, 세라믹 또는 튜브 펌프 옵션',
      ru: 'Варианты: плунжер, нерж. плунжер, керамический или перистальтический насос', fr: 'Options : piston, piston inox, pompe céramique ou péristaltique', es: 'Opciones: pistón, pistón de acero inoxidable, bomba cerámica o peristáltica', pt: 'Opções: pistão, pistão inox, bomba cerâmica ou peristáltica',
      th: 'ตัวเลือกปั๊ม: ลูกสูบ ลูกสูบสเตนเลส เซรามิก หรือเพริสตอลติก', vi: 'Tùy chọn bơm: piston, piston inox, bơm gốm hoặc ống lót', bn: 'পিস্টন, স্টেইনলেস পিস্টন, সিরামিক বা পেরিস্টলটিক পাম্প অপশন',
      ur: 'پسٹن، سٹین لیس پسٹن، سیرامک یا پرستالٹک پمپ آپشنز', fa: 'گزینه‌ها: پیستون، پیستون استیل، پمپ سرامیکی یا پریستالتیک'
    },
    'Dosing range 50–5000 mg, 1 / 2 / 4 heads': {
      zh: '分装范围 50–5000mg，1 / 2 / 4 头可选', ja: '充填範囲50〜5000mg、1/2/4ヘッド対応', ko: '투여 범위 50–5000mg, 1/2/4 헤드',
      ru: 'Диапазон дозирования 50–5000 мг, 1 / 2 / 4 дозатора', fr: 'Plage de dosage 50–5000 mg, 1 / 2 / 4 têtes', es: 'Rango de dosificación 50–5000 mg, 1 / 2 / 4 cabezales', pt: 'Faixa de dosagem 50–5000 mg, 1 / 2 / 4 cabeças',
      th: 'ช่วงการตวง 50–5000 มก. 1 / 2 / 4 หัวบรรจุ', vi: 'Khoảng định lượng 50–5000 mg, 1 / 2 / 4 đầu', bn: 'ডোজিং রেঞ্জ ৫০–৫০০০ মিগ্রা, ১ / ২ / ৪ হেড',
      ur: 'خوراک کی حد 50–5000 ملی گرام، 1 / 2 / 4 ہیڈز', fa: 'محدوده دوزینگ ۵۰–۵۰۰۰ میلی‌گرم، ۱ / ۲ / ۴ نازل'
    },
    'Dosing range 20–1000 mg, minimal mechanical friction': {
      zh: '分装范围 20–1000mg，机械摩擦极小', ja: '充填範囲20〜1000mg、機械摩擦が極めて少ない', ko: '투여 범위 20–1000mg, 기계 마찰 최소화',
      ru: 'Диапазон дозирования 20–1000 мг, минимальное механическое трение', fr: 'Plage de dosage 20–1000 mg, friction mécanique minimale', es: 'Rango de dosificación 20–1000 mg, fricción mecánica mínima', pt: 'Faixa de dosagem 20–1000 mg, atrito mecânico mínimo',
      th: 'ช่วงการตวง 20–1000 มก. แรงเสียดทานเชิงกลน้อยที่สุด', vi: 'Khoảng định lượng 20–1000 mg, ma sát cơ học tối thiểu', bn: 'ডোজিং রেঞ্জ ২০–১০০০ মিগ্রা, যান্ত্রিক ঘর্ষণ খুবই কম',
      ur: 'خوراک کی حد 20–1000 ملی گرام، میکانیکی رگڑ انتہائی کم', fa: 'محدوده دوزینگ ۲۰–۱۰۰۰ میلی‌گرم، اصطکاک مکانیکی حداقلی'
    },
    'Filling range 2–30 ml, nitrogen purging, CIP/SIP': {
      zh: '灌装范围 2–30ml，充氮，CIP/SIP', ja: '充填範囲2〜30ml、窒素置換、CIP/SIP', ko: '충전 범위 2–30ml, 질소 퍼지, CIP/SIP',
      ru: 'Диапазон наполнения 2–30 мл, продувка азотом, CIP/SIP', fr: 'Plage de remplissage 2–30 ml, purge d’azote, NEP/SEP', es: 'Rango de llenado 2–30 ml, purga de nitrógeno, CIP/SIP', pt: 'Faixa de enchimento 2–30 ml, purga de nitrogênio, CIP/SIP',
      th: 'ช่วงการบรรจุ 2–30 มล. ไล่ไนโตรเจน CIP/SIP', vi: 'Khoảng chiết rót 2–30 ml, sục nitơ, CIP/SIP', bn: 'ভরাট রেঞ্জ ২–৩০ মিলি, নাইট্রোজেন পার্জিং, CIP/SIP',
      ur: 'بھرائی کی حد 2–30 ملی لیٹر، نائٹروجن پرج، CIP/SIP', fa: 'محدوده پرکردن ۲–۳۰ میلی‌لیتر، پرج نیتروژن، CIP/SIP'
    },
    'Nitrogen purging, CIP/SIP, tool-free format change': {
      zh: '充氮，CIP/SIP，免工具换型', ja: '窒素置換、CIP/SIP、工具不要の規格替え', ko: '질소 퍼지, CIP/SIP, 공구 없는 형식 전환',
      ru: 'Продувка азотом, CIP/SIP, смена формата без инструментов', fr: 'Purge d’azote, NEP/SEP, changement de format sans outil', es: 'Purga de nitrógeno, CIP/SIP, cambio de formato sin herramientas', pt: 'Purga de nitrogênio, CIP/SIP, troca de formato sem ferramentas',
      th: 'ไล่ไนโตรเจน CIP/SIP เปลี่ยนรุ่นไม่ต้องใช้เครื่องมือ', vi: 'Sục nitơ, CIP/SIP, chuyển khuôn không cần dụng cụ', bn: 'নাইট্রোজেন পার্জিং, CIP/SIP, টুল-মুক্ত ফরম্যাট পরিবর্তন',
      ur: 'نائٹروجن پرج، CIP/SIP، بغیر اوزار فارمیٹ تبدیلی', fa: 'پرج نیتروژن، CIP/SIP، تعویض فرمت بدون ابزار'
    },
    'Breakage rate 0.05%, rejection of missing stopper/cap, vision option': {
      zh: '破瓶率 0.05%，缺塞/缺盖剔除，可选视觉检测', ja: '破損率0.05%、栓・キャップ欠落除去、外観検査オプション', ko: '파손률 0.05%, 마개/캡 누락 제거, 비전 옵션',
      ru: 'Бой 0,05%, отбраковка без пробки/колпачка, опция машинного зрения', fr: 'Casse 0,05 %, rejet de bouchon/capsule manquants, option vision', es: 'Rotura del 0,05%, rechazo de tapón/tapa faltante, opción de visión', pt: 'Quebra de 0,05%, rejeição de batoque/tampa ausente, opção de visão',
      th: 'อัตราแตก 0.05% คัดออกเมื่อไม่มีจุก/ฝา มีตัวเลือกกล้องตรวจ', vi: 'Tỷ lệ vỡ 0,05%, loại bỏ thiếu nút/nắp, tùy chọn thị giác', bn: 'ভাঙার হার ০.০৫%, স্টপার/ক্যাপ অনুপস্থিত বাতিল, ভিশন অপশন',
      ur: 'ٹوٹنے کی شرح 0.05%، سٹاپر/کیپ غائب ہونے پر خارج، ویژن آپشن', fa: 'نرخ شکست ۰٫۰۵٪، حذف فاقد درپوش، گزینه بازرسی بینایی'
    },
    'Mechanical or vacuum stoppering, submerged filling, modular': {
      zh: '机械或真空压塞，潜没式灌装，模块化', ja: '機械式または真空打栓、潜水充填、モジュール構造', ko: '기계식 또는 진공 마개, 잠수식 충전, 모듈형',
      ru: 'Механическая или вакуумная укупорка, подводимое наполнение, модульность', fr: 'Bouchage mécanique ou sous vide, remplissage immergé, modulaire', es: 'Taponado mecánico o por vacío, llenado sumergido, modular', pt: 'Batoque mecânico ou a vácuo, enchimento submerso, modular',
      th: 'ใส่จุกแบบกลไกหรือสุญญากาศ บรรจุแบบจม่น โมดูลาร์', vi: 'Đậy nút cơ khí hoặc chân không, chiết rót ngập, module', bn: 'মেকানিক্যাল বা ভ্যাকুয়াম স্টপারিং, সাবমার্জড ভরাট, মডুলার',
      ur: 'میکانیکل یا ویکیوم سٹاپرنگ، سبمرجڈ بھرائی، ماڈیولر', fa: 'درپوش‌گذاری مکانیکی یا خلأ، پرکردن غوطه‌ور، ماژولار'
    },
    'Precise temperature & vacuum control, integrated CIP/SIP': {
      zh: '精确温度与真空控制，集成 CIP/SIP', ja: '高精度温度・真空制御、CIP/SIP 統合', ko: '정밀 온도·진공 제어, CIP/SIP 통합',
      ru: 'Точное управление температурой и вакуумом, встроенная CIP/SIP', fr: 'Contrôle précis de la température et du vide, NEP/SEP intégrée', es: 'Control preciso de temperatura y vacío, CIP/SIP integrado', pt: 'Controle preciso de temperatura e vácuo, CIP/SIP integrado',
      th: 'ควบคุมอุณหภูมิและสุญญากาศอย่างแม่นยำ รวม CIP/SIP', vi: 'Kiểm soát nhiệt độ & chân không chính xác, tích hợp CIP/SIP', bn: 'সুনির্দিষ্ট তাপমাত্রা ও ভ্যাকুয়াম নিয়ন্ত্রণ, ইন্টিগ্রেটেড CIP/SIP',
      ur: 'درجہ حرارت اور ویکیوم کا درست کنٹرول، مربوط CIP/SIP', fa: 'کنترل دقیق دما و خلأ، CIP/SIP یکپارچه'
    },
    'H14 HEPA, PAO scan-tested': {
      zh: 'H14 高效过滤器，PAO 扫描检测', ja: 'H14 HEPA、PAO スキャン試験済み', ko: 'H14 HEPA, PAO 스캔 시험 완료',
      ru: 'H14 HEPA, проверено PAO-сканированием', fr: 'H14 HEPA, testé par balayage PAO', es: 'H14 HEPA, probado por barrido PAO', pt: 'H14 HEPA, testado por varredura PAO',
      th: 'H14 HEPA ทดสอบด้วย PAO scan', vi: 'H14 HEPA, kiểm tra quét PAO', bn: 'এইচ১৪ এইচইপিএ, পিএও স্ক্যান-পরীক্ষিত',
      ur: 'H14 HEPA، PAO اسکین ٹیسٹ شدہ', fa: 'فیلتر H14 HEPA، آزمون اسکن PAO'
    },
    'H₂O₂ vapour, 6-log reduction': {
      zh: '过氧化氢蒸汽，6 级杀灭', ja: '過酸化水素蒸気、6ログ低減', ko: '과산화수소 증기, 6-log 감소',
      ru: 'Пары H₂O₂, снижение на 6-log', fr: 'Vapeur H₂O₂, réduction 6-log', es: 'Vapor de H₂O₂, reducción 6-log', pt: 'Vapor de H₂O₂, redução 6-log',
      th: 'ไอ H₂O₂ ลดเชื้อ 6-log', vi: 'Hơi H₂O₂, giảm 6-log', bn: 'H₂O₂ বাষ্প, ৬-লগ হ্রাস',
      ur: 'H₂O₂ بخارات، 6-لاگ کمی', fa: 'بخار H₂O₂، کاهش 6-log'
    },
    'Stainless steel + toughened glass, RTP or airlock transfer': {
      zh: '不锈钢 + 钢化玻璃，RTP 或气锁传递', ja: 'ステンレススチール＋強化ガラス、RTPまたはエアロック搬送', ko: '스테인리스 스틸 + 강화유리, RTP 또는 에어락 이송',
      ru: 'Нерж. сталь + закалённое стекло, передача RTP или шлюз', fr: 'Inox + verre trempé, transfert RTP ou sas', es: 'Acero inoxidable + vidrio templado, transferencia RTP o esclusa', pt: 'Aço inoxidável + vidro temperado, transferência RTP ou eclusa',
      th: 'สเตนเลส + กระจกเทมเปอร์ ถ่ายผ่าน RTP หรือแอร์ล็อก', vi: 'Inox + kính cường lực, truyền qua RTP hoặc airlock', bn: 'স্টেইনলেস স্টিল + টেম্পার্ড গ্লাস, RTP বা এয়ারলক ট্রান্সফার',
      ur: 'سٹین لیس سٹیل + ٹیمپرڈ گلاس، RTP یا ایئرلاک ٹرانسفر', fa: 'استنلس‌استیل + شیشه تقویت‌شده، انتقال RTP یا قفل هوا'
    },
    'Up to 5 camera stations, optional HGA headspace analysis': {
      zh: '最多 5 个相机工位，可选 HGA 顶空分析', ja: 'カメラ最大5ステーション、HGAヘッドスペース分析オプション', ko: '최대 5개 카메라 스테이션, HGA 헤드스페이스 분석 옵션',
      ru: 'До 5 камер, опция анализа головного пространства HGA', fr: 'Jusqu’à 5 postes caméra, option d’analyse d’espace de tête HGA', es: 'Hasta 5 estaciones de cámara, opción de análisis de espacio de cabeza HGA', pt: 'Até 5 estações de câmera, opção de análise de headspace HGA',
      th: 'กล้องได้ถึง 5 สถานี มีตัวเลือกวิเคราะห์ HGA headspace', vi: 'Tối đa 5 trạm camera, tùy chọn phân tích headspace HGA', bn: '৫টি ক্যামেরা স্টেশন পর্যন্ত, HGA হেডস্পেস বিশ্লেষণ অপশন',
      ur: '5 کیمرہ اسٹیشنوں تک، HGA ہیڈ اسپیس تجزیہ آپشن', fa: 'تا ۵ ایستگاه دوربین، گزینه آنالیز هداسپیس HGA'
    },
    'Peristaltic or ceramic pump, mechanical or vacuum stoppering': {
      zh: '蠕动泵或陶瓷泵，机械或真空压塞', ja: 'チューブポンプまたはセラミックポンプ、機械式または真空打栓', ko: '튜브 펌프 또는 세라믹 펌프, 기계식 또는 진공 마개',
      ru: 'Перистальтический или керамический насос, механическая или вакуумная укупорка', fr: 'Pompe péristaltique ou céramique, bouchage mécanique ou sous vide', es: 'Bomba peristáltica o cerámica, taponado mecánico o por vacío', pt: 'Bomba peristáltica ou cerâmica, batoque mecânico ou a vácuo',
      th: 'ปั๊มเพริสตอลติกหรือเซรามิก ใส่จุกแบบกลไกหรือสุญญากาศ', vi: 'Bơm ống lót hoặc gốm, đậy nút cơ khí hoặc chân không', bn: 'পেরিস্টলটিক বা সিরামিক পাম্প, মেকানিক্যাল বা ভ্যাকুয়াম স্টপারিং',
      ur: 'پرستالٹک یا سیرامک پمپ، میکانیکل یا ویکیوم سٹاپرنگ', fa: 'پمپ پریستالتیک یا سرامیکی، درپوش‌گذاری مکانیکی یا خلأ'
    },
    'Portable — fits inside isolator or RABS': {
      zh: '便携式——可放入隔离器或 RABS 内', ja: '可搬型——アイソレータやRABS内に収まる', ko: '휴대용 — 아이솔레이터 또는 RABS 내부에 설치 가능',
      ru: 'Портативная — помещается в изолятор или RABS', fr: 'Portable — s’installe dans un isolateur ou RABS', es: 'Portátil: cabe dentro de un aislador o RABS', pt: 'Portátil — cabe dentro de um isolador ou RABS',
      th: 'พกพาได้ — วางภายในไอโซเลเตอร์หรือ RABS ได้', vi: 'Di động — vừa bên trong isolator hoặc RABS', bn: 'পোর্টেবল — আইসোলেটর বা RABS-এর ভেতরে ফিট করে',
      ur: 'پورٹیبل — آئسولیٹر یا RABS کے اندر فٹ ہوتا ہے', fa: 'قابل‌حمل — درون ایزولاتور یا RABS جا می‌شود'
    },
    'Gravimetric (weighing) filling, stable and repeatable': {
      zh: '称重式灌装，稳定且可重复', ja: '重量式充填、安定かつ再現性あり', ko: '중량식 충전, 안정적이고 재현 가능',
      ru: 'Гравиметрическое (весовое) наполнение, стабильно и повторяемо', fr: 'Remplissage gravimétrique (par pesée), stable et répétable', es: 'Llenado gravimétrico (por pesaje), estable y repetible', pt: 'Enchimento gravimétrico (por pesagem), estável e repetível',
      th: 'บรรจุแบบชั่งน้ำหนัก เสถียรและทำซ้ำได้', vi: 'Chiết rót theo trọng lượng, ổn định và lặp lại được', bn: 'ওজন-ভিত্তিক ভরাট, স্থিতিশীল ও পুনরাবৃত্তিযোগ্য',
      ur: 'وزنی بھرائی، مستحکم اور دوبارہ قابل', fa: 'پرکردن وزنی، پایدار و تکرارپذیر'
    },
    'Tool-free format changeover, portable': {
      zh: '免工具换型，便于移动', ja: '工具不要の規格替え、可搬型', ko: '공구 없는 형식 전환, 휴대 가능',
      ru: 'Смена формата без инструментов, портативность', fr: 'Changement de format sans outil, portable', es: 'Cambio de formato sin herramientas, portátil', pt: 'Troca de formato sem ferramentas, portátil',
      th: 'เปลี่ยนรุ่นไม่ต้องใช้เครื่องมือ พกพาสะดวก', vi: 'Chuyển đổi khuôn không cần dụng cụ, di động', bn: 'টুল-মুক্ত ফরম্যাট পরিবর্তন, পোর্টেবল',
      ur: 'بغیر اوزار فارمیٹ تبدیلی، پورٹیبل', fa: 'تعویض فرمت بدون ابزار، قابل‌حمل'
    }
  };

  function specVal(v) {
    if (typeof v === 'string' && SPEC_T[v] !== undefined) return t(SPEC_T[v]);
    return v;
  }

  /* ---------- 工具 ---------- */
  var LANG_KEYS = ['zh', 'en', 'ja', 'ko', 'ru', 'fr', 'es', 'pt', 'th', 'vi', 'bn', 'ur', 'fa'];

  function lang() {
    return document.documentElement.lang || 'en';
  }
  function t(obj) {
    if (!obj) return '';
    var l = lang();
    return obj[l] !== undefined ? obj[l] : (obj.en !== undefined ? obj.en : '');
  }

  /* ---------- 样式 ---------- */
  var CSS = [
    '.cat-sec{background:#fff;padding:72px 24px;}',
    '.cat-inner{max-width:1200px;margin:0 auto;}',
    '.cat-head{text-align:center;margin-bottom:28px;}',
    '.cat-badge{display:inline-block;background:#dbeafe;color:#1d4ed8;font-size:.75rem;font-weight:700;padding:4px 12px;border-radius:12px;margin-bottom:10px;}',
    '.cat-head h2{font-size:1.9rem;font-weight:700;color:#0f172a;margin:0 0 8px;}',
    '.cat-head p{color:#64748b;font-size:.95rem;margin:0;}',
    '.cat-searchbar{max-width:560px;margin:0 auto 26px;position:relative;}',
    '.cat-searchbar input{width:100%;padding:13px 76px 13px 18px;font-size:.95rem;border:1px solid #e2e8f0;border-radius:10px;outline:none;font-family:inherit;}',
    '.cat-searchbar input:focus{border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.1);}',
    '.cat-clear{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;color:#94a3b8;font-size:.82rem;cursor:pointer;padding:6px 8px;font-family:inherit;}',
    '.cat-clear:hover{color:#2563eb;}',
    '.cat-count{text-align:center;color:#94a3b8;font-size:.85rem;margin-bottom:18px;}',
    '.cat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}',
    '.cat-card{background:#fff;border:1px solid #e9eef5;border-radius:12px;overflow:hidden;cursor:pointer;transition:.18s;}',
    '.cat-card:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(15,23,42,.1);border-color:#bfdbfe;}',
    '.cat-card img{width:100%;height:150px;object-fit:cover;display:block;background:#f1f5f9;}',
    '.cat-card .cb{padding:14px 16px;}',
    '.cat-card h3{font-size:.95rem;font-weight:700;color:#0f172a;margin:0 0 6px;line-height:1.35;}',
    '.cat-card p{font-size:.8rem;color:#64748b;line-height:1.6;margin:0 0 10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}',
    '.cat-card .cs{font-size:.8rem;color:#2563eb;font-weight:600;}',
    '.cat-empty{grid-column:1/-1;text-align:center;color:#94a3b8;padding:40px 0;font-size:.95rem;}',
    '.sp-modal{position:fixed;inset:0;background:rgba(15,23,42,.6);z-index:2000;display:none;align-items:center;justify-content:center;padding:20px;}',
    '.sp-modal.on{display:flex;}',
    '.sp-box{background:#fff;border-radius:14px;max-width:880px;width:100%;max-height:88vh;overflow:auto;position:relative;}',
    '.sp-close{position:absolute;right:14px;top:12px;background:#f1f5f9;border:none;width:32px;height:32px;border-radius:50%;font-size:1.2rem;line-height:1;cursor:pointer;color:#475569;z-index:2;}',
    '.sp-close:hover{background:#e2e8f0;}',
    '.sp-grid{display:grid;grid-template-columns:1fr 1fr;}',
    '.sp-media img{width:100%;height:100%;object-fit:cover;display:block;min-height:280px;}',
    '.sp-info{padding:26px 28px;}',
    '.sp-badge{display:inline-block;background:#dcfce7;color:#15803d;font-size:.72rem;font-weight:700;padding:3px 10px;border-radius:12px;margin-bottom:10px;}',
    '.sp-info h3{font-size:1.3rem;font-weight:700;color:#0f172a;margin:0 0 10px;line-height:1.3;}',
    '.sp-info>p{font-size:.9rem;color:#475569;line-height:1.75;margin:0 0 18px;}',
    '.sp-table{width:100%;border-collapse:collapse;margin-bottom:20px;}',
    '.sp-table td{padding:9px 0;border-bottom:1px solid #f1f5f9;font-size:.86rem;vertical-align:top;}',
    '.sp-table td:first-child{color:#64748b;width:38%;padding-right:12px;}',
    '.sp-table td:last-child{color:#0f172a;font-weight:500;}',
    '.sp-cta{display:inline-block;background:#2563eb;color:#fff;border:none;padding:12px 22px;border-radius:8px;font-size:.9rem;font-weight:600;cursor:pointer;font-family:inherit;}',
    '.sp-cta:hover{background:#1d4ed8;}',
    '@media(max-width:980px){.cat-grid{grid-template-columns:repeat(3,1fr);}}',
    '@media(max-width:760px){.cat-grid{grid-template-columns:repeat(2,1fr);}.sp-grid{grid-template-columns:1fr;}.sp-media img{min-height:200px;}.cat-sec{padding:52px 18px;}}',
    '@media(max-width:480px){.cat-grid{grid-template-columns:1fr;}}'
  ].join('\n');

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  /* ---------- 弹窗 DOM ---------- */
  var modal = document.createElement('div');
  modal.className = 'sp-modal';
  modal.id = 'specModal';
  modal.innerHTML =
    '<div class="sp-box">' +
    '<button class="sp-close" type="button" aria-label="Close">&times;</button>' +
    '<div class="sp-grid">' +
    '<div class="sp-media"><img id="spImg" src="" alt=""></div>' +
    '<div class="sp-info">' +
    '<span class="sp-badge" id="spBadge"></span>' +
    '<h3 id="spName"></h3>' +
    '<p id="spDesc"></p>' +
    '<table class="sp-table"><tbody id="spBody"></tbody></table>' +
    '<button class="sp-cta" type="button" id="spCta"></button>' +
    '</div></div></div>';
  document.body.appendChild(modal);

  modal.addEventListener('click', function (e) { if (e.target === modal) closeSpec(); });
  modal.querySelector('.sp-close').addEventListener('click', closeSpec);

  var current = null;

  function openSpec(p) {
    current = p;
    document.getElementById('spImg').src = p.img;
    document.getElementById('spBadge').textContent = CAT_LABEL[p.cat] || '';
    document.getElementById('spName').textContent = t(p.name);
    document.getElementById('spDesc').textContent = t(p.desc);
    modal.dir = RTL[lang()] ? 'rtl' : 'ltr';
    var body = document.getElementById('spBody');
    body.innerHTML = '';
    Object.keys(p.specs).forEach(function (k) {
      var tr = document.createElement('tr');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      td1.textContent = t(LABELS[k]) || k;
      td2.textContent = specVal(p.specs[k]);
      tr.appendChild(td1);
      tr.appendChild(td2);
      body.appendChild(tr);
    });
    document.getElementById('spCta').textContent = t(UI.cta);
    modal.classList.add('on');
    document.body.style.overflow = 'hidden';
  }

  function closeSpec() {
    modal.classList.remove('on');
    document.body.style.overflow = '';
  }

  function inquire(p) {
    var msgText = 'I am interested in the ' + t(p.name) +
      (p.specs.model ? ' (model ' + p.specs.model + ')' : '') +
      '. Please send details and a quotation.';
    var msg = document.getElementById('message');
    if (msg) {
      msg.value = msgText;
      closeSpec();
      var c = document.getElementById('contact');
      if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      /* 目录独立页：回主页联系表单并预填设备名 */
      try { sessionStorage.setItem('hashoer_inquiry_msg', msgText); } catch (e) {}
      closeSpec();
      window.location.href = 'index.html#contact';
    }
  }

  modal.querySelector('#spCta').addEventListener('click', function () {
    if (current) inquire(current);
  });

  /* ---------- 目录 DOM ---------- */
  var CAT_LABEL = { lines: '', filling: '', washing: '', capping: '', lab: '' };
  var RTL = { fa: true, ur: true };

  var searchEl = null, gridEl = null, countEl = null, emptyEl = null;

  function buildCatalog() {
    var root = document.getElementById('catalogRoot');
    if (!root) return;
    root.innerHTML =
      '<section class="cat-sec" id="catalog">' +
      '<div class="cat-inner">' +
      '<div class="cat-head">' +
      '<span class="cat-badge" id="catBadge"></span>' +
      '<h2 id="catTitle"></h2>' +
      '<p id="catSub"></p>' +
      '</div>' +
      '<div class="cat-searchbar">' +
      '<input type="search" id="catSearch" autocomplete="off">' +
      '<button class="cat-clear" type="button" id="catClear"></button>' +
      '</div>' +
      '<div class="cat-count" id="catCount"></div>' +
      '<div class="cat-grid" id="catGrid"></div>' +
      '</div></section>';
    searchEl = document.getElementById('catSearch');
    gridEl = document.getElementById('catGrid');
    countEl = document.getElementById('catCount');
    emptyEl = document.createElement('div');

    CATALOG.forEach(function (p) {
      var card = document.createElement('div');
      card.className = 'cat-card';
      card.setAttribute('data-cat', p.cat);
      card.innerHTML =
        '<img src="' + p.img + '" alt="" loading="lazy">' +
        '<div class="cb">' +
        '<h3></h3><p></p><span class="cs"></span>' +
        '</div>';
      card.querySelector('h3').textContent = t(p.name);
      card.querySelector('p').textContent = t(p.desc);
      card.querySelector('.cs').textContent = t(UI.viewSpec) + ' \u2192';
      card.addEventListener('click', function () { openSpec(p); });
      card._p = p;
      gridEl.appendChild(card);
    });

    emptyEl.className = 'cat-empty';
    emptyEl.style.display = 'none';
    gridEl.appendChild(emptyEl);

    searchEl.addEventListener('input', function () {
      applyFilter();
    });
    document.getElementById('catClear').addEventListener('click', function () {
      searchEl.value = '';
      applyFilter();
      searchEl.focus();
    });

    renderStatic();
    applyFilter();
    setSectionDir();
  }

  function renderStatic() {
    document.getElementById('catBadge').textContent = t(UI.badge);
    document.getElementById('catTitle').textContent = t(UI.title);
    document.getElementById('catSub').textContent = t(UI.subtitle);
    searchEl.placeholder = t(UI.searchPh);
    document.getElementById('catClear').textContent = t(UI.clear);
  }

  function setSectionDir() {
    var sec = document.getElementById('catalog');
    var d = RTL[lang()] ? 'rtl' : 'ltr';
    if (sec) sec.dir = d;
    modal.dir = d;
  }

  function buildCatLabels() {
    var defs = [
            { k: 'filling', label: UI.tabFill },
      { k: 'washing', label: UI.tabWash },
      { k: 'capping', label: UI.tabCap },
      { k: 'lab', label: UI.tabLab }
    ];
    defs.forEach(function (d) { CAT_LABEL[d.k] = t(d.label); });
  }

  function applyFilter() {
    var q = (searchEl.value || '').trim().toLowerCase();
    var l = lang();
    var n = 0;
    Array.prototype.forEach.call(gridEl.querySelectorAll('.cat-card'), function (card) {
      var p = card._p;
      if (!p) return;
      var hay = (p.kw + ' ' + p.name.en + ' ' + (p.name[l] || '') + ' ' +
        (p.desc.en || '') + ' ' + (p.desc[l] || '') + ' ' +
        Object.keys(p.specs).map(function (k) { return specVal(p.specs[k]); }).join(' ')).toLowerCase();
      var ok = !q || hay.indexOf(q) !== -1;
      card.style.display = ok ? '' : 'none';
      if (ok) n++;
    });
    countEl.textContent = n + ' ' + t(UI.unit);
    emptyEl.textContent = t(UI.noResult);
    emptyEl.style.display = n === 0 ? '' : 'none';
  }

  /* ---------- 剂型快捷入口（顶部 5 张分类卡） ---------- */
  function quickSearch(q) {
    if (!searchEl) {
      /* 主页上没有目录：跳到独立产品页并带上搜索词 */
      window.location.href = 'products.html?q=' + encodeURIComponent(q);
      return;
    }
    searchEl.value = q;
    applyFilter();
    var sec = document.getElementById('catalog');
    if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function bindContainers() {
    for (var i = 1; i <= CONTAINERS.length; i++) {
      (function (idx) {
        var card = document.getElementById('cat' + idx);
        if (!card) return;
        var cfg = CONTAINERS[idx - 1];
        card.style.cursor = 'pointer';
        card.addEventListener('click', function () { quickSearch(cfg.q); });
      })(i);
    }
    renderContainers();
  }

  function renderContainers() {
    var l = lang();
    for (var i = 1; i <= CONTAINERS.length; i++) {
      var card = document.getElementById('cat' + i);
      if (!card) continue;
      var cfg = CONTAINERS[i - 1];
      var icon = card.querySelector('.product-icon');
      var h3 = card.querySelector('h3');
      var p = card.querySelector('p');
      if (icon) icon.textContent = cfg.icon;
      if (h3) h3.textContent = cfg[l] !== undefined ? cfg[l] : cfg.en;
      if (p) p.textContent = cfg['d' + l.charAt(0).toUpperCase() + l.slice(1)] !== undefined
        ? cfg['d' + l.charAt(0).toUpperCase() + l.slice(1)]
        : cfg.dEn;
    }
  }

  /* ---------- 语言切换时重绘 ---------- */
  function refresh() {
    renderContainers();
    if (!gridEl) return;
    setSectionDir();
    renderStatic();
    buildCatLabels();
    Array.prototype.forEach.call(gridEl.querySelectorAll('.cat-card'), function (card) {
      var p = card._p;
      if (!p) return;
      card.querySelector('h3').textContent = t(p.name);
      card.querySelector('p').textContent = t(p.desc);
      card.querySelector('.cs').textContent = t(UI.viewSpec) + ' \u2192';
    });
    applyFilter();
    if (current && modal.classList.contains('on')) {
      document.getElementById('spBadge').textContent = CAT_LABEL[current.cat] || '';
      document.getElementById('spName').textContent = t(current.name);
      document.getElementById('spDesc').textContent = t(current.desc);
      document.getElementById('spCta').textContent = t(UI.cta);
      var body = document.getElementById('spBody');
      var keys = Object.keys(current.specs);
      Array.prototype.forEach.call(body.children, function (tr, i) {
        if (tr.children[0]) tr.children[0].textContent = t(LABELS[keys[i]]) || keys[i];
      });
    }
  }

  var origApply = window.applyLang;
  if (typeof origApply === 'function') {
    window.applyLang = function (l) {
      origApply(l);
      try { refresh(); } catch (e) {}
    };
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSpec();
  });

  function boot() {
    buildCatalog();
    bindContainers();
    if (searchEl) {
      var qs = null;
      try { qs = new URLSearchParams(window.location.search).get('q'); } catch (e) {}
      if (qs) {
        searchEl.value = qs;
        applyFilter();
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.hashoerQuickSearch = quickSearch;
})();
