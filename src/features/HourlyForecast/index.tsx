import WeatherCell from "@/components/WeatherCell";
import Chart from "./Chart";
import IconWeather from "../../components/IconWeather";
import { useAppSelector } from "@/store";
import style from "./index.module.scss";
import { useTranslations } from "use-intl";

export default function HourlyForecast() {
    const weatherHourly = useAppSelector((state) => state.weather.hourly);
    const t = useTranslations("hourly");

    return (
        <WeatherCell iconClass={t("iconClass")} title={t("title")}>
            <div className={style.scroll}>
                <ul className={style.wrapperTemperature}>
                    {weatherHourly.map((item, indx) => (
                        <li key={`weatherHourly-${indx}`} className={style.card}>
                            <h6>{indx === 0 ? t("now") : item.hour}</h6>
                            <div style={{ flexGrow: "1" }}>
                                <IconWeather name={item.icon} probablyRain={item.pop} />
                            </div>
                            <h4>{item.temperature}°</h4>
                        </li>
                    ))}
                </ul>
                <div className={style.wrapperChart}>
                    <Chart data={weatherHourly.flatMap((item) => item.temperature)} />
                </div>
            </div>
        </WeatherCell>
    );
}
