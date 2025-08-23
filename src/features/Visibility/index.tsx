import WeatherCell from "@/components/WeatherCell";
import { useAppSelector } from "@/store";
import { useTranslations } from "next-intl";

export default function Visibility() {
    const visibility = useAppSelector((state) => state.weather.now.visibility);
    const t = useTranslations("visibility");

    return (
        <WeatherCell
            iconClass={t("iconClass")}
            title={t("title")}
            mainInfo={`${visibility.value == 10 ? visibility.value + "+" : visibility.value} ${t(
                "unitsOfMeasurement",
            )}`}
            description={t("description", { category: t(`category.${visibility.category}`) })}
        />
    );
}
