// src/components/App.jsx

import React, { useEffect, useState } from "react";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  // Fetch plants from API
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  // Add new plant
  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      name: name,
      image: image,
      price: price, // keep as string because tests expect this
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((createdPlant) => {
        setPlants([...plants, createdPlant]);
      });

    // Clear form
    setName("");
    setImage("");
    setPrice("");
  }

  // Toggle stock status locally
  function handleToggleStock(id) {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, inStock: !plant.inStock } : plant,
      ),
    );
  }

  // Filter plants by search term
  const plantsToDisplay = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main>
      <h1>Plantsy 🌱</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Type a name to search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Plant form */}
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
        {plantsToDisplay.map((plant) => (
          <li key={plant.id} className="card" data-testid="plant-item">
            <img src={plant.image} alt={plant.name} />
            <h2>{plant.name}</h2>
            <p>{plant.price}</p>

            {/* Important: show "In Stock" when true */}
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
