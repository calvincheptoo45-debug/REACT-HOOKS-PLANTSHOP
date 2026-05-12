import React, { useEffect, useState } from "react";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      price: Number(price),
      inStock: true,
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
        setPlants([...plants, createdPlant]);

        // Clear form
        setName("");
        setImage("");
        setPrice("");
      });
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
  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main>
      <h1>Plantsy 🌱</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
          type="number"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Add Plant</button>
      </form>

      {/* Plant list */}
      <ul>
        {displayedPlants.map((plant) => (
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
