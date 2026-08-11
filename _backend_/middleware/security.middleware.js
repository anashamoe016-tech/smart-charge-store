import helmet from "helmet";
import rateLimit from "express-rate-limit";

// حماية الهيدر
export const securityHeaders = helmet();

// منع كثرة الطلبات
export const apiLimiter = rateLimit({

    windowMs: 60 * 1000,

    max: 100,

    standardHeaders: true,

    legacyHeaders: false,

    message: {

        success: false,

        message: "Too many requests. Please try again later."

    }

});

// تسجيل الطلبات
export const requestLogger = (req, res, next) => {

    console.log(

        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`

    );

    next();

};

// معالج الأخطاء
export const errorHandler = (err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        success: false,

        message: "Internal Server Error"

    });

};