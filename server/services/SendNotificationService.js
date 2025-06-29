// SendNotificationService.js

import { getSocketIO } from '../socket.js'; // Adjust path as needed
import { sendNewPostNotification } from './EmailService.js';
import { sendNewPostWhatsApp } from './WhatsappService.js';

function extractSection(gptResponse, label) {
  const regex = new RegExp(`${label}\\)\\s*([\\s\\S]*?)(?=\\n[A-Z]\\)|$)`, 'i');
  const match = gptResponse.match(regex);
  return match ? match[1].trim().toLowerCase() : '';
}

export async function handlePostWithNotification(post, gptResponse, profileHandle) {
  const sectionA = extractSection(gptResponse, 'A');
  const sectionA1 = extractSection(gptResponse, 'A1');

  console.log("— GPT Section A:", sectionA);
  console.log("— GPT Section A1:", sectionA1);

  const isMarketRelated =
    sectionA.includes("yes") ||
    sectionA.includes("indirectly") ||
    sectionA.includes("might") ||
    sectionA.includes("could");

  const isBrandNew = /brand[- ]?new|recent (announcement|policy|stance|position|statement)/i.test(sectionA1);

  if (isMarketRelated && isBrandNew) {
    console.log("📈 GPT confirms market relevance + new policy — sending notifications.");
    await sendNewPostNotification(post, gptResponse);
    await sendNewPostWhatsApp(post, gptResponse);
  } else {
    console.log("🚫 GPT indicates not a new + market-relevant post — skipping notification.");
  }

  const io = getSocketIO();
  io.emit("newPost", {
    postId: post.postId,
    username: profileHandle,
    content: post.text,
    url: post.postUrl,
    createdAt: new Date(post.uploadTime),
    fetchedAt: new Date(post.fetchedAt),
    gptResponse,
    gptAnsweredAt: new Date(),
  });
}
