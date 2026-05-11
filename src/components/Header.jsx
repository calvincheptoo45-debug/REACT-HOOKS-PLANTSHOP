function Header({ search, onSearchChange }) {
  return (
    <header>
      <h1>🌿 Plantshop</h1>

      <input
        type="text"
        placeholder="Search plants..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </header>
  );
}

export default Header;
