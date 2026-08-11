import walletService from "../services/wallet.service.js";

export const getBalance = async (req, res) => {
  try {
    const userId = req.user?.id || "demo-user";

    const balance = await walletService.getBalance(userId);

    res.json({
      success: true,
      balance
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getHistory = async (req, res) => {
  try {
    const userId = req.user?.id || "demo-user";

    const deposits = await walletService.getDeposits(userId);

    res.json({
      success: true,
      deposits
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const deposit = async (req, res) => {
  try {

    const deposit = await walletService.createDeposit({

      user: req.user?.id || "demo-user",

      amount: req.body.amount || 0,

      currency: req.body.currency || "USD",

      paymentMethod: req.body.paymentMethod || "unknown",

      transactionNumber: req.body.transactionNumber || "",

      receiptImage: req.body.receiptImage || ""

    });


    res.json({

      success: true,

      message: "Deposit request submitted successfully.",

      deposit

    });


  } catch (error) {

    res.status(500).json({

      success:false,

      message:error.message

    });

  }
};
