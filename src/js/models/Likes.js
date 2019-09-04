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

  const addLike = ({ id, title, img }) => {
    const like = { id, title, img };
    likes.push(like);
    persistData();
    return like;
  };

  return {
    likes,
    persistData,
    readStorage,
    getNumLikes,
    isLiked,
    deleteLike,
    addLike
  }
};
