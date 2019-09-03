// ---- GENERAL
export const key = "bc50218d91157b1ba4f142ef7baaa6a0";
export const posterWidth = "185";

// ---- URLs
export const baseUrl = "https://api.themoviedb.org/3";
export const posterUrl = `http://image.tmdb.org/t/p/w${posterWidth}`;

// ---- PATHS
export const noPosterPath = "img/no-poster.png";
export const genresPath = "genre/movie/list";
export const nowPlayingPath = "movie/now_playing";
export const searchPath = "search/movie";
export const videosPath = movieId => `movie/${movieId}/videos`;
export const reviewsPath = movieId => `movie/${movieId}/reviews`;
export const similarPath = movieId => `movie/${movieId}/similar`;
