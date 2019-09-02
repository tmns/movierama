import { getResults } from './models/Search';
import { getNowPlaying } from './models/NowPlaying';
import * as resultsView from './views/resultsView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the App
 * - Search
 * - Current movie object
 */
const state = {
   showingNowPlaying: true,
};

/**
 * Set header
 */
const setHeader = () => {
  const header = document.querySelector('h1');
  header.innerText = state.showingNowPlaying ? 'Now Playing' : 'Search Results';
}

/**
 * Now Playing Controller
 */
const controlNowPlaying = async () => {
  state.showingNowPlaying = true;
  setHeader();

  resultsView.clearInput();
  resultsView.clearResults();

  renderLoader(elements.searchRes);

  try {
    const results = await getNowPlaying(1);
    clearLoader();
    resultsView.renderResults(results);
  } catch(err) {
    console.log(err);
    clearLoader();
  }
}

(function initState() {
  setHeader();
  controlNowPlaying();
})();

 /**
  * Search controller
  */
const controlSearch = async () => {
  const query = resultsView.getInput();

  if (query) {
    state.showingNowPlaying = false;
    setHeader();
    state.search = query;
    
    resultsView.clearResults();
    renderLoader(elements.searchRes);
    try {
      const results = await getResults(query, 1);
      console.log(results)
      clearLoader();
      resultsView.renderResults(results)
    } catch (err) {
      console.log(err);
      clearLoader();
    }
  }
}

elements.searchInput.addEventListener('input', e => {
  e.preventDefault();
  controlSearch();
})
