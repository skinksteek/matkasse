export const FilterControl = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      store: e.target.value,
    });
  };

  return (
    <div>
      <label>
        Välj butik:
        <select name="store" value={filters.store} onChange={handleChange}>
          <option value="">Alla</option>
          <option value="Hemköp">Hemköp</option>
          <option value="CityGross">CityGross</option>
        </select>
      </label>
    </div>
  );
};
