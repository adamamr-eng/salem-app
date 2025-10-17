const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

// إعداد السيرفر
const app = express();
const PORT = 3000;

// اتصال بقاعدة البيانات MongoDB
const uri = "mongodb+srv://adamgabr054_db_user:Ayhaga20@cluster0.b1zl99o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB successfully");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }
}

connectDB();

// إعداد السيرفر لتشغيل الملفات الثابتة (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// دعم قراءة بيانات JSON من الـ frontend
app.use(express.json());

// Route افتراضي: يفتح صفحة تسجيل الدخول
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'signin.html'));
});

// Sign up API
app.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const db = client.db('salem');
    const users = db.collection('users');

    const existing = await users.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'البريد الإلكتروني مستخدم بالفعل' });
    }

    await users.insertOne({ name, email, password, role });
    res.status(201).json({ message: 'تم إنشاء الحساب بنجاح' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'حدث خطأ في السيرفر' });
  }
});

// Sign in API
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = client.db('salem');
    const users = db.collection('users');

    const user = await users.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'بيانات تسجيل الدخول غير صحيحة' });
    }

    res.status(200).json({ message: 'تم تسجيل الدخول بنجاح', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'حدث خطأ في السيرفر' });
  }
});

// تشغيل السيرفر
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

