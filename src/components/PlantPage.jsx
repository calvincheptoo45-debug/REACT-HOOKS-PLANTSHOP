import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";

function PlantPage({ plants, onAddPlant, onSoldOut }) {
  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant} />

      <PlantList plants={plants} onSoldOut={onSoldOut} />
    </main>
  );
}

export default PlantPage;
