import PlantCard from "./PlantCard";

function PlantList({ plants }) {
  const plantItems = plants.map((plant) => (
    <PlantCard key={plant.id} plant={plant} />
  ));

  return <ul>{plantItems}</ul>;
}

export default PlantList;
