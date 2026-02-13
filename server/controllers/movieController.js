const SeenMovie = require("../models/SeenMovie");
const { fetchByTypeAndGenre } = require("../services/tmdbService");

/**
 * GET /api/movies?genreId=XXX&type=movie|tv|documentary
 */
exports.getMovie = async (req, res) => {
  try {
    const { genreId, type } = req.query;

    if (!genreId || !type) {
      return res.status(400).json({ error: "genreId and type are required" });
    }

    // 1️⃣ Get seen items for this type
    const seenItems = await SeenMovie.find({ type }).select("itemId");
    const seenIds = seenItems.map(i => i.itemId);

    // 2️⃣ Fetch from TMDB
    const results = await fetchByTypeAndGenre(type, genreId);

    if (!results || results.length === 0) {
      return res.json(null);
    }

    // 3️⃣ Filter unseen
    const unseen = results.filter(r => !seenIds.includes(r.id));

    return res.json(unseen[0] || null);
  } catch (err) {
    console.error("Movie fetch error:", err);
    res.status(500).json({ error: "Failed to fetch content" });
  }
};

/**
 * POST /api/movies/seen
 */
exports.markSeen = async (req, res) => {
  try {
    const { itemId, title, genre, type } = req.body;

    if (!itemId || !type) {
      return res.status(400).json({ error: "itemId and type are required" });
    }

    await SeenMovie.create({
      itemId,
      title,
      genre,
      type
    });

    res.json({ message: "Marked as seen" });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({ message: "Already marked as seen" });
    }

    console.error("Mark seen error:", err);
    res.status(500).json({ error: "Failed to mark as seen" });
  }
};
