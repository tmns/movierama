import { getResults } from './models/Search';
import { getNowPlaying } from './models/NowPlaying';
import * as resultsView from './views/resultsView';
import { elements, renderSpinner, clearSpinner } from './views/base';

/** Global state of the App
 * - Search
 * - Current movie object
 */
const state = {
   showingNowPlaying: true,
   nowPlaying: []
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

  renderSpinner(elements.searchRes);

  try {
    const results = await getNowPlaying(1);
    clearSpinner();
    state.nowPlaying = results;
    resultsView.renderResults(results);
  } catch(err) {
    console.log(err);
    clearSpinner();
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
    
    resultsView.clearResults();
    renderSpinner(elements.searchRes);
    try {
      const results = await getResults(query, 1);
      clearSpinner();
      resultsView.renderResults(results)
    } catch (err) {
      console.log(err);
      clearSpinner();
    }
  } else {
    state.showingNowPlaying = true;
    setHeader();
    resultsView.clearResults();
    resultsView.renderResults(state.nowPlaying);
  }
}

elements.searchInput.addEventListener('input', e => {
  e.preventDefault();
  controlSearch();
})

