import { getResults } from "./models/Search";
import { getNowPlaying } from "./models/NowPlaying";
import { getDetails } from "./models/Details";
import * as resultsView from "./views/resultsView";
import * as detailsView from "./views/detailsView";
import { elements, renderSpinner, clearSpinner } from "./views/base";

/** Global state of the App
 * - Search
 * - Current movie object
 */
const state = {
  showingNowPlaying: true,
  page: 1,
  resultsCache: {}
};

/**
 * Set header
 */
const setHeader = () => {
  const header = document.querySelector("h1");
  header.innerText = state.showingNowPlaying ? "Now Playing" : "Search Results";
};

/**
 * Now Playing Controller
 */
const controlNowPlaying = async () => {
  state.showingNowPlaying = true;
  setHeader();

  resultsView.clearInput();
  resultsView.clearResults();

  renderSpinner(elements.resContainer, "spinner__results");

  try {
    const results = await getNowPlaying(state.page);
    clearSpinner();
    state.resultsCache["nowPlaying"] = results;
    resultsView.renderResults(results);
  } catch (err) {
    console.log(err);
    clearSpinner();
  }
};

(function init() {
  setHeader();
  controlNowPlaying();
})();

/**
 * Search controller
 */
const controlSearch = async () => {
  const query = resultsView.getInput();
  state.page = 1;

  if (query) {
    state.showingNowPlaying = false;
    setHeader();

    resultsView.clearResults();
    renderSpinner(elements.resContainer, "spinner__results");

    if (state.resultsCache[query]) {
      clearSpinner();
      resultsView.renderResults(state.resultsCache[query]);
    } else {
      try {
        const results = await getResults(query, state.page);
        state.resultsCache[query] = results;
        clearSpinner();
        resultsView.clearResults();
        resultsView.renderResults(results);
      } catch (err) {
        console.log(err);
        clearSpinner();
      }
    }
  } else {
    state.showingNowPlaying = true;
    setHeader();
    resultsView.clearResults();
    resultsView.renderResults(state.resultsCache.nowPlaying);
  }
};

/**
 * Pagination / Infinite scroll controller
 */
const controlPagination = async () => {
  const query = resultsView.getInput();

  if (query) {
    if (state.resultsCache[`${query}${state.page}`]) {
      resultsView.renderResults(state.resultsCache[`${query}${state.page}`]);
    } else {
      try {
        const results = await getResults(query, state.page);
        state.resultsCache[`${query}${state.page}`] = results;
        resultsView.renderResults(results);
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    if (state.resultsCache[`nowPlaying${state.page}`]) {
      resultsView.renderResults(state.resultsCache[`nowPlaying${state.page}`]);
    } else {
      try {
        const results = await getNowPlaying(state.page);
        state.resultsCache[`nowPlaying${state.page}`] = results;
        resultsView.renderResults(results);
      } catch (err) {
        console.log(err);
      }
    }
  }
};

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

elements.searchInput.addEventListener("input", e => {
  controlSearch();
});

elements.resList.addEventListener("scroll", e => {
  if (
    elements.resList.offsetHeight + elements.resList.scrollTop ==
      elements.resList.scrollHeight &&
    elements.resList.innerHTML
  ) {
    state.page = state.page + 1;
    controlPagination();
  }
});
