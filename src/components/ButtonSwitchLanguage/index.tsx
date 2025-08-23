import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function ButtonSwitchLanguage() {
    const locale = useLocale();

    return (
        <Link
            href="/"
            locale={locale == "ru" ? "en" : "ru"}
            aria-label={`Switch to ${locale == "ru" ? "English" : "Russian"}`}
        >
            <p style={{ fontSize: "1.3em" }}>{locale == "ru" ? "🇷🇺" : "🇬🇧"}</p>
        </Link>
    );
}
