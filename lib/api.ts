import axios from "axios";
import { CarsListResponse } from "@/types/car";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

interface GetCarsParams {
    page?: number;
    brand?: string;
    rentalPrice?: string;
    minMileage?: number;
    maxMileage?: number;
}

export const getCars = async (
    params: GetCarsParams = {}
): Promise<CarsListResponse> => {
  const res = await axios.get<CarsListResponse>("/cars", {
    params,
  });
    
  return res.data;
};
