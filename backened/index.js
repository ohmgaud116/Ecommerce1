// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { type } = require('os');

const app = express();
const port = 4001;

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

// Define schema and model
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
app.post('/upload', upload.single('product'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'File not received' });
  }

  res.json({
    success: true,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
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
      id: id || 1,
      name: name || '',
      image: image || '',
      category: category || '',
      new_price: Number(new_price || 0),
      old_price: Number(old_price || 0),
        });

    await newProduct.save();
    console.log("✅ Product added:", newProduct);
    res.status(201).json({ success: true, message: 'Product added' });

  } catch (err) {
    console.error("🔥 ERROR DETAILS:", err); // <== Add this line
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


//schema creation for user model
const Users = mongoose.model('Users',{
    name:{
      type:String,
    }
      ,
      email:{
        type:String,
        unique:true,
      },
      password:{
        type:String,
      },
      cartData:{
        type:Object,
      },
      date:{
        type:Date,
        default:Date.now,
      }    
})
// create end point for regestring the user
app.post('/signup',async(req,res)=>{
  let check = await Users.findOne({email:req.body.enail});
  if (check){
    return res.status(400).json({success:false,errors:"existing user found with same email id and email address"})
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i]=0;
  }
  const user = new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  })

  await user.save();
  const data={
    user:{
      id:user.id
    }
  }
  const token = jwt.sign(data,'secret_ecom');
  res.json({success:true,token})
  
})

// create endpoint for userlogin
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user){
      const passCompare = req.body.password === useReducer.password;
      if (passCompare){
        const data = {
          user:{
            id:user.id
          }
        }
        const token = jwt.sign(data,'secret_ecom');
        res.json({success:true,token})
      }
      else{
        res.json({success:false,error:'Wrong Password'});
      }
    }
    else{
      res.json({success:false,error:"wrong email id"})
    }
})





app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
