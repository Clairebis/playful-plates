export default function SearchBar({
  searchValue,
  setSearchValue,
  placeholder,
}) {
  return (
    <input
      type="text"
      placeholder={placeholder} // Use the placeholder prop here
      value={searchValue}
      onChange={(event) => setSearchValue(event.target.value.toLowerCase())}
    />
  );
}
