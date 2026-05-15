import { getCarById } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

const CarDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  console.log("car id:", id);
  const car = await getCarById(id);

  return (
    <section>
      <h1>
        {car.brand} {car.model}, {car.year}
      </h1>
      <p>{car.description}</p>
    </section>
  );
};

export default CarDetailsPage;
