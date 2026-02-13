const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const question = document.getElementById("question");

const messages = [
  "Are you sure? 🥺",
  "Think again 😏",
  "My heart can’t take this 💔",
  "Last chance 😌",
  "Okay but still… 💕"
];

let count = 0;

noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

noBtn.addEventListener("click", () => {
  question.innerText = messages[count % messages.length];
  count++;
});

yesBtn.addEventListener("click", () => {
  window.location.href = "home.html";
});
