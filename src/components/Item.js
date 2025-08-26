import React from "react";

function Item({ name, category }) {
  return (
    <div className="Item">
      <span className="Item-name">{name}</span>
      <span className="Item-category">{category}</span>
    </div>
  );
}

export default Item;