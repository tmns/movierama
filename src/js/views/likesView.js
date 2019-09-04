import { elements } from "./base";
import { heartSvg, heartFilledSvg } from "../config";

export const toggleLikeBtn = (parent, isLiked) => {
  const heartSpan = parent.querySelector(".result__like");
  heartSpan.innerHTML = isLiked ? heartSvg : heartFilledSvg;
};

export const toggleLikeMenu = numLikes => {
  elements.likesMenu.style.display = numLikes > 0 ? "flex" : "none";
};

export const renderLike = like => {
  const markup = `
    <li class="like__item" key=${like.id}>
      <div class="like__data">
        <img src="${like.img}" alt="Movie poster for ${like.title}">
        <h4>${like.title}</h4>
      </div>
    </li>
  `;
  elements.likesList.insertAdjacentHTML("beforeend", markup);
};

export const deleteLike = id => {
  const el = document.querySelector(`.like__item[key*="${id}"]`).parentElement;
  if (el) {
    el.parentElement.removeChild(el);
  }
};
