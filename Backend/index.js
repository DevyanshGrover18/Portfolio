import express from "express";
import cors from "cors";
import "./config/env.js";
import "./config/mongo.js";
import emailRouter from "./routes/emailRoute.js";
import postRouter from "./routes/postRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import adminPostRouter from "./routes/adminPostRoutes.js";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use("/api/send-email", emailRouter);
app.use("/api/posts", postRouter);
app.use("/api/admin", adminRouter);
app.use("/api/admin/posts", adminPostRouter);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

// ─── 404 handler ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
});
 
// ─── Global error handler ───────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log("Server Running");
});
