import { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      name,
      image,
      price: Number(price),
      soldOut: false,
    };

    onAddPlant(newPlant);

    setName("");
    setImage("");
    setPrice("");
  }

  return (
    <form className="new-plant-form" onSubmit={handleSubmit}>
      <h2>New Plant</h2>

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
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;
