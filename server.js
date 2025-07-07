const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb+srv://20214043036:grf59ucy7Y204GGB@financeapp.1umqxb5.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=FinanceApp';

app.use(cors());
app.use(bodyParser.json());

// Mongoose User modeli
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

// MongoDB bağlantısı
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Kayıt endpoint'i
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Kullanıcı adı ve şifre gerekli!' });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Bu kullanıcı adı zaten alınmış!' });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    return res.status(200).json({ message: 'Kayıt başarılı!' });
  } catch (err) {
    return res.status(500).json({ message: 'Sunucu hatası!' });
  }
});

// Giriş endpoint'i
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı!' });
    }
    // Gerçek uygulamada burada bir token üretip gönderebilirsin
    return res.status(200).json({ message: 'Giriş başarılı!', token: 'fake-jwt-token' });
  } catch (err) {
    return res.status(500).json({ message: 'Sunucu hatası!' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server ${PORT} portunda çalışıyor`);
});