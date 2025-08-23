"use client";
import { Provider } from "react-redux";
import { store, useAppDispatch, useAppSelector } from "@/store";
import { Header, HeaderCityName } from "@/features/Header";
import HourlyForecast from "@/features/HourlyForecast";
import DailyForecast from "@/features/DailyForecast";
import FeelsLike from "@/features/FeelsLike";
import UVIndex from "@/features/UVIndex";
import Humidity from "@/features/Humidity";
import Visibility from "@/features/Visibility";
import Wind from "@/features/Wind";
import Clouds from "@/features/Clouds";
import Pressure from "@/features/Pressure";
import Footer from "@/components/Footer";
import style from "./page.module.scss";
import { useEffect } from "react";
import { changeCityAndFetchWeather, Status } from "@/features/Header/weather.slice";
import { useTranslations } from "next-intl";

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
    const t = useTranslations("defaultCity");

    useEffect(() => {
        const storedCity = localStorage.getItem("city");
        let city: string;

        if (storedCity) city = storedCity;
        else city = t("name");

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
