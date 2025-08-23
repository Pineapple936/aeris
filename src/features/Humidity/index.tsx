import WeatherCell from "@/components/WeatherCell";
import { useAppSelector } from "@/store";
import { useTranslations } from "next-intl";

export default function Humidity() {
    const humidity = useAppSelector((state) => state.weather.now.humidity);
    const t = useTranslations("humidity");

    return (
        <WeatherCell
            iconClass={t("iconClass")}
            title={t("title")}
            mainInfo={`${humidity.value}${t("unitsOfMeasurement")}`}
            description={t("dewPoint", { dewPoint: humidity.dew_point })}
        />
    );
}
