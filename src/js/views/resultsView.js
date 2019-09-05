import { elements } from "./base";
import {
  key,
  baseUrl,
  posterUrl,
  genresPath,
  noPosterPath,
  doubleArrowSvg,
  heartSvg,
  heartFilledSvg
} from "../config";
import { controlDetails, controlLikes } from "../index";
import * as detailsView from "./detailsView";
import { lazyLoad } from "../utils";

// Set up genres global and use IIFE to initialize it
let genres = [];
(async function initGenres() {
  const result = await fetch(`${baseUrl}/${genresPath}?api_key=${key}`);
  const data = await result.json();
  genres = data.genres;
})();

export const getInput = () => elements.searchInput.value;

export const clearResults = () => {
  elements.resList.innerHTML = "";
};

/**
 * Renders a single movie result
 * @movie - Object holding movie data
 * 1) Determine poster url src and genres
 * 2) Create markup and insert it into DOM
 * 3) Add lazy loading to image
 * 4) Add click and onpkeydown listeners to showMore button
 */
const renderMovie = async (likes, movie) => {
  const posterSrc = movie.poster_path
    ? posterUrl + movie.poster_path
    : noPosterPath;

  const genresFiltered = genres.filter(genre =>
    movie.genre_ids.includes(genre.id)
  );
  const genreNames = genresFiltered.map(genre => genre.name);

  const markup = `
    <li key=${movie.id}>
      <div class="result">
        <img class="lazy-loading" data-lazy=${posterSrc} alt="Movie poster for ${
    movie.title
  }" />
        <div class="result__info">
          <h2>${
            movie.title
          } <span class="result__like" tabindex="0" role="button" title="Save movie">${
    likes.isLiked(movie.id) ? heartFilledSvg : heartSvg
  }</span></h2>
          <p><strong>Release Year: </strong>${movie.release_date.slice(
            0,
            4
          )}</p>
          <p><strong>${
            genreNames.length > 1 ? "Genres" : "Genre"
          }: </strong>${genreNames.join(", ")}</p>
          <p><strong>Average Rating: </strong>${movie.vote_average}</p>
          <p><strong>Overview: </strong>${movie.overview}</p>
          <div class="result__showMore" data-movie-id=${movie.id} role="button" title="Show more details">
          ${doubleArrowSvg}
          </div>
        </div>
      </div>
    </li>
  `;
  elements.resList.insertAdjacentHTML("beforeEnd", markup);

  const resultDiv = elements.resList.lastElementChild.querySelector(".result");

  // lazy load image
  const image = resultDiv.querySelector(".lazy-loading");
  lazyLoad(image);

  // Add event listeners here, due to bug in handling them in index

  // Add click handler for show more details button
  const showDetailsButton = resultDiv.querySelector(".result__showMore");

  showDetailsButton.addEventListener("click", e => {
    if (showDetailsButton.classList.contains("result__showMore--active")) {
      resultDiv.classList.remove("result--active");
      showDetailsButton.classList.remove("result__showMore--active");
      detailsView.clearDetails(showDetailsButton.parentElement);
    } else {
      resultDiv.classList.add("result--active");
      showDetailsButton.classList.add("result__showMore--active");
      const movieId = showDetailsButton.getAttribute("data-movie-id");
      // We delay the action here slightly so that JS doesn't kill the css animation
      setTimeout(() => {
        controlDetails(showDetailsButton, movieId);
      }, 300);
    }
  });

  // Add keydown listener for show more details button for accessibility
  showDetailsButton.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      if (showDetailsButton.classList.contains("result__showMore--active")) {
        resultDiv.classList.remove("result--active");
        showDetailsButton.classList.remove("result__showMore--active");
        detailsView.clearDetails(showDetailsButton.parentElement);
      } else {
        resultDiv.classList.add("result--active");
        showDetailsButton.classList.add("result__showMore--active");
        const movieId = showDetailsButton.getAttribute("data-movie-id");
        setTimeout(() => {
          controlDetails(showDetailsButton, movieId);
        }, 300);
      }
    }
  });

  // Add event listeners here, due to bug in handling them in index
  resultDiv.querySelector(".result__like").addEventListener("click", () => {
    controlLikes({
      parent: resultDiv,
      id: movie.id,
      img: posterSrc,
      title: movie.title,
      overview: movie.overview
    });
  });

  resultDiv.querySelector(".result__like").addEventListener("keydown", e => {
    if (e.key === "Enter") {
      controlLikes({
        parent: resultDiv,
        id: movie.id,
        img: posterSrc,
        title: movie.title,
        overview: movie.overview
      });
    }
  });
};

export const renderNoResultsMsg = () => {
  elements.resList.innerHTML =
    '<p class="results__noResult">No results found.</p>';
};

export const renderResults = (likes, movies) => {
  if (movies.length != 0) {
    movies.forEach(movie => renderMovie(likes, movie));
  } else {
    renderNoResultsMsg();
  }
};
