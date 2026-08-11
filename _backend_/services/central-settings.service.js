import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";
import Provider from "../models/provider.model.js";

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const projectRoot=path.resolve(__dirname,"../..");
const settingsFile=path.join(projectRoot,"_settings_","Smart Charge Store.Settings.js");
let centralSettings=null;

async function loadCentralSettings(){
 if(!fs.existsSync(settingsFile)) throw new Error(`Central settings file not found: ${settingsFile}`);
 await import(`file://${settingsFile}`);
 centralSettings=globalThis.__SCS_SETTINGS_FROM_FILE;
 if(!centralSettings) throw new Error("Central settings did not initialize.");
 return centralSettings;
}
function getSettings(){if(!centralSettings) throw new Error("Central settings have not been loaded yet."); return centralSettings;}
function publicSettings(){const s=getSettings();return {version:s.version,site:s.site,branding:s.branding,currency:s.currency,payments:s.payments,support:s.support,servers:(s.servers||[]).filter(x=>x.enabled)};}
async function syncProviders(){const s=getSettings();const registry=Array.isArray(s.providers)?s.providers:[];const configured=new Set();for(const p of registry){if(!p?.code||!p?.name)continue;const code=String(p.code).trim().toUpperCase();configured.add(code);const apiKey=p.secretEnv?(process.env[p.secretEnv]||""):"";await Provider.findOneAndUpdate({code},{name:p.name,code,apiUrl:p.apiUrl||"",apiKey,status:p.enabled?(p.status||"offline"):"offline",priority:Number(p.priority??1),autoOrders:Boolean(p.enabled&&p.autoOrders),autoSync:Boolean(p.enabled&&p.autoSync),timeout:Number(p.timeout??30000)},{upsert:true,new:true,setDefaultsOnInsert:true});}
 const filter=configured.size?{code:{$nin:[...configured]}}:{}; await Provider.updateMany(filter,{$set:{status:"offline",autoOrders:false,autoSync:false}}); return {synced:configured.size};}
export {loadCentralSettings,getSettings,publicSettings,syncProviders};
