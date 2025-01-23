import React, { useState } from "react";

function Top_50_Array({ data }) {
    const [sortedData, setSortedData] = useState(data);

    // Fonction pour calculer la température
    const calculateTemperature = (colorIndex) => {
        return -15833.33 * colorIndex + 33666.67;
    };

    // Fonction pour calculer le rayon
    const calculateRadius = (luminosity, colorIndex) => {
        const temperature = calculateTemperature(colorIndex);
        if (temperature <= 0) return null; // Température invalide qui est négative c'est pour ça que j'ai N/A
        const solarTemp = 5778; // Température du Soleil
        const tempRelative = temperature / solarTemp;
        return Math.sqrt(luminosity / Math.pow(tempRelative, 4));
    };

    // Fonction pour trier par rayon
    const sortByRadius = () => {
        const sorted = [...data].sort((a, b) => {
            const radiusA = calculateRadius(a.lum, a.ci);
            const radiusB = calculateRadius(b.lum, b.ci);
            return (radiusB || 0) - (radiusA || 0); // Tri décroissant
        });
        setSortedData(sorted);
    };

    return (
        <div className="stars-table-container">
            <button onClick={sortByRadius} style={{ marginBottom: "10px" }}>
                Trier par Rayon
            </button>
            <table className="stars-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Luminosité</th>
                    <th>Index de Couleur</th>
                    <th>Rayon Relatif</th>
                </tr>
                </thead>
                <tbody>
                {sortedData.map((star, index) => {
                    const radius = calculateRadius(star.lum, star.ci);
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{star.proper || "Nom inconnu"}</td>
                            <td>{star.lum ? star.lum.toFixed(2) : "N/A"}</td>
                            <td>{star.ci ? star.ci.toFixed(2) : "N/A"}</td>
                            <td>{radius ? radius.toFixed(2) : "N/A"}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Top_50_Array;
