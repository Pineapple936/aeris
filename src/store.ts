import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { weatherReducer } from "./components/Header/weather.slice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector =
  useSelector.withTypes<ReturnType<typeof store.getState>>();
