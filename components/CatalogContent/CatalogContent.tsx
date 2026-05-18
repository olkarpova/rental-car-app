"use client";
import { getCars } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import CarList from "../CarList/CarList";
import css from "./CatalogContent.module.css"

type Props = {
  brand?: string;
  price?: string;
  minMileage?: string;
  maxMileage?: string;
};

export default function CatalogContent({
  brand,
  price,
  minMileage,
  maxMileage,
}: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    isLoading,
    isFetched,
  } = useInfiniteQuery({
    queryKey: ["cars", brand, price, minMileage, maxMileage],
    queryFn: ({ queryKey, pageParam }) => {
      const [
        ,
        currentBrand,
        currentPrice,
        currentMinMileage,
        currentMaxMileage,
      ] = queryKey;
      return getCars({
        page: pageParam,
        brand: currentBrand || undefined,
        price: currentPrice ? Number(currentPrice) : undefined,
        minMileage: currentMinMileage ? Number(currentMinMileage) : undefined,
        maxMileage: currentMaxMileage ? Number(currentMaxMileage) : undefined,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastResponse) => {
      const nextPage = lastResponse.page + 1;
      return nextPage <= lastResponse.totalPages ? nextPage : undefined;
    },
    // enabled: brand !== "" || price !== "" || minMileage !== "" || maxMileage !== "",
    select: (data) => {
      return {
        ...data,
        cars: data.pages.flatMap((page) => page.cars),
      };
    },
  });
  console.log(data);
  const cars = data?.cars ?? [];
  const hasCars = cars.length > 0;
  const showNoResults = isFetched && !isError && !hasCars;

  return (
    <>
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {showNoResults && <p>No cars found.</p>}
      {hasCars && (
        <>
          <CarList cars={cars} />
          <button
            type="button"
            className={css.loadMoreBtn}
            onClick={() => {
              fetchNextPage();
            }}
            disabled={isFetching || !hasNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
                ? "Load more"
                : "Nothing more to load"}
          </button>
        </>
      )}
    </>
  );
}
