import { getResults } from "./models/Search";
import { getNowPlaying } from "./models/NowPlaying";
import { getDetails } from "./models/Details";
import * as resultsView from "./views/resultsView";
import * as detailsView from "./views/detailsView";
import { elements, renderSpinner, clearSpinner } from "./views/base";

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
  state.query = "rembetiko";
  await controlSearch();

  
})();
