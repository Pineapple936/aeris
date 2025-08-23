"use client";
import { useState, useRef } from "react";
import style from "./index.module.scss";
import { changeCityAndFetchWeather } from "./weather.slice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useTranslations } from "next-intl";

export function Header() {
    const weatherTemperature = useAppSelector((state) => state.weather.now.temperature);
    const descriptionId = useAppSelector((state) => state.weather.now.descriptionId);
    const t = useTranslations("descriptionId");

    return (
        <section className={style.wrapper}>
            <HeaderCityName />
            {weatherTemperature && <h2 className={style.temperature}>{weatherTemperature}°</h2>}
            <h3 className={style.description}>{t(`${descriptionId}`)}</h3>
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
            <h1 className={style.cityName}>
                {window == "button" ? (
                    <button onClick={() => setWindow("input")}>{city}</button>
                ) : (
                    <input
                        type="text"
                        ref={inputRef}
                        onKeyDown={handleInput}
                        onBlur={() => setWindow("button")}
                        autoFocus
                        style={{ animation: "none" }}
                    />
                )}
            </h1>
        </>
    );
}
