import Image from "next/image";
import style from "./index.module.scss";

const PRECIPITATION = ["Rain", "Snow", "Thunder"];

export default function IconWeather({
  name,
  probablyRain,
}: {
  name: string;
  probablyRain: number;
}) {
  return (
    <div className={style.icon}>
      <div
        className={
          PRECIPITATION.includes(name)
            ? style.precipitation
            : style.noPrecipitation
        }
        style={{ aspectRatio: name == "Smoke" ? "41 / 32" : "1 / 1" }}
      >
        <Image src={`/icons/${name}.png`} alt={name} fill />
      </div>
      {PRECIPITATION.includes(name) && (
        <p className={style.probablyRain}>{probablyRain}%</p>
      )}
    </div>
  );
}
