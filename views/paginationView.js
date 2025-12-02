import * as model from "../model.js";

class PaginationView {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick = function (handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-pag");
      if (!btn) return;

      if (btn.classList.contains("btn-prev")) {
        // Exiting early if current page is 1 to not go below 1
        if (model.state.currentPage === 1) return;

        // Subtracting 1 to get the correct page change
        document.querySelector(".current-page").textContent =
          model.state.currentPage - 1;
        handler("prev");
      }

      if (btn.classList.contains("btn-next")) {
        // Adding 1 to get the correct page change
        document.querySelector(".current-page").textContent =
          model.state.currentPage + 1;
        handler("next");
      }
    });
  };
}

export default new PaginationView();
