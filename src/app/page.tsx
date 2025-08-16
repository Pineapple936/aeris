"use client";
import { Provider } from "react-redux";
import { store, useAppDispatch, useAppSelector } from "@/store";
import { Header, HeaderCityName } from "@/components/Header";
import HourlyForecast from "@/components/HourlyForecast";
import DailyForecast from "@/components/DailyForecast";
import FeelsLike from "@/components/FeelsLike";
import UVIndex from "@/components/UVIndex";
import Humidity from "@/components/Humidity";
import Visibility from "@/components/Visibility";
import Wind from "@/components/Wind";
import Clouds from "@/components/Clouds";
import Pressure from "@/components/Pressure";
import Footer from "@/components/Footer";
import style from "./page.module.scss";
import { useEffect } from "react";
import {
  changeCityAndFetchWeather,
  Status,
} from "@/components/Header/weather.slice";

export default function Home() {
  return (
    <Provider store={store}>
      <HomeContent />
    </Provider>
  );
}

function HomeContent() {
  const status = useAppSelector((state) => state.weather.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedCity = localStorage.getItem("city");
    let city: string;

    if (storedCity) city = storedCity;
    else city = "Москва";

    dispatch(changeCityAndFetchWeather(city));
  }, [dispatch]);

  if (status === Status.failed) return <HeaderCityName />;
  else if (status === Status.succeeded)
    return (
      <>
        <Header />
        <section className={style.info}>
          <HourlyForecast />
          <DailyForecast />
          <div className={style.line}>
            <FeelsLike />
            <UVIndex />
          </div>
          <div className={style.line}>
            <Visibility />
            <Humidity />
          </div>
          <Wind />
          <div className={style.line}>
            <Clouds />
            <Pressure />
          </div>
        </section>
        <Footer />
      </>
    );
}
