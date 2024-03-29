export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  resContainer: document.querySelector(".results"),
  resList: document.querySelector(".results__list"),
  likesModalBtn: document.querySelector(".likes__modalBtn"),
  likesModal: document.querySelector(".likes__modal"),
  overlay: document.querySelector(".overlay"),
  likesModalCloseBtn: document.querySelector(".likes__modalCloseBtn"),
  likesList: document.querySelector(".likes__list")
};

export const renderSpinner = (parent, extraClass = '') => {
  const spinner = `
    <div class="spinner ${extraClass}">
      <span></span>
    </div>
  `;
  if (!parent.querySelector(".spinner")) {
    parent.insertAdjacentHTML("afterbegin", spinner);
  }
};

export const clearSpinner = () => {
  const spinner = document.querySelector(".spinner");

  if (spinner) {
    spinner.parentElement.removeChild(spinner);
  }
};
