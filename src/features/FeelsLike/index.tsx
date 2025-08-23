import WeatherCell from "@/components/WeatherCell";
import { useAppSelector } from "@/store";
import style from "./index.module.scss";
import { useTranslations } from "next-intl";

type DifferenceTemperature = {
    position: "left" | "right";
    value: number;
};

export default function FeelsLike() {
    const feelsLike = useAppSelector((state) => state.weather.now.feelsLike);
    const currentTemperature = useAppSelector((state) => state.weather.now.temperature);
    const difference: DifferenceTemperature = {
        position: feelsLike > currentTemperature ? "left" : "right",
        value: Math.abs(feelsLike - currentTemperature),
    };
    const t = useTranslations("feelsLike");

    return (
        <WeatherCell
            iconClass={t("iconClass")}
            title={t("title")}
            mainInfo={`${feelsLike}${t("unitsOfMeasurement")}`}
            description={
                difference.value !== 0 &&
                t("feelings", {
                    value: difference.position == "right" ? t("colder") : t("warmer"),
                })
            }
        >
            {difference.value != 0 && (
                <>
                    <h5 className={style.factTemperature}>
                        {t("fact", { value: currentTemperature })}
                    </h5>
                    <div
                        className={style.differenceTemperature}
                        style={
                            {
                                "--color": difference.position == "right" ? "#49b8b7ff" : "#E6643B",
                                "--beforeClassPosition":
                                    difference.position == "right" ? "99.5%" : "0",
                            } as React.CSSProperties
                        }
                    >
                        <div
                            className={style.progressLine}
                            style={{
                                [difference.position]: "0",
                                width: `clamp(25%, ${Math.abs(difference.value) * 10}%, 100%)`,
                            }}
                        >
                            <div
                                className={style.temperature}
                                style={{
                                    [difference.position]: "95%",
                                }}
                            >
                                {difference.position == "left" ? "↑" : "↓"} {difference.value}°
                            </div>
                        </div>
                    </div>
                </>
            )}
        </WeatherCell>
    );
}
