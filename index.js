let requestCount = 0;

const path = require("path");
const modulesRouter = require('./modules');
const express = require("express");
const cors = require("cors");

const app = express();

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Cloud Engine expansion modules (Phase 2)

app.use('/', modulesRouter());

const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || "2.1.0";

// ---- CORS (frontend allowed origins) ----
const allowedOrigins = [
  "https://mtechvision.com",
  "https://www.mtechvision.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow curl / health checks with no Origin
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // anything else -> blocked by CORS
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// ---- Basic security / identity headers ----
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
  res.setHeader("X-Powered-By", "mtechvision-api");
  next();
});

// ---- Basic request counter ----
app.use((req, res, next) => {
  requestCount += 1;
  next();
});



// ---- Root endpoint ----
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "mtechvision-api",
    message: "Hello from Node.js behind ALB & ECS Fargate 🤘",
    version: API_VERSION
  });
});

// Simple browser demo page
app.get("/demo", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "demo.html"));
});

// ---- Health endpoint (for monitoring / ALB / WAF) ----
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "mtechvision-api",
    version: API_VERSION,
    uptime_seconds: Math.round(process.uptime())
  });
});

// ---- Metrics endpoint ----
app.get("/metrics", (req, res) => {
  res.json({
    status: "ok",
    service: "mtechvision-api",
    version: API_VERSION,
    uptime_seconds: Math.round(process.uptime()),
    request_count: requestCount,
    timestamp: new Date().toISOString()
  });
});

// ---- Version endpoint (explicit contract) ----
app.get("/version", (req, res) => {
  res.json({
    status: "ok",
    service: "mtechvision-api",
    version: API_VERSION,
    env: process.env.NODE_ENV || "unknown"
  });
});

// ---- Mugello OS — cloud engine status ----
app.get("/mugello/os-status", (req, res) => {
  res.json({
    status: "ok",
    service: "mtechvision-api",
    module: "mugello-cloud-engine",
    version: API_VERSION,
    mode: "CLOUD_ENGINE",
    uptime_seconds: Math.round(process.uptime()),
    request_count: requestCount,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`mtechvision-api listening on port ${PORT}`);
});
