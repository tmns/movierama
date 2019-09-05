import { renderLike } from '../views/likesView';

export const Likes = () => {
  let likes = [];

  const persistData = () => {
    localStorage.setItem("likes", JSON.stringify(likes));
  };

  const readStorage = () => {
    const storage = JSON.parse(localStorage.getItem("likes"));
    if (storage) {
      likes = storage;
    }
  };

  const getNumLikes = () => {
    return likes.length;
  };

  const isLiked = id => {
    return likes.findIndex(el => el.id === id) !== -1;
  };

  const deleteLike = id => {
    const index = likes.findIndex(el => el.id === id);
    likes.splice(index, 1);
    persistData();
  };

  const addLike = ({ id, img, title, overview }) => {
    const like = { id, img, title, overview };
    likes.push(like);
    persistData();
    return like;
  };

  const renderLikes = () => {
    likes.forEach(renderLike);
  }

  return {
    likes,
    persistData,
    readStorage,
    getNumLikes,
    isLiked,
    deleteLike,
    addLike,
    renderLikes
  }
};
