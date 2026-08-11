import express from "express";
import PaymentMethod from "../models/paymentMethod.model.js";

const router = express.Router();


// عرض كل طرق الدفع
router.get("/", async (req, res) => {
  try {
    const methods = await PaymentMethod.find({
      enabled: true
    });

    res.json({
      success: true,
      methods
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// إضافة طريقة دفع جديدة
router.post("/", async (req, res) => {
  try {

    const method = await PaymentMethod.create({
      name: req.body.name,
      type: req.body.type,
      walletId: req.body.walletId,
      accountNumber: req.body.accountNumber,
      qrImage: req.body.qrImage || ""
    });

    res.json({
      success: true,
      method
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});


// تشغيل / إيقاف طريقة دفع
router.patch("/:id", async (req, res) => {
  try {

    const method = await PaymentMethod.findByIdAndUpdate(
      req.params.id,
      {
        enabled: req.body.enabled
      },
      {
        new: true
      }
    );

    res.json({
      success: true,
      method
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});


export default router;
