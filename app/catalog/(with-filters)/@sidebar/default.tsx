import { getCarFilters } from "@/lib/api";
import CatalogFilters from "@/components/CatalogFilters/CatalogFilters";

type Props = {
  searchParams: Promise<{
    brand?: string;
    price?: string;
    minMileage?: string;
    maxMileage?: string;
  }>;
};

const CatalogSidebar = async ({ searchParams }: Props) => {
  const { brand, price, minMileage, maxMileage } = await searchParams;
  const filtersResponse = await getCarFilters();

  return (
    <CatalogFilters
      brands={filtersResponse.brands}
      priceRange={filtersResponse.price}
      initialBrand={brand ?? ""}
      initialPrice={price ?? ""}
      initialMinMileage={minMileage ?? ""}
      initialMaxMileage={maxMileage ?? ""}
    />
  );
};

export default CatalogSidebar;
