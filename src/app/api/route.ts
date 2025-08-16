import {
  WeatherDaily,
  WeatherHourly,
  WeatherNow,
} from "@/components/Header/weather.slice";
import { NextResponse } from "next/server";

type WeatherApiResponse = {
  current: {
    temp: number;
    feels_like: number;
    uvi: number;
    humidity: number;
    visibility: number;
    dew_point: number;
    weather: [{ main: string; description: string }];
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    pressure: number;
    clouds: number;
  };
  daily: {
    dt: number;
    temp: { min: number; max: number };
    weather: [{ main: string }];
    pop: number;
  }[];
};

type ForecastApiResponse = {
  list: {
    dt_txt: string;
    main: { temp: number };
    weather: { main: string }[];
    pop: number;
  }[];
};

const ICONS = ["Clear", "Clouds", "Rain", "Snow", "Thunder"];

export async function POST(req: Request) {
  const { city } = await req.json();

  try {
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.API_KEY_WEATHERLY}`,
    );
    const latLon = await geoRes.json();

    if (!latLon[0]) {
      return NextResponse.json({ content: undefined });
    }

    const [weather, forecast]: [WeatherApiResponse, ForecastApiResponse] =
      await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.8/onecall?lat=${latLon[0].lat}&lon=${latLon[0].lon}&exclude=minutely,hourly,alerts&appid=${process.env.API_KEY_WEATHERLY}&units=metric&lang=ru`,
        ).then((response) => response.json()),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latLon[0].lat}&lon=${latLon[0].lon}&appid=${process.env.API_KEY_WEATHERLY}&units=metric&lang=ru`,
        ).then((response) => response.json()),
      ]);

    const now: WeatherNow = {
      temperature: Math.round(weather.current.temp),
      feelsLike: Math.round(weather.current.feels_like),
      icon: ICONS.includes(weather.current.weather[0].main)
        ? weather.current.weather[0].main
        : "Smoke",
      description: weather.current.weather[0].description,
      uvi: {
        indicator: Math.round(weather.current.uvi),
        category: getCategoryUVIndex(Math.round(weather.current.uvi)),
      },
      visibility: {
        value: Math.round(weather.current.visibility / 1000),
        category: getCategoryVisibility(
          Math.round(weather.current.visibility / 1000),
        ),
      },
      humidity: {
        value: weather.current.humidity,
        dew_point: Math.round(weather.current.dew_point),
      },
      wind: {
        speed: Math.round(weather.current.wind_speed),
        deg: Math.round(weather.current.wind_deg),
        gust: Math.round(weather.current.wind_gust),
      },
      pressure: Math.round(weather.current.pressure / 1.3333),
      clouds: weather.current.clouds,
    };

    const hourly: WeatherHourly[] = forecast.list.map((item: any) => ({
      hour: item.dt_txt.split(" ")[1].substring(0, 5),
      icon: ICONS.includes(item.weather[0].main)
        ? item.weather[0].main
        : "Smoke",
      temperature: Math.round(item.main.temp),
      pop: Math.round(item.pop * 100),
    }));

    const daily: WeatherDaily[] = [];
    for (const item of weather.daily) {
      daily.push({
        day: "",
        icon: ICONS.includes(item.weather[0].main)
          ? item.weather[0].main
          : "Smoke",
        min: Math.round(item.temp.min),
        max: Math.round(item.temp.max),
        pop: Math.round(item.pop * 100),
      });
    }
    return NextResponse.json({ content: { now, hourly, daily } });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`API weather error: ${err.message}`);
    return NextResponse.json({ content: undefined });
  }
}

function getCategoryUVIndex(indicator: number): string {
  return indicator <= 2
    ? "Низкий"
    : indicator <= 5
      ? "Умеренный"
      : indicator <= 7
        ? "Высокий"
        : indicator <= 10
          ? "Очень высокий"
          : "Экстремальный";
}

function getCategoryVisibility(value: number): string {
  return value < 1
    ? "Очень плохая"
    : value < 2
      ? "Плохая"
      : value < 4
        ? "Умеренная"
        : value < 10
          ? "Хорошая"
          : "Идеальная";
}
