import React, { useState } from "react";

function Top_50_Hottest({ data }) {
    const [sortedData, setSortedData] = useState(data);

    // Fonction pour calculer la température
    const calculateTemperature = (colorIndex) => {
        return -15833.33 * colorIndex + 33666.67;
    };

    const temperature = calculateTemperature(colorIndex);
    if (temperature <= 0) return null; // Température invalide qui est négative c'est pour ça que j'ai N/A
    const solarTemp = 5778; // Température du Soleil
    const tempRelative = temperature / solarTemp;

    const sortByHeat = () => {
        const sorted = [...data].sort((a, b) => {
            const temperatureA = calculateTemperature(a.ci);
            const temperatureB = calculateTemperature(b.ci);
            return (temperatureB || 0) - (temperatureA || 0); // Tri décroissant
        })
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
                    <th>Température</th>
                </tr>
                </thead>
                <tbody>
                {sortedData.map((star, index) => {
                    const radius = calculateRadius(star.ci);
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{star.proper || "Nom inconnu"}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Top_50_Hottest;

