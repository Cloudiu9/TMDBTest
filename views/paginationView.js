import * as model from "../model.js";

class PaginationView {
  _parentElement = document.querySelector(".pagination");

  // need to dynamically render the buttons (circles like the ones from hianime)
  // Prev and Next arrows, jump to last and jump to first if exist (not on first/last page)
  // render 5 buttons at a time with pages, followed by ... and the last page
  // current page is highlited in different color

  // all buttons just jump to the page on them, need the arrows at the end and beginning

  // TODO split renderPag into _generateMarkup and global render() from parent View

  renderPag = function () {
    // render a button for each page IF there's < 5 total
    // if more than 5 pages, render 5 buttons and arrow for Jump to Last
    const markup = `
    <button class="btn-pag btn-next">asdadsadsa</button>
    `;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };

  addHandlerPagination = function (handler) {
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

    // Render pagination buttons
    this.renderPag();
  };
}

export default new PaginationView();
