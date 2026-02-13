const QuizQuestion = require("../models/QuizQuestion");
const User = require("../models/User");

const giftMap = {
  1: "Chocolate 🍫",
  2: "Teddy Bear 🧸",
  3: "Roses 🌹",
  4: "Strawberries 🍓",
  5: "Metal Rose 🌹✨",
  6: "Setting Spray 💄",
  7: "Cash ₹1000 💵",
  8: "Minimalist Skincare Full Set 🧴",
  9: "Dozen Scented Candles 🕯️",
  10: "MAC Foundation 💄✨"
};

// GET QUESTIONS (NO correct answers)
exports.getQuestions = async (req, res) => {
  const questions = await QuizQuestion.find();
  res.json(questions);
};

// SUBMIT ANSWERS
exports.submitQuiz = async (req, res) => {
  const { answers } = req.body;

  const questions = await QuizQuestion.find();
  let score = 0;

  questions.forEach(q => {
    if (
      answers[q._id.toString()]?.trim().toLowerCase() ===
      q.correctAnswer.trim().toLowerCase()
    ) {
      score++;
    }
  });

  // 🚨 FORCE NUMBER (THIS FIXES IT)
  score = Number(score);

  const giftMap = {
    1: "Chocolate 🍫",
    2: "Teddy Bear 🧸",
    3: "Roses 🌹",
    4: "Strawberries 🍓",
    5: "Metal Rose 🌹✨",
    6: "Setting Spray 💄",
    7: "Cash ₹1000 💵",
    8: "Minimalist Skincare Full Set 🧴",
    9: "Dozen Scented Candles 🕯️",
    10: "MAC Foundation 💄✨"
  };

  const gift = giftMap[score] || "No gift 😢";

  res.json({
    score,
    gift
  });
};
