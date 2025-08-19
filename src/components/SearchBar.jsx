export const SearchBar = ({ inputValue, setInputValue, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="search-wrapper">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Sök t.ex. energidryck"
        />
        <button type="submit" className="button">
          <span>Sök</span>
        </button>
        {loading && <span className="loader"></span>}
      </div>
    </form>
  );
};
