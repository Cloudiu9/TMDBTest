import * as model from "../model.js";

class SearchView {
  _parentEl = document.querySelector(".search");

  getQuery() {
    const query = this._parentEl.querySelector(".search-field").value;
    this._clearInput();

    return query;
  }

  _clearInput() {
    this._parentEl.querySelector(".search-field").value = "";
  }

  // publisher
  addHandlerSearch(handler) {
    // adding listener to whole event ==> we can listen for 'submit' (user presses enter OR clicking the button)
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();

      // Update the pagination currentPage
      model.state.currentPage = 1;
      document.querySelector(".current-page").textContent =
        model.state.currentPage;

      handler();
    });
  }
}

export default new SearchView();
