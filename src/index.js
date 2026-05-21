require("dotenv/config");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/appointments");
const reviewRoutes = require("./routes/reviews");
const doctorRoutes = require("./routes/doctors");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable proxy trust right away (crucial for accurate rate limiting on Render/Vercel)
app.set("trust proxy", 1);

//  1. CONFIGURATIONS & POLICIES 
const allowedOrigins = [
  "http://localhost:3000",
  "https://doc-appoint-client-side.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200 // Overrides old browser 204 parsing bugs with explicit 200 OK
};

//  2. GLOBAL SECURITY & HANDSHAKES (Must execute first)
app.use(helmet());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle Preflight globally

//  3. REQUEST PARSERS (Must run before rate limits check payloads) 
app.use(express.json());
app.use(cookieParser());

//  4. TRAFFIC CONTROL 
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: "Too many requests, please try again later." },
}));

//  5. BASE ROUTES 
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "DocAppoint API running 🚀" });
});

//  6. APPLICATION ROUTER AGGREGATION 
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/doctors", doctorRoutes);

//  7. FALLBACK ERROR HANDLERS 
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

//  8. SYSTEM INITIALIZATION 
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});