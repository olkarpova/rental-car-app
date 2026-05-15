"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import css from "./CatalogFilters.module.css";

type Props = {
  brands: string[];
  priceRange: {
    min: number;
    max: number;
  };
  initialBrand: string;
  initialPrice: string;
  initialMinMileage: string;
  initialMaxMileage: string;
};

const CatalogFilters = ({
  brands,
  priceRange,
  initialBrand,
  initialPrice,
  initialMinMileage,
  initialMaxMileage,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [brand, setBrand] = useState(initialBrand);
  const [price, setPrice] = useState(initialPrice);
  const [minMileage, setMinMileage] = useState(initialMinMileage);
  const [maxMileage, setMaxMileage] = useState(initialMaxMileage);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("page");

    if (brand) params.set("brand", brand);
    else params.delete("brand");

    if (price) params.set("price", price);
    else params.delete("price");

    if (minMileage) params.set("minMileage", minMileage);
    else params.delete("minMileage");

    if (maxMileage) params.set("maxMileage", maxMileage);
    else params.delete("maxMileage");

    const queryString = params.toString();
    router.push(queryString ? `/catalog?${queryString}` : "/catalog");
  };

  const handleReset = () => {
    setBrand("");
    setPrice("");
    setMinMileage("");
    setMaxMileage("");

    router.push("/catalog");
  };

  const priceOptions = Array.from(
    { length: priceRange.max - priceRange.min + 1 },
    (_, index) => priceRange.min + index
  );

  return (
    <div className={css.filtersWrap}>
      <div className={css.filtersRow}>
        <div className={`${css.fieldGroup} ${css.fieldGroupBrand}`}>
          <label className={css.label} htmlFor="brand">
            Car brand
          </label>
          <select
            id="brand"
            className={css.select}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="">Choose a brand</option>
            {brands.map((brandItem) => (
              <option key={brandItem} value={brandItem}>
                {brandItem}
              </option>
            ))}
          </select>
        </div>

        <div className={`${css.fieldGroup} ${css.fieldGroupPrice}`}>
          <label className={css.label} htmlFor="price">
            Price / 1 hour
          </label>
          <select
            id="price"
            className={css.select}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="">Choose a price</option>
            {priceOptions.map((priceItem) => (
              <option key={priceItem} value={String(priceItem)}>
                {priceItem}
              </option>
            ))}
          </select>
        </div>

        <div className={`${css.fieldGroup} ${css.fieldGroupMileage}`}>
          <label className={css.label}>Car mileage / km</label>
          <div className={css.mileageWrap}>
            <input
              type="number"
              placeholder="From"
              value={minMileage}
              onChange={(e) => setMinMileage(e.target.value)}
              className={css.inputFrom}
            />

            <input
              type="number"
              placeholder="To"
              value={maxMileage}
              onChange={(e) => setMaxMileage(e.target.value)}
              className={css.inputTo}
            />
          </div>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.searchBtn}
            onClick={handleSearch}
          >
            Search
          </button>

          <button
            type="button"
            className={css.resetBtn}
            onClick={handleReset}
          >
            Clear filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogFilters;