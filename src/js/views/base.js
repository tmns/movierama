export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  resContainer: document.querySelector(".results"),
  resList: document.querySelector(".results__list"),
  likesModalBtn: document.querySelector(".likes__modalBtn"),
  likesModal: document.querySelector(".likes__modal"),
  likesList: document.querySelector(".likes__list")
};

export const elementStrings = {
  spinner: "spinner"
};

export const renderSpinner = (parent, extraClass = '') => {
  const spinner = `
  <div class="${elementStrings.spinner} ${extraClass}">
    <span></span>
  </div>
  `;
  if (!parent.querySelector(".spinner")) {
    parent.insertAdjacentHTML("afterbegin", spinner);
  }
};

export const clearSpinner = () => {
  const spinner = document.querySelector(`.${elementStrings.spinner}`);

  if (spinner) {
    spinner.parentElement.removeChild(spinner);
  }
};
