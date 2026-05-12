// src/components/Search.jsx

function Search({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Type a name to search..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

export default Search;
