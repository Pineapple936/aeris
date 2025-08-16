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
    icon: "/iconWebsite.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="black" />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Logotype />
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
