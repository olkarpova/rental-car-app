import axios from "axios";
import { CarsListResponse, Car } from "@/types/car";

axios.defaults.baseURL = "https://car-rental-api.goit.study";

export type CarFiltersResponse = {
    brands: string[];
    price: {
        min: number;
        max: number;
    }
}

interface GetCarsParams {
  page?: number;
  perPage?: number;
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

export const getCars = async (
  params: GetCarsParams = {},
): Promise<CarsListResponse> => {
    const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== "")
    );
    
  const res = await axios.get<CarsListResponse>("/cars", {
    params: cleanParams,
  });

  return res.data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const res = await axios.get<Car>(`/cars/${id}`);
  return res.data;
};

export const getCarFilters = async (
): Promise<CarFiltersResponse> => {
    const res = await axios.get<CarFiltersResponse>("/cars/filters");
    return res.data;
};
