import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResList.innerHTML = "";
};

export const highlightSelected = id => {
  const resultsArr = Array.from(document.querySelectorAll(".results__link"));
  resultsArr.forEach(el => {
    el.classList.remove("results__link--active");
  });
  document
    .querySelector(`.results__link[href*="${id}"]`)
    .classList.add("results__link--active");
};

const renderMovie = movie => {
  const markup = `
    <li>
      <div class="result">${movie}</div>
    </li>
  `;
  elements.searchResList.insertAdjacentHTML('beforeEnd', markup);
};

export const renderResults = movies => {
  movies.forEach(renderMovie);
}
