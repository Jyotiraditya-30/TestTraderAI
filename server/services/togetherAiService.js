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
        content: `Post: "${postText}"\n\nA) Is this message related to the stock market?\nA1) Is this a brand-new statement or a continuation/repetition of a previously stated policy or stance by Trump?\nB) If yes, what do you recommend?\nC) Let me know precise tickers if any.\nD) For each ticker in (C), provide one-word sentiment:\n→ Very Bullish, Bullish, Bearish, Very Bearish, or Neutral.\nE) What is the expected time frame of the impact?\n→ Immediate, Short-term, Medium-term, Long-term.`
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
