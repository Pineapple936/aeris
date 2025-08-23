import WeatherCell from "@/components/WeatherCell";
import { useAppSelector } from "@/store";
import { useTranslations } from "next-intl";

export default function Clouds() {
    const clouds = useAppSelector((state) => state.weather.now.clouds);
    const descriptionId = useAppSelector((state) => state.weather.now.descriptionId);
    const tClouds = useTranslations("clouds");
    const tDescriptionId = useTranslations("descriptionId");

    return (
        <WeatherCell
            iconClass={tClouds("iconClass")}
            title={tClouds("title")}
            mainInfo={`${clouds}${tClouds("unitsOfMeasurement")}`}
            description={tDescriptionId(`${descriptionId}`)}
        />
    );
}
