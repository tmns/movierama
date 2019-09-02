import { getResults } from "./models/Search";
import { getNowPlaying } from "./models/NowPlaying";
import * as resultsView from "./views/resultsView";
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

  renderSpinner(elements.searchRes);

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

(function initState() {
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
    renderSpinner(elements.searchRes);

    if (state.resultsCache[query]) {
      clearSpinner();
      resultsView.renderResults(state.resultsCache[query]);
    } else {
      try {
        const results = await getResults(query, state.page);
        state.resultsCache[query] = results;
        clearSpinner();
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

elements.searchInput.addEventListener("input", e => {
  // elements.searchResList.scroll({ top: elements.searchResList.offsetTop + 20, left: 0, behavior: 'smooth'});
  e.preventDefault();
  controlSearch();
});

elements.searchResList.addEventListener("scroll", e => {
  if (
    elements.searchResList.offsetHeight + elements.searchResList.scrollTop ==
    elements.searchResList.scrollHeight &&
    elements.searchResList.innerHTML
  ) {
    state.page = state.page + 1;
    controlPagination();
  }
});
