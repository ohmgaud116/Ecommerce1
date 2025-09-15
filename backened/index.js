// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

// ================= CREATE UPLOAD FOLDER =================
const uploadPath = path.join(__dirname, 'upload', 'images');
fs.mkdirSync(uploadPath, { recursive: true });
app.use('/images', express.static(uploadPath));

// ================= MONGO CONNECTION =================
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://<user>:<pass>@cluster0.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ================= SCHEMA =================
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  category: String,
  new_price: Number,
  old_price: Number,
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true }
}, { strict: false });

const Product = mongoose.model('Product', productSchema);

const Users = mongoose.model('Users', {
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: Object,
  date: { type: Date, default: Date.now }
});

// ================= MULTER (LOCAL) =================
const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(null, `product_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

// ================= ROUTES =================

// Upload image (LOCAL)
app.post('/upload', upload.single('product'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'File not received' });

  const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  res.json({ success: true, image_url: imageUrl });
});

// Add product
app.post('/addproduct', async (req, res) => {
  try {
    const { name, image, category, new_price, old_price } = req.body;
    if (!name || !image || !category || new_price === undefined || old_price === undefined) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    const lastProduct = await Product.findOne({}).sort({ id: -1 });
    const id = lastProduct ? lastProduct.id + 1 : 1;

    const newProduct = new Product({ id, name, image, category, new_price, old_price });
    await newProduct.save();

    res.status(201).json({ success: true, message: 'Product added' });
  } catch (err) {
    console.error("🔥 ERROR:", err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Get all products
app.get('/allproducts', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Remove product
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
});

// ================= AUTH =================
app.post('/signup', async (req, res) => {
  try {
    let check = await Users.findOne({ email: req.body.email });
    if (check) return res.status(400).json({ success: false, errors: "User already exists" });

    let cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;

    const user = new Users({ name: req.body.username, email: req.body.email, password: req.body.password, cartData: cart });
    await user.save();

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET || 'secret_ecom');
    res.json({ success: true, token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.post('/login', async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user) return res.json({ success: false, error: "Wrong email id" });

    const passCompare = req.body.password === user.password;
    if (!passCompare) return res.json({ success: false, error: "Wrong Password" });

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET || 'secret_ecom');
    res.json({ success: true, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// ================= SERVER =================
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
