import { State } from "@/features/Header/weather.slice";

type DataFromServer = {
    content: State | undefined;
};

const DELAY_REQUEST = 10 * 60 * 1000;

export async function getWeather(city: string): Promise<State> {
    const lastRequestTimeStored = localStorage.getItem("lastRequestTime");
    const weatherDataStored = localStorage.getItem("weatherData");
    const cityStored = localStorage.getItem("city");
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

    if (lastRequestTimeStored && weatherDataStored && cityStored === city) {
        const lastRequest = JSON.parse(lastRequestTimeStored);

        if (Date.now() - lastRequest < DELAY_REQUEST) {
            return JSON.parse(weatherDataStored);
        }
    }

    const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
    });
    const data: DataFromServer = await res.json();

    if (data.content === undefined)
        return {
            city: undefined,
        } as State;

    let date = new Date();

    data.content.daily.forEach((item, indx) => {
        item.dayOfTheWeek = (date.getDay() + indx) % 7;
    });

    const dataWeather = {
        ...data.content,
        city: city,
    };

    localStorage.setItem("city", dataWeather.city);
    localStorage.setItem("weatherData", JSON.stringify(dataWeather));
    localStorage.setItem("lastRequestTime", JSON.stringify(Date.now()));

    return dataWeather;
}
