const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { log } = require("console");

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://gaudohm16:ohmgaud16@cluster0.20c7l8c.mongodb.net/gaudohm16.Ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// Basic API Route
app.get("/", (req, res) => {
  res.send("Express app is running");
});

// Set up Multer storage
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Serve static images
app.use('/images', express.static('upload/images'));

// Image upload endpoint
app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});

// Product Schema
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// Product Model
const Product = mongoose.model("Product", productSchema);

// Product creation endpoint
app.post('/addproduct', async (req, res) => {

  // id will be incremented by 1 automatically
  let products = await Product.find({});
  let id;
  if (products.length>0)
  {
    let last_product_array =  products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id +1;
  }
  else{
    id =1;
  }
  try {
    const newProduct = new Product({
      id:id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    console.log("New product to save:", newProduct);

    await newProduct.save();

    console.log("Product saved to MongoDB");
    res.json({
      success: true,
      name: req.body.name,
    });

  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success: false, message: "Failed to save product" });
  }
});


// creating API for deleting products

app.post('/removeproduct',async(req,res)=>{
          await Product.findOneAndDelete({id:req.body.id});
          console.log("Removed");
          res.json({
            success: true,
            name:req.body.name
          })
})

// creating API for getting all products
app.get('/allproducts',async(req,res)=>{
  let products = await Product.find({});
  console.log("All products Fetched");
  res.send(products);
})


// Start the server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
