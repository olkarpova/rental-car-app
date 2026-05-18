"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { createRental, getCarById } from "@/lib/api";
import Image from "next/image";
import css from "./page.module.css";
import { useState } from "react";
import CheckIcon from "@/components/CheckIcon/CheckIcon";

const CarDetailsClientPage = () => {
  const { carId } = useParams<{ carId: string }>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => getCarById(carId),
    refetchOnMount: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: { name: string; email: string; comment?: string }) =>
      createRental(carId, payload),
    onSuccess: (data) => {
      setSuccessMessage(data.message);
      setSubmitError("");
      setName("");
      setEmail("");
      setComment("");
    },
    onError: () => {
      setSubmitError("Failed to send booking request. Please try again.");
      setSuccessMessage("");
    },
  });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      name,
      email,
      comment: comment.trim() || undefined,
    });
  };

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

            <form onSubmit={handleSubmit} className={css.formBlock}>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    className={css.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <textarea
                    name="comment"
                    placeholder="Comment"
                    className={css.textarea}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className={css.sendButton}
                  disabled={isPending}
                >
                  {isPending ? "Sending..." : "Send"}
                </button>

                {successMessage && (
                  <p className={css.successMessage}>{successMessage}</p>
                )}

                {submitError && (
                  <p className={css.errorMessage}>{submitError}</p>
                )}
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
                      <CheckIcon />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={css.infoSection}>
                <h2 className={css.sectionTitle}>Car Specifications:</h2>
                <ul className={css.list}>
                  <li className={css.listItem}>
                    <svg
                      className={css.specIcon}
                      width="11"
                      height="9"
                      aria-hidden="true"
                    >
                      <use href="/sprite.svg#icon-calendar" />
                    </svg>
                    <span>Year: {car.year}</span>
                  </li>
                  <li className={css.listItem}>
                    <svg
                      className={css.specIcon}
                      width="16"
                      height="16"
                      aria-hidden="true"
                    >
                      <use href="/sprite.svg#icon-car" />
                    </svg>
                    <span>Type: {car.type}</span>
                  </li>
                  <li className={css.listItem}>
                    <svg
                      className={css.specIcon}
                      width="16"
                      height="16"
                      aria-hidden="true"
                    >
                      <use href="/sprite.svg#icon-fuel" />
                    </svg>
                    <span>Fuel Consumption: {car.fuelConsumption}</span>
                  </li>
                  <li className={css.listItem}>
                    <svg
                      className={css.specIcon}
                      width="16"
                      height="16"
                      aria-hidden="true"
                    >
                      <use href="/sprite.svg#icon-gear" />
                    </svg>
                    <span>Engine: {car.engine}</span>
                  </li>
                  <li className={css.listItem}>
                    <svg
                      className={css.specIcon}
                      width="16"
                      height="16"
                      aria-hidden="true"
                    >
                      <use href="/sprite.svg#icon-alert" />
                    </svg>
                    <span>
                      Mileage: {car.mileage.toLocaleString("en-US")} km
                    </span>
                  </li>
                </ul>
              </div>

              <div className={css.infoSection}>
                <h2 className={css.sectionTitle}>Features</h2>
                <ul className={css.list}>
                  {features.map((feature) => (
                    <li key={feature} className={css.listItem}>
                      <CheckIcon />
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
