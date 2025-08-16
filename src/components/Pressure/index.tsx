import { useAppSelector } from "@/store";
import style from "./index.module.scss";

const MAX_PRESSURE = 1500;
const COUNT_LINES_CIRCLE = 55;
const BEGIN_DEG = -135;

export default function PressureGauge() {
  const pressure = useAppSelector((state) => state.weather.now.pressure);

  return (
    <article className="weatherCell">
      <div className="title">
        <p>
          <i className="bx bx-tachometer"></i> ДАВЛЕНИЕ
        </p>
      </div>
      <div className={style.circle}>
        <div
          className={style.current}
          style={{
            transform: `rotate(${BEGIN_DEG + Math.round((270 * pressure) / MAX_PRESSURE)}deg)`,
          }}
        ></div>
        {[...Array(COUNT_LINES_CIRCLE + 1)].map((_, i) => (
          <div
            key={`pressure${i}`}
            className={style.tick}
            style={{
              transform: `rotate(${BEGIN_DEG + (i * 270) / COUNT_LINES_CIRCLE}deg)`,
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
