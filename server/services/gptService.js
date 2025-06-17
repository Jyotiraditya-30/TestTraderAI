// services/gptService.js
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const analyzePostWithGPT = async (postText) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a financial analyst. Analyze posts for stock market relevance."
      },
      {
        role: "user",
        content: `Post: "${postText}"

Respond with a valid JSON object with the following structure:
{
  "A": "Is this related to the stock market? Answer yes or no, and explain.",
  "B": "If yes, what do you recommend? Provide investment insights.",
  "C": "List any specific stock tickers or sectors mentioned or implied.",
  "D": "For each item in (C), provide a one-word sentiment: Bullish, Bearish, or Neutral, in this format: [{ "name": "Ticker or Sector", "sentiment": "Bullish|Bearish|Neutral" }, ...]. Return an empty array if no items found."
}`
      }
    ]
  });

  return completion.choices[0].message.content;
};
