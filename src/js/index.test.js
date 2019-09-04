import { state, controlNowPlaying, controlSearch } from "./index.js";

// Test controlNowPlaying - in turn tests getNowPlaying and renderResults
(async function testControlNowPlaying() {
  await controlNowPlaying();

  // test controlNowPlaying sets correct header
  const headerText = document.querySelector("h1").innerText;
  if (headerText !== "Now Playing") {
    console.log(
      `Suite testControlNowPlaying() test of setting correct header failed. Expected 'Now Playing', received ${headerText}`
    );
  }

  // test controlNowPlaying add result item to DOM
  const resultDiv = document.querySelector(".result");
  if (!resultDiv) {
    console.log(
      `Suite testControlNowPlaying() test of setting a result div failed. Expected a valid DOM element, received ${resultDiv}`
    );
  }

  // test controlNowPlaying initializes state correctly
  if (
    state.showingNowPlaying !== true ||
    !state.resultsCache.hasOwnProperty("nowPlaying")
  ) {
    console.log(
      `Suite testControlNowPlaying() test of setting correct state failed. Expected state.showNowPlaying to be true and state.resultsCache.nowPlaying to be non-empty. Received state: ${state.showingNowPlaying} and state.resultsCache: ${state.resultsCache}`
    );
  }
})();

// Test controlSearch - in turn tests getResults and renderResults
(async function testControlSearch() {
  state.query = "Rembetiko";
  await controlSearch();

  // test controlSearch renders result div
  const resultDiv = document.querySelector(".result");
  if (!resultDiv) {
    console.log(
      `Suite controlSearch() test of setting a result div failed. Expected a valid DOM element, received ${resultDiv}`
    );
  }

  // test controlSearch renders a result__info div
  const resultInfoDiv = document.querySelector(".result__info");
  if (!resultInfoDiv) {
    console.log(
      `Suite controlSearch() test of setting a result__info div failed. Expected a valid DOM element, received ${resultInfoDiv}`
    );
  }

  // test controlSearch searches correct movie
  const movieTitle = resultInfoDiv.querySelector("h2").innerText;
  if (movieTitle !== state.query) {
    console.log(
      `Suite controlSearch() test of searching correct movie failed. Expected query string ${state.query}, received ${movieTitle}`
    );
  }

  // teset controlSearch caches results correctly
  if (!state.resultsCache.hasOwnProperty(state.query)) {
    console.log(
      `Suite controlSearch() test of setting cache correctly failed. Expected state.resultsCache.${state.query} to exist, received state.resultsCache ${state.resultsCache}`
    );
  }
})();

