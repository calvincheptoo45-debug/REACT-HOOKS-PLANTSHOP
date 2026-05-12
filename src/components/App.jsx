import React, { useEffect, useState } from "react";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      name,
      image,
      price,
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((r) => r.json())
      .then((newPlantFromServer) => {
        setPlants([...plants, newPlantFromServer]);
      });

    setName("");
    setImage("");
    setPrice("");
  }

  function handleToggleStock(id) {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, inStock: !plant.inStock } : plant,
      ),
    );
  }

  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main>
      <h1>Plantsy 🌱</h1>

      <input
        type="text"
        placeholder="Type a name to search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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

      <ul>
        {displayedPlants.map((plant) => (
          <li key={plant.id} data-testid="plant-item">
            <img src={plant.image} alt={plant.name} width="100" />
            <h3>{plant.name}</h3>
            <p>${plant.price}</p>
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
