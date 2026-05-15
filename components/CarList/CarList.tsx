import type { Car } from "@/types/car";
import CarItem from "../CarItem/CarItem";
import css from "./CarList.module.css";

type Props = {
  cars: Car[];
};

const CarList = ({ cars }: Props) => {
  return (
    <ul className={css.list}>
      {cars.map((car) => (
        <CarItem key={car.id} item={car} />
      ))}
    </ul>
  );
};

export default CarList;
