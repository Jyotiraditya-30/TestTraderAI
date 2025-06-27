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
//     const allWrappers = Array.from(document.querySelectorAll('[data-id]'));

//     const pinnedWrapper = allWrappers.find(wrapper =>
//       wrapper.innerText.includes('Pinned Truth')
//     );

//     const nonPinnedWrappers = allWrappers.filter(wrapper =>
//       !wrapper.innerText.includes('Pinned Truth')
//     ).slice(0, 3); // Top 3 non-pinned

//     const wrappers = pinnedWrapper
//       ? [pinnedWrapper, ...nonPinnedWrappers]
//       : nonPinnedWrappers;

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

// import puppeteerModule from 'puppeteer-extra';
// const puppeteer = puppeteerModule.default || puppeteerModule;
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
// import { analyzePostWithTogetherAI } from "./togetherAiService.js";
// import Post from "../models/postModel2.js";
// import { sendNewPostNotification } from './EmailService.js';
// import { sendNewPostWhatsApp } from './WhatsappService.js';
// import { getSocketIO } from '../socket.js';

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

// let browser = null;
// let page = null;

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
//   if (browser) {
//     try {
//       await browser.close();
//     } catch { }
//   }

//   browser = await puppeteer.launch({
//     headless: false,
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//   });

//   page = await browser.newPage();
//   await page.setUserAgent(
//     `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/${Math.floor(Math.random() * 10) + 115}.0 Safari/537.36`
//   );
//   await page.setViewport({ width: 1280, height: 800 });

//   page.on('error', async err => {
//     console.error('💥 Page crashed:', err);
//     await initBrowser(); // restart browser
//   });

//   page.on('close', async () => {
//     console.warn('⚠️ Page closed unexpectedly.');
//     await initBrowser(); // restart browser
//   });
// }

// async function getPosts() {
//   try {
//     await page.goto(PROFILE_URL, { waitUntil: 'networkidle2', timeout: 60000 });
//     await page.waitForSelector('[data-id]', { timeout: 60000 });
//     await page.evaluate(() => window.scrollBy(0, 300));
//     await new Promise(res => setTimeout(res, 3000));

//     const posts = await page.evaluate(PROFILE_HANDLE => {
//       const allWrappers = Array.from(document.querySelectorAll('[data-id]'));

//       const pinnedWrapper = allWrappers.find(wrapper =>
//         wrapper.innerText.includes('Pinned Truth')
//       );

//       const nonPinnedWrappers = allWrappers.filter(wrapper =>
//         !wrapper.innerText.includes('Pinned Truth')
//       ).slice(0, 3); // Top 3 non-pinned

//       const wrappers = pinnedWrapper
//         ? [pinnedWrapper, ...nonPinnedWrappers]
//         : nonPinnedWrappers;

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
//     console.error('❌ Failed to fetch posts:', err.message);
//     await initBrowser(); // Restart on error
//     return [];
//   }
// }

// async function startWatcherLoop() {
//   console.log('▶️ Starting real-time watcher...');
//   await initBrowser();

//   while (true) {
//     const now = new Date().toLocaleString();
//     let latestPosts = [];

//     try {
//       latestPosts = await getPosts();
//     } catch (err) {
//       console.error('❌ Error during scraping loop:', err.message);
//     }

//     const history = readPostHistory();
//     const newPosts = latestPosts
//       .filter(post => post && post.postId && !hasSeenPost(history, post.postId))
//       .slice(0, MAX_VISIBLE_POSTS);

//     if (newPosts.length > 0) {
//       console.log(`\n[${now}] 🟢 ${newPosts.length} new post(s) detected:`);

//       for (const post of newPosts) {
//         const age = Math.round((Date.now() - new Date(post.uploadTime)) / 1000);
//         console.log(`🔗 ${post.postUrl} (age: ${age}s)`);

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

//         // 🟢 Emit new post to all connected clients
//         const io = getSocketIO();
//         io.emit("newPost", {
//           postId: post.postId,
//           username: PROFILE_HANDLE,
//           content: post.text,
//           url: post.postUrl,
//           createdAt: new Date(post.uploadTime),
//           fetchedAt: new Date(post.fetchedAt),
//           gptResponse,
//           gptAnsweredAt: new Date(),
//         });

//         // await sendNewPostWhatsApp(post, gptResponse);

//         // await sendNewPostNotification(post, gptResponse);
//         const firstLine = gptResponse.trim().split('\n')[0].trim();

//         const isLikelyRelated = /A\)\s*(Yes|The post|This message could|geopolitical|impacts the market|indirect implications)/i.test(gptResponse)
//           || /C\)\s*[\s\S]*\b([A-Z]{2,5})\b/.test(gptResponse)  // any ticker-like symbol
//           || /D\)\s*[\s\S]*(Bullish|Bearish|Neutral)/i.test(gptResponse);  // any sentiment

//         if (typeof gptResponse === 'string' && isLikelyRelated) {
//           await sendNewPostNotification(post, gptResponse);
//           await sendNewPostWhatsApp(post, gptResponse);
//         } else {
//           console.log("🚫 Post not related to stock market, notification skipped.");
//         }


//         //   let gptResponse = null;
//         //   let parsedResponse = null;
//         //   try {
//         //     const rawResponse = await analyzePostWithTogetherAI(post.text);
//         //     parsedResponse = JSON.parse(rawResponse);  // parse GPT JSON
//         //     gptResponse = parsedResponse; // you can also store rawResponse if needed
//         //   } catch (err) {
//         //     console.error("❌ GPT or JSON parse error:", err.message);
//         //   }

//         //   if (!parsedResponse) {
//         //     console.log("⚠️ Skipping post due to GPT failure.");
//         //     continue;
//         //   }

//         //   await Post.create({
//         //     postId: post.postId,
//         //     username: PROFILE_HANDLE,
//         //     content: post.text,
//         //     url: post.postUrl,
//         //     createdAt: new Date(post.uploadTime),
//         //     fetchedAt: new Date(post.fetchedAt),
//         //     gptResponse: JSON.stringify(gptResponse),  // this is now structured JSON
//         //     gptAnsweredAt: new Date(),
//         //   });

//         //   console.log("✅ Saved to MongoDB with GPT analysis.");

//         //   // Notification logic
//         //   if (
//         //     parsedResponse.A &&
//         //     parsedResponse.A.toLowerCase().startsWith("yes")
//         //   ) {
//         //     await sendNewPostNotification(post, parsedResponse);
//         //     await sendNewPostWhatsApp(post, gptResponse);
//         //   } else {
//         //     console.log("🚫 Post not related to stock market, notification skipped.");
//         //   }


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

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ with proxies +++++++++++++++++++++++++++++++++++++++++++++++++++++ //

// import puppeteerModule from 'puppeteer-extra';
// const puppeteer = puppeteerModule.default || puppeteerModule;
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// import AnonymizeUA from 'puppeteer-extra-plugin-anonymize-ua';
// import UserPrefsPlugin from 'puppeteer-extra-plugin-user-preferences';

// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';

// import { analyzePostWithGPT } from "./gptService.js";
// import Post from '../models/postModel2.js';
// import { sendNewPostNotification } from './EmailService.js';
// import { sendNewPostWhatsApp } from './WhatsappService.js';

// puppeteer.use(StealthPlugin());
// puppeteer.use(AnonymizeUA());
// puppeteer.use(UserPrefsPlugin({
//   userPrefs: {
//     intl: { accept_languages: 'en-US,en;q=0.9' },
//     timezone: 'America/New_York',
//   }
// }));

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const PROFILE_HANDLE = process.env.PROFILE_HANDLE || 'realDonaldTrump';
// const PROFILE_URL = `https://truthsocial.com/@${PROFILE_HANDLE}`;
// const COOKIES_PATH = path.resolve(__dirname, 'cookies.json');
// const PROFILE_DIR = path.resolve(__dirname, 'puppeteer-profile');

// const LAST_POST_PATH = path.resolve(__dirname, 'latest.json');
// const CHECK_INTERVAL_MS = parseInt(process.env.CHECK_INTERVAL_MS || '60000');
// const MAX_HISTORY = 50;
// const MAX_VISIBLE_POSTS = 3;

// const PROXY_LIST = process.env.PROXY_LIST?.split(',').map(p => p.trim()) || [];
// const USER_AGENTS = [
//   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.110 Safari/537.36",
//   "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15",
//   "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.49 Safari/537.36",
//   "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/117.0",
//   "Mozilla/5.0 (Linux; Android 12; SM-A125F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36"
// ];

// function delay(ms) {
//   return new Promise(res => setTimeout(res, ms));
// }

// function getRandomElement(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// function getRandomDelay(minMs, maxMs) {
//   return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
// }

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
//   let retries = 0;
//   const maxRetries = 3;

//   while (retries < maxRetries) {
//     const proxy = getRandomElement(PROXY_LIST);
//     const userAgent = getRandomElement(USER_AGENTS);

//     const launchArgs = ['--no-sandbox', '--disable-setuid-sandbox'];
//     if (proxy) launchArgs.push(`--proxy-server=${proxy}`);

//     console.log(`🧭 Using Proxy: ${proxy}`);
//     console.log(`🧭 Using UA: ${userAgent}`);

//     const browser = await puppeteer.launch({
//       headless: true,
//       userDataDir: PROFILE_DIR,
//       args: launchArgs,
//     });

//     const page = await browser.newPage();
//     await page.setUserAgent(userAgent);

//     // ✅ Authenticate proxy if needed
//     if (proxy?.includes('@')) {
//       try {
//         const [protocol, rest] = proxy.split('://');
//         const [auth] = rest.split('@');
//         const [username, password] = auth.split(':');
//         await page.authenticate({ username, password });
//       } catch (err) {
//         console.warn('⚠️ Failed to authenticate proxy:', err.message);
//       }
//     }

//     await page.setViewport({
//       width: 1280 + Math.floor(Math.random() * 100),
//       height: 800 + Math.floor(Math.random() * 100),
//     });

//     if (fs.existsSync(COOKIES_PATH)) {
//       try {
//         const cookies = JSON.parse(fs.readFileSync(COOKIES_PATH, 'utf8'));
//         await page.setCookie(...cookies);
//         console.log('🍪 Loaded saved cookies');
//       } catch (err) {
//         console.warn('⚠️ Failed to load cookies:', err.message);
//       }
//     }

//     try {
//       console.log(`➡️ Navigating to ${PROFILE_URL}`);
//       await page.goto(PROFILE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
//       await delay(1000 + Math.random() * 2000);

//       await page.evaluate(() => window.scrollBy(0, 100 + Math.floor(Math.random() * 200)));
//       await delay(300 + Math.random() * 500);
//       await page.evaluate(() => window.scrollBy(0, 200 + Math.floor(Math.random() * 200)));

//       try {
//         const buttons = await page.$$('button');
//         for (const btn of buttons) {
//           const text = await (await btn.getProperty('innerText')).jsonValue();
//           if (text && text.trim().toLowerCase() === 'accept') {
//             await btn.hover();
//             await delay(300 + Math.random() * 300);
//             await btn.click();
//             console.log("✅ Accepted cookie banner");
//             await delay(1000 + Math.random() * 500);
//             break;
//           }
//         }
//       } catch (err) {
//         console.warn("⚠️ Failed to click cookie Accept button:", err.message);
//       }

//       const isBlocked = await page.evaluate(() =>
//         document.body.innerText.includes('Verifying you are human') ||
//         document.body.innerText.includes('needs to review the security')
//       );

//       if (isBlocked) {
//         console.warn('🛑 Cloudflare challenge detected – clearing session and retrying...');
//         await browser.close();
//         fs.rmSync(PROFILE_DIR, { recursive: true, force: true });
//         if (fs.existsSync(COOKIES_PATH)) fs.unlinkSync(COOKIES_PATH);
//         retries++;
//         await delay(5000 + Math.random() * 2000);
//         continue;
//       }

//       await page.waitForSelector('[data-id]', { timeout: 60000 });
//       await delay(2000 + Math.random() * 1000);

//       await page.evaluate(async () => {
//         await new Promise((resolve) => {
//           let totalHeight = 0;
//           const distance = 200;
//           const timer = setInterval(() => {
//             window.scrollBy(0, distance);
//             totalHeight += distance;
//             if (totalHeight >= document.body.scrollHeight - window.innerHeight) {
//               clearInterval(timer);
//               resolve();
//             }
//           }, 300 + Math.floor(Math.random() * 200));
//         });
//       });

//       const cookies = await page.cookies();
//       fs.writeFileSync(COOKIES_PATH, JSON.stringify(cookies, null, 2));
//       console.log('✅ Saved cookies');

//       const posts = await page.evaluate((PROFILE_HANDLE) => {
//         const wrappers = Array.from(document.querySelectorAll('[data-id]'));
//         const results = [];

//         for (const wrapper of wrappers) {
//           if (wrapper.querySelector('[data-testid="boosted-status"]')) continue;

//           const textWrapper = wrapper.querySelector('.status__content-wrapper');
//           if (!textWrapper) continue;

//           const text = Array.from(textWrapper.querySelectorAll('p'))
//             .map(p => p.innerText.trim())
//             .filter(Boolean)
//             .filter((line, i, arr) => arr.indexOf(line) === i)
//             .join('\n');

//           const postId = wrapper.getAttribute('data-id');
//           const postUrl = `https://truthsocial.com/@${PROFILE_HANDLE}/posts/${postId}`;
//           const time = wrapper.querySelector('time')?.getAttribute('title');

//           results.push({ text, postId, postUrl, uploadTime: time });
//         }

//         return results;
//       }, PROFILE_HANDLE);

//       await browser.close();

//       return (posts || []).map(post => ({
//         ...post,
//         fetchedAt: new Date().toISOString()
//       }));

//     } catch (err) {
//       const now = new Date().toLocaleString();
//       console.error(`${now}]❌ Error fetching posts:`, err.message);
//       try {
//         const ts = Date.now();
//         fs.writeFileSync(`debug-${ts}.html`, await page.content());
//         await page.screenshot({ path: `debug-${ts}.png` });
//       } catch (e) {
//         console.warn('⚠️ Failed to save debug data.');
//       }
//       await browser.close();
//       retries++;
//       await delay(3000);
//     }
//   }

//   console.error('❌ Failed to fetch posts after max retries');
//   return [];
// }

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

//         const exists = await Post.findOne({ postId: post.postId });
//         if (exists) {
//           console.log("✅ Already in DB (postId matched).");
//           continue;
//         }

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

//         const firstLine = gptResponse?.trim().split('\n')[0].trim();

//         if (
//           typeof gptResponse === 'string' &&
//           /^([A-Za-z]\))?\s*yes[,\.\- ]+this post is related to the stock market/i.test(firstLine)
//         ) {
//           // await sendNewPostNotification(post, gptResponse);
//           // await sendNewPostWhatsApp(post, gptResponse);
//         } else {
//           console.log("🚫 Post not related to stock market, notification skipped.");
//         }
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

//     const delayMs = getRandomDelay(60_000, 300_000); // 1 to 5 minutes
//     console.log(`🕒 Next check in ${Math.round(delayMs / 1000)} seconds`);
//     await delay(delayMs);
//   }
// }

// export {
//   startWatcherLoop,
//   getPosts,
//   readPostHistory
// };

//++++++++++++++++++++++++++++++++++++++ updated with rotational proxies ++++++++++++++++++++++++++++++++++++++++++++++ //

// import puppeteerModule from 'puppeteer-extra';
// const puppeteer = puppeteerModule.default || puppeteerModule;
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// import AnonymizeUA from 'puppeteer-extra-plugin-anonymize-ua';
// import UserPrefsPlugin from 'puppeteer-extra-plugin-user-preferences';

// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';

// import { analyzePostWithGPT } from "./gptService.js";
// import Post from '../models/postModel2.js';
// import { sendNewPostNotification } from './EmailService.js';
// import { sendNewPostWhatsApp } from './WhatsappService.js';
// import { getSocketIO } from '../socket.js';

// puppeteer.use(StealthPlugin());
// puppeteer.use(AnonymizeUA());
// puppeteer.use(UserPrefsPlugin({
//   userPrefs: {
//     intl: { accept_languages: 'en-US,en;q=0.9' },
//     timezone: 'America/New_York',
//   }
// }));

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const PROFILE_HANDLE = process.env.PROFILE_HANDLE || 'realDonaldTrump';
// const PROFILE_URL = `https://truthsocial.com/@${PROFILE_HANDLE}`;
// const COOKIES_PATH = path.resolve(__dirname, 'cookies.json');
// const PROFILE_DIR = path.resolve(__dirname, 'puppeteer-profile');

// const LAST_POST_PATH = path.resolve(__dirname, 'latest.json');
// const CHECK_INTERVAL_MS = parseInt(process.env.CHECK_INTERVAL_MS || '60000');
// const MAX_HISTORY = 50;
// const MAX_VISIBLE_POSTS = 3;

// const PROXY_LIST = process.env.PROXY_LIST?.split(',').map(p => p.trim()) || [];
// const USER_AGENTS = [
//   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.110 Safari/537.36",
//   "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15",
//   "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.49 Safari/537.36",
//   "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/117.0",
//   "Mozilla/5.0 (Linux; Android 12; SM-A125F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36"
// ];

// function delay(ms) {
//   return new Promise(res => setTimeout(res, ms));
// }

// function getRandomElement(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// function getRandomDelay(minMs, maxMs) {
//   return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
// }

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
//   const userAgent = getRandomElement(USER_AGENTS);
//   const successLogPath = path.resolve(__dirname, 'proxy_success_log.json');
//   const COOKIE_META_PATH = path.resolve(__dirname, 'cookie_meta.json');

//   const PROXIES = [
//     {
//       ip: 'http://104.239.105.125:6655',
//       username: 'hsbfilue',
//       password: 'p0ytnvylp8e0'
//     },
//     {
//       ip: 'http://104.239.105.125:6655',
//       username: 'ybncrorx',
//       password: 't44turw1a264'
//     }
//   ];

//   // const webshareProxy = 'http://p.webshare.io:80';
//   // const proxyUsername = 'txjehvsx-rotate';
//   // const proxyPassword = 'dcafycd7e4f5';

//   const updateProxyLog = (ip, status) => {
//     let log = {};
//     if (fs.existsSync(successLogPath)) {
//       log = JSON.parse(fs.readFileSync(successLogPath, 'utf8'));
//     }
//     log[ip] = status;
//     fs.writeFileSync(successLogPath, JSON.stringify(log, null, 2));
//   };

//   const readCookieMeta = () => {
//     if (!fs.existsSync(COOKIE_META_PATH)) return null;
//     try {
//       return JSON.parse(fs.readFileSync(COOKIE_META_PATH, 'utf8'));
//     } catch {
//       return null;
//     }
//   };

//   const writeCookieMeta = (ip) => {
//     fs.writeFileSync(COOKIE_META_PATH, JSON.stringify({ proxyIp: ip }, null, 2));
//   };

//   for (let attempt = 0; attempt < 3; attempt++) {
//     let browser = null;
//     let publicIP = 'unknown';

//     const proxy = getRandomElement(PROXIES);
//     try {
//       const launchArgs = [
//         '--no-sandbox',
//         '--disable-setuid-sandbox',
//       ];

//       browser = await puppeteer.launch({
//         headless: false,
//         userDataDir: PROFILE_DIR,
//         timeout: 60000,
//         args: launchArgs
//       });

//       const page = await browser.newPage();

//       await page.authenticate({
//         username: proxy.username,
//         password: proxy.password
//       });

//       // await page.authenticate({
//       //   username: proxyUsername,
//       //   password: proxyPassword
//       // });

//       await page.setUserAgent(userAgent);
//       await page.setViewport({
//         width: 1280 + Math.floor(Math.random() * 100),
//         height: 800 + Math.floor(Math.random() * 100)
//       });

//       await page.setExtraHTTPHeaders({
//         'Accept-Language': 'en-US,en;q=0.9',
//         'Sec-CH-UA': '"Chromium";v="114", "Not.A/Brand";v="8"',
//         'Sec-CH-UA-Mobile': '?0',
//         'Sec-CH-UA-Platform': '"Windows"'
//       });

//       await delay(getRandomDelay(3000, 6000));

//       // Get IP and print
//       try {
//         await page.goto('https://api.ipify.org', { waitUntil: 'networkidle2', timeout: 15000 });
//         publicIP = await page.evaluate(() => document.body.innerText.trim());
//         console.log(`🌐 Public IP: ${publicIP}`);
//       } catch (ipErr) {
//         console.warn('⚠️ Could not retrieve IP:', ipErr.message);
//       }

//       // Load cookies if IP matches
//       const meta = readCookieMeta();
//       if (fs.existsSync(COOKIES_PATH) && meta?.proxyIp === publicIP) {
//         try {
//           const cookies = JSON.parse(fs.readFileSync(COOKIES_PATH, 'utf8'));
//           await page.setCookie(...cookies);
//           console.log('🍪 Loaded cookies (same IP)');
//         } catch (err) {
//           console.warn('⚠️ Failed to load cookies:', err.message);
//         }
//       } else {
//         console.log('🚫 Skipping cookie load (IP mismatch or new IP)');
//       }

//       await delay(getRandomDelay(3000, 5000));

//       // Load TruthSocial profile page
//       await Promise.race([
//         page.goto(PROFILE_URL, { waitUntil: 'networkidle2', timeout: 40000 }),
//         new Promise((_, reject) =>
//           setTimeout(() => reject(new Error('⏱️ page.goto timeout')), 45000)
//         )
//       ]);

//       // Check if blocked or empty
//       const isBlockedOrEmpty = await page.evaluate(() => {
//         const title = document.title.toLowerCase();
//         const bodyText = document.body.innerText.toLowerCase();
//         return (
//           title.includes('attention required') ||
//           bodyText.includes('verifying you are human') ||
//           bodyText.includes('you are being rate limited') ||
//           bodyText.includes('sorry, you have been blocked') ||
//           bodyText.includes('no truths') ||
//           bodyText.length < 500
//         );
//       });

//       if (isBlockedOrEmpty) {
//         console.warn(`🛑 Blocked or no valid content from TruthSocial [${publicIP}]`);
//         updateProxyLog(publicIP, 'blocked/empty');
//         await browser.close();
//         continue; // Try again
//       }

//       console.log(`✅ SUCCESS — Page loaded [${publicIP}]`);
//       updateProxyLog(publicIP, 'success');

//       // Smooth scroll to reveal posts hidden below pinned truth
//       await page.evaluate(async () => {
//         const sleep = ms => new Promise(res => setTimeout(res, ms));
//         let tries = 0;
//         while (document.querySelectorAll('[data-id]').length < 4 && tries < 10) {
//           window.scrollBy(0, 300);
//           await sleep(400);
//           tries++;
//         }
//       });


//       try {
//         await page.waitForSelector('[data-id]', { timeout: 15000 });
//       } catch (err) {
//         console.warn(`⚠️ No post selector found — skipping [${publicIP}]`);
//         await browser.close();
//         continue;
//       }

//       const posts = await page.evaluate((PROFILE_HANDLE) => {
//         // const wrappers = Array.from(document.querySelectorAll('[data-id]')).slice(0, 3);
//         const allWrappers = Array.from(document.querySelectorAll('[data-id]'));

//         const pinnedWrapper = allWrappers.find(wrapper =>
//           wrapper.innerText.includes('Pinned Truth')
//         );

//         const nonPinnedWrappers = allWrappers.filter(wrapper =>
//           !wrapper.innerText.includes('Pinned Truth')
//         ).slice(0, 3); // Top 3 non-pinned

//         const wrappers = pinnedWrapper
//           ? [pinnedWrapper, ...nonPinnedWrappers]
//           : nonPinnedWrappers;

//         const results = [];

//         for (const wrapper of wrappers) {
//           if (wrapper.querySelector('[data-testid="boosted-status"]')) continue;
//           const textWrapper = wrapper.querySelector('.status__content-wrapper');
//           if (!textWrapper) continue;

//           const text = Array.from(textWrapper.querySelectorAll('p'))
//             .map(p => p.innerText.trim())
//             .filter(Boolean)
//             .filter((line, i, arr) => arr.indexOf(line) === i)
//             .join('\n');

//           const postId = wrapper.getAttribute('data-id');
//           const postUrl = `https://truthsocial.com/@${PROFILE_HANDLE}/posts/${postId}`;
//           const time = wrapper.querySelector('time')?.getAttribute('title');

//           results.push({ text, postId, postUrl, uploadTime: time });
//         }

//         return results;
//       }, PROFILE_HANDLE);

//       const cookies = await page.cookies();
//       fs.writeFileSync(COOKIES_PATH, JSON.stringify(cookies, null, 2));
//       writeCookieMeta(publicIP);

//       await browser.close();

//       return posts.map(post => ({
//         ...post,
//         fetchedAt: new Date().toISOString()
//       }));

//     } catch (err) {
//       console.error(`❌ Proxy error [${publicIP}]:`, err.message);
//       if (browser) await browser.close();
//       await delay(3000);
//     }
//   }

//   console.error('❌ All attempts failed (possibly all proxies blocked or hanging)');
//   return [];
// }



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

//         const exists = await Post.findOne({ postId: post.postId });
//         if (exists) {
//           console.log("✅ Already in DB (postId matched).");
//           continue;
//         }

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

//         // 🟢 Emit new post to all connected clients
//         const io = getSocketIO();
//         io.emit("newPost", {
//           postId: post.postId,
//           username: PROFILE_HANDLE,
//           content: post.text,
//           url: post.postUrl,
//           createdAt: new Date(post.uploadTime),
//           fetchedAt: new Date(post.fetchedAt),
//           gptResponse,
//           gptAnsweredAt: new Date(),
//         });


//         const firstLine = gptResponse?.trim().split('\n')[0].trim();

//         const isLikelyRelated = /A\)\s*(Yes|The post|This message could|geopolitical|impacts the market|indirect implications)/i.test(gptResponse)
//           || /C\)\s*[\s\S]*\b([A-Z]{2,5})\b/.test(gptResponse)  // any ticker-like symbol
//           || /D\)\s*[\s\S]*(Bullish|Bearish|Neutral)/i.test(gptResponse);  // any sentiment

//         if (typeof gptResponse === 'string' && isLikelyRelated) {
//           await sendNewPostNotification(post, gptResponse);
//           await sendNewPostWhatsApp(post, gptResponse);
//         } else {
//           console.log("🚫 Post not related to stock market, notification skipped.");
//         }
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

//     const delayMs = getRandomDelay(60000, 120000); // 30s to 1min
//     console.log(`🕒 Next check in ${Math.round(delayMs / 1000)} seconds`);
//     await delay(delayMs);
//   }
// }

// export {
//   startWatcherLoop,
//   getPosts,
//   readPostHistory
// };

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Update ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

import puppeteerModule from 'puppeteer-extra';
const puppeteer = puppeteerModule.default || puppeteerModule;
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AnonymizeUA from 'puppeteer-extra-plugin-anonymize-ua';
import UserPrefsPlugin from 'puppeteer-extra-plugin-user-preferences';

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import { analyzePostWithGPT } from "./gptService.js";
import Post from '../models/postModel2.js';
import { sendNewPostNotification } from './EmailService.js';
import { sendNewPostWhatsApp } from './WhatsappService.js';
import { getSocketIO } from '../socket.js';

puppeteer.use(StealthPlugin());
puppeteer.use(AnonymizeUA());
puppeteer.use(UserPrefsPlugin({
  userPrefs: {
    intl: { accept_languages: 'en-US,en;q=0.9' },
    timezone: 'America/New_York',
  }
}));

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROFILE_HANDLE = process.env.PROFILE_HANDLE || 'realDonaldTrump';
const PROFILE_URL = `https://truthsocial.com/@${PROFILE_HANDLE}`;
const COOKIES_PATH = path.resolve(__dirname, 'cookies.json');
const PROFILE_DIR = path.resolve(__dirname, 'puppeteer-profile');

const LAST_POST_PATH = path.resolve(__dirname, 'latest.json');
const CHECK_INTERVAL_MS = parseInt(process.env.CHECK_INTERVAL_MS || '60000');
const MAX_HISTORY = 50;
const MAX_VISIBLE_POSTS = 6;

const PROXY_LIST = process.env.PROXY_LIST?.split(',').map(p => p.trim()) || [];
const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.110 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.49 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/117.0",
  "Mozilla/5.0 (Linux; Android 12; SM-A125F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36"
];

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDelay(minMs, maxMs) {
  return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
}

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

// async function getPosts() {
//   const userAgent = getRandomElement(USER_AGENTS);
//   const successLogPath = path.resolve(__dirname, 'proxy_success_logWebShare.json');
//   const COOKIE_META_PATH = path.resolve(__dirname, 'cookie_meta.json');

//   // const PROXIES = [
//   //   {
//   //     ip: 'http://104.239.105.125:6655',
//   //     username: 'hsbfilue',
//   //     password: 'p0ytnvylp8e0'
//   //   }
//   // ];

//   const webshareProxy = 'http://p.webshare.io:80';
//   const proxyUsername = 'txjehvsx-rotate';
//   const proxyPassword = 'dcafycd7e4f5';

//   const updateProxyLog = (ip, status) => {
//     let log = {};
//     if (fs.existsSync(successLogPath)) {
//       log = JSON.parse(fs.readFileSync(successLogPath, 'utf8'));
//     }
//     log[ip] = status;
//     fs.writeFileSync(successLogPath, JSON.stringify(log, null, 2));
//   };

//   const readCookieMeta = () => {
//     if (!fs.existsSync(COOKIE_META_PATH)) return null;
//     try {
//       return JSON.parse(fs.readFileSync(COOKIE_META_PATH, 'utf8'));
//     } catch {
//       return null;
//     }
//   };

//   const writeCookieMeta = (ip) => {
//     fs.writeFileSync(COOKIE_META_PATH, JSON.stringify({ proxyIp: ip }, null, 2));
//   };

//   // const proxy = getRandomElement(webshareProxy);
//   let browser;

//   try {
//     const launchArgs = [
//       '--no-sandbox',
//       '--disable-setuid-sandbox',
//       `--proxy-server=${webshareProxy}`
//     ];

//     browser = await puppeteer.launch({
//       headless: false,
//       userDataDir: PROFILE_DIR,
//       args: launchArgs
//     });

//     const page = await browser.newPage();

//     // await page.authenticate({
//     //   username: proxy.username,
//     //   password: proxy.password
//     // });

//     await page.authenticate({
//       username: proxyUsername,
//       password: proxyPassword
//     });

//     await page.setUserAgent(userAgent);
//     await page.setViewport({
//       width: 1280 + Math.floor(Math.random() * 100),
//       height: 800 + Math.floor(Math.random() * 100)
//     });

//     await page.setExtraHTTPHeaders({
//       'Accept-Language': 'en-US,en;q=0.9',
//       'Sec-CH-UA': '"Chromium";v="114", "Not.A/Brand";v="8"',
//       'Sec-CH-UA-Mobile': '?0',
//       'Sec-CH-UA-Platform': '"Windows"'
//     });

//     // Wait before going to profile
//     await delay(getRandomDelay(3000, 6000));

//     // Check IP
//     let publicIP = 'unknown';
//     await page.goto('https://api.ipify.org', { waitUntil: 'networkidle2' });
//     publicIP = await page.evaluate(() => document.body.innerText.trim());
//     console.log(`🌐 Public IP: ${publicIP}`);

//     // Smart cookie load
//     const meta = readCookieMeta();
//     if (fs.existsSync(COOKIES_PATH) && meta?.proxyIp === publicIP) {
//       try {
//         const cookies = JSON.parse(fs.readFileSync(COOKIES_PATH, 'utf8'));
//         await page.setCookie(...cookies);
//         console.log('🍪 Loaded cookies (same IP)');
//       } catch (err) {
//         console.warn('⚠️ Failed to load cookies:', err.message);
//       }
//     } else {
//       console.log('🚫 Skipping cookie load (IP mismatch or new IP)');
//     }

//     await delay(getRandomDelay(3000, 5000)); // More delay to simulate human pacing

//     await page.goto(PROFILE_URL, { waitUntil: 'networkidle2', timeout: 60000 });

//     // Check for Cloudflare or rate-limit
//     const isBlocked = await page.evaluate(() =>
//       document.title.includes('Attention Required') ||
//       document.body.innerText.includes('Verifying you are human') ||
//       document.body.innerText.includes('Sorry, you have been blocked')
//       // ||
//       // document.body.innerText.includes('too fast')
//     );

//     if (isBlocked) {
//       console.warn(`🛑 BLOCKED or rate-limited [${publicIP}]`);
//       updateProxyLog(publicIP, 'blocked');
//       const html = await page.content();
//       // fs.writeFileSync(`debug-${Date.now()}.html`, html);
//       await browser.close();
//       return [];
//     }

//     console.log(`✅ SUCCESS — Page loaded [${publicIP}]`);
//     updateProxyLog(publicIP, 'success');

//     await page.waitForSelector('[data-id]', { timeout: 20000 });

//     const posts = await page.evaluate((PROFILE_HANDLE) => {
//       const wrappers = Array.from(document.querySelectorAll('[data-id]')).slice(0, 3);
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

//     // Save new cookies
//     const cookies = await page.cookies();
//     fs.writeFileSync(COOKIES_PATH, JSON.stringify(cookies, null, 2));
//     writeCookieMeta(publicIP);

//     await browser.close();

//     return (posts || []).map(post => ({
//       ...post,
//       fetchedAt: new Date().toISOString()
//     }));

//   } catch (err) {
//     console.error(`❌ Scrape error with proxy ${proxy.ip}:`, err.message);
//     if (browser) await browser.close();
//     await delay(3000);
//     return [];
//   }
// }


async function getPosts() {
  const userAgent = getRandomElement(USER_AGENTS);
  const successLogPath = path.resolve(__dirname, 'proxy_success_log.json');
  const COOKIE_META_PATH = path.resolve(__dirname, 'cookie_meta.json');

  const PROXIES = [
    // {
    //   ip: 'http://104.239.105.125:6655',
    //   username: 'hsbfilue',
    //   password: 'p0ytnvylp8e0'
    // },
    // {
    //   ip: 'http://104.239.105.125:6655',
    //   username: 'ybncrorx',
    //   password: 't44turw1a264'
    // }
    // ,
    {
      ip: 'http://104.239.105.125:6655',
      username: 'hyoepnhl',
      password: 'nyx9xwk07625'
    },
    {
      ip: 'http://104.239.105.125:6655',
      username: 'vsfmbdkk',
      password: 'rhyfca4l1pfl'
    }
  ];

  // const webshareProxy = 'http://p.webshare.io:80';
  // const proxyUsername = 'txjehvsx-rotate';
  // const proxyPassword = 'dcafycd7e4f5';

  const updateProxyLog = (ip, status) => {
    let log = {};
    if (fs.existsSync(successLogPath)) {
      log = JSON.parse(fs.readFileSync(successLogPath, 'utf8'));
    }
    log[ip] = status;
    fs.writeFileSync(successLogPath, JSON.stringify(log, null, 2));
  };

  const readCookieMeta = () => {
    if (!fs.existsSync(COOKIE_META_PATH)) return null;
    try {
      return JSON.parse(fs.readFileSync(COOKIE_META_PATH, 'utf8'));
    } catch {
      return null;
    }
  };

  const writeCookieMeta = (ip) => {
    fs.writeFileSync(COOKIE_META_PATH, JSON.stringify({ proxyIp: ip }, null, 2));
  };

  for (let attempt = 0; attempt < 3; attempt++) {
    let browser = null;
    let publicIP = 'unknown';

    const proxy = getRandomElement(PROXIES);
    try {
      const launchArgs = [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        // `--proxy-server=${proxy.ip}`
      ];

      browser = await puppeteer.launch({
        headless: false,
        userDataDir: PROFILE_DIR,
        timeout: 60000,
        args: launchArgs
      });

      const page = await browser.newPage();

      await page.authenticate({
        username: proxy.username,
        password: proxy.password
      });

      // await page.authenticate({
      //   username: proxyUsername,
      //   password: proxyPassword
      // });

      await page.setUserAgent(userAgent);
      await page.setViewport({
        width: 1280,
        height: 2000
      });

      await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-CH-UA': '"Chromium";v="114", "Not.A/Brand";v="8"',
        'Sec-CH-UA-Mobile': '?0',
        'Sec-CH-UA-Platform': '"Windows"'
      });

      // await delay(getRandomDelay(3000, 6000));

      try {
        await page.goto('https://api.ipify.org', { waitUntil: 'networkidle2', timeout: 15000 });
        publicIP = await page.evaluate(() => document.body.innerText.trim());
        console.log(`🌐 Public IP: ${publicIP}`);
      } catch (ipErr) {
        console.warn('⚠️ Could not retrieve IP:', ipErr.message);
      }

      const meta = readCookieMeta();
      if (fs.existsSync(COOKIES_PATH) && meta?.proxyIp === publicIP) {
        try {
          const cookies = JSON.parse(fs.readFileSync(COOKIES_PATH, 'utf8'));
          await page.setCookie(...cookies);
          console.log('🍪 Loaded cookies (same IP)');
        } catch (err) {
          console.warn('⚠️ Failed to load cookies:', err.message);
        }
      } else {
        console.log('🚫 Skipping cookie load (IP mismatch or new IP)');
      }

      await delay(getRandomDelay(3000, 5000));

      await Promise.race([
        page.goto(PROFILE_URL, { waitUntil: 'networkidle2', timeout: 40000 }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('⏱️ page.goto timeout')), 45000)
        )
      ]);

      const isBlockedOrEmpty = await page.evaluate(() => {
        const title = document.title.toLowerCase();
        const bodyText = document.body.innerText.toLowerCase();
        return (
          title.includes('attention required') ||
          bodyText.includes('verifying you are human') ||
          bodyText.includes('you are being rate limited') ||
          bodyText.includes('sorry, you have been blocked') ||
          bodyText.includes('no truths') ||
          bodyText.length < 500
        );
      });

      if (isBlockedOrEmpty) {
        console.warn(`🛑 Blocked or no valid content from TruthSocial [${publicIP}]`);
        updateProxyLog(publicIP, 'blocked/empty');
        await browser.close();
        continue;
      }

      console.log(`✅ SUCCESS — Page loaded [${publicIP}]`);
      updateProxyLog(publicIP, 'success');

      const posts = await page.evaluate(async (PROFILE_HANDLE) => {
        const sleep = ms => new Promise(res => setTimeout(res, ms));
        const collected = new Map();

        const readPosts = () => {
          const wrappers = Array.from(document.querySelectorAll('[data-id]'));
          for (const wrapper of wrappers) {
            const postId = wrapper.getAttribute('data-id');
            if (!postId || collected.has(postId)) continue;

            const textWrapper = wrapper.querySelector('.status__content-wrapper');
            if (!textWrapper) continue;

            const text = Array.from(textWrapper.querySelectorAll('p'))
              .map(p => p.innerText.trim())
              .filter(Boolean)
              .filter((line, i, arr) => arr.indexOf(line) === i)
              .join('\n');

            const time = wrapper.querySelector('time')?.getAttribute('title');
            const postUrl = `https://truthsocial.com/@${PROFILE_HANDLE}/posts/${postId}`;

            collected.set(postId, { text, postId, postUrl, uploadTime: time });
          }
        };

        for (let i = 0; i < 10; i++) {
          window.scrollBy(0, 400);
          await sleep(800);
          readPosts();
        }

        for (let i = 0; i < 5; i++) {
          window.scrollBy(0, -400);
          await sleep(500);
          readPosts();
        }

        return Array.from(collected.values()).slice(0, 8);
      }, PROFILE_HANDLE);

      const cookies = await page.cookies();
      fs.writeFileSync(COOKIES_PATH, JSON.stringify(cookies, null, 2));
      writeCookieMeta(publicIP);

      await browser.close();

      return posts.map(post => ({
        ...post,
        fetchedAt: new Date().toISOString()
      }));

    } catch (err) {
      console.error(`❌ Proxy error [${publicIP}]:`, err.message);
      if (browser) await browser.close();
      await delay(3000);
    }
  }

  console.error('❌ All attempts failed (possibly all proxies blocked or hanging)');
  return [];
}


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

        const exists = await Post.findOne({ postId: post.postId });
        if (exists) {
          console.log("✅ Already in DB (postId matched).");
          continue;
        }

        let gptResponse = null;
        try {
          gptResponse = await analyzePostWithGPT(post.text);
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


        function extractSection(gptResponse, label) {
          const regex = new RegExp(`${label}\\)\\s*([\\s\\S]*?)(?=\\n[A-Z]\\)|$)`, 'i');
          const match = gptResponse.match(regex);
          return match ? match[1].trim().toLowerCase() : '';
        }

        const sectionA = extractSection(gptResponse, 'A');
        const sectionC = extractSection(gptResponse, 'C');
        const sectionD = extractSection(gptResponse, 'D');

        console.log("— GPT Section A:", sectionA);
        console.log("— GPT Section C:", sectionC);
        console.log("— GPT Section D:", sectionD);

        const isRelated = sectionA.includes("yes") || sectionA.includes("indirectly") || sectionA.includes("might") || sectionA.includes("could");
        const hasTickers = /[A-Z]{2,5}/.test(sectionC) && !sectionC.includes("none");
        const hasSentiment = /(bullish|bearish|neutral)/.test(sectionD);

        // Send notifications only if A says "yes" or if there's ticker+sentiment
        if (isRelated || (hasTickers && hasSentiment)) {
          console.log("📈 GPT analysis suggests market relevance — sending notifications.");
          await sendNewPostNotification(post, gptResponse);
          await sendNewPostWhatsApp(post, gptResponse);
        } else {
          console.log("🚫 GPT analysis suggests no market relevance — skipping notification.");
        }

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

    const delayMs = getRandomDelay(60000, 90000); // 30s to 1min
    console.log(`🕒 Next check in ${Math.round(delayMs / 1000)} seconds`);
    await delay(delayMs);
  }
}

export {
  startWatcherLoop,
  getPosts,
  readPostHistory
};
