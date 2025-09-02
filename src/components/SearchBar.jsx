import "./SearchBar.css";

function SearchBar({ city, setCity, fetchWeather }) {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
        className="search-bar-input"
      />
      <button
        onClick={() => fetchWeather(city)}
        className="search-bar-button"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
