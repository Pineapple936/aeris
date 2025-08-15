import { useAppSelector } from "@/store";
import style from "./index.module.scss"

type DifferenceTemperature = {
  comparison: "less" | "more"
  value: number
}

export default function FeelsLike() {
  const feelsLike = useAppSelector((state) => state.weather.now.feelsLike);
  const currentTemperature = useAppSelector((state) => state.weather.now.temperature);
  const difference: DifferenceTemperature = {
    comparison: feelsLike > currentTemperature ? "more" : "less",
    value: Math.abs(feelsLike - currentTemperature)
  };

  return (
    <article className={`weatherCell`}>
      <header className="title">
          <p> <i className="bx bxs-thermometer" />ОЩУЩАЕТСЯ КАК</p>
      </header>
      <div className="content">
        <h1>{feelsLike}°</h1>
        {difference.value != 0 && <>
        <p style={{"opacity": ".5", "fontSize": "1.2rem"}}>Фактически: {currentTemperature}°</p>
        <article className={style.differenceTemperature} style={{
          "--color": difference.comparison == "less" ? "#49b8b7ff" : "#E6643B", "--beforePosition": difference.comparison == "less" ? "99.5%" : "0"
        } as React.CSSProperties}>
          <div className={style.line} style={{[difference.comparison == "less" ? "right" : "left"]: "0", "width": `${Math.min(Math.max(Math.abs(difference.value) * 10, 30), 100)}%`
        }} />
          <div
            className={style.temperature}
            style={{[difference.comparison == "less" ? "right" : "left"]: `${Math.min(Math.max(Math.abs(difference.value) * 10, 35), 100)}%`
          }}
          >
            <i className={`bx bx-${difference.comparison == "less" ? "down" : "up"}-arrow-alt`} />{difference.value}°
          </div>
        </article>
        <p className="description">По ощущениям {difference.comparison == "less" ? "прохладнее из-за ветра" : "теплее из-за влажности"}</p>
        </>}
      </div>
    </article>
  );
}
