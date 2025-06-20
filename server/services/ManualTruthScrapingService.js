// import puppeteerModule from 'puppeteer-extra';
// const puppeteer = puppeteerModule.default || puppeteerModule;
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
// // import { analyzePostWithGPT } from "./gptService.js";
// import {analyzePostWithTogetherAI} from "./togetherAiService.js"
// import Post from '../models/postModel2.js';

// dotenv.config();
// puppeteer.use(StealthPlugin());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const PROFILE_HANDLE = process.env.PROFILE_HANDLE || 'realDonaldTrump';
// const PROFILE_URL = `https://truthsocial.com/@${PROFILE_HANDLE}`;
// const LAST_POST_PATH = path.resolve(__dirname, 'latest.json');
// const CHECK_INTERVAL_MS = parseInt(process.env.CHECK_INTERVAL_MS || '60000');
// const MAX_HISTORY = 50;
// const MAX_VISIBLE_POSTS = 3;

// function readPostHistory() {
//   if (!fs.existsSync(LAST_POST_PATH)) return [];
//   try {
//     const data = JSON.parse(fs.readFileSync(LAST_POST_PATH, 'utf-8'));
//     return Array.isArray(data) ? data : [data];
//   } catch {
//     return [];
//   }
// }

// function savePostHistory(posts) {
//   fs.writeFileSync(LAST_POST_PATH, JSON.stringify(posts, null, 2));
// }

// function hasSeenPost(history, postId) {
//   return history.some(post => post.postId === postId);
// }

// // async function getPosts() {
// //   const browser = await puppeteer.launch({
// //     headless: true,
// //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
// //   });

// //   const page = await browser.newPage();
// //   await page.setUserAgent(
// //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
// //   );
// //   await page.setViewport({ width: 1280, height: 800 });

// //   try {
// //     console.log('➡️ Navigating to profile...');
// //     await page.goto(PROFILE_URL, { waitUntil: 'networkidle2', timeout: 60000 });

// //     await page.waitForSelector('[data-id]', { timeout: 60000 });
// //     await new Promise(resolve => setTimeout(resolve, 3000)); // brief pause to allow content load

// //     const posts = await page.evaluate((PROFILE_HANDLE) => {
// //       const wrappers = Array.from(document.querySelectorAll('[data-id]'));
// //       const results = [];

// //       for (const wrapper of wrappers) {
// //         if (wrapper.querySelector('[data-testid="boosted-status"]')) continue; // skip retruths

// //         const textWrapper = wrapper.querySelector('.status__content-wrapper');
// //         if (!textWrapper) continue;

// //         const text = Array.from(textWrapper.querySelectorAll('p'))
// //           .map(p => p.innerText.trim())
// //           .filter(Boolean)
// //           .filter((line, i, arr) => arr.indexOf(line) === i)
// //           .join('\n');

// //         const postId = wrapper.getAttribute('data-id');
// //         const postUrl = `https://truthsocial.com/@${PROFILE_HANDLE}/posts/${postId}`;
// //         const time = wrapper.querySelector('time')?.getAttribute('title');

// //         results.push({ text, postId, postUrl, uploadTime: time });
// //       }

// //       return results;
// //     }, PROFILE_HANDLE);

// //     await browser.close();

// //     return (posts || []).map(post => ({
// //       ...post,
// //       fetchedAt: new Date().toISOString()
// //     }));

// //   } catch (err) {
// //     console.error('❌ Error fetching posts:', err.stack || err.message);

// //     // try {
// //     //   const ts = Date.now();
// //     //   fs.writeFileSync(`debug-${ts}.html`, await page.content());
// //     //   await page.screenshot(`{ path: debug-${ts}.png }`);
// //     // } catch (e) {
// //     //   console.warn('⚠️ Failed to save debug data.');
// //     // }

// //     await browser.close();
// //     return [];
// //   }
// // }

// async function getPosts() {
//   const browser = await puppeteer.launch({
//     headless: 'new',
//     args: [
//       '--no-sandbox',
//       '--disable-setuid-sandbox',
//       '--disable-dev-shm-usage',
//       '--disable-gpu',
//       '--single-process',
//     ],
//   });

//   const page = await browser.newPage();
//   await page.setUserAgent(
//     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
//   );
//   await page.setViewport({ width: 1280, height: 800 });

//   try {
//     console.log('➡️ Navigating to profile...');
//     await page.goto(PROFILE_URL, { waitUntil: 'networkidle2', timeout: 60000 });

//     // Simulate scrolling to trigger lazy loading
//     await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
//     await page.waitForTimeout(2000);
//     await page.evaluate(() => window.scrollTo(0, 0));
//     await page.waitForTimeout(2000);

//     // Wait until posts are reliably in DOM
//     await page.waitForFunction(() => {
//       const wrappers = document.querySelectorAll('[data-id]');
//       return wrappers.length > 0;
//     }, { timeout: 15000 });

//     const posts = await page.evaluate((PROFILE_HANDLE) => {
//       const wrappers = Array.from(document.querySelectorAll('[data-id]'));
//       const results = [];

//       for (const wrapper of wrappers) {
//         if (wrapper.querySelector('[data-testid="boosted-status"]')) continue;

//         const textWrapper = wrapper.querySelector('.status__content-wrapper');
//         if (!textWrapper) continue;

//         const text = Array.from(textWrapper.querySelectorAll('p'))
//           .map(p => p.innerText.trim())
//           .filter(Boolean)
//           .filter((line, i, arr) => arr.indexOf(line) === i)
//           .join('\n');

//         const postId = wrapper.getAttribute('data-id');
//         const postUrl = `https://truthsocial.com/@${PROFILE_HANDLE}/posts/${postId}`;
//         const time = wrapper.querySelector('time')?.getAttribute('title');

//         results.push({ text, postId, postUrl, uploadTime: time });
//       }

//       return results;
//     }, PROFILE_HANDLE);

//     return (posts || []).map(post => ({
//       ...post,
//       fetchedAt: new Date().toISOString()
//     }));
//   } catch (err) {
//     console.error('❌ Error fetching posts:', err.stack || err.message);

//     // Debug HTML snapshot if nothing found
//     try {
//       const ts = Date.now();
//       fs.writeFileSync(`debug-${ts}.html`, await page.content());
//       await page.screenshot({ path: `debug-${ts}.png` });
//     } catch (e) {
//       console.warn('⚠️ Failed to save debug data.');
//     }

//     return [];
//   } finally {
//     await page.close();
//     await browser.close();
//   }
// }


// // async function startWatcherLoop() {
// //   console.log('▶️ Starting watcher...');

// //   while (true) {
// //     const now = new Date().toLocaleString();
// //     const latestPosts = await getPosts();
// //     const history = readPostHistory();

// //     const newPosts = latestPosts
// //       .filter(post => post && post.postId && !hasSeenPost(history, post.postId))
// //       .slice(0, MAX_VISIBLE_POSTS);

// //     if (newPosts.length > 0) {
// //       console.log(`\n[${now}] 🟢 New posts detected:`);
// //       newPosts.forEach(post => {
// //         console.log(`🔗 ${post.postUrl}`);
// //         history.push({ ...post, timestamp: new Date().toISOString() });
// //       });

// //       if (history.length > MAX_HISTORY) {
// //         history.splice(0, history.length - MAX_HISTORY);
// //       }

// //       savePostHistory(history);
// //     } else {
// //       console.log(`[${now}] ⏳ No new posts.`);
// //     }

// //     await new Promise(res => setTimeout(res, CHECK_INTERVAL_MS));
// //   }
// // }

// async function startWatcherLoop() {
//   console.log('▶️ Starting real-time watcher...');

//   while (true) {
//     const now = new Date().toLocaleString();
//     const latestPosts = await getPosts();
//     const history = readPostHistory();

//     const newPosts = latestPosts
//       .filter(post => post && post.postId && !hasSeenPost(history, post.postId))
//       .slice(0, MAX_VISIBLE_POSTS);

//     if (newPosts.length > 0) {
//       console.log(`\n[${now}] 🟢 ${newPosts.length} new post(s) detected:`);

//       for (const post of newPosts) {
//         console.log(`🔗 ${post.postUrl}`);

//         // Save to MongoDB if not already there
//         const exists = await Post.findOne({ content: post.postId });
//         if (exists) {
//           console.log("✅ Already in DB.");
//           continue;
//         }

//         // GPT analysis
//         let gptResponse = null;
//         try {
//           // gptResponse = await analyzePostWithGPT(post.text);
//           gptResponse = await analyzePostWithTogetherAI(post.text);
//         } catch (err) {
//           console.error("❌ GPT error:", err.message);
//         }

//         await Post.create({
//           postId: post.postId,
//           username: PROFILE_HANDLE,
//           content: post.text,
//           url: post.postUrl,
//           createdAt: new Date(post.uploadTime),
//           fetchedAt: new Date(post.fetchedAt),
//           gptResponse,
//           gptAnsweredAt: new Date(),
//         });

//         console.log("✅ Saved to MongoDB with GPT analysis.");
//       }

//       // Update local JSON history
//       newPosts.forEach(post => {
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

// export {
//   startWatcherLoop,
//   getPosts,
//   readPostHistory
// };

// ++++++++++++++++++++++++++++++++++++++++++++++++ with No crash recovery +++++++++++++++++++++++++++++++++++++++++++ //

// import puppeteerModule from 'puppeteer-extra';
// const puppeteer = puppeteerModule.default || puppeteerModule;
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
// import { analyzePostWithTogetherAI } from "./togetherAiService.js";
// import Post from '../models/postModel2.js';

// dotenv.config();
// puppeteer.use(StealthPlugin());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const PROFILE_HANDLE = process.env.PROFILE_HANDLE || 'realDonaldTrump';
// const PROFILE_URL = `https://truthsocial.com/@${PROFILE_HANDLE}`;
// const LAST_POST_PATH = path.resolve(__dirname, 'latest.json');
// const CHECK_INTERVAL_MS = parseInt(process.env.CHECK_INTERVAL_MS || '60000');
// const MAX_HISTORY = 50;
// const MAX_VISIBLE_POSTS = 3;

// let browser;
// let page;

// function readPostHistory() {
//   if (!fs.existsSync(LAST_POST_PATH)) return [];
//   try {
//     const data = JSON.parse(fs.readFileSync(LAST_POST_PATH, 'utf-8'));
//     return Array.isArray(data) ? data : [data];
//   } catch {
//     return [];
//   }
// }

// function savePostHistory(posts) {
//   fs.writeFileSync(LAST_POST_PATH, JSON.stringify(posts, null, 2));
// }

// function hasSeenPost(history, postId) {
//   return history.some(post => post.postId === postId);
// }

// async function initBrowser() {
//   if (!browser) {
//     browser = await puppeteer.launch({
//       headless: 'new',
//       args: ['--no-sandbox', '--disable-setuid-sandbox']
//     });
//     page = await browser.newPage();

//     await page.setUserAgent(
//       `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/${Math.floor(Math.random() * 10) + 115}.0 Safari/537.36`
//     );

//     await page.setViewport({ width: 1280, height: 800 });
//   }
//   return { browser, page };
// }

// async function getPosts() {
//   await page.goto(PROFILE_URL, { waitUntil: 'networkidle2', timeout: 60000 });

//   await page.waitForSelector('[data-id]', { timeout: 60000 });
//   await page.evaluate(() => window.scrollBy(0, 300));
//   await new Promise(res => setTimeout(res, 3000));

//   const posts = await page.evaluate((PROFILE_HANDLE) => {
//     const wrappers = Array.from(document.querySelectorAll('[data-id]'));
//     const results = [];

//     for (const wrapper of wrappers) {
//       if (wrapper.querySelector('[data-testid="boosted-status"]')) continue;

//       const textWrapper = wrapper.querySelector('.status__content-wrapper');
//       if (!textWrapper) continue;

//       const text = Array.from(textWrapper.querySelectorAll('p'))
//         .map(p => p.innerText.trim())
//         .filter(Boolean)
//         .filter((line, i, arr) => arr.indexOf(line) === i)
//         .join('\n');

//       const postId = wrapper.getAttribute('data-id');
//       const postUrl = `https://truthsocial.com/@${PROFILE_HANDLE}/posts/${postId}`;
//       const time = wrapper.querySelector('time')?.getAttribute('title');

//       results.push({ text, postId, postUrl, uploadTime: time });
//     }

//     return results;
//   }, PROFILE_HANDLE);

//   return (posts || []).map(post => ({
//     ...post,
//     fetchedAt: new Date().toISOString()
//   }));
// }

// async function startWatcherLoop() {
//   console.log('▶️ Starting real-time watcher...');
//   await initBrowser();

//   while (true) {
//     const now = new Date().toLocaleString();
//     const latestPosts = await getPosts();
//     const history = readPostHistory();

//     const newPosts = latestPosts
//       .filter(post => post && post.postId && !hasSeenPost(history, post.postId))
//       .slice(0, MAX_VISIBLE_POSTS);

//     if (newPosts.length > 0) {
//       console.log(`\n[${now}] 🟢 ${newPosts.length} new post(s) detected:`);

//       for (const post of newPosts) {
//         const ageInSeconds = Math.round((Date.now() - new Date(post.uploadTime)) / 1000);
//         console.log(`🔗 ${post.postUrl} (age: ${ageInSeconds}s)`);

//         const exists = await Post.findOne({ content: post.postId });
//         if (exists) {
//           console.log("✅ Already in DB.");
//           continue;
//         }

//         let gptResponse = null;
//         try {
//           gptResponse = await analyzePostWithTogetherAI(post.text);
//         } catch (err) {
//           console.error("❌ GPT error:", err.message);
//         }

//         await Post.create({
//           postId: post.postId,
//           username: PROFILE_HANDLE,
//           content: post.text,
//           url: post.postUrl,
//           createdAt: new Date(post.uploadTime),
//           fetchedAt: new Date(post.fetchedAt),
//           gptResponse,
//           gptAnsweredAt: new Date(),
//         });

//         console.log("✅ Saved to MongoDB with GPT analysis.");
//       }

//       newPosts.forEach(post => {
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

// export {
//   startWatcherLoop,
//   getPosts,
//   readPostHistory
// };

// ++++++++++++++++++++++++++++++++++++++++++++++++ with browser crash recovery +++++++++++++++++++++++++++++++++++++++++++ //

import puppeteerModule from 'puppeteer-extra';
const puppeteer = puppeteerModule.default || puppeteerModule;
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { analyzePostWithTogetherAI } from "./togetherAiService.js";
import Post from "../models/postModel2.js";
import { sendNewPostNotification } from './EmailService.js';
import { sendNewPostWhatsApp } from './WhatsappService.js';
import { getSocketIO } from '../socket.js';

dotenv.config();
puppeteer.use(StealthPlugin());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROFILE_HANDLE = process.env.PROFILE_HANDLE || 'realDonaldTrump';
const PROFILE_URL = `https://truthsocial.com/@${PROFILE_HANDLE}`;
const LAST_POST_PATH = path.resolve(__dirname, 'latest.json');
const CHECK_INTERVAL_MS = parseInt(process.env.CHECK_INTERVAL_MS || '60000');
const MAX_HISTORY = 50;
const MAX_VISIBLE_POSTS = 3;

let browser = null;
let page = null;

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

async function initBrowser() {
  if (browser) {
    try {
      await browser.close();
    } catch { }
  }

  browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  page = await browser.newPage();
  await page.setUserAgent(
    `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/${Math.floor(Math.random() * 10) + 115}.0 Safari/537.36`
  );
  await page.setViewport({ width: 1280, height: 800 });

  page.on('error', async err => {
    console.error('💥 Page crashed:', err);
    await initBrowser(); // restart browser
  });

  page.on('close', async () => {
    console.warn('⚠️ Page closed unexpectedly.');
    await initBrowser(); // restart browser
  });
}

async function getPosts() {
  try {
    await page.goto(PROFILE_URL, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('[data-id]', { timeout: 60000 });
    await page.evaluate(() => window.scrollBy(0, 300));
    await new Promise(res => setTimeout(res, 3000));

    const posts = await page.evaluate(PROFILE_HANDLE => {
      const wrappers = Array.from(document.querySelectorAll('[data-id]'));
      const results = [];

      for (const wrapper of wrappers) {
        if (wrapper.querySelector('[data-testid="boosted-status"]')) continue;
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

    return (posts || []).map(post => ({
      ...post,
      fetchedAt: new Date().toISOString()
    }));
  } catch (err) {
    console.error('❌ Failed to fetch posts:', err.message);
    await initBrowser(); // Restart on error
    return [];
  }
}

async function startWatcherLoop() {
  console.log('▶️ Starting real-time watcher...');
  await initBrowser();

  while (true) {
    const now = new Date().toLocaleString();
    let latestPosts = [];

    try {
      latestPosts = await getPosts();
    } catch (err) {
      console.error('❌ Error during scraping loop:', err.message);
    }

    const history = readPostHistory();
    const newPosts = latestPosts
      .filter(post => post && post.postId && !hasSeenPost(history, post.postId))
      .slice(0, MAX_VISIBLE_POSTS);

    if (newPosts.length > 0) {
      console.log(`\n[${now}] 🟢 ${newPosts.length} new post(s) detected:`);

      for (const post of newPosts) {
        const age = Math.round((Date.now() - new Date(post.uploadTime)) / 1000);
        console.log(`🔗 ${post.postUrl} (age: ${age}s)`);

        const exists = await Post.findOne({ content: post.postId });
        if (exists) {
          console.log("✅ Already in DB.");
          continue;
        }

        let gptResponse = null;
        try {
          gptResponse = await analyzePostWithTogetherAI(post.text);
        } catch (err) {
          console.error("❌ GPT error:", err.message);
        }

        await Post.create({
          postId: post.postId,
          username: PROFILE_HANDLE,
          content: post.text,
          url: post.postUrl,
          createdAt: new Date(post.uploadTime),
          fetchedAt: new Date(post.fetchedAt),
          gptResponse,
          gptAnsweredAt: new Date(),
        });

        console.log("✅ Saved to MongoDB with GPT analysis.");

        // 🟢 Emit new post to all connected clients
        const io = getSocketIO();
        io.emit("newPost", {
          postId: post.postId,
          username: PROFILE_HANDLE,
          content: post.text,
          url: post.postUrl,
          createdAt: new Date(post.uploadTime),
          fetchedAt: new Date(post.fetchedAt),
          gptResponse,
          gptAnsweredAt: new Date(),
        });

        // await sendNewPostWhatsApp(post, gptResponse);

        // await sendNewPostNotification(post, gptResponse);
        const firstLine = gptResponse.trim().split('\n')[0].trim();

        if (
          typeof gptResponse === 'string' &&
          /^([A-Za-z]\))?\s*yes[,.\- ]+this post is related to the stock market/i.test(firstLine)
        ) {
          await sendNewPostNotification(post, gptResponse);
          await sendNewPostWhatsApp(post, gptResponse);
        } else {
          console.log("🚫 Post not related to stock market, notification skipped.");
        }

        //   let gptResponse = null;
        //   let parsedResponse = null;
        //   try {
        //     const rawResponse = await analyzePostWithTogetherAI(post.text);
        //     parsedResponse = JSON.parse(rawResponse);  // parse GPT JSON
        //     gptResponse = parsedResponse; // you can also store rawResponse if needed
        //   } catch (err) {
        //     console.error("❌ GPT or JSON parse error:", err.message);
        //   }

        //   if (!parsedResponse) {
        //     console.log("⚠️ Skipping post due to GPT failure.");
        //     continue;
        //   }

        //   await Post.create({
        //     postId: post.postId,
        //     username: PROFILE_HANDLE,
        //     content: post.text,
        //     url: post.postUrl,
        //     createdAt: new Date(post.uploadTime),
        //     fetchedAt: new Date(post.fetchedAt),
        //     gptResponse: JSON.stringify(gptResponse),  // this is now structured JSON
        //     gptAnsweredAt: new Date(),
        //   });

        //   console.log("✅ Saved to MongoDB with GPT analysis.");

        //   // Notification logic
        //   if (
        //     parsedResponse.A &&
        //     parsedResponse.A.toLowerCase().startsWith("yes")
        //   ) {
        //     await sendNewPostNotification(post, parsedResponse);
        //     await sendNewPostWhatsApp(post, gptResponse);
        //   } else {
        //     console.log("🚫 Post not related to stock market, notification skipped.");
        //   }


      }

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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ on EC2 ++++++++++++++++++++++++++++++++++++++++++++ //

// import puppeteerModule from 'puppeteer-extra';
// const puppeteer = puppeteerModule.default || puppeteerModule;
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
// import { analyzePostWithGPT } from "./gptService.js";
// import Post from '../models/postModel2.js';
// import { sendNewPostNotification } from './EmailService.js';
// import { sendNewPostWhatsApp } from './WhatsappService.js';

// dotenv.config();
// puppeteer.use(StealthPlugin());

// // const browser = await puppeteer.launch({
// //   headless: 'new',
// //   args: ['--no-sandbox', '--disable-setuid-sandbox'],
// // });


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const PROFILE_HANDLE = process.env.PROFILE_HANDLE || 'realDonaldTrump';
// const PROFILE_URL = `https://truthsocial.com/@${PROFILE_HANDLE}`;
// const LAST_POST_PATH = path.resolve(__dirname, 'latest.json');
// const CHECK_INTERVAL_MS = parseInt(process.env.CHECK_INTERVAL_MS || '60000');
// const MAX_HISTORY = 50;
// const MAX_VISIBLE_POSTS = 3;

// function readPostHistory() {
//   if (!fs.existsSync(LAST_POST_PATH)) return [];
//   try {
//     const data = JSON.parse(fs.readFileSync(LAST_POST_PATH, 'utf-8'));
//     return Array.isArray(data) ? data : [data];
//   } catch {
//     return [];
//   }
// }

// function savePostHistory(posts) {
//   fs.writeFileSync(LAST_POST_PATH, JSON.stringify(posts, null, 2));
// }

// function hasSeenPost(history, postId) {
//   return history.some(post => post.postId === postId);
// }

// async function getPosts() {
//   const browser = await puppeteer.launch({
//     headless: true,
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//   });

//   const page = await browser.newPage();
//   await page.setUserAgent(
//     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
//   );
//   await page.setViewport({ width: 1280, height: 800 });

//   try {
//     console.log('➡️ Navigating to profile...');
//     await page.goto(PROFILE_URL, { waitUntil: 'networkidle2', timeout: 60000 });

//     await page.waitForSelector('[data-id]', { timeout: 60000 });
//     await new Promise(resolve => setTimeout(resolve, 3000)); // brief pause to allow content load

//     const posts = await page.evaluate((PROFILE_HANDLE) => {
//       const wrappers = Array.from(document.querySelectorAll('[data-id]'));
//       const results = [];

//       for (const wrapper of wrappers) {
//         if (wrapper.querySelector('[data-testid="boosted-status"]')) continue; // skip retruths

//         const textWrapper = wrapper.querySelector('.status__content-wrapper');
//         if (!textWrapper) continue;

//         const text = Array.from(textWrapper.querySelectorAll('p'))
//           .map(p => p.innerText.trim())
//           .filter(Boolean)
//           .filter((line, i, arr) => arr.indexOf(line) === i)
//           .join('\n');

//         const postId = wrapper.getAttribute('data-id');
//         const postUrl = `https://truthsocial.com/@${PROFILE_HANDLE}/posts/${postId}`;
//         const time = wrapper.querySelector('time')?.getAttribute('title');

//         results.push({ text, postId, postUrl, uploadTime: time });
//       }

//       return results;
//     }, PROFILE_HANDLE);

//     await browser.close();

//     return (posts || []).map(post => ({
//       ...post,
//       fetchedAt: new Date().toISOString()
//     }));

//   } catch (err) {
//     console.error('❌ Error fetching posts:', err.stack || err.message);

//     try {
//       const ts = Date.now();
//       const htmlPath = path.resolve(__dirname, `debug-${ts}.html`);
//       const screenshotPath = path.resolve(__dirname, `debug-${ts}.png`);

//       fs.writeFileSync(htmlPath, await page.content());
//       await page.screenshot({ path: screenshotPath });

//       console.log(`📝 Saved HTML to: ${htmlPath}`);
//       console.log(`📸 Saved screenshot to: ${screenshotPath}`);

//     } catch (e) {
//       console.warn('⚠️ Failed to save debug data.');
//     }

//     await browser.close();
//     return [];
//   }
// }

// // async function startWatcherLoop() {
// //   console.log('▶️ Starting watcher...');

// //   while (true) {
// //     const now = new Date().toLocaleString();
// //     const latestPosts = await getPosts();
// //     const history = readPostHistory();

// //     const newPosts = latestPosts
// //       .filter(post => post && post.postId && !hasSeenPost(history, post.postId))
// //       .slice(0, MAX_VISIBLE_POSTS);

// //     if (newPosts.length > 0) {
// //       console.log(`\n[${now}] 🟢 New posts detected:`);
// //       newPosts.forEach(post => {
// //         console.log(`🔗 ${post.postUrl}`);
// //         history.push({ ...post, timestamp: new Date().toISOString() });
// //       });

// //       if (history.length > MAX_HISTORY) {
// //         history.splice(0, history.length - MAX_HISTORY);
// //       }

// //       savePostHistory(history);
// //     } else {
// //       console.log(`[${now}] ⏳ No new posts.`);
// //     }

// //     await new Promise(res => setTimeout(res, CHECK_INTERVAL_MS));
// //   }
// // }

// async function startWatcherLoop() {
//   console.log('▶️ Starting real-time watcher...');

//   while (true) {
//     const now = new Date().toLocaleString();
//     const latestPosts = await getPosts();
//     const history = readPostHistory();

//     const newPosts = latestPosts
//       .filter(post => post && post.postId && !hasSeenPost(history, post.postId))
//       .slice(0, MAX_VISIBLE_POSTS);

//     if (newPosts.length > 0) {
//       console.log(`\n[${now}] 🟢 ${newPosts.length} new post(s) detected:`);

//       for (const post of newPosts) {
//         console.log(`🔗 ${post.postUrl}`);

//         // // Save to MongoDB if not already there
//         // const exists = await Post.findOne({ content: post.text });
//         // if (exists) {
//         //   console.log("✅ Already in DB.");
//         //   continue;
//         // }

//         const exists = await Post.findOne({ postId: post.postId });
//         if (exists) {
//           console.log("✅ Already in DB (postId matched).");
//           continue;
//         }

//         // GPT analysis
//         let gptResponse = null;
//         try {
//           gptResponse = await analyzePostWithGPT(post.text);
//         } catch (err) {
//           console.error("❌ GPT error:", err.message);
//         }

//         await Post.create({
//           postId: post.postId,
//           username: PROFILE_HANDLE,
//           content: post.text,
//           url: post.postUrl,
//           createdAt: new Date(post.uploadTime),
//           fetchedAt: new Date(post.fetchedAt),
//           gptResponse,
//           gptAnsweredAt: new Date(),
//         });

//         console.log("✅ Saved to MongoDB with GPT analysis.");

//         // await sendNewPostNotification(post, gptResponse);
//         const firstLine = gptResponse.trim().split('\n')[0].trim();

//         if (
//           typeof gptResponse === 'string' &&
//           /^([A-Za-z]\))?\s*yes[,.\- ]+this post is related to the stock market/i.test(firstLine)
//         ) {
//           // await sendNewPostNotification(post, gptResponse);
//           // await sendNewPostWhatsApp(post, gptResponse);
//         } else {
//           console.log("🚫 Post not related to stock market, notification skipped.");
//         }
//       }

//       // Update local JSON history
//       newPosts.forEach(post => {
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

// export {
//   startWatcherLoop,
//   getPosts,
//   readPostHistory
// };
