import React from "react";
import Widget from "./Widget";

function Category({ category, addWidget, removeWidget }) {
  return (
    <div className="category">
      <h3>{category.name}</h3>
      <div className="widgets">
        {category.widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            removeWidget={() => removeWidget(category.id, widget.id)}
          />
        ))}
        <div
          className="add-widget"
          onClick={() => addWidget(category.id)} // Updated to pass the category ID
          style={{
            width: "150px",
            height: "150px", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed #ccc",
            cursor: "pointer",
          }}
        >
          + Add Widget
        </div>
      </div>
    </div>
  );
}

export default Category;