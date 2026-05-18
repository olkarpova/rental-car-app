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

  const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (brand) params.set("brand", brand);

    if (price) params.set("price", price);

    if (minMileage) params.set("minMileage", minMileage);

    if (maxMileage) params.set("maxMileage", maxMileage);

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

  const start = Math.ceil(priceRange.min / 10) * 10;
  const end = Math.floor(priceRange.max / 10) * 10;

  const priceOptions = Array.from(
    { length: (end - start) / 10 + 1 },
    (_, index) => start + index * 10,
  );

  return (
    <form className={css.filtersWrap} onSubmit={handleSearch}>
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
                ${priceItem}
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
        <button type="submit" className={css.searchBtn}>
          Search
        </button>
      </div>
      <button type="button" className={css.resetBtn} onClick={handleReset}>
        Clear filters
      </button>
    </form>
  );
};

export default CatalogFilters;
