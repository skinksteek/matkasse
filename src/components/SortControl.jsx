export const SortControl = ({ sortOrder, setSortOrder }) => {
  const cycle = () => {
    setSortOrder(
      sortOrder === ""
        ? "lowToHigh"
        : sortOrder === "lowToHigh"
        ? "highToLow"
        : ""
    );
  };

  const label =
    sortOrder === ""
      ? "Ingen sortering"
      : sortOrder === "lowToHigh"
      ? "Lägst pris"
      : "Högst pris";

  const nextAction =
    sortOrder === ""
      ? "sortera billigast först"
      : sortOrder === "lowToHigh"
      ? "sortera dyrast först"
      : "ta bort sortering";

  return (
    <button
      type="button"
      onClick={cycle}
      className={`button button--sort ${sortOrder ? "active" : ""}`}
      data-order={sortOrder || "none"}
      aria-pressed={!!sortOrder}
      aria-label={`Sortering: ${label}. Klicka för att ${nextAction}.`}
    >
      {/* En och samma ikon, roteras i CSS */}
      <svg
        className="sort-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        aria-hidden="true"
      >
        {/* chevron-down (roteras till upp vid "highToLow") */}
        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
      </svg>
      <span>{label}</span>
    </button>
  );
};
