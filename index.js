import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// مثال بسيط للردود الجاهزة (التي سيستدعيها نايت بوت)
app.get("/", (req, res) => {
  res.send("✅ Bot is online and ready!");
});

// مثال endpoint ليرد على نايت بوت
app.get("/reply", (req, res) => {
  const user = req.query.user || "صديقي";
  const message = `أهلاً ${user}! كيف حالك اليوم؟ 😊`;
  res.send(message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Bot is running on port ${PORT}`));
