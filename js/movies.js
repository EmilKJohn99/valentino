const API_BASE = "http://localhost:5000/api/movies";
const SEEN_API = "http://localhost:5000/api/movies/seen";
const IMG = "https://image.tmdb.org/t/p/w500";

const typeSelect = document.getElementById("typeSelect");
const genreSelect = document.getElementById("genreSelect");
const pickBtn = document.getElementById("pickBtn");
const movieCard = document.getElementById("movieCard");

let currentItem = null;

pickBtn.addEventListener("click", async () => {
  const genreId = genreSelect.value;
  const type = typeSelect.value;

  if (!genreId || !type) {
    alert("Choose both content type and genre 💖");
    return;
  }

  const res = await fetch(
    `${API_BASE}?genreId=${genreId}&type=${type}`
  );
  const data = await res.json();

  if (!data) {
    movieCard.classList.remove("hidden");
    movieCard.innerHTML = `<p>No unseen picks left 😢</p>`;
    return;
  }

  currentItem = data;
  showCard(data, type);
});

function showCard(item, type) {
  movieCard.classList.remove("hidden");

  movieCard.innerHTML = `
    <img src="${IMG + item.poster_path}" />
    <h2>${item.title || item.name}</h2>
    <p>${item.overview}</p>

    <button class="seen-btn" onclick="markSeen()">
      Mark as Seen ✅
    </button>
  `;
}

async function markSeen() {
  if (!currentItem) return;

  await fetch(SEEN_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
  itemId: currentItem.id,
  title: currentItem.title || currentItem.name,
  genre: genreSelect.value,
  type: typeSelect.value
})
  });

  movieCard.innerHTML = `
    <h3>💖 Noted.</h3>
    <p>Ready for the next pick?</p>
  `;
}
