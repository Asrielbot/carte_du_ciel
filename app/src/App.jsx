import { useEffect, useState } from "react";

import "./App.css";
import { parseCSV } from "./utils";
import Top_50_Array from "./components/Top_50_array.jsx";
import Top_50_Hottest from "./components/Top_50_hottest.jsx";
import Top_50_Closest from "./components/Top_50_closest.jsx";
import Top_50_Shiniest from "./components/Top_50_shiniest.jsx";

function App() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/hygdata_v40.csv");
        if (!response.ok) {
          throw new Error("Failed to fetch CSV file");
        }
        const csvContent = await response.text();
        const data = await parseCSV(csvContent);

        // Filter valid data for further operations
        const validStars = data.filter(
          (star) =>
            star.lum != null &&
            star.ci != null &&
            star.dist != null &&
            star.x != null &&
            star.y != null
        );

        setStars(validStars);
      } catch (error) {
        console.error("Error parsing CSV: ", error);
      }
    };
    fetchData();
  }, []);

  // Derive data for the top 50 stars based on different criteria
  const brightestStars = stars
    .filter((star) => star.lum > 0)
    .sort((a, b) => b.lum - a.lum)
    .slice(0, 50);

  const hottestStars = stars.sort((a, b) => b.ci - a.ci).slice(0, 50);

  const closestStars = stars
    .sort((a, b) => {
      const distA = Math.sqrt(a.x ** 2 + a.y ** 2);
      const distB = Math.sqrt(b.x ** 2 + b.y ** 2);
      return distA - distB;
    })
    .slice(0, 50);

  // const shininessStars = stars
  //   .map((star) => ({
  //     ...star,
  //     shininess: star.lum * (-15833.33 * star.ci + 33666.67),
  //   }))
  //   .filter((star) => star.shininess > 0);

  // const shiniestStars = shininessStars
  //   .sort((a, b) => b.shininess - a.shininess)
  //   .slice(0, 50);

  return (
    <div className="App">
      <h1>Top 50 Étoiles les Plus Lumineuses</h1>
      <Top_50_Array data={brightestStars} />
      <h1>Top 50 Étoiles les plus chaudes</h1>
      <Top_50_Hottest data={hottestStars} />
      <h1>Top 50 Étoiles les plus proches de la Terre</h1>
      <Top_50_Closest data={closestStars} />
      <h1>Top 50 Étoiles les plus brillantes</h1>
      <Top_50_Shiniest data={stars} />
    </div>
  );
}

export default App;
