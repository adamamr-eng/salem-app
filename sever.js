// server.js

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// =======================
// 🔹 Middlewares
// =======================
app.use(cors());
app.use(express.json());

// 📁 تقديم الملفات الثابتة من مجلد public
app.use(express.static(path.join(__dirname, "public")));

// =======================
// 🔹 MongoDB Connection
// =======================
const MONGO_URI = "mongodb+srv://adamgabr054_db_user:Ayhaga20@cluster0.b1zl99o.mongodb.net/salemDB?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true&appName=Cluster0";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      ssl: true,
      tlsAllowInvalidCertificates: true,
      family: 4, // لتجنب مشكلة IPv6 على Render
    });
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
}

connectDB();

// =======================
// 🔹 Routes
// =======================

// ✅ الصفحة الرئيسية — أول صفحة تظهر
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ API بسيط للتأكد إن السيرفر شغال
app.get("/status", (req, res) => {
  res.json({ success: true, message: "🚀 Server is running and MongoDB connected!" });
});

// =======================
// 🔹 Start Server
// =======================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
