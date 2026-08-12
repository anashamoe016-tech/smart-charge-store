import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
{
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        default: ""
    },

    password: {
        type: String,
        required: false,
        default: ""
    },

    googleId: {
        type: String,
        default: "",
        index: true
    },

    balance: {
        type: Number,
        default: 0
    },

    currency: {
        type: String,
        default: "USD"
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    status: {
        type: String,
        enum: ["active", "blocked"],
        default: "active"
    },

    verified: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);

// تشفير كلمة المرور قبل الحفظ
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);

    next();

});

// مقارنة كلمة المرور
userSchema.methods.comparePassword = async function (password) {

    return await bcrypt.compare(password, this.password);

};

const User = mongoose.model("User", userSchema);

export default User;