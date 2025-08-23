import WeatherCell from "@/components/WeatherCell";
import { useAppSelector } from "@/store";
import style from "./index.module.scss";
import { useTranslations } from "next-intl";

export default function UVIndex() {
    const uvi = useAppSelector((state) => state.weather.now.uvi);
    const t = useTranslations("uvindex");

    function getDescriptionText(category: number): string {
        const hour = new Date().getHours();
        if (hour < 9) return t("description.morning");
        else if (hour < 16 && category != 0) return t("description.afternoon");
        else return t("description.low");
    }

    return (
        <WeatherCell
            iconClass={t("iconClass")}
            title={t("title")}
            mainInfo={`${uvi.indicator}\n${t(`category.${uvi.category}`)}`}
            description={getDescriptionText(uvi.category)}
        >
            <div
                className={style.progressBar}
                style={
                    { "--progress": uvi.indicator } as React.CSSProperties & {
                        "--progress": number;
                    }
                }
            />
        </WeatherCell>
    );
}
