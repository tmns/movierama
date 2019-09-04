import { key, baseUrl, searchPath } from "../config";

/**
 * Returns Search results object
 * @param query - String to search 
 * @param page - Number of page to retrieve
 */
export const getResults = async (query, page = 1) => {
  try {
    const res = await fetch(
      `${baseUrl}/${searchPath}?api_key=${key}&page=${page}&query=${query}`
    );
    const data = await res.json();
    return data.results;
  } catch (err) {
    throw new Error(`Error when attempting to fetch movie search results: ${err}`)
  }
};
