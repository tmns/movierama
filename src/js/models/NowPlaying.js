import { key, baseUrl, nowPlayingPath } from "../config";

/**
 * Returns now playing results object
 * @param page - Number of page to retrieve
 */
export const getNowPlaying = async (page = 1) => {
  try {
    const res = await fetch(
      `${baseUrl}/${nowPlayingPath}?api_key=${key}&page=${page}`
    );
    const data = await res.json();
    return data.results;
  } catch (err) {
    throw new Error(`Error when attempting to fetch movies now playing: ${err}`)
  }
};
