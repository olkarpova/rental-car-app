import { getCars } from "@/lib/api";
import CarList from "@/components/CarList/CarList";
import css from './page.module.css'

const Cars = async () => {

  const response = await getCars();
  console.log(response.cars[0]);

  return (
    <section className={css.section}>
      <div className={css.container}>

        <div className={css.filters}>
            Filter
        </div>

        {response?.cars?.length > 0 && (
          <div className={css.listBlock}>
            <CarList cars={response.cars} />
          </div>
        )}

        <button type="button" className={css.loadMoreBtn}>
          Load more
        </button>
      </div>
    </section>
  )
};

export default Cars;
