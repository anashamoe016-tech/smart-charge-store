import express from "express";
import PaymentMethod from "../models/paymentMethod.model.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const methods = await PaymentMethod.find({ enabled: true });
    res.json({ success: true, methods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const method = await PaymentMethod.create({
      name: req.body.name,
      type: req.body.type,
      walletId: req.body.walletId,
      accountNumber: req.body.accountNumber,
      qrImage: req.body.qrImage || ""
    });
    res.json({ success: true, method });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.patch("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const method = await PaymentMethod.findByIdAndUpdate(
      req.params.id,
      { enabled: req.body.enabled },
      { new: true }
    );
    res.json({ success: true, method });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
