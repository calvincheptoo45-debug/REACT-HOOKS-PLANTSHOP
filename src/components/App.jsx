import { useState, useEffect } from "react";
import PlantList from "./PlantList";

function App() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  return (
    <main>
      <h1>Plantsy 🌱</h1>
      <PlantList plants={plants} />
    </main>
  );
}

export default App;
