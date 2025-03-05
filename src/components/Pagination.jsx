import React from "react";

const Pagination = ({ pageIndex, pageCount, canPreviousPage, canNextPage, gotoPage, previousPage, nextPage }) => {
  const renderPageNumbers = () => {
    const pageNumberItems = [];
    const numberOfPageButtons = window.innerWidth < 1000 ? 3 : 5;
    const halfButtons = Math.floor(numberOfPageButtons / 2);

    const startPage = Math.max(
      0,
      Math.min(pageIndex - halfButtons, pageCount - numberOfPageButtons)
    );
    const endPage = Math.min(pageCount, startPage + numberOfPageButtons);

    for (let i = startPage; i < endPage; i++) {
      pageNumberItems.push(
        <button
          key={i}
          onClick={() => gotoPage(i)}
          style={{ fontWeight: pageIndex === i ? 'bold' : 'normal' }}
        >
          {i + 1}
        </button>
      );
    }

    return pageNumberItems;
  };

  return (
    <div class="pagination">
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>◀</button>
      {renderPageNumbers()}
      <button onClick={() => nextPage()} disabled={!canNextPage}>▶</button>
    </div>
  );
};

export default Pagination;
