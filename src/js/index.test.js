import {
  state,
  controlNowPlaying,
  controlSearch,
  controlPagination,
  controlDetails
} from "./index.js";

/**
 * Test suite for controlNowPlaying
 * In turn, also tests getNowPlaying and renderResults
 */
// (async function testControlNowPlaying() {
//   await controlNowPlaying();

//   // test controlNowPlaying sets correct header
//   const headerText = document.querySelector("h1").innerText;
//   if (headerText !== "Now Playing") {
//     console.log(
//       `Suite testControlNowPlaying() test of setting correct header failed. Expected 'Now Playing', received ${headerText}`
//     );
//   }

//   // test controlNowPlaying add result item to DOM
//   const resultDiv = document.querySelector(".result");
//   if (!resultDiv) {
//     console.log(
//       `Suite testControlNowPlaying() test of setting a result div failed. Expected a valid DOM element, received ${resultDiv}`
//     );
//   }

//   // test controlNowPlaying initializes state correctly
//   if (
//     state.showingNowPlaying !== true ||
//     !state.resultsCache.hasOwnProperty("nowPlaying")
//   ) {
//     console.log(
//       `Suite testControlNowPlaying() test of setting correct state failed. Expected state.showNowPlaying to be true and state.resultsCache.nowPlaying to be non-empty. Received state: ${state.showingNowPlaying} and state.resultsCache: ${state.resultsCache}`
//     );
//   }
// })();

/**
 * Test suite for controlSearch
 * In turn, also tests getResults and renderResults
 */
// (async function testControlSearch() {
//   state.query = "Rembetiko";
//   await controlSearch();

//   // test controlSearch renders result div
//   const resultDiv = document.querySelector(".result");
//   if (!resultDiv) {
//     console.log(
//       `Suite controlSearch() test of setting a result div failed. Expected a valid DOM element, received ${resultDiv}`
//     );
//   }

//   // test controlSearch renders a result__info div
//   const resultInfoDiv = document.querySelector(".result__info");
//   if (!resultInfoDiv) {
//     console.log(
//       `Suite controlSearch() test of setting a result__info div failed. Expected a valid DOM element, received ${resultInfoDiv}`
//     );
//   }

//   // test controlSearch searches correct movie
//   const movieTitle = resultInfoDiv.querySelector("h2").innerText;
//   if (movieTitle !== state.query) {
//     console.log(
//       `Suite controlSearch() test of searching correct movie failed. Expected query string ${state.query}, received ${movieTitle}`
//     );
//   }

//   // test controlSearch caches results correctly
//   if (!state.resultsCache.hasOwnProperty(state.query)) {
//     console.log(
//       `Suite controlSearch() test of setting cache correctly failed. Expected state.resultsCache.${state.query} to exist, received state.resultsCache ${state.resultsCache}`
//     );
//   }
// })();

/**
 * Test suite for controlPagination
 * In turn, also tests getResults, getNowPlaying, and renderResults
 */
// (async function testControlPagination() {
//   // test controlPagination renders 20 more now playing results (total should be 40)
//   state.page = 2;
//   await controlPagination();
//   let numResults = [...document.querySelectorAll("li")].length;
//   if (numResults != 40) {
//     console.log(
//       `Suite controlPagination() test of adding another 20 now playing results to results list failed. Expected a total of 40 results, received ${numResults}`
//     );
//   }

//   // test controlPagination caches now playing results correctly
//   if (!state.resultsCache.hasOwnProperty(`nowPlaying${state.page}`)) {
//     console.log(
//       `Suite controlPagination() test of caching now playing results correctly failed. Expected state.resultsCache.nowPlaying${state.page} to esist, received state.resultsCache ${state.resultsCache}`
//     );
//   }

//   // test controlPagination renders 20 more search query results (total should be 40)
//   // perform first search normally
//   state.page = 1;
//   state.query = "a";
//   await controlSearch();
//   // perform second search via pagination
//   state.page = 2;
//   await controlPagination();
//   numResults = [...document.querySelectorAll("li")].length;
//   if (numResults != 40) {
//     console.log(
//       `Suite controlPagination() test of adding another 20 search query results to results list failed. Expected a total of 40 results, received ${numResults}`
//     );
//   }

//   // test controlPagination caches search query results correctly
//   if (!state.resultsCache.hasOwnProperty(`${state.query}${state.page}`)) {
//     console.log(
//       `Suite controlPagination() test of caching now playing results correctly failed. Expected state.resultsCache.${state.query}${state.page} to esist, received state.resultsCache ${state.resultsCache}`
//     );
//   }
// })();

/**
 * Test suite for controlDetails
 * In turn, also tests getDetails and renderDetails
 */
(async function testControlDetails() {

})();