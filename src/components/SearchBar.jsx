import { useRef } from "react";

export const SearchBar = ({ inputValue, setInputValue, onSubmit, loading }) => {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // hindra page reload
    onSubmit(e); // kör din submit-funktion
    inputRef.current?.blur(); // stäng tangentbordet
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-wrapper">
        <input
          ref={inputRef}
          type="search"
          inputMode="search"
          enterKeyHint="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Sök t.ex. energidryck"
        />
        <button
          type="submit"
          className={`button ${loading ? "is-loading" : ""}`}
          disabled={loading}
        >
          <span>Sök</span>
        </button>
      </div>
    </form>
  );
};
