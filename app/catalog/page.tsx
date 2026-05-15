import { getCars, getCarFilters } from "@/lib/api";
import CarList from "@/components/CarList/CarList";
import CatalogFilters from "@/components/CatalogFilters/CatalogFilters";
import css from "./page.module.css";

type Props = {
  searchParams: Promise<{
    page?: string;
    brand?: string;
    price?: string;
    minMileage?: string;
    maxMileage?: string;
  }>;
};

const CatalogPage = async ({ searchParams }: Props) => {
  const { page, brand, price, minMileage, maxMileage } = await searchParams;

  const currentPage = page ? Number(page) : undefined;
  const currentPrice = price ? Number(price) : undefined;
  const currentMinMileage = minMileage ? Number(minMileage) : undefined;
  const currentMaxMileage = maxMileage ? Number(maxMileage) : undefined;

  const [carsResponse, filtersResponse] = await Promise.all([
    getCars({
      page: currentPage,
      brand,
      price: currentPrice,
      minMileage: currentMinMileage,
      maxMileage: currentMaxMileage,
    }),
    getCarFilters(),
  ]);

  return (
    <section className={css.section}>
      <div className={css.container}>
        <CatalogFilters
          brands={filtersResponse.brands}
          priceRange={filtersResponse.price}
          initialBrand={brand ?? ""}
          initialPrice={price ?? ""}
          initialMinMileage={minMileage ?? ""}
          initialMaxMileage={maxMileage ?? ""}
        />

        {carsResponse?.cars?.length > 0 ? (
          <div className={css.listBlock}>
            <CarList cars={carsResponse.cars} />
          </div>
        ) : (
          <p>No cars found.</p>
        )}
      </div>
    </section>
  );
};

export default CatalogPage;

// import { getCars } from "@/lib/api";
// import CarList from "@/components/CarList/CarList";
// import css from './page.module.css'

// const Cars = async () => {

//   const response = await getCars();
//   console.log(response.cars[0]);

//   return (
//     <section className={css.section}>
//       <div className={css.container}>

//         <div className={css.filters}>
//             Filter
//         </div>

//         {response?.cars?.length > 0 && (
//           <div className={css.listBlock}>
//             <CarList cars={response.cars} />
//           </div>
//         )}

//         <button type="button" className={css.loadMoreBtn}>
//           Load more
//         </button>
//       </div>
//     </section>
//   )
// };

// export default Cars;
