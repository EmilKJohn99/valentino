const QUESTIONS_URL = "http://localhost:5000/api/quiz/questions";
const SUBMIT_URL = "http://localhost:5000/api/quiz/submit";

const quizCard = document.getElementById("quizCard");
const nextBtn = document.getElementById("nextBtn");
const resultDiv = document.getElementById("result");
const progressBar = document.getElementById("progressBar");

let questions = [];
let currentIndex = 0;
let answers = {};
let selectedValue = null;
let submitted = false;

/* ---------- LOAD QUESTIONS ---------- */
async function loadQuestions() {
  const res = await fetch(QUESTIONS_URL);
  questions = await res.json();

  // Build heart progress bar
  progressBar.innerHTML = "";
  questions.forEach(() => {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.innerText = "💖";
    progressBar.appendChild(heart);
  });

  showQuestion();
}

/* ---------- SHOW QUESTION ---------- */
function showQuestion() {
  submitted = false;
  selectedValue = null;

  // Update hearts
  document.querySelectorAll(".heart").forEach((heart, index) => {
    heart.classList.toggle("filled", index < currentIndex);
  });

  const q = questions[currentIndex];

  quizCard.innerHTML = `
    <div class="q-count">Question ${currentIndex + 1} of ${questions.length}</div>
    <h2>${q.question}</h2>
    <div class="options">
      ${q.options
        .map(
          opt => `
        <label class="option">
          <input type="radio" name="answer" value="${opt}" />
          ${opt}
        </label>
      `
        )
        .join("")}
    </div>
  `;

  nextBtn.innerText = "Submit 💖";

  document.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", () => {
      if (submitted) return;

      document
        .querySelectorAll(".option")
        .forEach(o => o.classList.remove("selected"));

      option.classList.add("selected");
      selectedValue = option.innerText.trim();
    });
  });
}

/* ---------- BUTTON HANDLER ---------- */
nextBtn.addEventListener("click", async () => {
  if (!selectedValue) {
    alert("Pick an option 💕");
    return;
  }

  const q = questions[currentIndex];

  // SUBMIT ANSWER
  if (!submitted) {
    submitted = true;
    answers[q._id] = selectedValue;

    const correct = q.correctAnswer.trim().toLowerCase();
    const chosen = selectedValue.trim().toLowerCase();

    document.querySelectorAll(".option").forEach(option => {
      const text = option.innerText.trim().toLowerCase();

      if (text === correct) {
        option.classList.add("correct");
      } 
      if (text === chosen && text !== correct) {
        option.classList.add("wrong");
      }
    });

    nextBtn.innerText =
      currentIndex === questions.length - 1
        ? "Finish Quiz 🎁"
        : "Next 💕";

    return;
  }

  // NEXT QUESTION / FINISH
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    showQuestion();
  } else {
    submitQuiz();
  }
});

/* ---------- FINAL SUBMIT ---------- */
async function submitQuiz() {
  nextBtn.style.display = "none";
  quizCard.innerHTML = "Calculating your surprise… 💞";

  const res = await fetch(SUBMIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers })
  });

  const data = await res.json();

  quizCard.classList.add("hidden");
  resultDiv.classList.remove("hidden");

  resultDiv.innerHTML = `
    <h2>🎉 Score: ${data.score}</h2>
    <h3>🎁 Gift: ${data.gift}</h3>
    <p>💖 You nailed it.</p>
  `;
}

/* ---------- INIT ---------- */
loadQuestions();
