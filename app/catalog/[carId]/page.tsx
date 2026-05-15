import { getCarById } from "@/lib/api";
import {
    QueryClient,
    HydrationBoundary,
    dehydrate
} from "@tanstack/react-query";
import CarDetailsClientPage from "./CarDetailsClientPage";

type Props = {
  params: Promise<{ carId: string }>;
};

const CarDetailsPage = async ({ params }: Props) => {
  const { carId } = await params;
    // console.log("car id:", id);
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['car', carId],
        queryFn: () => getCarById(carId),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CarDetailsClientPage/>
        </HydrationBoundary>
    )
};

export default CarDetailsPage;
