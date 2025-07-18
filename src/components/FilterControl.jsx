export const FilterControl = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      store: e.target.value,
    });
  };

  return (
    <div className="filter-wrapper">
      <label htmlFor="store" className="hide-xs">
        Välj butik:
      </label>
      <select
        id="store"
        name="store"
        value={filters.store}
        onChange={handleChange}
      >
        <option value="">Alla</option>
        <option value="Hemköp">Hemköp</option>
        <option value="CityGross">CityGross</option>
      </select>
    </div>
  );
};
