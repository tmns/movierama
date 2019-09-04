import {
  posterUrl,
  noPosterPath,
  videoSvg,
  pencilSvg,
  filmSvg
} from "../config";
import { clearSpinner } from "./base";

/**
 * Renders movie videos
 * @parent - DOM element used to determine where to insert into
 * @video - Object containing video data
 * 1) Determine url for video
 * 2) Create markup
 * 3) Insert into DOM
 */
const renderVideo = (parent, video) => {
  let baseUrl = "";
  if (video.site === "YouTube") {
    baseUrl = "https://www.youtube.com/embed";
  }
  const markup = `
    <iframe src="${baseUrl}/${video.key}"></iframe>
  `;
  const resDetailsVids = parent.querySelector(".result__detailsVids");
  resDetailsVids.insertAdjacentHTML("beforeend", markup);
};

/**
 * Renders movie reviews
 * @parent - DOM element used to determine where to insert into
 * @review - Object containing review data
 * 1) Create markup
 * 2) Insert into DOM
 */
const renderReview = (parent, review) => {
  const markup = `
    <div class="review">
      <p><strong>User:</strong> ${review.author}</p>
      <p><strong>Review:</strong> ${review.content}</p>    
    </div>
  `;
  const resDetailsReviews = parent.querySelector(".result__detailsReviews");
  resDetailsReviews.insertAdjacentHTML("beforeend", markup);
};

/**
 * Renders similar movies
 * @parent - DOM element used to determine where to insert into
 * @similar - Object containing similar movie data
 * 1) Determine src url for movie poster image
 * 2) Create markup
 * 3) Insert into DOM
 */
const renderSimilar = (parent, similar) => {
  const posterSrc = similar.poster_path
    ? posterUrl + similar.poster_path
    : noPosterPath;

  const markup = `
    <div class="similar">
      <img src=${posterSrc} alt="Movie poster for ${similar.title}"/>
      <div class="similar__info">
        <p><strong>Title: </strong>${similar.title}</p>
        <p><strong>Release: </strong>${similar.release_date.slice(0, 4)}</p>
        <p><strong>Rating: </strong>${similar.vote_average}</p>
      </div>
    </div>
  `;
  const resDetailsSimilar = parent.querySelector(".result__detailsSimilar");
  resDetailsSimilar.insertAdjacentHTML("beforeend", markup);
};

/**
 * Main render details function that sets up divs and calls helpers
 * @parent - DOM parent element to insert markup into
 * @details - Object containing details to render
 * 1) Create divs for each detail category and insert into DOM
 * 2) For each detail category
 *    a) If corresponding data exists in details object, call helper
 *    b) Else, render a does not exist message
 */
export const renderDetails = (parent, details) => {
  const markup = `
    <h3>${videoSvg} Videos</h3>
    <div class="result__detailsVids"></div>
    <h3>${pencilSvg} Reviews</h3>
    <div class="result__detailsReviews"></div>
    <h3>${filmSvg} Similar Movies</h3>
    <div class="result__detailsSimilar"></div>
  `;

  clearSpinner(parent);
  parent.insertAdjacentHTML("afterbegin", markup);

  if (details.videos.length != 0) {
    details.videos.forEach(video => renderVideo(parent, video));
  } else {
    const resDetailsVids = parent.querySelector(".result__detailsVids");
    resDetailsVids.innerHTML = "<p>No videos for this movie.</p>";
  }

  if (details.reviews.length != 0) {
    details.reviews.forEach(review => renderReview(parent, review));
  } else {
    const resDetailsReviews = parent.querySelector(
      ".result__detailsReviews"
    );
    resDetailsReviews.innerHTML = "<p>No reviews for this movie.</p>";
  }

  if (details.similar.length != 0) {
    details.similar.forEach(similar => renderSimilar(parent, similar));
  } else {
    const resDetailsSimilar = parent.querySelector(
      ".result__detailsSimilar"
    );
    resDetailsSimilar.innerHTML = "<p>No similar movies for this movie.</p>";
  }
};

/**
 * Initializes DOM with a details div we can insert our movie details into
 * @parent - DOM parent element we will insert into
 */
export const initDetailsDiv = parent => {
  const markup = `
    <div class="result__details"></div>
  `;
  parent.insertAdjacentHTML("beforeend", markup);
}

export const clearDetails = parent => {
  const detailsDiv = parent.querySelector(".result__details");    detailsDiv.innerHTML = "";

};
