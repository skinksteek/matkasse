export const Pagination = ({ page, totalPages, handleNext, handlePrev }) => {
  return (
    <div className="pagination">
      <button
        className="button-pagination"
        onClick={() => handlePrev()}
        disabled={page <= 1}
      >
        <span>Föregående</span>
      </button>
      <span>
        Sida {page} av {totalPages}
      </span>
      <button
        className="button-pagination"
        onClick={() => handleNext()}
        disabled={page >= totalPages}
      >
        <span>Nästa</span>
      </button>
    </div>
  );
};
