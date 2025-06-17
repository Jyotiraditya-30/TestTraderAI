import Together from "together-ai";
import dotenv from 'dotenv';
dotenv.config();

const togetherAiApiKey = process.env.TOGETHER_AI_API_KEY;
const together = new Together({ apiKey: togetherAiApiKey });

export const analyzePostWithTogetherAI = async (postText) => {
  try {
    console.log("analyzePostWithTogetherAI loaded");

    const messages = [
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
    ];

    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      messages,
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.9,
    });

    if (
      response.choices &&
      response.choices[0] &&
      response.choices[0].message &&
      response.choices[0].message.content
    ) {
      return response.choices[0].message.content.trim();
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (error) {
    console.error("Error analyzing post with Together AI:", error);
    return "Error: Unable to analyze post.";
  }
};
