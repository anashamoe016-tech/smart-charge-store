import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  walletId: {
    type: String,
    default: ""
  },

  accountNumber: {
    type: String,
    default: ""
  },

  qrImage: {
    type: String,
    default: ""
  },

  enabled: {
    type: Boolean,
    default: true
  }
},
{
  timestamps: true
}
);

const PaymentMethod = mongoose.model(
  "PaymentMethod",
  paymentMethodSchema
);

export default PaymentMethod;
