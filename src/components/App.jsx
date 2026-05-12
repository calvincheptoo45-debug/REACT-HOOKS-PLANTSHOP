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
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  // Add a new plant
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
        const plantToAdd = {
          ...createdPlant,
          isInStock:
            createdPlant.isInStock !== undefined
              ? createdPlant.isInStock
              : true,
        };

        setPlants((currentPlants) => [...currentPlants, plantToAdd]);

        // Clear form fields
        setName("");
        setImage("");
        setPrice("");
      });
  }

  // Toggle stock status
  function handleToggleStock(id) {
    setPlants((currentPlants) =>
      currentPlants.map((plant) =>
        plant.id === id ? { ...plant, isInStock: !plant.isInStock } : plant,
      ),
    );
  }

  // Filter plants based on search
  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main>
      <h1>Plantsy 🌱</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Type a name to search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* New plant form */}
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
            <img src={plant.image} alt={plant.name} />

            <h2>{plant.name}</h2>

            <p>{plant.price}</p>

            <button onClick={() => handleToggleStock(plant.id)}>
              {plant.isInStock ? "In Stock" : "Sold Out"}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
