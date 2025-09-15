// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');   // ✅ FIX: Import jwt

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

// Create upload folder if it doesn't exist
const uploadPath = path.join(__dirname, 'upload', 'images');
fs.mkdirSync(uploadPath, { recursive: true });

// MongoDB connection
mongoose.connect('mongodb+srv://ohmgaud36:ohmgaud16@cluster0.yswkhgd.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define schema and model for products
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

// Serve static images
app.use('/images', express.static(uploadPath));

// Multer setup
const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(null, `product_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

// Upload image route
// Upload image route
app.post('/upload', upload.single('product'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'File not received' });
  }

  // ✅ Use your Render backend URL instead of localhost
  const imageUrl = `https://ecommerce1-8j8k.onrender.com/images/${req.file.filename}`;

  res.json({
    success: true,
    image_url: imageUrl
  });
});


// Add product route
app.post('/addproduct', async (req, res) => {
  try {
    console.log("📦 Product Received:", req.body);
    const { name, image, category, new_price, old_price } = req.body;

    if (!name || !image || !category || new_price === undefined || old_price === undefined) {
      console.log("❌ Missing fields");
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    const lastProduct = await Product.findOne({}).sort({ id: -1 });
    const id = lastProduct ? lastProduct.id + 1 : 1;

    const newProduct = new Product({
      id,
      name,
      image,
      category,
      new_price: Number(new_price),
      old_price: Number(old_price),
    });

    await newProduct.save();
    console.log("✅ Product added:", newProduct);
    res.status(201).json({ success: true, message: 'Product added' });

  } catch (err) {
    console.error("🔥 ERROR DETAILS:", err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Get all products
app.get('/allproducts', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Remove a product
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
});

// ================= USERS =================

// Schema creation for user model
const Users = mongoose.model('Users', {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now }
});

// Signup route
app.post('/signup', async (req, res) => {
  try {
    let check = await Users.findOne({ email: req.body.email });  // ✅ FIX: typo
    if (check) {
      return res.status(400).json({ success: false, errors: "User already exists with this email" });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });

    await user.save();

    const data = { user: { id: user.id } };
    const token = jwt.sign(data, 'secret_ecom');

    res.json({ success: true, token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ success: false, error: "Wrong email id" });
    }

    const passCompare = req.body.password === user.password; // ✅ FIXED
    if (!passCompare) {
      return res.json({ success: false, error: "Wrong Password" });
    }

    const data = { user: { id: user.id } };
    const token = jwt.sign(data, 'secret_ecom');

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
