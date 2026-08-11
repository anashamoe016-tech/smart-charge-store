import express from "express";
import { publicSettings } from "../services/central-settings.service.js";
const router=express.Router();
router.get("/public",(req,res)=>res.json({success:true,settings:publicSettings()}));
export default router;
