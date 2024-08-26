import React from "react";
import Category from "./Category";

function Dashboard({ data, addWidget, removeWidget }) {
  return (
    <div className="dashboard">
      {data.categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          addWidget={addWidget} // Pass addWidget function
          removeWidget={removeWidget} // Pass removeWidget function
        />
      ))}
    </div>
  );
}

export default Dashboard;
