// 更新「为什么选择华枢合」区块：13语新文案 + 卡片顺序调整为 1欧盟/2定制/3交付售后/4性价比/5共赢
const fs = require('fs');
const p = 'index.html';
let s = fs.readFileSync(p, 'utf8');
let fail = [];

function rep(oldStr, newStr) {
  if (!s.includes(oldStr)) { fail.push(oldStr.slice(0, 60)); return; }
  s = s.replace(oldStr, newStr);
}

// ── 1) 字典替换（13 语） ──
const M = [
  // zh
  ['why1_desc:"根植于欧洲的先进包装技术，带来卓越的精度与可靠性。"', 'why1_desc:"依托欧洲成熟包装工艺体系，设备精度高、运行稳定，满足 GMP 合规生产要求。"'],
  ['why2_desc:"根据您的特定生产需求量身打造非标设备——拒绝千篇一律。"', 'why2_desc:"快速响应定制需求，全流程闭环交付，量身打造非标制药设备，适配您独特的生产线工况。"'],
  ['why3_title:"现场工程师"', 'why3_title:"交付售后"'],
  ['why3_desc:"我们的工程师与您的团队并肩工作——提供维护支持、效率优化等。"', 'why3_desc:"全流程交付落地，配套持续售后保障，提供设备调试、维保巡检与产线优化技术支持。"'],
  ['why4_title:"客户至上理念"', 'why4_title:"价值共赢"'],
  ['why4_desc:"我们以您的满意衡量成功——有竞争力的价格、优质产品与持久合作。"', 'why4_desc:"深耕制药装备项目落地，以可靠方案持续赋能产线，与客户实现长期价值共赢。"'],
  ['why5_desc:"质量与外观稳居行业前三，价格却远低于同行。"', 'why5_desc:"同等品质下，设备性能与外观对标一线品牌，成本更具优势。"'],
  // en
  ['why1_desc:"Rooted in advanced packaging technologies from Europe for superior precision and reliability."', 'why1_desc:"Built on mature European packaging processes — high precision, stable operation, and GMP-compliant production."'],
  ['why2_desc:"Non-standard equipment tailored to your specific production needs — no one-size-fits-all approach."', 'why2_desc:"Fast response to custom requirements with end-to-end delivery — non-standard pharma equipment tailored to your unique line conditions."'],
  ['why3_title:"On-Site Field Engineers"', 'why3_title:"Delivery & After-Sales"'],
  ['why3_desc:"Our engineers work alongside your team — maintenance support, efficiency optimization, and more."', 'why3_desc:"End-to-end commissioning with ongoing after-sales support — equipment debugging, maintenance inspections, and line optimization."'],
  ['why4_title:"Customer-First Philosophy"', 'why4_title:"Win-Win Value"'],
  ['why4_desc:"We measure success by your satisfaction — competitive pricing, quality products, and lasting partnerships."', 'why4_desc:"Deep expertise in pharma equipment projects — reliable solutions that keep your line running, built for long-term mutual success."'],
  ['why5_desc:"Quality and finish rank top-3 in the industry — at prices far below our competitors."', 'why5_desc:"At equal quality, our equipment matches leading brands in performance and finish — at a clear cost advantage."'],
  // ja
  ['why1_desc:"欧州の先進包装技術に根ざし、卓越した精度と信頼性を実現。"', 'why1_desc:"欧州の成熟した包装プロセス体系に基づき、高精度・安定稼働、GMP準拠の生産を実現。"'],
  ['why2_desc:"お客様の特定の生産ニーズに合わせた非標準設備 — 画一的な手法はありません。"', 'why2_desc:"カスタム要件へ迅速に対応し、全工程を一貫して納入。お客様の生産ラインに適合する非標準製薬設備をオーダーメイドで。"'],
  ['why3_title:"オンサイト現場エンジニア"', 'why3_title:"納品・アフターサービス"'],
  ['why3_desc:"当社のエンジニアがお客様のチームと共に — 保守サポート、効率最適化など。"', 'why3_desc:"導入から立ち上げまで一貫対応し、継続的なアフターサポートを提供 — 設備の調整、保守点検、ライン最適化の技術支援。"'],
  ['why4_title:"顧客第一の理念"', 'why4_title:"価値の共創"'],
  ['why4_desc:"成功はお客様の満足で測ります — 競争力のある価格、高品質製品、永続的なパートナーシップ。"', 'why4_desc:"製薬設備プロジェクトに深く取り組み、信頼できるソリューションで生産ラインを支え、長期的な相互利益を実現します。"'],
  ['why5_desc:"品質と外観は業界トップ3水準。価格は競合他社より大幅に低く設定しています。"', 'why5_desc:"同等の品質でありながら、性能と外観は一流ブランドに匹敵。コスト面でも大きな強みがあります。"'],
  // ko
  ['why1_desc:"유럽의 첨단 포장 기술에 뿌리를 둔 탁월한 정밀도와 신뢰성."', 'why1_desc:"유럽의 성숙한 포장 공정 체계에 기반한 높은 정밀도와 안정적인 운영으로 GMP 규격 생산을 충족합니다."'],
  ['why2_desc:"특정 생산 요구에 맞춘 비표준 장비 — 획일적인 방식은 없습니다."', 'why2_desc:"맞춤 요구에 신속히 대응하고 전 과정을 일관되게 납품 — 귀사의 생산라인 환경에 맞춘 비표준 제약 장비를 맞춤 제작합니다."'],
  ['why3_title:"현장 파견 엔지니어"', 'why3_title:"납품 및 사후지원"'],
  ['why3_desc:"당사 엔지니어가 귀사 팀과 함께 — 유지보수 지원, 효율 최적화 등."', 'why3_desc:"전 과정 납품과 지속적인 사후 지원 — 장비 시운전, 유지보수 점검, 라인 최적화 기술 지원을 제공합니다."'],
  ['why4_title:"고객 최우선 철학"', 'why4_title:"상생의 가치"'],
  ['why4_desc:"우리는 귀사의 만족으로 성공을 측정합니다 — 경쟁력 있는 가격, 우수한 제품, 지속적인 파트너십."', 'why4_desc:"제약 장비 프로젝트에 깊이 몰입해 신뢰할 수 있는 솔루션으로 라인을 지속 지원 — 장기적 상생을 실현합니다."'],
  ['why5_desc:"품질과 마감은 업계 최상위 3위 안정 — 가격은 경쟁사보다 훨씬 낮습니다."', 'why5_desc:"동등한 품질에서 성능과 마감은 일류 브랜드에 필적 — 비용은 훨씬 유리합니다."'],
  // ru
  ['why1_desc:"Основаны на передовых упаковочных технологиях Европы для высшей точности и надёжности."', 'why1_desc:"Основаны на зрелых европейских технологиях упаковки: высокая точность, стабильная работа и соответствие требованиям GMP."'],
  ['why2_desc:"Нестандартное оборудование под ваши задачи — никакого шаблонного подхода."', 'why2_desc:"Быстрый ответ на запросы кастомизации и сквозная поставка — нестандартное фармацевтическое оборудование под условия вашей линии."'],
  ['why3_title:"Инженеры на местах"', 'why3_title:"Поставка и сервис"'],
  ['why3_desc:"Наши инженеры работают вместе с вашей командой — поддержка, оптимизация и многое другое."', 'why3_desc:"Полное внедрение и постоянный сервис — пусконаладка, регламентное обслуживание и оптимизация линии."'],
  ['why4_title:"Философия «клиент прежде всего»"', 'why4_title:"Взаимная выгода"'],
  ['why4_desc:"Мы мерим успех вашей удовлетворённостью — конкурентные цены, качество и долгосрочное партнёрство."', 'why4_desc:"Глубокая экспертиза в проектах фармооборудования — надёжные решения для вашей линии и долгосрочное партнёрство."'],
  ['why5_desc:"Качество и исполнение — в тройке лучших в отрасли, а цены заметно ниже, чем у конкурентов."', 'why5_desc:"При равном качестве характеристики и исполнение не уступают брендам первого эшелона — при заметно меньшей стоимости."'],
  // fr
  ["why1_desc:\"Enraciné dans les technologies d'emballage avancées d'Europe pour une précision et fiabilité supérieures.\"", 'why1_desc:"S\'appuie sur des procédés d\'emballage européens éprouvés — haute précision, fonctionnement stable et production conforme aux BPF (GMP)."'],
  ['why2_desc:"Équipements non standard adaptés à vos besoins — aucune solution unique."', 'why2_desc:"Réponse rapide aux demandes sur mesure et livraison de bout en bout — équipements pharmaceutiques non standards adaptés à votre ligne."'],
  ['why3_title:"Ingénieurs sur site"', 'why3_title:"Livraison & après-vente"'],
  ['why3_desc:"Nos ingénieurs travaillent avec votre équipe — support, optimisation et plus."', 'why3_desc:"Mise en service complète et support après-vente continu — réglage des équipements, maintenance et optimisation de la ligne."'],
  ['why4_title:"Philosophie client d\'abord"', 'why4_title:"Gagnant-gagnant"'],
  ['why4_desc:"Nous mesurons le succès à votre satisfaction — prix compétitifs, qualité, partenariats durables."', 'why4_desc:"Expertise approfondie des projets d\'équipement pharmaceutique — des solutions fiables pour un succès durable partagé."'],
  ['why5_desc:"Qualité et finition parmi les 3 premières de l\'industrie — à des prix bien inférieurs à ceux des concurrents."', 'why5_desc:"À qualité égale, performances et finition comparables aux grandes marques — à un coût bien plus avantageux."'],
  // es
  ['why1_desc:"Basado en tecnologías de envasado avanzadas de Europa para precisión y fiabilidad superiores."', 'why1_desc:"Basado en procesos de envasado europeos consolidados: alta precisión, funcionamiento estable y producción conforme a GMP."'],
  ['why2_desc:"Equipos no estándar adaptados a sus necesidades — sin enfoque único."', 'why2_desc:"Respuesta rápida a requisitos personalizados y entrega integral: equipos farmacéuticos no estándar adaptados a su línea."'],
  ['why3_title:"Ingenieros in situ"', 'why3_title:"Entrega y posventa"'],
  ['why3_desc:"Nuestros ingenieros trabajan con su equipo — soporte, optimización y más."', 'why3_desc:"Puesta en marcha integral y soporte posventa continuo: ajuste de equipos, mantenimiento e inspecciones y optimización de línea."'],
  ['why4_title:"Filosofía del cliente primero"', 'why4_title:"Valor compartido"'],
  ['why4_desc:"Medimos el éxito por su satisfacción — precios competitivos, calidad y alianzas duraderas."', 'why4_desc:"Profunda experiencia en proyectos de equipamiento farmacéutico — soluciones fiables para un éxito mutuo a largo plazo."'],
  ['why5_desc:"Calidad y acabado entre los 3 mejores del sector — a precios muy por debajo de la competencia."', 'why5_desc:"A igual calidad, rendimiento y acabado comparables a las marcas líderes — con una ventaja clara en coste."'],
  // pt
  ['why1_desc:"Baseado em tecnologias de embalagem avançadas de Europa para precisão e confiabilidade superiores."', 'why1_desc:"Baseado em processos de embalagem europeus consolidados — alta precisão, operação estável e produção conforme às GMP."'],
  ['why2_desc:"Equipamentos não padrão adaptados às suas necessidades — sem solução única."', 'why2_desc:"Resposta rápida a requisitos personalizados e entrega ponta a ponta — equipamentos farmacêuticos não padronizados sob medida para sua linha."'],
  ['why3_title:"Engenheiros in loco"', 'why3_title:"Entrega e pós-venda"'],
  ['why3_desc:"Nossos engenheiros trabalham com sua equipe — suporte, otimização e mais."', 'why3_desc:"Comissionamento completo e suporte pós-venda contínuo — ajuste de equipamentos, manutenção programada e otimização da linha."'],
  ['why4_title:"Filosofia do cliente em primeiro lugar"', 'why4_title:"Valor compartilhado"'],
  ['why4_desc:"Medimos o sucesso pela sua satisfação — preços competitivos, qualidade e parcerias duradouras."', 'why4_desc:"Profundo know-how em projetos de equipamentos farmacêuticos — soluções confiáveis para sucesso mútuo de longo prazo."'],
  ['why5_desc:"Qualidade e acabamento entre os 3 primeiros do setor — a preços bem abaixo dos concorrentes."', 'why5_desc:"Com a mesma qualidade, desempenho e acabamento comparáveis às marcas líderes — com vantagem clara de custo."'],
  // th
  ['why1_desc:"รากฐานจากเทคโนโลยีการบรรจุภัณฑ์ขั้นสูงของยุโรป เพื่อความแม่นยำและความน่าเชื่อถือเหนือระดับ"', 'why1_desc:"อาศัยระบบกระบวนการบรรจุภัณฑ์ของยุโรปที่เป็นผู้ใหญ่ แม่นยำสูง ทำงานเสถียร ตอบโจทย์การผลิตตามมาตรฐาน GMP"'],
  ['why2_desc:"อุปกรณ์มาตรฐานพิเศษที่ออกแบบตามความต้องการเฉพาะของคุณ — ไม่มีทางเดียวที่เหมาะกับทุกคน"', 'why2_desc:"ตอบสนองความต้องการเฉพาะได้อย่างรวดเร็ว ส่งมอบครบวงจร — ผลิตอุปกรณ์เภสัชกรรมแบบไม่มาตรฐานให้เหมาะกับสายการผลิตเฉพาะของคุณ"'],
  ['why3_title:"วิศวกรประจำหน้างาน"', 'why3_title:"ส่งมอบและบริการหลังการขาย"'],
  ['why3_desc:"วิศวกรของเราทำงานเคียงข้างทีมของคุณ — สนับสนุนการบำรุงรักษา ปรับปรุงประสิทธิภาพ และอื่น ๆ"', 'why3_desc:"ส่งมอบครบวงจรพร้อมบริการหลังการขายต่อเนื่อง — ปรับแต่งเครื่องจักร ตรวจสอบบำรุงรักษา และสนับสนุนการเพิ่มประสิทธิภาพสายการผลิต"'],
  ['why4_title:"ปรัชญาลูกค้าเป็นอันดับแรก"', 'why4_title:"สร้างคุณค่าร่วมกัน"'],
  ['why4_desc:"เราวัดความสำเร็จจากความพึงพอใจของคุณ — ราคาแข่งขัน คุณภาพ และความเป็นหุ้นส่วนที่ยั่งยืน"', 'why4_desc:"เชี่ยวชาญอย่างลึกซึ้งในโครงการเครื่องจักรเภสัชกรรม — โซลูชันที่เชื่อถือได้เพื่อความสำเร็จร่วมกันในระยะยาว"'],
  ['why5_desc:"คุณภาพและงานประณีตติดอันดับ 3 ของอุตสาหกรรม — ในราคาที่ต่ำกว่าคู่แข่งอย่างชัดเจน"', 'why5_desc:"คุณภาพเทียบเท่า สมรรถนะและงานสวยงามไม่แพ้แบรนด์ชั้นนำ — ราคาคุ้มกว่าชัดเจน"'],
  // vi
  ['why1_desc:"Dựa trên công nghệ đóng gói tiên tiến của Châu Âu để có độ chính xác và tin cậy vượt trội."', 'why1_desc:"Dựa trên hệ thống công nghệ đóng gói châu Âu trưởng thành — độ chính xác cao, vận hành ổn định, đáp ứng sản xuất đạt chuẩn GMP."'],
  ['why2_desc:"Thiết bị phi tiêu chuẩn được thiết kế theo nhu cầu — không áp dụng một kiểu cho tất cả."', 'why2_desc:"Phản hồi nhanh nhu cầu tùy chỉnh, bàn giao trọn gói — thiết bị dược phi tiêu chuẩn may đo theo điều kiện dây chuyền riêng của bạn."'],
  ['why3_title:"Kỹ sư hiện trường"', 'why3_title:"Bàn giao & hậu mãi"'],
  ['why3_desc:"Kỹ sư của chúng tôi làm việc cùng đội ngũ của bạn — hỗ trợ bảo trì, tối ưu hóa và hơn thế."', 'why3_desc:"Triển khai trọn gói kèm hỗ trợ hậu mãi liên tục — hiệu chỉnh thiết bị, bảo trì định kỳ và tối ưu dây chuyền."'],
  ['why4_title:"Triết lý lấy khách hàng làm gốc"', 'why4_title:"Cùng thắng"'],
  ['why4_desc:"Chúng tôi đo lường thành công bằng sự hài lòng của bạn — giá cạnh tranh, chất lượng và hợp tác bền vững."', 'why4_desc:"Am hiểu sâu các dự án thiết bị dược — giải pháp đáng tin cậy đồng hành cùng dây chuyền của bạn, hợp tác dài lâu cùng thắng."'],
  ['why5_desc:"Chất lượng và hoàn thiện thuộc top 3 ngành — với giá thấp hơn đáng kể so với đối thủ."', 'why5_desc:"Cùng chất lượng, hiệu năng và hoàn thiện sánh ngang thương hiệu hàng đầu — chi phí có lợi hơn rõ rệt."'],
  // bn
  ['why1_desc:"অসাধারণ নির্ভুলতা ও নির্ভরযোগ্যতার জন্য ইউরোপের উন্নত প্যাকেজিং প্রযুক্তির ওপর ভিত্তি করে।"', 'why1_desc:"ইউরোপের পরিণত প্যাকেজিং প্রক্রিয়ার ওপর ভিত্তি করে — উচ্চ নির্ভুলতা, স্থিতিশীল পরিচালনা এবং GMP-সম্মত উৎপাদন।"'],
  ['why2_desc:"আপনার নির্দিষ্ট উৎপাদন প্রয়োজন অনুযায়ী তৈরি নন-স্ট্যান্ডার্ড ইকুইপমেন্ট — কোনো এক-সাইজ-ফিট-অল অ্যাপ্রোচ নেই।"', 'why2_desc:"কাস্টম চাহিদায় দ্রুত সাড়া এবং সম্পূর্ণ ডেলিভারি — আপনার প্রোডাকশন লাইনের পরিবেশ অনুযায়ী নন-স্ট্যান্ডার্ড ফার্মা সরঞ্জাম তৈরি।"'],
  ['why3_title:"অন-সাইট ফিল্ড ইঞ্জিনিয়ার"', 'why3_title:"ডেলিভারি ও আফটার-সেলস"'],
  ['why3_desc:"আমাদের ইঞ্জিনিয়াররা আপনার দলের সাথে কাজ করে — রক্ষণাবেক্ষণ সহায়তা, দক্ষতা অপটিমাইজেশন এবং আরও অনেক কিছু।"', 'why3_desc:"সম্পূর্ণ ডেলিভারি ও ধারাবাহিক আফটার-সেলস সহায়তা — সরঞ্জাম কমিশনিং, রক্ষণাবেক্ষণ পরিদর্শন এবং লাইন অপটিমাইজেশন।"'],
  ['why4_title:"কাস্টমার-ফার্স্ট দর্শন"', 'why4_title:"পারস্পরিক মূল্য সৃষ্টি"'],
  ['why4_desc:"আমরা আপনার সন্তুষ্টি দিয়ে সাফল্য পরিমাপ করি — প্রতিযোগিতামূলক মূল্য, মানসম্পন্ন পণ্য এবং স্থায়ী অংশীদারিত্ব।"', 'why4_desc:"ফার্মা সরঞ্জাম প্রকল্পে গভীর অভিজ্ঞতা — নির্ভরযোগ্য সমাধানে আপনার লাইন সচল রাখা এবং দীর্ঘমেয়াদী অংশীদারিত্ব।"'],
  ['why5_desc:"মান ও সমাপ্তি শিল্পে শীর্ষ ৩-এ — মূল্য প্রতিযোগীদের চেয়ে অনেক কম।"', 'why5_desc:"সমান মানের মধ্যে কর্মক্ষমতা ও সমাপ্তি শীর্ষ ব্র্যান্ডের সমতুল্য — খরচ উল্লেখযোগ্যভাবে কম।"'],
  // ur
  ['why1_desc:"اعلی درستگی اور قابل اعتمادی کے لیے یورپ کی جدید پیکجنگ ٹیکنالوجیز پر مبنی۔"', 'why1_desc:"یورپ کے تجربہ کار پیکجنگ عمل پر مبنی — اعلیٰ درستگی، مستحکم آپریشن، اور GMP معیارات کے مطابق پیداوار۔"'],
  ['why2_desc:"آپ کی مخصوص پیداواری ضروریات کے مطابق بنائے گئے غیر معیاری آلات — کوئی ایک سائز سب کے لیے نہیں۔"', 'why2_desc:"حسب ضرورت درخواستوں پر فوری ردعمل اور مکمل فراہمی — آپ کی پروڈکشن لائن کے مطابق غیر معیاری فارما سامان تیار۔"'],
  ['why3_title:"آن سائٹ فیلڈ انجینئرز"', 'why3_title:"ڈیلیوری اور فروخت کے بعد سروس"'],
  ['why3_desc:"ہمارے انجینئرز آپ کی ٹیم کے ساتھ کام کرتے ہیں — مینٹیننس سپورٹ، کارکردگی کی بہتری اور مزید۔"', 'why3_desc:"مکمل ڈیلیوری اور مسلسل فروخت کے بعد معاونت — مشین کی تنصیب و ایڈجسٹمنٹ، دیکھ بھال کے معائنے اور لائن بہتری کی تکنیکی مدد۔"'],
  ['why4_title:"کسٹمر فرسٹ فلسفہ"', 'why4_title:"باہمی فائدہ"'],
  ['why4_desc:"ہم کامیابی کو آپ کی اطمینان سے ناپتے ہیں — مسابقتی قیمت، معیاری مصنوعات، اور پائیدار شراکت داری۔"', 'why4_desc:"فارما سامان کے منصوبوں میں گہری مہارت — قابل اعتماد حل کے ساتھ آپ کی لائن کو مسلسل چلائیں اور طویل مدتی شراکت داری بنائیں۔"'],
  ['why5_desc:"معیار اور فنشنگ صنعت میں ٹاپ 3 میں — قیمت حریفوں سے کہیں کم۔"', 'why5_desc:"یکساں معیار پر کارکردگی اور فنشنگ اول درجہ برانڈز کے برابر — لاگت کہیں کم۔"'],
  // fa
  ['why1_desc:"مبتنی بر فناوری‌های پیشرفته بسته‌بندی اروپا برای دقت و قابلیت اطمینان برتر."', 'why1_desc:"بر پایه فرآیندهای بسته‌بندی بالغ اروپا — دقت بالا، عملکرد پایدار و تولید منطبق با GMP."'],
  ['why2_desc:"تجهیزات غیراستاندارد متناسب با نیازهای تولید خاص شما — بدون رویکرد یک‌اندازه‌برای‌همه."', 'why2_desc:"پاسخ سریع به درخواست‌های سفارشی و تحویل کامل — تجهیزات دارویی غیراستاندارد متناسب با خط تولید منحصربه‌فرد شما."'],
  ['why3_title:"مهندسان میدانی"', 'why3_title:"تحویل و خدمات پس از فروش"'],
  ['why3_desc:"مهندسان ما در کنار تیم شما کار می‌کنند — پشتیبانی نگهداری، بهینه‌سازی کارایی و بیشتر."', 'why3_desc:"تحویل کامل و پشتیبانی مستمر پس از فروش — راه‌اندازی تجهیزات، بازدیدهای نگهداری و بهینه‌سازی خط تولید."'],
  ['why4_title:"فلسفه مشتری‌اول"', 'why4_title:"برد-برد"'],
  ['why4_desc:"ما موفقیت را با رضایت شما می‌سنجیم — قیمت‌های رقابتی، محصولات باکیفیت و مشارکت‌های پایدار."', 'why4_desc:"تجربه عمیق در پروژه‌های تجهیزات دارویی — راهکارهای قابل اعتماد برای خط شما و مشارکت بلندمدت."'],
  ['why5_desc:"کیفیت و ظاهر در میان ۳ برتر صنعت — با قیمتی بسیار پایین‌تر از رقبا."', 'why5_desc:"در کیفیت برابر، عملکرد و ظاهر هم‌تراز برندهای مطرح — با هزینه بسیار مناسب‌تر."'],
];
M.forEach(([o, n]) => rep(o, n));

// ── 2) HTML 默认英文文案同步 ──
rep('>Rooted in advanced packaging technologies from Europe for superior precision and reliability.<', '>Built on mature European packaging processes — high precision, stable operation, and GMP-compliant production.<');
rep('>Non-standard equipment tailored to your specific production needs — no one-size-fits-all approach.<', '>Fast response to custom requirements with end-to-end delivery — non-standard pharma equipment tailored to your unique line conditions.<');
rep('>On-Site Field Engineers<', '>Delivery &amp; After-Sales<');
rep('>Our engineers work alongside your team — maintenance support, efficiency optimization, and more.<', '>End-to-end commissioning with ongoing after-sales support — equipment debugging, maintenance inspections, and line optimization.<');
rep('>Customer-First Philosophy<', '>Win-Win Value<');
rep('>We measure success by your satisfaction — competitive pricing, quality products, and lasting partnerships.<', '>Deep expertise in pharma equipment projects — reliable solutions that keep your line running, built for long-term mutual success.<');
rep('>Quality and finish rank top-3 in the industry — at prices far below competitors.<', '>At equal quality, our equipment matches leading brands in performance and finish — at a clear cost advantage.<');

// ── 3) 卡片顺序：把 why5（金色价签）从第2位移到第4位（why3 之后、why4 盾牌之前）──
const tagIdx = s.indexOf('linearGradient id="wg-5"');
if (tagIdx === -1) { fail.push('tag card not found'); }
else {
  const cardStart = s.lastIndexOf('<div class="why-card">', tagIdx);
  const descEnd = s.indexOf('</p>', s.indexOf('data-i18n="why5_desc"'));
  const cardEnd = s.indexOf('</div>', descEnd) + '</div>'.length;
  let block = s.slice(cardStart, cardEnd);
  // 去掉原位置（连同其后的换行）
  s = s.slice(0, cardStart) + s.slice(cardEnd).replace(/^\s*\n/, '');
  // 插到盾牌卡（why4）之前
  const shieldIdx = s.indexOf('<!-- 3D 盾牌 + 勾');
  const shieldCard = s.lastIndexOf('<div class="why-card">', shieldIdx);
  s = s.slice(0, shieldCard) + block + '\n      ' + s.slice(shieldCard);
}

fs.writeFileSync(p, s);
if (fail.length) { console.log('❌ 未匹配 ' + fail.length + ' 处:'); fail.forEach(f => console.log('  ' + f)); process.exit(1); }
// 校验
const order = [...s.matchAll(/data-i18n="(why\d_title)"/g)].map(m => m[1]);
console.log('HTML 卡片顺序:', order.join(' '));
const n5 = (s.match(/why5_title:"/g) || []).length;
console.log('why5 字典条目:', n5, '| 剩余未替换检查:', fail.length === 0 ? 'OK' : fail);
