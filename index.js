import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("🤖 AI Nightbot is running...");
});

app.get("/reply", async (req, res) => {
  try {
    const user = req.query.user || "صديقي";
    const question = req.query.q || "مرحبا";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "أنت مساعد دردشة ذكي في بث تويتش، تتكلم بعفوية وأجوبة قصيرة لطيفة." },
          { role: "user", content: question }
        ],
        max_tokens: 60,
      }),
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content?.trim() || "لم أفهم سؤالك 😅";
    res.send(`@${user} ${answer}`);
  } catch (err) {
    console.error(err);
    res.send("حدث خطأ أثناء الرد 😔");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 AI Bot running on port ${PORT}`));
