import React, { useState } from "react";
import ShoppingList from "./ShoppingList";
import ItemForm from "./ItemForm";
import Filter from "./Filter";

function App({ initialItems = [] }) { // Add initialItems prop with default empty array
  const [items, setItems] = useState(initialItems); // Initialize with initialItems
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  function handleItemFormSubmit(newItem) {
    setItems([...items, newItem]);
  }

  function handleSearchChange(searchText) {
    setSearch(searchText);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All" && search === "") return true;
    
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="App">
      <Filter 
        onCategoryChange={setSelectedCategory} 
        onSearchChange={handleSearchChange}
        search={search}
      />
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <ShoppingList items={itemsToDisplay} />
    </div>
  );
}

export default App;