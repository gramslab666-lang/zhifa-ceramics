const filters=document.querySelectorAll('.filters button'),products=document.querySelectorAll('.product');
filters.forEach(b=>b.onclick=()=>{filters.forEach(x=>x.classList.remove('active'));b.classList.add('active');products.forEach(p=>p.classList.toggle('hidden',b.dataset.filter!=='all'&&p.dataset.cat!==b.dataset.filter))});
const viewer=document.querySelector('.viewer');
products.forEach(p=>{const open=()=>{viewer.querySelector('img').src=p.querySelector('img').src;viewer.querySelector('span').textContent=p.querySelector('.product-info span').textContent;viewer.querySelector('h3').textContent=p.querySelector('h3').textContent;viewer.classList.add('show');viewer.setAttribute('aria-hidden','false')};p.onclick=open;p.onkeydown=e=>{if(e.key==='Enter')open()}});
const close=()=>{viewer.classList.remove('show');viewer.setAttribute('aria-hidden','true')};viewer.querySelector('button').onclick=close;viewer.onclick=e=>{if(e.target===viewer)close()};document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
document.querySelectorAll('.process-card video').forEach(v=>{v.addEventListener('mouseenter',()=>v.play().catch(()=>{}));v.addEventListener('mouseleave',()=>v.pause())});

// V7.1 navigation, reveal and progress polish
const header=document.querySelector('.nav'), progress=document.querySelector('.scroll-progress');
const onScroll=()=>{
 header?.classList.toggle('scrolled',scrollY>40);
 const max=document.documentElement.scrollHeight-innerHeight;
 if(progress) progress.style.width=(max>0?scrollY/max*100:0)+'%';
};
addEventListener('scroll',onScroll,{passive:true}); onScroll();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -30px'});
document.querySelectorAll('.reveal-v7').forEach(x=>io.observe(x));

// V7.2 multilingual interface
const I18N={
ru:{nav_company:"Компания",nav_catalog:"Каталог",nav_production:"Производство",nav_contact:"Контакты",hero_title:"Материалы для современной архитектуры.",hero_lead:"Керамические поверхности ZHIFA для жилых, коммерческих и архитектурных проектов.",view_catalog:"Смотреть каталог",contact_us:"Связаться с нами",company:"Компания",collections:"Коллекции",all:"Все",production:"Производство",contacts:"Контакты",spec_label:"ПРОДУКЦИЯ",spec_title:"Понятный выбор для разных задач.",spec_intro:"Коллекции разделены по характеру поверхности. Это помогает быстро подобрать решение под интерьер, коммерческое пространство или архитектурный проект.",surface:"Поверхность",formats:"Форматы",application:"Применение",application_val:"Интерьер · коммерческие пространства · проекты",selection:"Подбор",selection_val:"По дизайну и типу поверхности"},
uz:{nav_company:"Kompaniya",nav_catalog:"Katalog",nav_production:"Ishlab chiqarish",nav_contact:"Aloqa",hero_title:"Zamonaviy arxitektura uchun materiallar.",hero_lead:"Turar joy, tijorat va arxitektura loyihalari uchun ZHIFA keramik yuzalari.",view_catalog:"Katalogni ko‘rish",contact_us:"Biz bilan bog‘lanish",company:"Kompaniya",collections:"Kolleksiyalar",all:"Barchasi",production:"Ishlab chiqarish",contacts:"Aloqa",spec_label:"MAHSULOT",spec_title:"Turli vazifalar uchun tushunarli tanlov.",spec_intro:"Kolleksiyalar yuza xususiyatiga ko‘ra ajratilgan. Bu interyer, tijorat maydoni yoki loyiha uchun mos yechimni tez tanlashga yordam beradi.",surface:"Yuza",formats:"O‘lchamlar",application:"Qo‘llanish",application_val:"Interyer · tijorat maydonlari · loyihalar",selection:"Tanlash",selection_val:"Dizayn va yuza turiga ko‘ra"},
zh:{nav_company:"公司",nav_catalog:"产品目录",nav_production:"生产制造",nav_contact:"联系我们",hero_title:"为现代建筑打造的陶瓷材料。",hero_lead:"ZHIFA 陶瓷表面材料，适用于住宅、商业空间及建筑项目。",view_catalog:"查看产品目录",contact_us:"联系我们",company:"公司",collections:"产品系列",all:"全部",production:"生产制造",contacts:"联系方式",spec_label:"产品",spec_title:"清晰选择，满足不同项目需求。",spec_intro:"产品系列按表面效果分类，便于为室内、商业空间及建筑项目快速选择合适方案。",surface:"表面效果",formats:"规格",application:"应用",application_val:"室内 · 商业空间 · 工程项目",selection:"选型",selection_val:"按设计与表面类型选择"},
en:{nav_company:"Company",nav_catalog:"Catalog",nav_production:"Production",nav_contact:"Contacts",hero_title:"Materials for contemporary architecture.",hero_lead:"ZHIFA ceramic surfaces for residential, commercial and architectural projects.",view_catalog:"View catalog",contact_us:"Contact us",company:"Company",collections:"Collections",all:"All",production:"Production",contacts:"Contacts",spec_label:"PRODUCT",spec_title:"A clear choice for different applications.",spec_intro:"Collections are organized by surface character, making it easier to select a solution for interiors, commercial spaces or architectural projects.",surface:"Surface",formats:"Formats",application:"Application",application_val:"Interiors · commercial spaces · projects",selection:"Selection",selection_val:"By design and surface type"}
};
function setLang(lang){
 const d=I18N[lang]||I18N.ru;
 document.documentElement.lang=lang;
 document.querySelectorAll('[data-i18n]').forEach(el=>{const v=d[el.dataset.i18n];if(v)el.textContent=v});
 document.querySelectorAll('.langs button').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
 localStorage.setItem('zhifa-v7-lang',lang);
}
document.querySelectorAll('.langs button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
setLang(localStorage.getItem('zhifa-v7-lang')||'ru');

// V7.4 production video interactions
const feature=document.querySelector('.production-feature video');
const toggle=document.querySelector('.video-toggle');
if(feature&&toggle){
 toggle.addEventListener('click',()=>{
  if(feature.paused){feature.play().catch(()=>{});toggle.textContent='PAUSE VIDEO'}
  else{feature.pause();toggle.textContent='PLAY VIDEO'}
 });
}
document.querySelectorAll('.production-filmstrip video').forEach(v=>{
 v.parentElement.addEventListener('mouseenter',()=>v.play().catch(()=>{}));
 v.parentElement.addEventListener('mouseleave',()=>v.pause());
});

// V8 final UX: pause background videos when page is hidden; lazy play only when useful.
document.addEventListener('visibilitychange',()=>{
 document.querySelectorAll('video').forEach(v=>{
   if(document.hidden) v.pause();
   else if(v.classList.contains('hero-video')) v.play().catch(()=>{});
 });
});
