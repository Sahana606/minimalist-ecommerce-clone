const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
// const productRoutes = require("./models/addproduct");
const router = express.Router();
const Product = require("./models/addproduct");
// import { v2 as cloudinary } from "cloudinary";

const cloudinary=require("cloudinary").v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary")


const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: String,
  otpExpires: Date,
});

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: String,
  items: Array,
  totalPrice: Number,
  status: { type: String, default: "pending" },
  datetime: { type: Date, default: Date.now },
});

const parser= multer({
  storage:new CloudinaryStorage({
    cloudinary,
    params:{
      folder:"products",
      format:async(req,file)=>{
        const ext=file.mimetype.split("/")[1].toLowerCase();
        const allowedFormats=["jpeg","jpg","png","webp"];
        return allowedFormats.includes(ext)?ext:"png";
      },
      public_id:(req,file)=>`${Date.now()}-${file.originalname.replace(/\s+/g,"_")}`
    }
  })
});



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const UserModel = mongoose.model("User", userSchema);
const OrderModel = mongoose.model("Order", orderSchema);

app.use(express.json());
const allowedOrigins=[
  "http://localhost:5173",
  "https://minimalist-ecommerce-clone-1.onrender.com"
];

app.use(cors({
  origin:function(origin,callback){
    if(!origin || allowedOrigins.includes(origin)){
      callback(null,true);

    }else{
      callback(new Error("Cors not allowed"));
    }
  },credentials:true
}));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.use("/uploads", express.static("uploads"));
console.log("MongoDB URI:", process.env.ADMIN_DB_URI);

//mongo 
mongoose.connect(`mongodb://24ca0084sahana_db_user:123@ac-z8qztv9-shard-00-00.4zkx8lv.mongodb.net:27017,ac-z8qztv9-shard-00-01.4zkx8lv.mongodb.net:27017,ac-z8qztv9-shard-00-02.4zkx8lv.mongodb.net:27017/?ssl=true&replicaSet=atlas-gycypw-shard-0&authSource=admin&appName=Cluster0`)
 

.then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

function generateOTP() {
  return otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
}

async function sendMail(to, subject, html) {
  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,   
    pass: process.env.EMAIL_PASS,   
  },
});

  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
}

app.get("/user-orders/:email", async (req, res) => {
  try {
    const email = req.params.email.trim().toLowerCase();

    console.log("Searching for:", email);

    const orders = await OrderModel.find({
      email: { $regex: new RegExp("^" + email + "$", "i") }
    });

    console.log("Orders found:", orders);

    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: email },
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: "Server error while updating" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    let user = await UserModel.findOne({ email });
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    if (!user) {
      user = await UserModel.create({ email, otp, otpExpires });
    } else {
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    }

    try {
      await sendMail(email, "Your OTP", `<h3>${otp}</h3>`);
    } catch {
      console.log("OTP (email sending failed):", otp);
    }

    res.json({ message: "OTP sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    let user = await UserModel.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // ✅ CREATE USER IF NOT EXISTS
    if (!user.firstName) {
      user.firstName = "";
      user.lastName = "";
      user.phone = "";
      await user.save();
    }

    res.json({ email: user.email, user_id: user._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ error: "Error fetching products" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    if (!products) return res.status(404).json({ error: "Not found" });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/admin/manage-users", async (req, res) => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 }); 
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    try {
      await sendMail(email, "Resend OTP", `<h3>${otp}</h3>`);
    } catch {
      console.log("OTP (email sending failed):", otp);
    }

    res.json({ message: "OTP resent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/place-order", async (req, res) => {
  try {
    const { user_id, email, items, totalPrice } = req.body;

    const order = new OrderModel({
      user_id,
      email: email.trim().toLowerCase(), // ✅ FIX HERE
      items,
      totalPrice
    });

    await order.save();

    console.log("Saved order:", order);

    res.json({ message: "Order placed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



app.get("/admin/orders", async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ datetime: -1 });
    const products = await Product.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching orders" });
  }
});

app.post("/admin/add-product", parser.single("image"), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      quantity: req.body.quantity,
      price: req.body.price,
      section: req.body.section,
      description: req.body.description,
      image: req.file ? req.file.path : "",
    });

    await product.save();

    res.json({ message: "Product added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
});


app.get("/order/:id", async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Invalid ID" });
  }
});

app.put("/admin/update-order/:id", async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order updated", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update error" });
  }
});

app.put("/admin/update-product/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
      category: req.body.category,
      quantity: req.body.quantity,
      price: req.body.price,
      section: req.body.section,
      description: req.body.description,
    };

    
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated", updatedProduct });

  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

app.delete("/admin/delete-order/:id", async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete error" });
  }
});
app.delete("/delete-product/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
