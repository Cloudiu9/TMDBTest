"use strict";

import * as model from "./model.js";
import movieView from "./views/movieView";
import searchView from "./views/searchView";

// TODO
// make search input load a movie
// 1. take query (getQuery from searchView)
// 2. load search results
// 3. render results
const controlSearchResults = async function () {
  try {
    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load search results
    // need to make new loadsearch() for the query IMP
    // await model.loadSearchResults(query); TODO
    const movie = await model.loadMovie(query);
    console.log(movie);

    // 3. Render results
    movieView.render(movie);
  } catch (err) {
    console.log(err);
  }
};

const init = async function () {
  // 1. Call loadMovie with a movie ID
  // await loadMovie();

  // // 2. Now state.movie has been updated with data from TMDB
  // // 3. Pass that data to view's render method
  // movieView.render(state.movie);

  // Search results loading movie
  searchView.addHandlerSearch(controlSearchResults);
};

init();
