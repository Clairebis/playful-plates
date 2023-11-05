export default function SearchBar({
  searchValue,
  setSearchValue,
  placeholder,
}) {
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder={placeholder} // Use the placeholder prop here
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value.toLowerCase())}
      />
    </div>
  );
}
