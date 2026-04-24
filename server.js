import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🟢 test
app.get("/", (req, res) => {
  res.send("🍔 Restaurante IA online funcionando");
});

// 🤖 cliente OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 💬 CHATBOT
app.post("/chat", async (req, res) => {
  const message = req.body.message;

  console.log("📩 Mensaje:", message);

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres un camarero profesional de restaurante. Responde corto, amable y claro."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (error) {
    console.log("❌ ERROR:");
    console.dir(error, { depth: null });

    res.status(500).json({
      reply: "Error en el restaurante 🍽️"
    });
  }
});

// 🚀 IMPORTANTE PARA RENDER (PUERTO DINÁMICO)
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("🍔 Restaurante IA en puerto", PORT);
});