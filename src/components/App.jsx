// src/components/App.jsx

import { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";
import PlantList from "./PlantList";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch plants when the component mounts
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  // Add a new plant
  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  // Mark a plant as sold out
  function handleSoldOut(id) {
    const updatedPlants = plants.map((plant) =>
      plant.id === id ? { ...plant, inStock: false } : plant,
    );
    setPlants(updatedPlants);
  }

  // Filter plants by search term
  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main>
      <h1>Plantsy 🌱</h1>

      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <NewPlantForm onAddPlant={handleAddPlant} />

      <PlantList plants={displayedPlants} onSoldOut={handleSoldOut} />
    </main>
  );
}

export default App;
