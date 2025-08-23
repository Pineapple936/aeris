import WeatherCell from "@/components/WeatherCell";
import IconWeather from "../../components/IconWeather";
import { useAppSelector } from "@/store";
import style from "./index.module.scss";
import { useTranslations } from "next-intl";

export default function DailyForecast() {
    const weatherDaily = useAppSelector((state) => state.weather.daily);
    const t = useTranslations("daily");

    return (
        <WeatherCell iconClass={t("iconClass")} title={t("title")}>
            <ul>
                {weatherDaily.map((item, indx) => (
                    <li key={`weatherDaily-${indx}`} className={style.rowElementInfo}>
                        <h4 className={style.dayOfTheWeek}>
                            {indx === 0 ? t("today") : t(`daysOfTheWeek.${item.dayOfTheWeek}`)}
                        </h4>
                        <div className={style.iconWrapper}>
                            <IconWeather name={item.icon} probablyRain={item.pop} />
                        </div>
                        <div className={style.temperature}>
                            <span>{item.min}°</span>
                            <span>{item.max}°</span>
                        </div>
                    </li>
                ))}
            </ul>
        </WeatherCell>
    );
}
