import {useEffect, useState} from "react";

import "./App.css";
import { parseCSV } from "./utils";
import Top_50_Array from "./components/Top_50_array.jsx";

function App() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/hygdata_v40.csv");
        if (!response.ok) {
          throw new Error("Failed to fetch csv file");
        }
        const csvContent = await response.text();
        const data = await parseCSV(csvContent);
        // console.log(data.map((star) => star.ci));

        // Filtrer les 50 étoiles les plus lumineuses
        const filteredStars = data
            .filter((star) => star.lum != null && star.lum > 0) // Supprimer les valeurs nulles
            .sort((a, b) => b.lum - a.lum) // Trier par luminosité décroissante
            .slice(0, 50); // Prendre les 50 premières

        setStars(filteredStars);

        // Générer un fichier JSON
        // generateJSONFile(filteredStars);
      } catch (error) {
        console.error("Error parsing CSV: ", error);
      }
    };
    fetchData();
  }, []);

  // Fonction pour générer et télécharger un fichier JSON
  // const generateJSONFile = (data) => {
  //   const jsonString = JSON.stringify(data, null, 2); // Convertir en JSON formaté
  //   const blob = new Blob([jsonString], { type: "application/json" });
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = "top_50_stars.json"; // Nom du fichier
  //   link.click();
  // };

  return (
      <div className="App">
        <h1>Top 50 Étoiles les Plus Lumineuses</h1>
        <Top_50_Array data={stars}/>
      </div>
  );
}

export default App;
