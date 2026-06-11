<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>متجر الشحن الذكي</title>
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
*{font-family:'Cairo',sans-serif}
body{background:#000;color:#fff}
.header-bg{background:linear-gradient(180deg,#1a0000 0%,#000 100%)}
.card-cat{background:#111;border:1px solid #2a0000;border-radius:20px;overflow:hidden;cursor:pointer}
.btn-red{background:#dc2626}
</style>
</head>
<body class="pb-24">

<div class="header-bg sticky top-0 z-50 px-4 py-3 flex justify-between items-center">
  <div class="flex items-center gap-2">
    <img src="logo.png" class="w-10 h-10 rounded-xl object-contain bg-black p-1 border border-red-900">
    <div><p class="font-bold text-sm leading-none">متجر</p><p class="font-bold text-sm text-red-500 leading-none">الشحن الذكي</p></div>
  </div>
  <div class="flex items-center gap-2">
    <div class="bg-[#1a1a1a] border border-red-900/50 rounded-full px-3 py-1.5 flex items-center gap-2">
      <i class="fa fa-wallet text-yellow-500 text-xs"></i>
      <span class="text-xs font-bold" id="topBalance">USD $ 0.00</span>
    </div>
    <div class="text-yellow-500 text-xs font-bold">VIP 0 <i class="fa fa-crown"></i></div>
  </div>
</div>

<div class="px-4 mt-3">
  <div class="relative rounded-2xl overflow-hidden h-44 bg-[#0a0a0a] border border-red-900/30">
    <img src="banner.jpg" class="w-full h-full object-contain p-2">
  </div>
</div>

<p class="text-center text-gray-400 text-xs mt-3 px-4">خدمات شحن برامج الدردشة والألعاب وخدمات السوشيال ميديا</p>

<div class="px-4 mt-4">
  <div class="bg-[#111] border border-[#222] rounded-2xl flex items-center px-4 py-3">
    <i class="fa fa-search text-gray-500 ml-3"></i>
    <input placeholder="ابحث عن منتج..." class="bg-transparent flex-1 outline-none text-sm text-right" id="searchInput">
  </div>
</div>

<div class="px-4 mt-6">
  <h3 class="font-bold mb-3 text-right">أختر القسم الذي تريده :</h3>
  <div class="grid grid-cols-3 gap-3">
    <div onclick="openCat('offers')" class="card-cat"><div class="bg-gradient-to-b from-red-900/40 to-black p-3 text-center"><p class="font-bold text-sm mb-2">عروض خاصة</p><div class="h-12 flex items-center justify-center"><i class="fa fa-fire text-3xl text-red-600"></i></div></div></div>
    <div onclick="openCat('chat')" class="card-cat"><div class="bg-gradient-to-b from-red-900/40 to-black p-3 text-center"><p class="font-bold text-sm mb-2">الدردشة</p><div class="h-12 flex items-center justify-center"><i class="fa fa-comments text-3xl text-red-600"></i></div></div></div>
    <div onclick="openCat('games')" class="card-cat"><div class="bg-gradient-to-b from-red-900/40 to-black p-3 text-center"><p class="font-bold text-sm mb-2">الألعاب</p><div class="h-12 flex items-center justify-center"><i class="fa fa-gamepad text-3xl text-red-600"></i></div></div></div>
    <div onclick="openCat('digital')" class="card-cat"><div class="bg-gradient-to-b from-[#1a0000] to-black p-3 text-center"><p class="font-bold text-sm mb-2">عملات رقمية</p><div class="h-12 flex items-center justify-center"><i class="fab fa-bitcoin text-3xl text-yellow-500"></i></div></div></div>
    <div onclick="openCat('cards')" class="card-cat"><div class="bg-gradient-to-b from-red-900/40 to-black p-3 text-center"><p class="font-bold text-sm mb-2">البطاقات</p><div class="h-12 flex items-center justify-center"><i class="fa fa-credit-card text-3xl text-red-600"></i></div></div></div>
    <div onclick="showTab('wallet')" class="card-cat"><div class="bg-gradient-to-b from-red-900/40 to-black p-3 text-center"><p class="font-bold text-sm mb-2">الرصيد</p><div class="h-12 flex items-center justify-center"><i class="fa fa-wallet text-3xl text-red-600"></i></div></div></div>
  </div>
</div>

<div id="productsSection" class="px-4 mt-6 hidden">
  <div class="flex justify-between items-center mb-3">
    <h3 id="catTitle" class="font-bold"></h3>
    <button onclick="closeCat()" class="text-red-500 text-sm">رجوع</button>
  </div>
  <div id="productsGrid" class="grid grid-cols-2 gap-3"></div>
</div>

<script>
const supabase=window.supabase.createClient('https://xkxabysusvdcokwemwsr.supabase.co','sb_publishable_SB30nONd21w9iG93DKAp1w_KTW-91wv');
let products=[];
async function init(){
  const {data:{user}} = await supabase.auth.getUser();
  if(user){
    const {data} = await supabase.from('users').select('balance').eq('id',user.id).single();
    document.getElementById('topBalance').textContent = 'USD $ '+(data?.balance||0).toFixed(2);
  }
  const {data} = await supabase.from('products').select('*').eq('is_active',true);
  products = data||[];
}
async function openCat(cat){
  document.getElementById('productsSection').classList.remove('hidden');
  const titles={games:'شحن الألعاب',chat:'برامج الدردشة',offers:'عروض خاصة',digital:'عملات رقمية',cards:'البطاقات'};
  document.getElementById('catTitle').textContent = titles[cat]||'المنتجات';
  let query = supabase.from('products').select('*').eq('is_active',true);
  if(cat!=='all') query = query.eq('category', cat);
  const {data,error} = await query.order('sort_order',{ascending:true}).limit(20);
  if(error) return alert('خطأ');
  document.getElementById('productsGrid').innerHTML = data.length? data.map(p=>`
    <div onclick="buyProduct(${p.id})" class="bg-[#111] border border-[#222] rounded-2xl overflow-hidden cursor-pointer">
      <img src="${p.image_url||'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300'}" class="w-full h-28 object-cover">
      <div class="p-3">
        <p class="text-xs font-bold truncate">${p.game_name}</p>
        <p class="text-[11px] text-gray-400 truncate">${p.package_name}</p>
        <div class="flex justify-between items-center mt-2">
          <span class="text-red-500 font-bold text-sm">$${p.sell_price}</span>
          <button class="bg-red-600 text-[10px] px-3 py-1 rounded-full">شراء</button>
        </div>
      </div>
    </div>
  `).join('') : '<p class="text-center text-gray-500 py-8 col-span-2">لا يوجد منتجات</p>';
  window.scrollTo({top:400,behavior:'smooth'});
}
function closeCat(){document.getElementById('productsSection').classList.add('hidden');}
async function buyProduct(id){alert('الشراء قيد التطوير');}
init();
</script>
</body>
</html>
