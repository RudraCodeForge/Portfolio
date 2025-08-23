import React from "react";

const Badeg = ({ Name }) => {
  // Predefined palette (background + text colors)
  const colors = [
    { bg: "#E0F7FA", text: "#00796B" }, // Teal
    { bg: "#FFF3E0", text: "#E65100" }, // Orange
    { bg: "#F3E5F5", text: "#6A1B9A" }, // Purple
    { bg: "#E8F5E9", text: "#2E7D32" }, // Green
    { bg: "#E3F2FD", text: "#1565C0" }, // Blue
    { bg: "#FFEBEE", text: "#C62828" }, // Red
  ];

  // Randomly pick one palette color
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <span
      style={{
        backgroundColor: randomColor.bg,
        color: randomColor.text,
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "10px",
        fontWeight: "500",
        margin: "5px",
        display: "inline-block",
      }}
    >
      {Name}
    </span>
  );
};

export default Badeg;