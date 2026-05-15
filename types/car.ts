export interface Location {
  country: string;
  city: string;
  address: string;
}

export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engine: string;
  features?: string[];
  rentalPrice: string;
  rentalCompany: string;
  location?: Location;
  rentalConditions?: string[];
  mileage: number;
}

export interface CarsListResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}
