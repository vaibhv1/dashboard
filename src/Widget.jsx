import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, LabelList, Text } from "recharts";

// Donut Chart Component with Total Displayed in Center
function DonutChart({ data, colors }) {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.values[index],
  }));

  const total = data.values.reduce((sum, value) => sum + value, 0);

  return (
    <PieChart width={250} height={250}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        innerRadius={50}
        fill="#8884d8"
        labelLine={false}
        label={({ cx, cy }) => (
          <Text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {total}
          </Text>
        )}
      >
        {colors.map((color, index) => (
          <Cell key={`cell-${index}`} fill={color} />
        ))}
      </Pie>
      <Tooltip />
      {/* <Legend /> */}
    </PieChart>
  );
}

function BarChartWidget({ data, colors }) {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.values[index],
  }));

  const total = data.values.reduce((sum, value) => sum + value, 0);

  return (
    <BarChart width={250} height={250} data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8">
        {colors.map((color, index) => (
          <Cell key={`cell-${index}`} fill={color} />
        ))}
        <LabelList
          dataKey="value"
          position="top"
          style={{ fontSize: '12px', fill: '#333' }}
          angle={-45}
        />
      </Bar>
      <text
        x={125} 
        y={125} 
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: '20px', fontWeight: 'bold', fill: '#333' }}
      >
        {total}
      </text>
    </BarChart>
  );
}

function Widget({ widget, removeWidget }) {
  if (!widget || !widget.data) {
    return <div className="widget">No data available</div>;
  }

  const renderWidgetContent = () => {
    switch (widget.type) {
      case "pie":
        return <DonutChart data={widget.data} colors={widget.data.colors} />;
      case "bar":
        return <BarChartWidget data={widget.data} colors={widget.data.colors} />;
      default:
        return <p>{widget.text}</p>;
    }
  };

  const renderLabelsAndValues = () => (
    <div className="labels-and-values">
      <h4>Details</h4>
      {widget.data.labels.map((label, index) => (
        <div key={index} className="label-value" style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <span
            className="color-box"
            style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              backgroundColor: widget.data.colors[index],
              marginRight: '8px',
            }}
          ></span>
          <span className="label" style={{ marginRight: '5px' }}>{label}:</span>
          <span className="value">{widget.data.values[index]}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="widget">
      <div className="widget-header">
        <h3>
          {widget.name} <button onClick={removeWidget}>X</button>
        </h3>
      </div>
      <div className="widget-body">
        <div className="chart-container">
          {renderWidgetContent()}
        </div>
        <div className="details-container">
          {renderLabelsAndValues()}
        </div>
      </div>
    </div>
  );
}

export default Widget;