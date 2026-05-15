import type { Car } from "@/types/car";
import css from "./CarItem.module.css";
import Image from "next/image";
import Link from "next/link";

type Props = {
  item: Car;
};

const CarItem = ({ item }: Props) => {
    //   const { city, country } = item.location;
    const city = item.location?.city ?? "";
  const country = item.location?.country ?? "";

  return (
    <li className={css.card}>
      <div className={css.imageBlock}>
        <div className={css.heart}>
          <Image
            src="/icons/heart.svg"
            alt="Favorite icon"
            width={16}
            height={16}
            className={css.heartIcon}
          />
        </div>
        <Image
          src={item.img}
          alt={`${item.brand} ${item.model}`}
          fill
          sizes="276px"
          className={css.image}
        />
      </div>

      <div className={css.infoBlock}>
        <div className={css.nameRow}>
          <p className={css.name}>
            {item.brand} <span className={css.model}>{item.model}</span>,{" "}
            {item.year}
          </p>
          <p className={css.price}>${item.rentalPrice}</p>
        </div>
        <div className={css.detailsBlock}>
          <p className={css.detailsLine}>
            {city} | {country} | {item.rentalCompany}
          </p>
          <p className={css.detailsLine}>
            {item.type} | {item.mileage.toLocaleString("en-US")} km
          </p>
        </div>
      </div>
      <Link
        href={`/catalog/${item.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className={css.button}
      >
        Read more
      </Link>
    </li>
  );
};
export default CarItem;
