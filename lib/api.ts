import axios from "axios";
import { CarsListResponse, Car } from "@/types/car";

axios.defaults.baseURL = "https://car-rental-api.goit.study";

export type CarFiltersResponse = {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
};

interface GetCarsParams {
  page?: number;
  perPage?: number;
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

export const getCars = async ({
  page = 1,
  perPage = 12,
  brand,
  price,
  minMileage,
  maxMileage,
}: GetCarsParams = {}): Promise<CarsListResponse> => {
  const cleanParams = Object.fromEntries(
    Object.entries({
      page,
      perPage,
      brand,
      price,
      minMileage,
      maxMileage,
    }).filter(([, value]) => value !== undefined && value !== ""),
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

export const getCarFilters = async (): Promise<CarFiltersResponse> => {
  const res = await axios.get<CarFiltersResponse>("/cars/filters");
  return res.data;
};

export interface BookingRequestPayload {
  name: string;
  email: string;
  comment?: string;
}

export interface BookingResponse {
  message: string;
}

export const createRental = async (
  carId: string,
  payload: BookingRequestPayload,
): Promise<BookingResponse> => {
  const res = await axios.post<BookingResponse>(
    `/cars/${carId}/booking-requests`,
    payload,
  );
    
  return res.data;
};
