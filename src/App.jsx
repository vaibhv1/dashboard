import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import CustomDrawer from './CustomDrawer';
import data from './data.json';

function App() {
  const [dashboardData, setDashboardData] = useState(data);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const openDrawer = (categoryId) => {
    console.log("Opening drawer for category:", categoryId); // Debug log
    setSelectedCategoryId(categoryId);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    console.log("Closing drawer"); // Debug log
    setDrawerOpen(false);
    setSelectedCategoryId(null);
  };

  const handleAddWidget = (widgetInfo) => {
    console.log("Adding widget:", widgetInfo.name, widgetInfo.text); // Debug log
    if (selectedCategoryId && widgetInfo.name && widgetInfo.text) {
      const newWidget = {
        id: `widget_${Date.now()}`,
        name: widgetInfo.name,
        type: "text",
        text: widgetInfo.text,
      };

      console.log("New Widget:", newWidget); // Debug log

      const updatedData = dashboardData.categories.map((category) => {
        if (category.id === selectedCategoryId) {
          return {
            ...category,
            widgets: [...category.widgets, newWidget],
          };
        }
        return category;
      });

      console.log("Updated Data:", updatedData); // Debug log
      setDashboardData({ ...dashboardData, categories: updatedData });
      closeDrawer(); // Close the drawer after adding the widget
    }
  };

  const removeWidget = (categoryId, widgetId) => {
    console.log("Removing widget from category:", categoryId, widgetId); // Debug log
    const updatedData = dashboardData.categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: category.widgets.filter((widget) => widget.id !== widgetId),
        };
      }
      return category;
    });

    console.log("Updated data after removal:", updatedData); // Debug log
    setDashboardData({ ...dashboardData, categories: updatedData });
  };

  return (
    <div className="App">
      <Dashboard
        data={dashboardData}
        addWidget={(categoryId) => openDrawer(categoryId)}
        removeWidget={removeWidget}
      />
      <CustomDrawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        onSubmit={handleAddWidget}
      />
    </div>
  );
}

export default App;