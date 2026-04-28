const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const multer = require("multer");
const Razorpay = require("razorpay");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const sgMail = require("@sendgrid/mail");

const app = express();
const PORT = process.env.PORT || 3001;

/* ================= CORS ================= */
const allowedOrigins = [
  "http://localhost:5173",
  "https://minimalist-ecommerce-clone-1.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("CORS not allowed"));
  },
  credentials: true
}));

app.use(express.json());

/* ================= CONFIG ================= */
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ================= SCHEMAS ================= */
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: String,
  otpExpires: Date,
  firstName: String,
  lastName: String,
  phone: String,
});

const orderSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  email: String,
  items: Array,
  totalPrice: Number,
  paymentMethod: String,
  paymentStatus: String,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  status: { type: String, default: "pending" },
  datetime: { type: Date, default: Date.now },
});

const Product = require("./models/addproduct");
const UserModel = mongoose.model("User", userSchema);
const OrderModel = mongoose.model("Order", orderSchema);

/* ================= CLOUDINARY UPLOAD ================= */
const parser = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "products",
      format: async (req, file) => {
        const ext = file.mimetype.split("/")[1];
        return ["jpeg", "jpg", "png", "webp"].includes(ext) ? ext : "png";
      },
      public_id: (req, file) =>
        `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`,
    },
  }),
});

/* ================= HELPERS ================= */
function generateOTP() {
  return otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
}

async function sendMail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
}

/* ================= AUTH ================= */
app.post("/login", async (req, res) => {
  const { email } = req.body;

  let user = await UserModel.findOne({ email });
  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

  if (!user) user = await UserModel.create({ email, otp, otpExpires });
  else {
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();
  }

  await sendMail(email, "Your OTP", `<h3>${otp}</h3>`);
  res.json({ message: "OTP sent" });
});

app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpires < new Date()) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  res.json({ email: user.email, user_id: user._id });
});

/* ================= USER ================= */
app.get("/user/:email", async (req, res) => {
  const user = await UserModel.findOne({
    email: req.params.email.trim().toLowerCase()
  });
  res.json(user);
});

app.put("/user/:email", async (req, res) => {
  const updated = await UserModel.findOneAndUpdate(
    { email: req.params.email },
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* ================= PRODUCTS ================= */
app.get("/products", async (req, res) => {
  res.json(await Product.find());
});

app.post("/admin/add-product", parser.single("image"), async (req, res) => {
  const product = new Product({
    ...req.body,
    image: req.file?.path || "",
  });
  await product.save();
  res.json({ message: "Product added" });
});

app.put("/admin/update-product/:id", parser.single("image"), async (req, res) => {
  const product = await Product.findById(req.params.id);

  let imageUrl = product.image;

  if (req.file) {
    // delete old image
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy("products/" + publicId);
    }
    imageUrl = req.file.path;
  }

  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    { ...req.body, image: imageUrl },
    { new: true }
  );

  res.json(updated);
});

app.delete("/delete-product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product?.image) {
    const publicId = product.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy("products/" + publicId);
  }

  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* ================= ORDERS ================= */
app.post("/place-order", async (req, res) => {
  try {
    const {
      email,
      items,
      totalPrice,
      address,
      paymentMethod
    } = req.body;

    const order = new OrderModel({
      ...req.body,
      email: email.toLowerCase(),
    });

    await order.save();

    const itemList = items.map(i =>
      `${i.productName} x${i.quantity} - ₹${i.price}`
    ).join("\n");

    // ✅ SENDGRID FULL EMAIL
    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_VERIFIED_EMAIL,
      subject: "Order Confirmation",
      text: `
Order Placed Successfully

Items:
${itemList}

Total: ₹${totalPrice}

Address:
${address?.name}
${address?.phone}
${address?.address}
${address?.city}, ${address?.state} - ${address?.pincode}
      `
    });

    res.json({ message: "Order placed & email sent" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/user-orders/:email", async (req, res) => {
  res.json(await OrderModel.find({ email: req.params.email }));
});

app.get("/admin/orders", async (req, res) => {
  res.json(await OrderModel.find());
});

/* ================= PAYMENT ================= */
app.post("/create-razorpay-order", async (req, res) => {
  const order = await razorpay.orders.create({
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "order_" + Date.now(),
  });
  res.json(order);
});

/* ================= DB ================= */
mongoose.connect(process.env.ADMIN_DB_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.log(err));
