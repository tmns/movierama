import { key, baseUrl, videosPath, reviewsPath, similarPath } from "../config";

/**
 * Makes API call for videos and returns results
 * @param movieId - String of movie id to for API call
 */
const getVideos = async movieId => {
  try {
    const res = await fetch(`${baseUrl}/${videosPath(movieId)}?api_key=${key}`);
    const data = await res.json();
    return data.results;
  } catch (err) {
    throw new Error(`There was an error fetching the movies videos: ${err}.`);
  }
};

/**
 * Makes API call for reviews and returns results
 * @param movieId - String of movie id to for API call
 */
const getReviews = async movieId => {
  try {
    const res = await fetch(
      `${baseUrl}/${reviewsPath(movieId)}?api_key=${key}`
    );
    const data = await res.json();
    // The spec states we should render at most 2 reviews
    if (data.results.length > 2) {
      data.results = data.results.slice(0,2);
    }
    return data.results;
  } catch (err) {
    throw new Error(`There was an error fetching the movies reviews: ${err}.`);
  }
};

/**
 * Makes API call for similar movies and returns results
 * @param movieId - String of movie id to for API call
 */
const getSimilar = async movieId => {
  try {
    const res = await fetch(
      `${baseUrl}/${similarPath(movieId)}?api_key=${key}`
    );
    const data = await res.json();
    return data.results;
  } catch (err) {
    throw new Error(
      `There was an error fetching the movies similar movies: ${err}`
    );
  }
};

/**
 * Calls all details helper functions and returns final details object
 * @param movieId - String of movie id to for API call
 */
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
    throw new Error(
      `The following error ocurred when fetching movie details: ${err}`
    );
  }
};
