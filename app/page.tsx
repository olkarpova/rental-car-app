import css from "./page.module.css";
import Link from "next/link";

export default function Home() {
  
  return (
    <section className={css.hero}>
      <div className={css.overlay}>
        <div className={css.heroContent}>

          <div className={css.textWrapper}>
            <h1 className={css.title}>Find your perfect rental car</h1>
            <p className={css.text}>
              Reliable and budget-friendly rentals for any journey
            </p>
          </div>

          <Link href="/catalog" className={css.button}>
            View Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
