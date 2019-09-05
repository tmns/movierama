import { elements } from "./baseElements";
import { heartSvg, heartFilledSvg } from "../config";
import { lazyLoad } from '../utils';

export const toggleLikeBtn = (parent, isLiked) => {
  const heartSpan = parent.querySelector(".result__like");
  heartSpan.innerHTML = isLiked ? heartSvg : heartFilledSvg;
};

export const toggleLikesModalBtn = numLikes => {
  elements.likesModalBtn.style.display = numLikes > 0 ? "block" : "none";
};

export const toggleLikesModal = () => {
  elements.likesModal.classList.toggle("likes__modal--active");
}

/**
 * Renders a single like item
 * @like - Object holding like data
 * 1) Create markup
 * 2) Insert it into DOM
 * 3) Add layy loading to image
 */
export const renderLike = like => {
  const markup = `
    <li class="likes__listItem" key=${like.id}>
      <div class="like__container">
        <img class="lazy-loading" data-lazy="${like.img}" alt="Movie poster for ${like.title}">
        <div class="like__details">
          <h4>${like.title}</h4>
          <p><strong>Overview: </strong>${like.overview}</p>
        </div>
      </div>
    </li>
  `;
  elements.likesList.insertAdjacentHTML("beforeend", markup);

  const image = elements.likesList.lastElementChild.querySelector(".lazy-loading");
  lazyLoad(image);
};

export const deleteLike = id => {
  const likeItem = document.querySelector(`.likes__listItem[key="${id}"]`);
  if (likeItem) {
    likeItem.parentElement.removeChild(likeItem);
  }
};
