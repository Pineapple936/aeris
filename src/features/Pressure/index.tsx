import WeatherCell from "@/components/WeatherCell";
import { useAppSelector } from "@/store";
import style from "./index.module.scss";
import { useTranslations } from "next-intl";

const CENTER_PRESSURE = 760;
const COUNT_LINES_CIRCLE = 55;
const BEGIN_DEG = -135;
const ALL_DEGS = 270;

export default function PressureGauge() {
    const pressure = useAppSelector((state) => state.weather.now.pressure);
    const t = useTranslations("pressure");

    return (
        <WeatherCell iconClass={t("iconClass")} title={t("title")}>
            <div className={style.circle}>
                <div
                    className={style.currentValue}
                    style={{
                        transform: `rotate(clamp(${BEGIN_DEG}deg, ${
                            (pressure - CENTER_PRESSURE) * 2
                        }deg, ${-BEGIN_DEG}deg))`,
                    }}
                />
                {[...Array(COUNT_LINES_CIRCLE + 1)].map((_, i) => (
                    <div
                        key={`pressure-${i}`}
                        className={style.tick}
                        style={{
                            transform: `rotate(${
                                BEGIN_DEG + (i * ALL_DEGS) / COUNT_LINES_CIRCLE
                            }deg)`,
                        }}
                    />
                ))}
                <div className={style.info}>
                    <h5>
                        {pressure}
                        <br />
                        {t("unitsOfMeasurement")}
                    </h5>
                </div>
                <div className={style.arrows}>
                    <span>↓</span>
                    <span>↑</span>
                </div>
            </div>
        </WeatherCell>
    );
}
