// // services/gptService.js
// import OpenAI from "openai";
// import dotenv from "dotenv";
// dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// export const analyzePostWithGPT = async (postText) => {
//   const completion = await openai.chat.completions.create({
//     model: "gpt-4o",
//     messages: [
//       {
//         role: "system",
//         content: "You are a financial analyst. Analyze posts for stock market relevance."
//       },
//       {
//         role: "user",
//         content: `Post: "${postText}"

// Respond with a valid JSON object with the following structure:
// {
//   "A": "Is this related to the stock market? Answer yes or no, and explain.",
//   "B": "If yes, what do you recommend? Provide investment insights.",
//   "C": "List any specific stock tickers or sectors mentioned or implied.",
//   "D": "For each item in (C), provide a one-word sentiment: Bullish, Bearish, or Neutral, in this format: [{ "name": "Ticker or Sector", "sentiment": "Bullish|Bearish|Neutral" }, ...]. Return an empty array if no items found."
// }`
//       }
//     ]
//   });

//   return completion.choices[0].message.content;
// };

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ update +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

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
        content: `Post: "${postText}"\n\nA) Is this message related to the stock market?\nA1) Is this a brand-new statement or a continuation/repetition of a previously stated policy or stance by Trump?\nB) If yes, what do you recommend?\nC) Let me know precise tickers if any.\nD) For each ticker in (C), provide one-word sentiment:\n→ Very Bullish, Bullish, Bearish, Very Bearish, or Neutral.\nE) What is the expected time frame of the impact?\n→ Immediate, Short-term, Medium-term, Long-term.`
      }
    ]
  });

  return completion.choices[0].message.content;
};
