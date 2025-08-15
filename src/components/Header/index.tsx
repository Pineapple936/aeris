"use client";
import { useState, useRef } from "react";
import style from "./index.module.scss";
import { changeCityAndFetchWeather } from "./weather.slice";
import { useAppDispatch, useAppSelector } from "@/store";

export function Header() {
  const weather = useAppSelector((state) => state.weather);

  return (
    <section className={style.wrapper}>
      <HeaderCityName />
      <p className={style.temperature}>
        {weather.now.temperature ? weather.now.temperature + "°" : ""}
      </p>
      <p className={style.description}>{weather.now.description}</p>
    </section>
  );
}

export function HeaderCityName() {
  const [window, setWindow] = useState<"button" | "input">("button");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.weather.city);

  const handleInput = function (event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key == "Enter" && inputRef.current?.value.trim()) {
      dispatch(changeCityAndFetchWeather(inputRef.current?.value ?? ""));
      setWindow("button");
    }
  };

  return (
    <>
      <article className={style.cityName}>
        {window == "button" ? (
          <button onClick={() => setWindow("input")}>{city}</button>
        ) : (
          <input
            type="text"
            ref={inputRef}
            onKeyDown={handleInput}
            onBlur={() => setWindow("button")}
            autoFocus
          />
        )}
      </article>
    </>
  );
}
