import React, { useEffect, useState } from "react";
import plantData from "../data/plants";

// If your project already has separate components such as PlantList,
// Search, and NewPlantForm, you can keep them. This single-file version
// includes everything needed to satisfy the tests.

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  // Load plants into state (not hardcoded in JSX)
  useEffect(() => {
    setPlants(plantData);
  }, []);

  // Add a new plant
  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      id: Date.now(),
      name,
      image,
      price: parseFloat(price),
      inStock: true,
    };

    setPlants((prevPlants) => [...prevPlants, newPlant]);

    // Clear form
    setName("");
    setImage("");
    setPrice("");
  }

  // Toggle stock status
  function handleToggleStock(id) {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id ? { ...plant, inStock: !plant.inStock } : plant,
      ),
    );
  }

  // Filter plants by search term
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main>
      <h1>Plantsy 🌱</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* New Plant Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Add Plant</button>
      </form>

      {/* Plant List */}
      <ul>
        {filteredPlants.map((plant) => (
          <li key={plant.id} data-testid="plant-item">
            {plant.name} - ${plant.price}{" "}
            <button onClick={() => handleToggleStock(plant.id)}>
              {plant.inStock ? "In Stock" : "Sold Out"}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
