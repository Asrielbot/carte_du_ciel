import { useEffect } from "react";

import "./App.css";
import { parseCSV } from "./utils";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/hygdata_v40.csv");
        if (!response.ok) {
          throw new Error("Failed to fetch csv file");
        }
        const csvContent = await response.text();
        const data = await parseCSV(csvContent);
        console.log(data);
      } catch (error) {
        console.error("Error parsing CSV: ", error);
      }
    };
    fetchData();
  }, []);

  return <></>;
}

export default App;
