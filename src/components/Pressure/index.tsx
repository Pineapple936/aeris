import { useAppSelector } from "@/store";
import style from "./index.module.scss";

const MAX_PRESSURE = 1500;
const COUNT_LINES_CIRCLE = 55;
const BEGIN_DEG = -135;
const ALL_DEGS = 270;

export default function PressureGauge() {
  const pressure = useAppSelector((state) => state.weather.now.pressure);

  return (
    <article className="weatherCell">
      <header className="title">
        <p>
          <i className="bx bx-tachometer" /> ДАВЛЕНИЕ
        </p>
      </header>
      <div className={style.circle}>
        <div
          className={style.currentValue}
          style={{
            transform: `rotate(${BEGIN_DEG + Math.round((ALL_DEGS * pressure) / MAX_PRESSURE)}deg)`,
          }}
        />
        {[...Array(COUNT_LINES_CIRCLE + 1)].map((_, i) => (
          <div
            key={`pressure-${i}`}
            className={style.tick}
            style={{
              transform: `rotate(${BEGIN_DEG + (i * ALL_DEGS) / COUNT_LINES_CIRCLE}deg)`,
            }}
          />
        ))}
        <div className={style.info}>
          <p>
            {pressure}
            <br />
            мм. рт. ст.
          </p>
        </div>
        <div className={style.arrows}>
          <span>↓</span>
          <span>↑</span>
        </div>
      </div>
    </article>
  );
}
