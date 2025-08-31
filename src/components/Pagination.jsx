export const Pagination = ({ page, totalPages, handleNext, handlePrev }) => {
  const scrollToGrid = () => {
    const anchor = document.querySelector(".list-top-anchor");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="pagination">
      <button
        className="button-pagination"
        onClick={() => {
          handlePrev();
          scrollToGrid();
        }}
        disabled={page <= 1}
      >
        <span>Föregående</span>
      </button>

      <span className="page">
        {page} av {totalPages}
      </span>

      <button
        className="button-pagination"
        onClick={() => {
          handleNext();
          scrollToGrid();
        }}
        disabled={page >= totalPages}
      >
        <span>Nästa</span>
      </button>
    </nav>
  );
};
