import puppeteerModule from 'puppeteer-extra';
const puppeteer = puppeteerModule.default || puppeteerModule;
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { analyzePostWithGPT } from "./gptService.js";
import Post from '../models/postModel2.js';

dotenv.config();
puppeteer.use(StealthPlugin());

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROFILE_HANDLE = process.env.PROFILE_HANDLE || 'realDonaldTrump';
const PROFILE_URL = `https://truthsocial.com/@${PROFILE_HANDLE}`;
const LAST_POST_PATH = path.resolve(__dirname, 'latest.json');
const CHECK_INTERVAL_MS = parseInt(process.env.CHECK_INTERVAL_MS || '60000');
const MAX_HISTORY = 50;
const MAX_VISIBLE_POSTS = 3;

function readPostHistory() {
  if (!fs.existsSync(LAST_POST_PATH)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(LAST_POST_PATH, 'utf-8'));
    return Array.isArray(data) ? data : [data];
  } catch {
    return [];
  }
}

function savePostHistory(posts) {
  fs.writeFileSync(LAST_POST_PATH, JSON.stringify(posts, null, 2));
}

function hasSeenPost(history, postId) {
  return history.some(post => post.postId === postId);
}

async function getPosts() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );
  await page.setViewport({ width: 1280, height: 800 });

  try {
    console.log('➡️ Navigating to profile...');
    await page.goto(PROFILE_URL, { waitUntil: 'networkidle2', timeout: 60000 });

    await page.waitForSelector('[data-id]', { timeout: 60000 });
    await new Promise(resolve => setTimeout(resolve, 3000)); // brief pause to allow content load

    const posts = await page.evaluate((PROFILE_HANDLE) => {
      const wrappers = Array.from(document.querySelectorAll('[data-id]'));
      const results = [];

      for (const wrapper of wrappers) {
        if (wrapper.querySelector('[data-testid="boosted-status"]')) continue; // skip retruths

        const textWrapper = wrapper.querySelector('.status__content-wrapper');
        if (!textWrapper) continue;

        const text = Array.from(textWrapper.querySelectorAll('p'))
          .map(p => p.innerText.trim())
          .filter(Boolean)
          .filter((line, i, arr) => arr.indexOf(line) === i)
          .join('\n');

        const postId = wrapper.getAttribute('data-id');
        const postUrl = `https://truthsocial.com/@${PROFILE_HANDLE}/posts/${postId}`;
        const time = wrapper.querySelector('time')?.getAttribute('title');

        results.push({ text, postId, postUrl, uploadTime: time });
      }

      return results;
    }, PROFILE_HANDLE);

    await browser.close();

    return (posts || []).map(post => ({
      ...post,
      fetchedAt: new Date().toISOString()
    }));

  } catch (err) {
    console.error('❌ Error fetching posts:', err.stack || err.message);

    // try {
    //   const ts = Date.now();
    //   fs.writeFileSync(`debug-${ts}.html`, await page.content());
    //   await page.screenshot(`{ path: debug-${ts}.png }`);
    // } catch (e) {
    //   console.warn('⚠️ Failed to save debug data.');
    // }

    await browser.close();
    return [];
  }
}

// async function startWatcherLoop() {
//   console.log('▶️ Starting watcher...');

//   while (true) {
//     const now = new Date().toLocaleString();
//     const latestPosts = await getPosts();
//     const history = readPostHistory();

//     const newPosts = latestPosts
//       .filter(post => post && post.postId && !hasSeenPost(history, post.postId))
//       .slice(0, MAX_VISIBLE_POSTS);

//     if (newPosts.length > 0) {
//       console.log(`\n[${now}] 🟢 New posts detected:`);
//       newPosts.forEach(post => {
//         console.log(`🔗 ${post.postUrl}`);
//         history.push({ ...post, timestamp: new Date().toISOString() });
//       });

//       if (history.length > MAX_HISTORY) {
//         history.splice(0, history.length - MAX_HISTORY);
//       }

//       savePostHistory(history);
//     } else {
//       console.log(`[${now}] ⏳ No new posts.`);
//     }

//     await new Promise(res => setTimeout(res, CHECK_INTERVAL_MS));
//   }
// }

async function startWatcherLoop() {
  console.log('▶️ Starting real-time watcher...');

  while (true) {
    const now = new Date().toLocaleString();
    const latestPosts = await getPosts();
    const history = readPostHistory();

    const newPosts = latestPosts
      .filter(post => post && post.postId && !hasSeenPost(history, post.postId))
      .slice(0, MAX_VISIBLE_POSTS);

    if (newPosts.length > 0) {
      console.log(`\n[${now}] 🟢 ${newPosts.length} new post(s) detected:`);

      for (const post of newPosts) {
        console.log(`🔗 ${post.postUrl}`);

        // Save to MongoDB if not already there
        const exists = await Post.findOne({ content: post.text });
        if (exists) {
          console.log("✅ Already in DB.");
          continue;
        }

        // GPT analysis
        let gptResponse = null;
        try {
          gptResponse = await analyzePostWithGPT(post.text);
        } catch (err) {
          console.error("❌ GPT error:", err.message);
        }

        await Post.create({
          username: PROFILE_HANDLE,
          content: post.text,
          url: post.postUrl,
          createdAt: new Date(post.uploadTime),
          fetchedAt: new Date(post.fetchedAt),
          gptResponse,
          gptAnsweredAt: new Date(),
        });

        console.log("✅ Saved to MongoDB with GPT analysis.");
      }

      // Update local JSON history
      newPosts.forEach(post => {
        history.push({ ...post, timestamp: new Date().toISOString() });
      });

      if (history.length > MAX_HISTORY) {
        history.splice(0, history.length - MAX_HISTORY);
      }

      savePostHistory(history);
    } else {
      console.log(`[${now}] ⏳ No new posts.`);
    }

    await new Promise(res => setTimeout(res, CHECK_INTERVAL_MS));
  }
}

export {
  startWatcherLoop,
  getPosts,
  readPostHistory
};
