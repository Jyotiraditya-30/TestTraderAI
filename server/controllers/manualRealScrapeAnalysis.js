// import { getPosts } from "../services/ManualTruthScrapingService.js";
// import { analyzePostWithGPT } from "../services/gptService.js";
import Post from "../models/postModel2.js";

// 🧠 One-time run: scrape + analyze
// export const runManualScraperOnce = async (req, res) => {
//   const { username = "realdonaldtrump" } = req.body;

//   try {
//     const posts = await getPosts();

//     for (const post of posts) {
//       const exists = await Post.findOne({ content: post.text });
//       if (exists) continue;

//       await Post.create({
//         username,
//         content: post.text,
//         url: post.postUrl,
//         createdAt: new Date(post.uploadTime),
//         fetchedAt: new Date(post.fetchedAt),
//       });
//     }

//     const unprocessed = await Post.find({ gptResponse: { $exists: false } });

//     for (const post of unprocessed) {
//       try {
//         const gptResponse = await analyzePostWithGPT(post.content);
//         post.gptResponse = gptResponse;
//         post.gptAnsweredAt = new Date();
//         await post.save();
//       } catch (err) {
//         console.error("GPT analysis error:", err.message);
//       }
//     }

//     res.json({ success: true, message: "Manual scraping & GPT analysis completed." });

//   } catch (err) {
//     console.error("Manual scraper error:", err.message);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // 📦 Get latest scraped + analyzed posts
// export const getManualScrapedPosts = async (req, res) => {
//   try {
//     const posts = await Post.find().sort({ createdAt: -1 }).limit(20);
//     res.status(200).json({ posts });
//   } catch (err) {
//     console.error("Fetch error:", err.message);
//     res.status(500).json({ error: "Failed to fetch posts from DB." });
//   }
// };


export const getManualScrapedPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;  // page=1 by default
    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Post.countDocuments(),
    ]);

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch posts from DB." });
  }
};
