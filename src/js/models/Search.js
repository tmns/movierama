import { key, baseUrl } from "../config";

export const getResults = async (query, page = 1) => {
  try {
    const res = await fetch(
      `${baseUrl}/search/movie?api_key=${key}&page=${page}&query=${query}`
    );
    const data = await res.json();
    console.log(data.results);
    return data.results;
  } catch (err) {
    console.log(err);
  }
};
