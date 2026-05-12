// src/components/NewPlantForm.jsx

import { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: parseFloat(formData.price),
      inStock: true,
    };

    // Return the fetch promise so the test can detect the call
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((createdPlant) => {
        onAddPlant(createdPlant);
      });

    // Clear the form after submission
    setFormData({
      name: "",
      image: "",
      price: "",
    });
  }

  return (
    <form className="new-plant-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Plant name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />

      <input
        type="text"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />

      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;
