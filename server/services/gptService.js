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
//         content: `Post: "${postText}"\n\nA) Is this message related to the stock market?\nA1) Is this a brand-new statement or a continuation/repetition of a previously stated policy or stance by Trump?\nB) If yes, what do you recommend?\nC) Let me know precise tickers if any.\nD) For each ticker in (C), provide one-word sentiment:\n→ Very Bullish, Bullish, Bearish, Very Bearish, or Neutral.\nE) What is the expected time frame of the impact?\n→ Immediate, Short-term, Medium-term, Long-term.`
//       }
//     ]
//   });

//   return completion.choices[0].message.content;
// };

// // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ update +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

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

//                   A) Is this message related to the stock market? Answer clearly: Yes or No, with a brief explanation.

//                   A1) Is this a brand-new statement or a continuation of Trump's past policy or stance?

//                   ❗IMPORTANT:
//                   - If A = No AND A1 is simply a continuation/repetition with no new economic signal, then STOP. Do NOT answer B, C, D, or E.

//                   - ⚠️ If A1 = The message is a continuation or repetition of Trump’s past policies or stances, then STOP and instead briefly explain:
//                     1. Which specific old policy or stance it refers to
//                     2. **When** Trump originally promoted or mentioned it — e.g., “June 2017 during infrastructure week” or “in his 2020 campaign”, or “in a July 2023 TruthSocial post”.

//                   - ✅ If A = Yes (or even indirectly yes), and A1 = brand-new policy, then proceed to the rest (B, C, D & E).

//                   B) If yes, what do you recommend?

//                   C) Let me know precise tickers if any.

//                   D) For each ticker in (C), provide one-word sentiment: Very Bullish, Bullish, Bearish, Very Bearish, or Neutral.

//                   E) What is the expected time frame of the impact: Immediate, Short-term, Medium-term, or Long-term.

//                   Respond using this strict format:
//                   A) ...
//                   A1) ...
//                   [B) ... only if applicable]
//                   [C) ... only if applicable]
//                   [D) ... only if applicable]
//                   [E) ... only if applicable]`
//       }
//     ]
//   });

//   return completion.choices[0].message.content;
// };

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ update +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

// services/gptService.js
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const analyzePostWithGPT = async (postText, imagePaths = []) => {
  const systemPrompt = {
    role: "system",
    content: "You are a financial analyst. Analyze posts for stock market relevance."
  };

  const userPromptText = {
  type: "text",
  text: `Post: "${postText}"

        (If an image is attached, consider it for context in A and A1.)

        A) Is this message related to the stock market, finance, policy, public company, economic indicators, or investor sentiment? Answer clearly: Yes or No, and explain why.

        A1) Is this a brand-new statement from Trump, or a repeat of a past message or policy stance? If repeated, could it have renewed influence or impact *now* due to timing, context, or tone?

        ⚠️ If the post is *clearly irrelevant* or has *no new or renewed market relevance*, then stop — only answer A and A1. Be strict.

        ✅ If it appears market-relevant (even indirectly), or might influence stocks again — continue with B to E:

        B) What is your recommendation based on this post?

        C) List any specific stock tickers affected.

        D) For each ticker, rate sentiment as: Very Bullish, Bullish, Neutral, Bearish, or Very Bearish.

        E) Expected impact timeframe: Immediate, Short-term, Medium-term, or Long-term.

        Format strictly:
        A) ...
        A1) ...
        [B) ... if applicable]
        [C) ... if applicable]
        [D) ... if applicable]
        [E) ... if applicable]`
};


  const userPrompt = {
    role: "user",
    content: [userPromptText]
  };

  if (imagePaths.length === 0) {
    console.log("📭 No images passed for this post.");
  }

  // Attach image(s) as base64
  for (const imagePath of imagePaths) {
    try {
      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString("base64");

      userPrompt.content.push({
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${base64Image}`
        }
      });
    } catch (err) {
      console.warn(`⚠️ Could not load image ${imagePath}:`, err.message);
    }
  }

  // Debug log: Confirm structure sent to GPT
  console.log("📤 GPT Payload Types:", userPrompt.content.map(item => item.type));

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [systemPrompt, userPrompt]
  });

  return completion.choices[0].message.content;
};
