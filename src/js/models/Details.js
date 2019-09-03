import { key, baseUrl, videosPath, reviewsPath, similarPath } from "../config";

const getVideos = async movieId => {
  try {
    const res = await fetch(`${baseUrl}/${videosPath(movieId)}?api_key=${key}`);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
  }
};

const getReviews = async movieId => {
  try {
    const res = await fetch(
      `${baseUrl}/${reviewsPath(movieId)}?api_key=${key}`
    );
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
  }
};

const getSimilar = async movieId => {
  try {
    const res = await fetch(`${baseUrl}/${similarPath(movieId)}?api_key=${key}`);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
  }
};

export const getDetails = async movieId => {
  let details = {};

  try {
    const videos = await getVideos(movieId);
    if (videos) details["videos"] = videos;

    const reviews = await getReviews(movieId);
    if (reviews) details["reviews"] = reviews;

    const similar = await getSimilar(movieId);
    if (similar) details["similar"] = similar;

    return details;
  } catch (err) {
    console.log(err);
  }
};
