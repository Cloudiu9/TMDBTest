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
    let res;

    // If no title provided, get popular movies, else search by title
    if (!movieTitle) {
      res = await moviedb.moviePopular();
    } else {
      res = await moviedb.searchMovie({
        query: movieTitle,
        sort_by: "popularity.desc",
      });
    }

    console.log(res);

    // Sort movies by popularity
    const sortedResults = res.results.sort(
      (a, b) => b.popularity - a.popularity
    );
    const allResults = sortedResults.map((res) => res.id);
    const moviesData = [];

    for (let i = 0; i < allResults.length; i++) {
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
        tmdb_id: data.id,
        popularity: data.popularity,
        vote_avg: data.vote_average,
      });
    }

    // After loop finishes, update state with ALL movies
    state.movie = moviesData;

    return state.movie; // Return updated state
  } catch (err) {
    console.log(err);
  }
};
