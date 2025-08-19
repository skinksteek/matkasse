export const Pagination = ({ page, totalPages, handleNext, handlePrev }) => {
  return (
    <nav className="pagination">
      <button
        className="button-pagination"
        onClick={() => {
          handlePrev();
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
        }}
        disabled={page >= totalPages}
      >
        <span>Nästa</span>
      </button>
    </nav>
  );
};
