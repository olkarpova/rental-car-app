import CatalogContent from "@/components/CatalogContent/CatalogContent";

type Props = {
  searchParams: Promise<{
    brand?: string;
    price?: string;
    minMileage?: string;
    maxMileage?: string;
  }>;
};

const CatalogPage = async ({ searchParams }: Props) => {
  const { brand, price, minMileage, maxMileage } = await searchParams;

  return (
    <CatalogContent
      brand={brand}
      price={price}
      minMileage={minMileage}
      maxMileage={maxMileage}
    />
  );
};

export default CatalogPage;