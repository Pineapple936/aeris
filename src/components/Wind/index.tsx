import { useAppSelector } from "@/store";
import style from "./index.module.scss";

type Direction = {
  label: "С" | "В" | "Ю" | "З";
  deg: number;
};

const DIRECTIONS: Direction[] = [
  { label: "С", deg: 0 },
  { label: "В", deg: 90 },
  { label: "Ю", deg: 180 },
  { label: "З", deg: 270 },
];
const COUNT_DASH = 72;

export default function Wind() {
  const wind = useAppSelector((state) => state.weather.now.wind);

  return (
    <article className="weatherCell">
      <header className="title">
        <p>
          <i className="bx bx-wind" />
          ВЕТЕР
        </p>
      </header>
      <div className="content">
        <div style={{ display: "flex", gap: "20px" }}>
          <div className={style.infoWrapper}>
            <p className="description">
              <span>Ветер</span>
              <span className="opacityText">{wind.speed} м/с</span>
            </p>
            <hr />
            <p className="description">
              <span>Порывы ветра</span>
              <span className="opacityText">{wind.gust} м/с</span>
            </p>
            <hr />
            <p className="description">
              <span>Направление</span>
              <span className="opacityText">{wind.deg}°</span>
            </p>
          </div>
          <div className={style.wrapperCompass}>
            <div className={style.compass}>
              {[...Array(COUNT_DASH)].map((_, i) => (
                <div
                  key={`dash-${i}`}
                  className={style.dash}
                  style={{ transform: `rotate(${i * 360 / COUNT_DASH}deg)` }}
                />
              ))}
              {DIRECTIONS.map((item, indx) => (
                <b
                  key={`direction-${indx}`}
                  className={`${style.direction} colorCell`}
                  style={{ "--deg": `${item.deg}deg` } as React.CSSProperties}
                >
                  {item.label}
                </b>
              ))}
              <div
                className={style.arrow}
                style={{ transform: `rotate(${wind.deg + 180}deg)` }}
              />
              <div className={`${style.blockInfo} colorCell`}>
                <p style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                  {wind.speed}
                  <br />
                  м/с
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
