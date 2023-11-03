export default function SearchFilter({ items, searchValue }) {
  if (searchValue) {
    return items.filter((item) => {
      const itemLowerCase = item.name.toLowerCase();
      return itemLowerCase.includes(searchValue);
    });
  }
  return items;
}
