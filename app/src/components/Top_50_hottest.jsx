import React, { useState } from "react";

function Top_50_Hottest({ data }) {
  const [sortedData, setSortedData] = useState(data);

  // Fonction pour calculer la température
  const calculateTemperature = (colorIndex) => {
    if (colorIndex == null) return null; // Vérifie les valeurs nulles
    return -15833.33 * colorIndex + 33666.67;
  };

  const sortByHeat = () => {
    const sorted = [...data].sort((a, b) => {
      const temperatureA = calculateTemperature(a.ci);
      const temperatureB = calculateTemperature(b.ci);
      return (temperatureB || 0) - (temperatureA || 0); // Tri décroissant
    });
    setSortedData(sorted);
  };

  return (
    <div className="stars-table-container">
      <button onClick={sortByHeat} style={{ marginBottom: "10px" }}>
        Trier par Température
      </button>
      <table className="stars-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Température (K)</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((star, index) => {
            const temperature = calculateTemperature(star.ci);
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{star.proper || "Nom inconnu"}</td>
                <td>{temperature ? temperature.toFixed(2) : "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Top_50_Hottest;
