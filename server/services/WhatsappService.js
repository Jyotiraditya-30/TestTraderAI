// services/WhatsappService.js
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

/**
 * Sends a WhatsApp message to multiple recipients individually
 * @param {Object} post - The post data
 * @param {Object} gptResponse - The GPT analysis result
 */
export async function sendNewPostWhatsApp(post, gptResponse) {
    const username = PROFILE_HANDLE || 'Unknown';

    const formattedResponse = gptResponse
        .replace(/\\n/g, '\n')
        .replace(/(?<=\n) ?([A-D])\)/g, '\n$1)')
        .replace(/\\+"/g, '"');

    const message = `📢 New TruthSocial Post by @${username}
  🆔 *Post ID:* ${post.postId}
  🔗 *Post URL:*  ${post.postUrl}

🤖 GPT Analysis:
    ${formattedResponse.trim()}
    `.trim();

        const recipients = WHATSAPP_RECIPIENTS.split(',').map(r => r.trim());

        for (const to of recipients) {
            try {
                const result = await client.messages.create({
                    body: message,
                    from: TWILIO_WHATSAPP_FROM,
                    to
                });

                console.log(`✅ WhatsApp sent to ${to} | SID: ${result.sid}`);
            } catch (err) {
                console.error(`❌ Failed to send WhatsApp to ${to}`, err.message);
            }
        }
    }
