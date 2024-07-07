const express = require('express');
const { OpenAIApi, Configuration } = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  console.log("Received message:", userMessage); // Логирование входящего сообщения

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
      temperature: 1,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log("OpenAI API response:", response.data); // Логирование ответа OpenAI API

    res.json({
      reply: response.data.choices[0].message.content.trim()
    });
  } catch (error) {
    console.error("Error occurred:", error.response ? error.response.data : error.message); // Логирование ошибки
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
