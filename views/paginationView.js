import { mark } from "regenerator-runtime";
import * as model from "../model.js";

class PaginationView {
  _parentElement = document.querySelector(".pagination");

  // IMP done, had help

  // need to dynamically render the buttons (circles like the ones from hianime)
  // Prev and Next arrows, jump to last and jump to first if exist (not on first/last page)
  // render 5 buttons at a time with pages, followed by the last page
  // current page is highlited in different color

  // all buttons just jump to the page on them, need the arrows at the end and beginning

  // TODO split renderPag into _generateMarkup and global render() from parent View

  _generateMarkup() {
    const currentPage = model.state.currentPage;
    const totalPages = model.state.totalPages;

    const pageButtons = this._generatePageButtons(currentPage, totalPages);

    return `
      <ul class='pagination-list'>
        ${
          currentPage > 2
            ? `<li class='pag-item'><a class='pag-link' data-page='1' title='First' href='#'>«</a></li>`
            : ""
        }
      ${
        currentPage > 1
          ? `<li class='pag-item'><a class='pag-link' data-page='${
              currentPage - 1
            }' title='Previous' href='#'>‹</a></li>`
          : ""
      }
      ${pageButtons}
      ${
        currentPage < totalPages + 1
          ? `<li class='pag-item'><a class='pag-link' data-page='${
              currentPage + 1
            }' title='Next' href='#'>›</a></li>`
          : ""
      }
      ${
        ""
        // limitation if API I think?
        // can't go past page 999, total pages are 54000, 100 works.
        // IMP ignore 'last page' for now

        // currentPage < totalPages
        // ? `<li class='pag-item'><a class='pag-link' data-page='${999}' title='Last' href='#'>»</a></li>`
        // : ""
      }
      </ul>
    `;
  }

  _generatePageButtons(currentPage, totalPages) {
    let buttons = "";

    // If less than 5 total pages, show all

    if (totalPages < 5) {
      for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage ? "active" : "";
        buttons += `<li class='pag-item'><a class='pag-link ${isActive}' data-page='${i}' title='Page ${i}' href='#'>${i}</a></li>`;
      }
    } else {
      // More than 5 pages: show 5 buttons around current page
      let startPage = Math.max(1, currentPage - 5);
      let endPage = Math.min(totalPages, currentPage + 5);

      // Adjust if at beginning or end
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
        endPage = totalPages;
      }

      for (let i = startPage; i <= endPage; i++) {
        const isActive = i === currentPage ? "active" : "";
        buttons += `<li class='pag-item'><a class='pag-link ${isActive}' data-page='${i}' title='Page ${i}' href='#'>${i}</a></li>`;
      }
    }

    return buttons;
  }

  render() {
    const markup = this._generateMarkup();
    this._parentElement.innerHTML = ""; // clear previous
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();

      const link = e.target.closest(".pag-link");
      if (!link) return;

      const targetPage = +link.dataset.page; // Get page num from data-page attr
      if (!targetPage) return;

      handler(targetPage); // pass pg num to handler
    });
  }
}

export default new PaginationView();
