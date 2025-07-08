export const SortControl = ({ sortOrder, setSortOrder }) => (
  <>
    <div>
      <button
        className={`button button--sort ${
          sortOrder === "lowToHigh" ? "active" : ""
        }`}
        onClick={() => setSortOrder("lowToHigh")}
        type="button"
      >
        Sortera: Lägst pris
      </button>
    </div>
    <div>
      <button
        className={`button button--sort ${
          sortOrder === "highToLow" ? "active" : ""
        }`}
        onClick={() => setSortOrder("highToLow")}
        type="button"
      >
        Sortera: Högst pris
      </button>
    </div>
  </>
);
