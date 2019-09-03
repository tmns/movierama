import { elements } from "./base";
import { key, baseUrl, posterUrl, genresPath, noPosterPath } from "../config";

let genres = [];

(async function initGenres() {
  const result = await fetch(`${baseUrl}/${genresPath}?api_key=${key}`);
  const data = await result.json();
  genres = data.genres;
})();

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.resList.innerHTML = "";
};

const renderMovie = async movie => {
  const posterSrc = movie.poster_path ? posterUrl + movie.poster_path : noPosterPath;
  const genresFiltered = genres.filter(genre =>
    movie.genre_ids.includes(genre.id)
  );
  const genreNames = genresFiltered.map(genre => genre.name);
  const markup = `
    <li key=${movie.id}>
      <div class="result">
        <img src=${posterSrc} />
        <div class="result__info">
          <h2>${movie.title}</h2>
          <p><strong>Release Year: </strong>${movie.release_date.slice(
            0,
            4
          )}</p>
          <p><strong>${
            genreNames.length > 1 ? "Genres" : "Genre"
          }: </strong>${genreNames.join(", ")}</p>
          <p><strong>Average Rating: </strong>${movie.vote_average}</p>
          <p><strong>Overview: </strong>${movie.overview}</p>
          <div class="result__showMore" data-movie-id=${movie.id}>
            <i class="fas fa-angle-double-down"></i>
          </div>
        </div>
      </div>
    </li>
  `;
  elements.resList.insertAdjacentHTML("beforeEnd", markup);
};

export const renderResults = movies => {
  movies.forEach(renderMovie);
};
