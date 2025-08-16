import IconWeather from "../IconWeather";
import { useAppSelector } from "@/store";
import style from "./index.module.scss";

export default function HourlyForecast() {
  const weatherHourly = useAppSelector((state) => state.weather.hourly);

  return (
    <article className="weatherCell">
      <header className="title">
        <p>
          <i className="bx bx-time-five" />
          ПОЧАСОВОЙ ПРОГНОЗ
        </p>
      </header>
      <ul
        className={`content ${style.wrapper}`}
        style={{ flexDirection: "row" }}
      >
        {weatherHourly.map((item, indx) => (
          <li key={`weatherHourly-${indx}`} className={style.card}>
            <p className={style.time}>{indx === 0 ? "Сейчас" : item.hour}</p>
            <div style={{ flexGrow: "1" }}>
              <IconWeather name={item.icon} probablyRain={item.pop} />
            </div>
            <p>{item.temperature}°</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
