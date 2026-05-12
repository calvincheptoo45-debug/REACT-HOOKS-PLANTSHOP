// src/components/App.jsx

import React, { useEffect, useState } from "react";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  // Fetch plants from the server
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  // Add new plant
  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      name,
      image,
      price, // keep as string to match tests
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((createdPlant) => {
        // Ensure new plants always start in stock
        const plantToAdd = {
          ...createdPlant,
          inStock:
            createdPlant.inStock !== undefined ? createdPlant.inStock : true,
        };

        setPlants([...plants, plantToAdd]);

        // Clear form
        setName("");
        setImage("");
        setPrice("");
      });
  }

  // Toggle stock status
  function handleToggleStock(id) {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, inStock: !plant.inStock } : plant,
      ),
    );
  }

  // Filter plants by search term
  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main>
      <h1>Plantsy 🌱</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search plants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add plant form */}
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
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Add Plant</button>
      </form>

      {/* Plant list */}
      <ul className="cards">
        {displayedPlants.map((plant) => (
          <li key={plant.id} data-testid="plant-item" className="card">
            <img src={plant.image} alt={plant.name} width="100" />

            <h3>{plant.name}</h3>

            <p>{plant.price}</p>

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
