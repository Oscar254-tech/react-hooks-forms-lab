import React from "react";

function ShoppingList({ items }) {
  return (
    <div className="ShoppingList">
      <div className="Items">
        {items.map((item) => (
          <div key={item.id} className="Item">
            <span className="Item-name">{item.name}</span>
            <span className="Item-category">{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoppingList;