import { key, baseUrl } from "../config";

export const getNowPlaying = async (page = 1) => {
  try {
    const res = await fetch(
      `${baseUrl}/movie/now_playing?api_key=${key}&page=${page}`
    );
    const data = await res.json();
    console.log(data.results);
    return data.results;
  } catch (err) {
    console.log(err);
  }
};
