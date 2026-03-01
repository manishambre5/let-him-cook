import express from "express";
import cors from "cors";
import "dotenv/config";
import { InferenceClient } from "@huggingface/inference";

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `
You are a kitchen assistant and you will receive a list of ingredients that a user has available. You will suggest one recipe that they could make with some or all of those ingredients. You don't need to use every ingredient they mention in the recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

// Use your env variable
const hf = new InferenceClient(process.env.HF_ACCESS_TOKEN);

app.post("/api/recipe", async (req, res) => {
  const { ingredientsArr } = req.body;

  if (!ingredientsArr || !Array.isArray(ingredientsArr)) {
    return res.status(400).json({ error: "Invalid ingredients array" });
  }

  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await hf.chatCompletion({
      model: "deepseek-ai/DeepSeek-V3.2:novita",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });

    res.json({
      recipe: response.choices[0].message.content,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});