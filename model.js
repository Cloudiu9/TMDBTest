/////////////////// imports
import { MovieDb } from "moviedb-promise";

/////////////////// constants
const apiKey = process.env.TMDB_KEY;
// console.log(apiKey);

const moviedb = new MovieDb(apiKey);

/////////////////// state
export const state = {
  movie: [],
};

// loadMovie: changes the state
export const loadMovie = async function (movieTitle) {
  try {
    // const res = await moviedb.movieInfo({ title: movieTitle });
    const res = await moviedb.searchMovie({ query: movieTitle });
    // console.log(movieTitle, res);
    const allResults = res.results.map((res) => res.id);
    // console.log(allResults);

    const moviesData = [];

    for (let i = 0; i < allResults.length - 15; i++) {
      const data = await moviedb.movieInfo({
        id: allResults[i],
      });
      console.log(data);
      // Update state with the API call

      moviesData.push({
        id: data.id,
        title: data.title,
        description: data.overview,
        poster: data.poster_path,
        imdb_id: data.imdb_id,
      });

      console.log("State updated: " + state);
    }

    // After loop finishes, update state with ALL movies
    state.movie = moviesData;
    console.log("State updated with all movies:", state.movie);

    return state.movie; // Return updated state
  } catch (err) {
    console.log(err);
  }
};
