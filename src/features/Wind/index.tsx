import WeatherCell from "@/components/WeatherCell";
import { useAppSelector } from "@/store";
import style from "./index.module.scss";
import { useTranslations } from "use-intl";

const COUNT_DASH = 72;

export default function Wind() {
    const wind = useAppSelector((state) => state.weather.now.wind);
    const t = useTranslations("wind");
    const DIRECTIONS: { label: string; deg: number }[] = [
        { label: t("cardinalDirections.N"), deg: 0 },
        { label: t("cardinalDirections.E"), deg: 90 },
        { label: t("cardinalDirections.S"), deg: 180 },
        { label: t("cardinalDirections.W"), deg: 270 },
    ];

    return (
        <WeatherCell iconClass={t("iconClass")} title={t("title")} flex="row">
            <div className={style.infoWrapper}>
                <p className={style.info}>
                    <span>{t("speed")}</span>
                    <span>
                        {wind.speed} {t("unitsOfMeasurement")}
                    </span>
                </p>
                <hr />
                <p className={style.info}>
                    <span>{t("gust")}</span>
                    <span>
                        {wind.gust} {t("unitsOfMeasurement")}
                    </span>
                </p>
                <hr />
                <p className={style.info}>
                    <span>{t("direction")}</span>
                    <span>{wind.deg}°</span>
                </p>
            </div>
            <div className={style.wrapperCompass}>
                <div className={style.compass}>
                    {[...Array(COUNT_DASH)].map((_, i) => (
                        <div
                            key={`dash-${i}`}
                            className={style.dash}
                            style={{ transform: `rotate(${(i * 360) / COUNT_DASH}deg)` }}
                        />
                    ))}
                    {DIRECTIONS.map((item, indx) => (
                        <b
                            key={`direction-${indx}`}
                            className={style.direction}
                            style={{ "--deg": `${item.deg}deg` } as React.CSSProperties}
                        >
                            <span style={{ opacity: ".8" }}>{item.label}</span>
                        </b>
                    ))}
                    <div
                        className={style.arrow}
                        style={{ transform: `rotate(${wind.deg + 180}deg)` }}
                    />
                    <div className={style.blockInfo}>
                        <p>
                            {wind.speed}
                            <br />
                            {t("unitsOfMeasurement")}
                        </p>
                    </div>
                </div>
            </div>
        </WeatherCell>
    );
}
