import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 👇 OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🟢 Ruta base (para comprobar que funciona)
app.get("/", (req, res) => {
  res.send("🍔 Restaurante IA online funcionando");
});

// 🟢 Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.json({ reply: "Escribe un mensaje 🍽️" });
    }

    // 🔥 llamada a OpenAI (modelo correcto)
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente de restaurante amable. Ayudas a tomar pedidos, reservas y responder dudas del menú.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = response.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.error("🔥 ERROR REAL:", error);

    res.json({
      reply: "Error en el restaurante 🍽️",
    });
  }
});

// 🟢 PORT dinámico (IMPORTANTE para Render)
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🍔 Restaurante IA en http://localhost:${PORT}`);
});