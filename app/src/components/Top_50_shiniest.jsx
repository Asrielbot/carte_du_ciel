import React, { useState } from "react";

function Top_50_Shiniest({ data }) {
  const [sortedData, setSortedData] = useState(data);

  // Function to calculate temperature based on color index (ci)
  const calculateTemperature = (colorIndex) => {
    if (colorIndex == null) return null; // Handle missing values
    return -15833.33 * colorIndex + 33666.67; // Formula for temperature
  };

  // Function to calculate shininess
  const calculateShininess = (luminosity, colorIndex) => {
    const temperature = calculateTemperature(colorIndex);
    if (luminosity == null || temperature == null || temperature <= 0) return 0;
    return luminosity * temperature; // Shininess formula
  };

  // Function to sort by shininess
  const sortByShininess = () => {
    const sorted = [...data].sort((a, b) => {
      const shininessA = calculateShininess(a.lum, a.ci);
      const shininessB = calculateShininess(b.lum, b.ci);
      return shininessB - shininessA; // Descending order
    });
    setSortedData(sorted);
  };

  return (
    <div className="stars-table-container">
      <button onClick={sortByShininess} style={{ marginBottom: "10px" }}>
        Trier par Éclat
      </button>
      <table className="stars-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Luminosité</th>
            <th>Température (K)</th>
            <th>Éclat</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((star, index) => {
            const temperature = calculateTemperature(star.ci);
            const shininess = calculateShininess(star.lum, star.ci);
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{star.proper || "Nom inconnu"}</td>
                <td>{star.lum ? star.lum.toFixed(2) : "N/A"}</td>
                <td>{temperature ? temperature.toFixed(2) : "N/A"}</td>
                <td>{shininess ? shininess.toFixed(2) : "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Top_50_Shiniest;
