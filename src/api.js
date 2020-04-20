import CacheService from "./cache";

const axios = require("axios");

const ttl = 60 * 60 * 24 * 7; // cache for a week
const cache = new CacheService(ttl); // Create a new cache service instance

const APIURL = "https://api.themoviedb.org/3";
let IMAGE_URL = "https://image.tmdb.org/t/p";

const _getPopularMovies = (pg = 1) =>
  axios.get(
    `${APIURL}/movie/popular?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=${pg}`
  );

export const getPopularMovies = (pg = 1) => {
  const key = `getPopularMovies_${pg}`;
  return cache.get(key, () => _getPopularMovies(pg));
};

const _searchMovies = (searchTerm, pg = 1) =>
  axios.get(
    `${APIURL}/search/movie?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&query=${searchTerm}&page=${pg}`
  );

export const searchMovies = (searchTerm, pg = 1) => {
  const key = `searchMovies_${searchTerm}_${pg}`;
  return cache.get(key, () => _searchMovies(searchTerm, pg));
};

const _showMovieById = (id) =>
  axios.get(
    `${APIURL}/movie/${id}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
  );

export const showMovieById = (id) => {
  const key = `showMovieById_${id}`;
  return cache.get(key, () => _showMovieById(id));
};

const _showActorById = (id) =>
  axios.get(
    `${APIURL}/person/${id}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
  );

export const showActorById = (id) => {
  const key = `showActorById_${id}`;
  return cache.get(key, () => _showActorById(id));
};

const _getMovieGenres = () => {
  return axios.get(
    `${APIURL}/genre/movie/list?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
  );
};

export const getMovieGenres = (id) => {
  const key = "getMovieGenres";
  return cache.get(key, () => _getMovieGenres());
};

const _getSimilarMovie = (id) => {
  return axios.get(
    `${APIURL}/movie/${id}/similar?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
  );
};

export const getSimilarMovie = (id) => {
  const key = `getSimilarMovie_${id}`;
  return cache.get(key, () => _getSimilarMovie(id));
};

const _getMovieCredits = (id) => {
  return axios.get(
    `${APIURL}/movie/${id}/credits?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
  );
};

export const getMovieCredits = (id) => {
  const key = `getMovieCredits_${id}`;
  return cache.get(key, () => _getMovieCredits(id));
};

const _getAPIConfig = async () => {
  const res = await axios.get(
    `${APIURL}/configuration?api_key=${process.env.REACT_APP_APIKEY}`
  );
  return res.data.images.secure_base_url;
};

const getAPIConfig = () => {
  const key = "getAPIConfig";
  return cache.get(key, () => _getAPIConfig());
};

export const getImage = (path, type = "profile") => {
  const SIZE_MAP = {
    profile: "w185",

    profile_h: "h632",
    poster: "w500",
  };
  const PLACEHOLDER = {
    profile: "http://via.placeholder.com/185x278",
    poster: "http://via.placeholder.com/300x450",
  };

  if (!path) return PLACEHOLDER[type];
  IMAGE_URL = IMAGE_URL || getAPIConfig();
  return `${IMAGE_URL}/${SIZE_MAP[type]}${path}`;
};
