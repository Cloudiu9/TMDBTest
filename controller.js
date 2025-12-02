"use strict";

import * as model from "./model.js";
import movieView from "./views/movieView";
import paginationView from "./views/paginationView.js";
import searchView from "./views/searchView";

// Load most popular on page start
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
    const movie = await model.loadMovie(query, model.state.currentPage);
    console.log(movie);

    // 4. Render results
    movieView.render(movie);
  } catch (err) {
    console.log(err);
  }
};

// Pagination
const controlPagination = async function (direction) {
  const newPage =
    direction === "next"
      ? (model.state.currentPage += 1)
      : (model.state.currentPage -= 1);

  console.log(newPage, model.state.totalPages, model.state);

  // Check if first page / last page ==> stop
  if (newPage < 1 || newPage >= model.state.totalPages) return;

  movieView.render(
    await model.loadMovie(model.state.currentSearchQuery, newPage)
  );
  // console.log(model.state.currentSearchQuery);

  console.log("💥💥💥💥" + model.state.currentPage);
};

const init = async function () {
  // Loads most popular movies
  loadPopularMovies();

  paginationView.addHandlerClick(controlPagination);

  // Search results loading movie
  searchView.addHandlerSearch(controlSearchResults);
};

init();
