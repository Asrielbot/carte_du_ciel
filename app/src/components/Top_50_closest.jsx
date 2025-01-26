import React, { useState } from "react";

function Top_50_Closest({ data }) {
  const [sortedData, setSortedData] = useState(data);

  // Function to calculate distance from Earth (assumed at origin: 0, 0)
  const calculateProximity = (x, y) => {
    if (x == null || y == null) return Infinity; // Handle missing coordinates
    return Math.sqrt(x ** 2 + y ** 2); // Euclidean distance
  };

  // Function to sort by proximity to Earth
  const sortByProximity = () => {
    const sorted = [...data].sort((a, b) => {
      const proximityA = calculateProximity(a.x, a.y);
      const proximityB = calculateProximity(b.x, b.y);
      return proximityA - proximityB; // Ascending order
    });
    setSortedData(sorted);
  };

  return (
    <div className="stars-table-container">
      <button onClick={sortByProximity} style={{ marginBottom: "10px" }}>
        Trier par Proximité
      </button>
      <table className="stars-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Proximité</th>
            <th>X</th>
            <th>Y</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((star, index) => {
            const proximity = calculateProximity(star.x, star.y);
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{star.proper || "Nom inconnu"}</td>
                <td>{proximity !== Infinity ? proximity.toFixed(2) : "N/A"}</td>
                <td>{star.x !== null ? star.x.toFixed(2) : "N/A"}</td>
                <td>{star.y !== null ? star.y.toFixed(2) : "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Top_50_Closest;
