import crypto from "crypto";
import User from "../models/user.model.js";
import Wallet from "../models/wallet.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function sanitizeUser(user) {
    return {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        verified: user.verified,
        balance: user.balance,
        currency: user.currency
    };
}

function signToken(user) {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
}

export const register = async (req, res) => {
    try {
        const { username, fullName, email, phone, password } = req.body;

        if (!username || !fullName || !email || !password) {
            return res.status(400).json({ success: false, message: "Username, full name, email and password are required." });
        }

        if (String(password).length < 6) {
            return res.status(400).json({ success: false, message: "Password must contain at least 6 characters." });
        }

        const exists = await User.findOne({
            $or: [{ email: String(email).toLowerCase() }, { username: String(username).trim() }]
        });

        if (exists) {
            return res.status(409).json({ success: false, message: "Username or email already exists." });
        }

        const user = await User.create({
            username: String(username).trim(),
            fullName: String(fullName).trim(),
            email: String(email).toLowerCase().trim(),
            phone: String(phone || "").trim(),
            password
        });

        await Wallet.create({ user: user._id });

        const token = signToken(user);

        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
            user: sanitizeUser(user)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const identity = String(req.body.identity || req.body.email || req.body.username || "").trim();
        const password = String(req.body.password || "");

        if (!identity || !password) {
            return res.status(400).json({ success: false, message: "Username/email and password are required." });
        }

        const user = await User.findOne({
            $or: [{ email: identity.toLowerCase() }, { username: identity }]
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        if (user.status !== "active") {
            return res.status(403).json({ success: false, message: "This account is not active." });
        }

        const match = await bcrypt.compare(password, user.password || "");
        if (!match) {
            return res.status(401).json({ success: false, message: "Invalid password." });
        }

        const token = signToken(user);

        res.json({
            success: true,
            token,
            user: sanitizeUser(user)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const googleLogin = async (req, res) => {
    try {
        const credential = String(req.body.credential || "").trim();
        const clientId = String(process.env.GOOGLE_CLIENT_ID || "").trim();

        if (!credential || !clientId) {
            return res.status(400).json({
                success: false,
                message: "Google login is not configured yet."
            });
        }

        const response = await fetch(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
        );

        if (!response.ok) {
            return res.status(401).json({ success: false, message: "Invalid Google credential." });
        }

        const profile = await response.json();

        if (profile.aud !== clientId) {
            return res.status(401).json({ success: false, message: "Google client ID mismatch." });
        }

        const email = String(profile.email || "").toLowerCase().trim();
        if (!email || profile.email_verified !== "true") {
            return res.status(401).json({ success: false, message: "Google email is not verified." });
        }

        let user = await User.findOne({ $or: [{ googleId: profile.sub }, { email }] });

        if (!user) {
            const baseUsername = String(profile.name || email.split("@")[0])
                .toLowerCase()
                .replace(/[^a-z0-9_]+/g, "_")
                .replace(/^_+|_+$/g, "")
                .slice(0, 24) || "google_user";

            let username = baseUsername;
            let counter = 1;
            while (await User.exists({ username })) {
                username = `${baseUsername}_${counter++}`;
            }

            const password = await bcrypt.hash(crypto.randomBytes(32).toString("hex"), 10);

            user = await User.create({
                username,
                fullName: String(profile.name || username).trim(),
                email,
                password,
                googleId: profile.sub,
                verified: true
            });

            await Wallet.create({ user: user._id });
        } else {
            if (!user.googleId) user.googleId = profile.sub;
            user.verified = true;
            await user.save();
        }

        const token = signToken(user);

        res.json({
            success: true,
            token,
            user: sanitizeUser(user)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    res.json({ success: true, message: "Logged out successfully." });
};

export const me = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ user: req.user.id });
        res.json({
            success: true,
            user: sanitizeUser(req.user),
            wallet: wallet || { balance: 0, currency: req.user.currency || "USD" }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
