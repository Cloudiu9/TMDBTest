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

  clear() {
    this._parentEl.textContent = "";
  }

  _generateMarkup = function () {
    return this._data
      .map(
        (movie) => `
      <div class="movie-card">
        <h2 class="movie-title">${movie.title}</h2>
        <p class="movie-desc">${movie.description.substring(0, 70)}...</p>
        <a href="https://www.imdb.com/title/${
          movie.imdb_id
        }" target="_blank"><img class="movie-poster" alt="Failed to load movie poster" src="https://image.tmdb.org/t/p/w600_and_h900_face${
          movie.poster
        }"/></a>
        
      </div>
    `
      )
      .join("");
  };
}

export default new MovieView();
