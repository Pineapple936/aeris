import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Logotype from "@/components/Logotype";
import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
    title: "Aeris — Прогноз погоды онлайн",
    description:
        "Aeris — актуальный прогноз погоды на сегодня, завтра и неделю. Узнайте температуру, осадки, ветер и другие данные для вашего города в реальном времени.",
    keywords: [
        "aeris",
        "погода",
        "прогноз погоды",
        "онлайн погода",
        "температура",
        "осадки",
        "ветер",
        "влажность",
        "погода сегодня",
        "погода завтра",
    ],
    authors: [{ name: "Pineapple936" }],
    openGraph: {
        title: "Aeris — Прогноз погоды онлайн",
        description:
            "Подробный и точный прогноз погоды для любого города. Температура, осадки, ветер — всё в одном месте.",
        url: "https://my-aeris.vercel.app",
        siteName: "Aeris",
        images: [
            {
                url: "https://my-aeris.vercel.app/openGraph.jpg",
                width: 1200,
                height: 630,
                alt: "Aeris — прогноз погоды",
            },
        ],
        locale: "ru_RU",
        type: "website",
    },
    icons: {
        icon: "/favicon.jpg",
    },
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    let messages;
    try {
        messages = (await import(`../../../messages/${locale}.json`)).default;
    } catch {
        notFound();
    }

    return (
        <html lang={locale}>
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="black" />
                <link
                    href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                    rel="stylesheet"
                />
            </head>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Logotype />
                    <div id="root">{children}</div>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
