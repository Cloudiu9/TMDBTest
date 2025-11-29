import { mark } from "regenerator-runtime";

class MovieView {
  /////////////////// selectors
  _parentEl = document.querySelector(".movie-collection");
  _data;

  render(data) {
    if (!data) {
      console.error("Error. Missing data.");
      return;
    }

    this.clear();
    this._data = data;
    const markup = this._generateMarkup();

    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderLoading() {
    const markup = `
    <div>Loading...</div>
    `;

    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    this._parentEl.textContent = "";
  }

  _generateMarkup = function () {
    return this._data
      .map(
        (movie) => `
      <div class="movie-card">
      <a href="${
        movie.imdb_id
          ? `https://www.imdb.com/title/${movie.imdb_id}`
          : `https://www.themoviedb.org/movie/${movie.tmdb_id}`
      }" target="_blank">
        <img class="movie-poster" src="https://image.tmdb.org/t/p/w600_and_h900_face/${
          movie.poster
        }"/>
      </a>
      <div class="movie-info">
        <h2 class="movie-title">${movie.title}</h2>
        <span class="${getClassByRating(
          movie.vote_avg
        )}">${movie.vote_avg.toFixed(1)}</span>
      </div>
        <p class="movie-desc">${movie.description}</p>
      </div>
    `
      )
      .join("");
  };
}

function getClassByRating(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

export default new MovieView();
