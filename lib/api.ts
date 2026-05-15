import axios from "axios";
import { CarsListResponse, Car } from "@/types/car";

axios.defaults.baseURL = "https://car-rental-api.goit.study";

interface GetCarsParams {
  page?: number;
  brand?: string;
  rentalPrice?: string;
  minMileage?: number;
  maxMileage?: number;
}

export const getCars = async (
  params: GetCarsParams = {},
): Promise<CarsListResponse> => {
  const res = await axios.get<CarsListResponse>("/cars", {
    params,
  });

  return res.data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const res = await axios.get<Car>(`/cars/${id}`);
  return res.data;
};
