// // services/WhatsappService.js
// import twilio from 'twilio';
// import dotenv from 'dotenv';

// dotenv.config();

// const {
//     TWILIO_ACCOUNT_SID,
//     TWILIO_AUTH_TOKEN,
//     TWILIO_WHATSAPP_FROM,
//     WHATSAPP_RECIPIENTS,
//     PROFILE_HANDLE
// } = process.env;

// const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// /**
//  * Sends a WhatsApp message to multiple recipients individually
//  * @param {Object} post - The post data
//  * @param {Object} gptResponse - The GPT analysis result
//  */
// export async function sendNewPostWhatsApp(post, gptResponse) {
//     const username = PROFILE_HANDLE || 'Unknown';

//     const formattedResponse = gptResponse
//         .replace(/\\n/g, '\n')
//         .replace(/(?<=\n) ?([A-D])\)/g, '\n$1)')
//         .replace(/\\+"/g, '"');

//     const message = `📢 New TruthSocial Post by @${username}
//   🆔 *Post ID:* ${post.postId}
//   🔗 *Post URL:*  ${post.postUrl}

// 🤖 GPT Analysis:
//     ${formattedResponse.trim()}
//     `.trim();

//         const recipients = WHATSAPP_RECIPIENTS.split(',').map(r => r.trim());

//         for (const to of recipients) {
//             try {
//                 const result = await client.messages.create({
//                     body: message,
//                     from: TWILIO_WHATSAPP_FROM,
//                     to
//                 });

//                 console.log(`✅ WhatsApp sent to ${to} | SID: ${result.sid}`);
//             } catch (err) {
//                 console.error(`❌ Failed to send WhatsApp to ${to}`, err.message);
//             }
//         }
//     }

// ++++++++++++++++++++++++++++++++++++++++++++++++ updated with split message functionality for longer msg +++++++++++++++++++++++++++++++++++++ //

import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_FROM,
  WHATSAPP_RECIPIENTS,
  PROFILE_HANDLE
} = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const WHATSAPP_CHAR_LIMIT = 1600;

/**
 * Breaks a long message into chunks within Twilio's WhatsApp limit.
 * @param {string} text - Full message
 * @param {number} maxLen - Max length for each chunk
 * @returns {string[]} Array of message parts
 */
function splitMessage(text, maxLen) {
  const parts = [];
  let remaining = text;

  while (remaining.length > maxLen) {
    let splitAt = remaining.lastIndexOf('\n', maxLen);
    if (splitAt === -1 || splitAt < maxLen * 0.7) splitAt = maxLen; // force split if no good break
    parts.push(remaining.slice(0, splitAt).trim());
    remaining = remaining.slice(splitAt).trim();
  }

  if (remaining.length > 0) {
    parts.push(remaining);
  }

  return parts;
}

/**
 * Sends a WhatsApp message to multiple recipients individually
 * Splits message into chunks if it exceeds 1600 character limit
 * @param {Object} post - The post data
 * @param {string} gptResponse - The GPT analysis result (string)
 */
export async function sendNewPostWhatsApp(post, gptResponse) {
  const username = PROFILE_HANDLE || 'Unknown';

  const formattedResponse = gptResponse
    .replace(/\\n/g, '\n')
    .replace(/(?<=\n) ?([A-E])\)/g, '\n$1)')
    .replace(/\\+"/g, '"');

  const baseHeader = `📢 New TruthSocial Post by @${username}
🆔 *Post ID:* ${post.postId}
🔗 *Post URL:* ${post.postUrl}

🤖 GPT Analysis:`.trim();

  const fullMessage = `${baseHeader}\n\n${formattedResponse.trim()}`.trim();
  const messageParts = splitMessage(fullMessage, WHATSAPP_CHAR_LIMIT);

  const recipients = WHATSAPP_RECIPIENTS.split(',').map(r => r.trim());

  for (const to of recipients) {
    for (let i = 0; i < messageParts.length; i++) {
      const part = messageParts[i];
      const prefix = messageParts.length > 1 ? `(${i + 1}/${messageParts.length})\n` : '';
      const body = prefix + part;

      try {
        const result = await client.messages.create({
          body,
          from: TWILIO_WHATSAPP_FROM,
          to
        });

        console.log(`✅ WhatsApp part ${i + 1} sent to ${to} | SID: ${result.sid}`);
      } catch (err) {
        console.error(`❌ Failed to send WhatsApp part ${i + 1} to ${to}`, err.message);
      }
    }
  }
}
