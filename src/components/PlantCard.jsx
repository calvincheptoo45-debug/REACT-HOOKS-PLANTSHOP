function PlantCard({ plant }) {
  return (
    <li>
      {plant.name} - ${plant.price}
    </li>
  );
}

export default PlantCard;
