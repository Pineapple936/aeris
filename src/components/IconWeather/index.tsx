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
            <div className={style.image}>
                <Image src={`/icons/${name}.png`} alt={name} fill sizes="100px" />
            </div>
            {PRECIPITATION.includes(name) && <p className={style.probablyRain}>{probablyRain}%</p>}
        </div>
    );
}
