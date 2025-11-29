"use strict";

import * as model from "./model.js";
import movieView from "./views/movieView";
import searchView from "./views/searchView";

// Load most popular
const loadPopularMovies = async function () {
  try {
    const moviesPop = await model.loadMovie();
    movieView.render(moviesPop);
  } catch (err) {
    console.log(err);
  }
};

// make search input load a movie
// 1. take query (getQuery from searchView)
// 2. load search results
// 3. render results
const controlSearchResults = async function () {
  try {
    // 0 Clear previous movies (if they exist)
    movieView.clear();

    // 1. Render loading
    movieView.renderLoading();

    // 2. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 3. Load search results
    // need to make new loadsearch() for the query IMP
    // await model.loadSearchResults(query); TODO
    const movie = await model.loadMovie(query);
    console.log(movie);

    // 4. Render results
    movieView.render(movie);
  } catch (err) {
    console.log(err);
  }
};

const init = async function () {
  // Loads most popular movies
  loadPopularMovies();
  // Search results loading movie
  searchView.addHandlerSearch(controlSearchResults);
};

init();
