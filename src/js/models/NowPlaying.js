import { key, baseUrl, nowPlayingPath } from "../config";

export const getNowPlaying = async (page = 1) => {
  try {
    const res = await fetch(
      `${baseUrl}/${nowPlayingPath}?api_key=${key}&page=${page}`
    );
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
  }
};
