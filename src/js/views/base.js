export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchRes: document.querySelector(".results"),
  searchResList: document.querySelector(".results__list")
};

export const elementStrings = {
  spinner: "spinner"
};

export const renderSpinner = parent => {
  const spinner = `
  <div class="${elementStrings.spinner}">
    <span></span>
  </div>
  `;
  if (!document.querySelector(".spinner")) {
    parent.insertAdjacentHTML("afterbegin", spinner);
  }
};

export const clearSpinner = () => {
  const spinner = document.querySelector(`.${elementStrings.spinner}`);

  if (spinner) {
    spinner.parentElement.removeChild(spinner);
  }
};
