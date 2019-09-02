import { getResults } from './models/Search';
import { getNowPlaying } from './models/NowPlaying';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the App
 * - Search
 * - Current movie object
 */
const state = {
   showingNowPlaying: true,
};

/**
 * Now Playing Controller
 */
const controlNowPlaying = async () => {
  state.showingNowPlaying = true;

  searchView.clearInput();
  searchView.clearResults();

  renderLoader(elements.searchRes);

  try {
    const results = await getNowPlaying(1);
    clearLoader();
    searchView.renderResults(results);
  } catch(err) {
    console.log(err);
    clearLoader();
  }
}

(function initState() {
  controlNowPlaying();
})();

 /**
  * Search controller
  */
const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    state.showingNowPlaying = false;
    state.search = query;
    
    searchView.clearResults();
    renderLoader(elements.searchRes);
    try {
      const results = await getResults(query, 1);
      console.log(results)
      clearLoader();
      searchView.renderResults(results)
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

