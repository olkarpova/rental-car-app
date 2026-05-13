import type { Car } from '@/types/car';
import CarItem from '../CarItem/CarItem';

type Props = {
    cars: Car[];
};

const CarList = ({cars}: Props) => {
    return (
        <ul>
            {cars.map((car) => (
                <CarItem key={car.id} item={car} />
            ))}
        </ul>
    );
}

export default CarList;
