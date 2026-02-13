const axios = require("axios");

const TMDB_BASE = "https://api.themoviedb.org/3";

const fetchByTypeAndGenre = async (type, genreId) => {
  let endpoint = "";
  let params = {
    api_key: process.env.TMDB_API_KEY,
    with_genres: genreId
  };

  if (type === "movie") {
    endpoint = `${TMDB_BASE}/discover/movie`;
  } 
  else if (type === "tv") {
    endpoint = `${TMDB_BASE}/discover/tv`;
  } 
  else if (type === "documentary") {
    // Documentaries are movies with genre 99
    endpoint = `${TMDB_BASE}/discover/movie`;
    params.with_genres = "99";
  } 
  else {
    throw new Error("Invalid content type");
  }

  const res = await axios.get(endpoint, { params });
  return res.data.results;
};

module.exports = { fetchByTypeAndGenre };
