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

  renderSpinner(elements.resContainer);

  try {
    const results = await getNowPlaying(state.page);
    clearSpinner();
    state.resultsCache["nowPlaying"] = results;
    resultsView.renderResults(results);
    addClickListeners();
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
  console.log(query)
  state.page = 1;

  if (query) {
    state.showingNowPlaying = false;
    setHeader();

    resultsView.clearResults();
    renderSpinner(elements.resContainer);

    if (state.resultsCache[query]) {
      clearSpinner();
      resultsView.renderResults(state.resultsCache[query]);
      addClickListeners();
    } else {
      try {
        const results = await getResults(query, state.page);
        state.resultsCache[query] = results;
        clearSpinner();
        resultsView.clearResults();
        resultsView.renderResults(results);
        addClickListeners();
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
    addClickListeners();
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
      addClickListeners();
    } else {
      try {
        const results = await getResults(query, state.page);
        state.resultsCache[`${query}${state.page}`] = results;
        resultsView.renderResults(results);
        addClickListeners();
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    if (state.resultsCache[`nowPlaying${state.page}`]) {
      resultsView.renderResults(state.resultsCache[`nowPlaying${state.page}`]);
      addClickListeners();
    } else {
      try {
        const results = await getNowPlaying(state.page);
        state.resultsCache[`nowPlaying${state.page}`] = results;
        resultsView.renderResults(results);
        addClickListeners();
      } catch (err) {
        console.log(err);
      }
    }
  }
};

const controlDetails = async (el, movieId) => {
  try {
    const details = await getDetails(movieId);
    console.log(details)
    detailsView.renderDetails(el.parentElement, details);
  } catch(err) {
    console.log(err);
  }
}

const addClickListeners = () => {
  const resultsArr = [...document.querySelectorAll(".result__showMore")];
  resultsArr.forEach(el => {
    el.addEventListener("click", e => {
      const resultDiv = el.parentElement.parentElement;
      resultDiv.classList.toggle("result--active");
      if (el.classList.contains("result__showMore--active")) {
        el.classList.remove("result__showMore--active");
        detailsView.clearDetails(el.parentElement);
      } else {
        el.classList.add("result__showMore--active");
        const movieId = el.getAttribute("data-movie-id");
        controlDetails(el, movieId);  
      }
    });
  });
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
