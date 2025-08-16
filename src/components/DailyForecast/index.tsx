import IconWeather from "../IconWeather";
import { useAppSelector } from "@/store";
import style from "./index.module.scss";

export default function DailyForecast() {
  const weatherDaily = useAppSelector((state) => state.weather.daily);

  return (
    <article className="weatherCell">
      <header className="title">
        <p>
          <i className="bx bx-calendar" /> ПРОГНОЗ ПОГОДЫ НА 8 ДНЕЙ
        </p>
      </header>
      <ul className="content" style={{ paddingBottom: "0" }}>
        {weatherDaily.map((item, indx) => (
          <li key={`weatherDaily-${indx}`} className={style.lineInfo}>
            <p className={style.dayOfTheWeek}>
              {indx === 0 ? "Сегодня" : item.day}
            </p>
            <div className={style.iconWrapper}>
              <IconWeather name={item.icon} probablyRain={item.pop} />
            </div>
            <div className={style.temperature}>
              <span className="opacityText">{item.min}°</span>
              <span>{item.max}°</span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
