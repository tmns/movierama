import { getResults } from "./models/Search";
import { getNowPlaying } from "./models/NowPlaying";
import { getDetails } from "./models/Details";
import * as resultsView from "./views/resultsView";
import * as detailsView from "./views/detailsView";
import { elements, renderSpinner, clearSpinner } from "./views/base";

/** Global state of the App
 * - @showingNowPlaying - if the list of results is showing movies now playing in theaters or search results
 * - @page - the value of the last page that was requested in the API call for results
 * - @resultsCache - a cache of now playing and search results to be checked before making a potentially unnecessary API call
 */
const state = {
  showingNowPlaying: true,
  page: 1,
  resultsCache: {}
};

/**
 * Sets the header of the app based on value of showNowPlaying
 */
const setHeader = () => {
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
const controlNowPlaying = async () => {
  state.showingNowPlaying = true;
  setHeader();

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

// IIFE to initialize page
(function init() {
  setHeader();
  controlNowPlaying();
})();

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
const controlSearch = async () => {
  const query = resultsView.getInput();
  state.page = 1; // any time a new search is made, we want the 1st page

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
        // We must also clearResults here, as there is a chance the results list has been populated again
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
 * 1) If there's a query -
 *    a) check cache for query
 *    b) render results if found
 *    c) else, attempt a new search API call and render results
 * 2) Else, user is browsing now playing
 *    a) check cache for next now playing page
 *    b) render results if found
 *    c) else, attempt a new now playing API call and render results
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

// ---------- Event listeners

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
