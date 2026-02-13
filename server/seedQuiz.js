require("dotenv").config();
const mongoose = require("mongoose");
const QuizQuestion = require("./models/QuizQuestion");

mongoose.connect(process.env.MONGO_URI);

const questions = [
  {
    question: "Our First Date spot?",
    options: ["KFC", "Chicking", "Burger Spot", "Biryani Souq"],
    correctAnswer: "Chicking"
  },
  {
    question: "Our Couple Song?",
    options: ["Saahiba", "kalyani", "Singaari", "ishq bulaava"],
    correctAnswer: "kalyani"
  },
  {
    question: "the movie we first saw as a date?",
    options: ["weapons", "Durandhar", "superman", "Formula 1"],
    correctAnswer: "Formula 1"
  },
  {
    question: "the type of cuisine we have eaten the most at our dates?",
    options: ["asian", "indian", "italian", "continental"],
    correctAnswer: "asian"
  },
  {
    question: "how many grams of pup start did soju need?",
    options: ["5", "8", "15","10"],
    correctAnswer: "10"
  },
  {
    question: "when we went dolls have i won for you in an arcade?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2"
  },
  {
    question: "which movie did we book tickets for and didnt see?",
    options: ["the housemaid", "vilaayath buddha", "conjuring 4", "eko"],
    correctAnswer: "conjuring 4"
  },
  {
    question: "the was the worst fast food place we went to?",
    options: ["AFC", "KFC", "Chicking", "Popeyes"],
    correctAnswer: "AFC"
  },
  {
    question: "the drink made you sick?",
    options: ["Mac Dowells", "Royal Stag", "Officer's Choice", "Old monk"],
    correctAnswer: "Officer's Choice"
  },
  {
    question: "the mocktail we made,what all was in it?",
    options: ["apple juice,orange juice,green apple", "apple juice,grape juice,lemon", "apple juice,orange juice,lemon ", "grape juice,lemon juice,green apple"],
    correctAnswer: "apple juice,orange juice,lemon"
  }
];

(async () => {
  try {
    await QuizQuestion.deleteMany();
    await QuizQuestion.insertMany(questions);
    console.log("Quiz questions seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
