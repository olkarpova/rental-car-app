import { getCars } from "@/lib/api";
import CarList from "@/components/CarList/CarList";

const Cars = async () => {

  const response = await getCars();
  console.log('catalog', response);

  return (
    <section>
      <div>
        Filter
      </div>
      <div>
        {response?.cars?.length > 0 && <CarList cars={response.cars} />}
      </div>
    </section>
  )
};

export default Cars;
