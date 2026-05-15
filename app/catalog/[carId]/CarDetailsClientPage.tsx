"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getCarById } from "@/lib/api";
import Image from "next/image";
import css from "./page.module.css";

const CarDetailsClientPage = () => {
  const { carId } = useParams<{ carId: string }>();

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => getCarById(carId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error || !car) return <p>Some error..</p>;

  const city = car.location?.city ?? "";
  const country = car.location?.country ?? "";
  const rentalConditions = car.rentalConditions ?? [];
  const features = car.features ?? [];

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.columns}>
          <div className={css.leftColumn}>
            <div className={css.imageWrapper}>
              <Image
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                width={640}
                height={512}
                className={css.image}
                priority
              />
            </div>

            <form className={css.formBlock}>
              <div className={css.formHeader}>
                <h2 className={css.formTitle}>Book your car now</h2>
                <p className={css.formText}>
                  Stay connected! We are always ready to help you.
                </p>
              </div>

              <div className={css.formFields}>
                <div className={css.inputsForm}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    className={css.input}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    className={css.input}
                  />
                  <textarea
                    name="comment"
                    placeholder="Comment"
                    className={css.textarea}
                  />
                </div>

                <button type="submit" className={css.sendButton}>
                  Send
                </button>
              </div>
            </form>
          </div>

          <div className={css.rightColumn}>
            <div className={css.details}>
              <div className={css.titleRow}>
                <div className={css.titleLine}>
                  <h1 className={css.title}>
                    {car.brand} {car.model}, {car.year}
                  </h1>
                  <p className={css.article}>Article: 9582</p>
                </div>

                <p className={css.location}>
                  {city}, {country}
                </p>
                <p className={css.price}>${car.rentalPrice}</p>
              </div>

              <p className={css.description}>{car.description}</p>
            </div>

            <div className={css.infoCar}>
              <div className={css.infoSection}>
                <h2 className={css.sectionTitle}>Rental Conditions:</h2>
                <ul className={css.list}>
                  {rentalConditions.map((condition) => (
                    <li key={condition} className={css.listItem}>
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={css.infoSection}>
                <h2 className={css.sectionTitle}>Car Specifications:</h2>
                <ul className={css.list}>
                  <li className={css.listItem}>Year: {car.year}</li>
                  <li className={css.listItem}>Type: {car.type}</li>
                  <li className={css.listItem}>
                    Fuel Consumption: {car.fuelConsumption}
                  </li>
                  <li className={css.listItem}>Engine: {car.engine}</li>
                  <li className={css.listItem}>
                    Mileage: {car.mileage.toLocaleString("en-US")} km
                  </li>
                </ul>
              </div>

              <div className={css.infoSection}>
                <h2 className={css.sectionTitle}>Features</h2>
                <ul className={css.list}>
                  {features.map((feature) => (
                    <li key={feature} className={css.listItem}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetailsClientPage;
