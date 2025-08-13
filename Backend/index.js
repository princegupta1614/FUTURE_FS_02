import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import cors from 'cors';
import session from 'express-session';

import product from "./Routes/product.routes.js";
import login from "./Routes/login.routes.js";
import register from "./Routes/register.routes.js";
import profileRouter from "./Routes/profile.routes.js";
import logoutRouter from "./Routes/logout.routes.js";
import cartRouter from "./Routes/cart.routes.js";
import orderRouter from "./Routes/order.routes.js";

import adminRouter from "./Routes/admin.routes.js";
import adminOrdersRouter from "./Routes/adminOrders.routes.js";

const app = express();

app.use(cors({
    origin: process.env.FRONTENDURI,
    credentials: true
}));

app.use(express.json());

// ✅ Add session middleware BEFORE routes
app.use(session({
    secret: process.env.SESSION_SECRET || 'PrinceGupta1230', // store in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        httpOnly: true,
        secure: false // change to true if HTTPS
    }
}));

// Routes
app.use('/api/product', product);
app.use('/api/login', login);
app.use('/api/register', register);
app.use('/api/profile', profileRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

// Admin routes
app.use('/api/admin', adminRouter);
app.use("/api/admin/orders", adminOrdersRouter);

mongoose.connect(process.env.DBURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.listen(process.env.PORT || 8000, () => {
    console.log(`App is running at : http://localhost:${process.env.PORT || 8000}`);
});
