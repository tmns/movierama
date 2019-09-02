import { elements } from "./base";
import { key, baseUrl, posterUrl, genresPath } from '../config';

export const getInput = () => elements.searchInput.value;

let genres = [];

(async function initGenres() {
  const result = await fetch(`${baseUrl}/${genresPath}?api_key=${key}`);
  const data = await result.json();
  genres = data.genres;
})();

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResList.innerHTML = "";
};

export const highlightSelected = id => {
  const resultsArr = Array.from(document.querySelectorAll(".results__link"));
  resultsArr.forEach(el => {
    el.classList.remove("results__link--active");
  });
  document
    .querySelector(`.results__link[href*="${id}"]`)
    .classList.add("results__link--active");
};

const renderMovie = async movie => {
  const posterSrc = posterUrl + movie.poster_path; 
  const genresFiltered = genres.filter(genre => movie.genre_ids.includes(genre.id));
  const genreNames = genresFiltered.map(genre => genre.name);
  const markup = `
    <li>
      <div class="result">
        <img src=${posterSrc} />
        <div class="result-info"
          <h2>${movie.title}</h2>
          <p>${movie.release_date.slice(0,4)}</p>
          <p>${genreNames.join(', ')}</p>
          <p>${movie.vote_average}</p>
          <p>${movie.overview}</p>
        </div>
      </div>
    </li>
  `;
  elements.searchResList.insertAdjacentHTML('beforeEnd', markup);
};

export const renderResults = movies => {
  movies.forEach(renderMovie);
}
