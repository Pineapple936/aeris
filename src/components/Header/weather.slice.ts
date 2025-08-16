import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { getWeather } from "@/utils/getWeather";

export enum Status {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

type CityName = string | undefined;

export type WeatherNow = {
  temperature: number;
  icon: string;
  description: string;
  feelsLike: number;
  uvi: {
    indicator: number;
    category: string;
  };
  visibility: {
    value: number;
    category: string;
  };
  humidity: {
    value: number;
    dew_point: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  pressure: number;
  clouds: number;
};

export type WeatherHourly = {
  hour: string;
  icon: string;
  temperature: number;
  pop: number;
};

export type WeatherDaily = {
  day: string;
  icon: string;
  min: number;
  max: number;
  pop: number;
};

export type State = {
  city: CityName;
  now: WeatherNow;
  hourly: WeatherHourly[];
  daily: WeatherDaily[];
  status?: Status;
};

const initialStateWeather: State = {
  city: "",
  now: {
    temperature: 0,
    icon: "",
    description: "",
    feelsLike: 0,
    uvi: {
      indicator: 0,
      category: "",
    },
    visibility: {
      value: 0,
      category: "",
    },
    humidity: {
      value: 0,
      dew_point: 0,
    },
    wind: {
      speed: 0,
      gust: 0,
      deg: 0,
    },
    pressure: 0,
    clouds: 0,
  },
  hourly: [],
  daily: [],
  status: Status.idle,
};

export const changeCityAndFetchWeather = createAsyncThunk(
  "weather/changeCityAndFetchWeather",
  async (city: string) => {
    const data = await getWeather(city);
    return data;
  },
);

export const weatherReducer = createReducer(initialStateWeather, (builder) => {
  builder
    .addCase(changeCityAndFetchWeather.pending, (state) => {
      state.status = Status.loading;
    })
    .addCase(changeCityAndFetchWeather.fulfilled, (state, action) => {
      if (!action.payload.city) {
        state.city = "Не знаю такого города";
        state.status = Status.failed;
        return;
      }

      state.city = action.payload.city;
      state.now = action.payload.now;
      state.hourly = action.payload.hourly;
      state.daily = action.payload.daily;
      state.status = Status.succeeded;
    });
});
