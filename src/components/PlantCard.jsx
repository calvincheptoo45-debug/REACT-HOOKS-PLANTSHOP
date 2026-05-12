function PlantCard({ plant, onSoldOut }) {
  const { id, name, image, price, inStock } = plant;

  return (
    <li data-testid="plant-item">
      <img src={image} alt={name} width="200" />
      <h4>{name}</h4>
      <p>Price: {price}</p>

      <button onClick={() => onSoldOut(id)}>
        {inStock ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
