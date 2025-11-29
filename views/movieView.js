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
      <img class="movie-poster" src="https://image.tmdb.org/t/p/w600_and_h900_face/${movie.poster}"/>
        <h2 class="movie-title">${movie.title}</h2>
        <p class="movie-desc">${movie.description}</p>
      </div>
    `
      )
      .join("");
  };
}

export default new MovieView();
