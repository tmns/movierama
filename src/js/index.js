import { getResults } from "./models/Search";
import { getNowPlaying } from "./models/NowPlaying";
import { getDetails } from "./models/Details";
import * as resultsView from "./views/resultsView";
import * as detailsView from "./views/detailsView";
import * as likesView from "./views/likesView";
import { elements, renderSpinner, clearSpinner } from "./views/baseElements";
import { Likes } from "./models/Likes";

/** Global state of the App
 * @showingNowPlaying - if the list of results is showing movies now playing in theaters or search results
 * @query - the query used for search API calls - tied to the search input field
 * @page - the value of the last page that was requested in the API call for results
 * @resultsCache - a cache of now playing and search results to be checked before making a potentially unnecessary API call
 * @likes - a Likes object movdel containing the collection of movies a user has 'liked' and associated functions
 */
export const state = {
  showingNowPlaying: true,
  query: "",
  page: 1,
  resultsCache: {},
  likes: Likes()
};

/**
 * Sets the header of the app based on value of showNowPlaying
 */
export const setHeader = () => {
  const header = document.querySelector("h1");
  header.innerText = state.showingNowPlaying ? "Now Playing" : "Search Results";
};

/**
 * Now Playing Controller
 * 1) set showingNowPlaying to true and update header
 * 2) clear results list and render spinner
 * 3) attempt API now playing call and render
 * 4) store results in cache
 */
export const controlNowPlaying = async () => {
  state.showingNowPlaying = true;
  setHeader();

  resultsView.clearResults();
  renderSpinner(elements.resContainer, "spinner__results");

  try {
    const results = await getNowPlaying(state.page);
    clearSpinner();
    state.resultsCache["nowPlaying"] = results;
    resultsView.renderResults(state.likes, results);
  } catch (err) {
    console.log(err);
    clearSpinner();
    resultsView.renderNoResultsMsg();
  }
};

/**
 * Search controller
 * 1) If query,
 *    a) set showingNowPlaying to false and update header
 *    b) clear previous results and render spinner
 *    c) check cache for query & render results if found
 *    d) else, attempt new API search call and render results
 * 2) Else, search field is empty so we should render now playing again
 *    a) set showingNowPlaying to true and update header
 *    b) retrieve now playing from cache and render
 */
export const controlSearch = async () => {
  state.page = 1; // any time a new search is made, we want the 1st page

  if (state.query) {
    state.showingNowPlaying = false;
    setHeader();

    resultsView.clearResults();
    renderSpinner(elements.resContainer, "spinner__results");

    if (state.resultsCache[state.query]) {
      clearSpinner();
      resultsView.renderResults(state.likes, state.resultsCache[state.query]);
    } else {
      try {
        const results = await getResults(state.query, state.page);
        state.resultsCache[state.query] = results;

        clearSpinner();
        // We must also clearResults here, as there is a chance the results list has been populated again
        resultsView.clearResults();
        resultsView.renderResults(state.likes, results);
      } catch (err) {
        console.log(err);
        clearSpinner();
        resultsView.renderNoResultsMsg();
      }
    }
  } else {
    state.showingNowPlaying = true;
    setHeader();
    resultsView.clearResults();
    resultsView.renderResults(state.likes, state.resultsCache.nowPlaying);
  }
};

/**
 * Pagination / Infinite scroll controller
 * 1) If there's a query -
 *    a) check cache for query
 *    b) render results if found
 *    c) else, attempt a new search API call and render results
 * 2) Else, user is browsing now playing
 *    a) check cache for next now playing page
 *    b) render results if found
 *    c) else, attempt a new now playing API call and render results
 */
export const controlPagination = async () => {
  if (state.query) {
    if (state.resultsCache[`${state.query}${state.page}`]) {
      resultsView.renderResults(
        state.likes,
        state.resultsCache[`${state.query}${state.page}`]
      );
    } else {
      try {
        const results = await getResults(state.query, state.page);
        state.resultsCache[`${state.query}${state.page}`] = results;
        if (results.length != 0) {
          resultsView.renderResults(state.likes, results);
        }
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    if (state.resultsCache[`nowPlaying${state.page}`]) {
      resultsView.renderResults(
        state.likes,
        state.resultsCache[`nowPlaying${state.page}`]
      );
    } else {
      try {
        const results = await getNowPlaying(state.page);
        state.resultsCache[`nowPlaying${state.page}`] = results;
        if (results.length != 0) {
          resultsView.renderResults(state.likes, results);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};

/**
 * Details controller (called from detailsView.js)
 * @el - The current DOM element
 * @movieId - The movie id for the API call
 * 1) Insert details div into the DOM
 * 2) Render spinner within the div
 * 3) Attempt to render details
 */
export const controlDetails = async (el, movieId) => {
  const resInfoDiv = el.parentElement;
  detailsView.initDetailsDiv(resInfoDiv);

  const detailsDiv = resInfoDiv.querySelector(".result__details");
  renderSpinner(detailsDiv, "spinner__details");

  try {
    const details = await getDetails(movieId);
    detailsView.renderDetails(detailsDiv, details);
  } catch (err) {
    console.log(err);
    clearSpinner(detailsDiv);
  }
};

/**
 * Likes controller (called from resultsView.js)
 * @parent - DOM element that we will render like button in
 * @id - String of movie id
 * @img - String of movie poster src url
 * @title - String of movie title
 * @overview - String of movie overview
 * 1) If state doesn't contain likes object, create it
 * 2) If movie is not already liked
 *    a) Create like object for movie and add it to state
 *    b) 'Fill' like heart icon
 *    c) Render like
 * 3) Else,
 *    a) Remove like object from state
 *    b) 'Unfill' like herat icon
 *    c) Remove like from DOM
 * 4) Hide like modal btn if no likes in state
 */
export const controlLikes = ({ parent, id, img, title, overview }) => {
  if (!state.likes) {
    state.likes = Likes();
  }

  if (!state.likes.isLiked(id)) {
    const newLike = state.likes.addLike({ id, img, title, overview });
    likesView.toggleLikeBtn(parent, false);
    likesView.renderLike(newLike);
  } else {
    state.likes.deleteLike(id);
    likesView.toggleLikeBtn(parent, true);
    likesView.deleteLike(id);
  }
  likesView.toggleLikesModalBtn(state.likes.getNumLikes());
};

// ---------- Event listeners

elements.searchInput.addEventListener("input", e => {
  state.query = resultsView.getInput();
  controlSearch();
});

elements.resList.addEventListener("scroll", () => {
  if (
    elements.resList.offsetHeight + elements.resList.scrollTop ==
      elements.resList.scrollHeight &&
    elements.resList.innerHTML
  ) {
    state.page = state.page + 1;
    state.query = resultsView.getInput();
    controlPagination();
  }
});

window.addEventListener("load", async () => {
  // read in any likes stored in local storage
  state.likes.readStorage();

  // initialize now playing list
  try {
    await controlNowPlaying();
  } catch (err) {
    console.log(err);
    resultsView.renderNoResultsMsg();
  }

  // if likes exist, render modal button and likes
  likesView.toggleLikesModalBtn(state.likes.getNumLikes());
  state.likes.renderLikes();
});

elements.likesModalBtn.addEventListener("click", () => {
  likesView.toggleLikesModal();
});

elements.likesModalBtn.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    likesView.toggleLikesModal();
  }
});

elements.likesModalCloseBtn.addEventListener("click", () => {
  likesView.toggleLikesModal();
});

elements.overlay.addEventListener("click", () => {
  likesView.toggleLikesModal();
});


