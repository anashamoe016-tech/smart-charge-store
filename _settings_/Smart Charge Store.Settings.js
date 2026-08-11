/*
 * Smart Charge Store — CENTRAL SETTINGS
 * Edit this file to control public/store configuration in one place.
 * NEVER put database URIs, JWT secrets, API keys or passwords here.
 */
const SCS_SETTINGS={
 version:'1.0.0',
 site:{name:'Smart Charge Store',arabicName:'متجر الشحن الذكي',greeting:'أهلاً بك',language:'ar',direction:'rtl',maintenanceMode:false},
 branding:{primary:'#ef1f26',primaryDark:'#b60011',gold:'#ffb61e',background:'#000000',panel:'#0e0e10',text:'#f7f7f7',logo:'assets/logo.png'},
 currency:{default:'USD',rates:{USD:1,SYP:15000,EUR:0.92,SAR:3.75,EGP:48.5,TRY:39.2},symbols:{USD:'$',SYP:'ل.س',EUR:'€',SAR:'ر.س',EGP:'ج.م',TRY:'₺'},flags:{USD:'🇺🇸',SYP:'🇸🇾',EUR:'🇪🇺',SAR:'🇸🇦',EGP:'🇪🇬',TRY:'🇹🇷'},enabled:['USD','SYP','EUR','SAR','EGP','TRY']},
 payments:{enabled:true,methods:[{code:'SHAMCASH',name:'Sham Cash',enabled:true},{code:'SYRIATEL_CASH',name:'Syriatel Cash',enabled:true},{code:'USDT_TRC20',name:'USDT TRC20',enabled:true},{code:'BEMO',name:'Bemo',enabled:true}]},
 support:{whatsapp:'',telegram:'',email:'',enabled:true},
 providers:[
  {code:'SYRIAMARKET',name:'SyriaMarket',apiUrl:'',secretEnv:'SYRIAMARKET_API_TOKEN',status:'offline',priority:1,autoOrders:true,autoSync:true,enabled:true,timeout:30000},
  {code:'SYRIASTORE',name:'SyriaStore',apiUrl:'',secretEnv:'SYRIASTORE_API_TOKEN',status:'offline',priority:2,autoOrders:false,autoSync:false,enabled:false,timeout:30000},
  {code:'WOLFSTORE',name:'Wolfstore',apiUrl:'',secretEnv:'WOLFSTORE_API_TOKEN',status:'offline',priority:3,autoOrders:false,autoSync:false,enabled:false,timeout:30000}
 ],
 servers:[{code:'BACKEND',name:'Main Backend',url:'',enabled:true},{code:'ADMIN',name:'Admin API',url:'',enabled:true}],
 database:{driver:'mongodb',databaseName:'smart_charge_store',collectionPrefix:'',syncCentralSettingsToDatabase:true},
 features:{autoOrders:false,autoDeposits:false,productSearch:true,providerRouting:true,wallet:true,orders:true,adminPanel:true}
};
if(typeof globalThis!=='undefined') globalThis.__SCS_SETTINGS_FROM_FILE=SCS_SETTINGS;
if(typeof window!=='undefined'){
 window.SCS_SETTINGS=SCS_SETTINGS;
 window.AdminSettings={...(window.AdminSettings||{}),exchange_rates:SCS_SETTINGS.currency.rates,currencyRates:SCS_SETTINGS.currency.rates,wallet_balance_usd:0};
 const root=document.documentElement;
 root.style.setProperty('--red',SCS_SETTINGS.branding.primary);root.style.setProperty('--red2',SCS_SETTINGS.branding.primaryDark);root.style.setProperty('--gold',SCS_SETTINGS.branding.gold);root.style.setProperty('--bg',SCS_SETTINGS.branding.background);root.style.setProperty('--panel',SCS_SETTINGS.branding.panel);root.style.setProperty('--text',SCS_SETTINGS.branding.text);
 document.title=`${SCS_SETTINGS.site.name} | ${SCS_SETTINGS.site.arabicName}`;
 document.querySelectorAll('.brand-info .name').forEach(el=>el.textContent=SCS_SETTINGS.site.arabicName);
 document.querySelectorAll('.brand-info .sub').forEach(el=>el.textContent=SCS_SETTINGS.site.greeting);
 if(SCS_SETTINGS.branding.logo) document.querySelectorAll('.brand-logo-img').forEach(img=>{img.dataset.settingsLogo=SCS_SETTINGS.branding.logo;img.src=SCS_SETTINGS.branding.logo;});
 const menu=document.getElementById('currencyMenu');
 if(menu){const enabled=new Set(SCS_SETTINGS.currency.enabled);menu.querySelectorAll('button[data-code]').forEach(btn=>{const code=btn.dataset.code;btn.hidden=!enabled.has(code);const flag=btn.querySelector('.flag');if(flag&&SCS_SETTINGS.currency.flags[code])flag.textContent=SCS_SETTINGS.currency.flags[code];});}
 window.SCS_PUBLIC_CONFIG=Object.freeze({site:SCS_SETTINGS.site,branding:SCS_SETTINGS.branding,currency:SCS_SETTINGS.currency,payments:SCS_SETTINGS.payments,support:SCS_SETTINGS.support,servers:SCS_SETTINGS.servers.filter(s=>s.enabled)});
}
if(typeof module!=='undefined'&&module.exports) module.exports=SCS_SETTINGS;
