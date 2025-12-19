"use strict";

import * as model from "./model.js";
import movieView from "./views/movieView";
import paginationView from "./views/paginationView.js";
import searchView from "./views/searchView";

// Load most popular on page start
const loadPopularMovies = async function () {
  try {
    model.state.currentSearchQuery = ""; // No search query for popular movies
    const moviesPop = await model.loadMovie();
    movieView.render(moviesPop);
    paginationView.render(); // Render pagination buttons
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

    // Store the query for pagination to use later
    model.state.currentSearchQuery = query;

    // 3. Load search results
    // need to make new loadsearch() for the query IMP
    // await model.loadSearchResults(query); TODO
    const movie = await model.loadMovie(query, 1); // Starts at page 1
    console.log(movie);

    // 4. Render results
    movieView.render(movie);
    paginationView.render();
  } catch (err) {
    console.log(err);
  }
};

// Pagination
const controlPagination = async function (pageNumber) {
  // Use the stored search query, not a new one
  await model.loadMovie(model.state.currentSearchQuery, pageNumber);
  movieView.render(model.state.movie);
  paginationView.render(); // Re-render pagination with new active page
};

const init = async function () {
  // Loads most popular movies
  loadPopularMovies();

  paginationView.addHandlerPagination(controlPagination);

  // Search results loading movie
  searchView.addHandlerSearch(controlSearchResults);
};

init();
