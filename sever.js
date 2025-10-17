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

// 🏠 أول صفحة تظهر (Sign In)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signin.html"));
});

// ✅ API بسيط لتسجيل الدخول (مؤقت)
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // مثال: بيانات ثابتة للتجربة
  if (email === "test@test.com" && password === "1234") {
    res.json({ success: true, message: "تم تسجيل الدخول بنجاح!" });
  } else {
    res.json({ success: false, message: "بيانات غير صحيحة" });
  }
});

// 📄 بعد تسجيل الدخول — الصفحة الرئيسية
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// =======================
// 🔹 Start Server
// =======================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});



