import { WeatherCategory } from "../types/WeatherCategory";
import { mapWmoCodeToSimpleEnglish } from "../helpers/wmoToSimpleCode";
import { getCoordinatesByIpAdrress, type ApiResponseSchema as IPApiResponse } from "./ip";
import { fetchWeatherApi } from "openmeteo";
import cache from "./cache";
import { atom } from "nanostores";

export interface WeatherData {
    location: string;
    temperature: number;
    weather: WeatherCategory;
    humidity: number;
    wind: number;
    rain: number;
}

const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

const $data = atom<WeatherData & { createdAt: string } | undefined>();

function getParams(user: IPApiResponse) {
    return {
        latitude: user.loc.latitude,
        longitude: user.loc.longitude,
        hourly: ["temperature_2m", "relative_humidity_2m", "wind_speed_10m", "rain"],
        current: ["temperature_2m", "relative_humidity_2m", "wind_speed_10m", "weather_code", "rain"],
        forecast_days: 1,
    };
}

async function getUser(ip: string): Promise<IPApiResponse> {
    let user = await cache.get<IPApiResponse>(`ip:${ip}`);

    if (!user) {
        user = await getCoordinatesByIpAdrress(ip);
        await cache.set(`ip:${ip}`, user, { ex: 10 * 60 });
    }

    return user;
}

export async function getWeatherData(ip: string): Promise<WeatherData> {

    const old_data = $data.get();

    if (old_data) {
        const createdAt = new Date(old_data.createdAt).getTime();
        const now = Date.now();
        const threeMinutes = 3 * 60 * 1000; // 3 minutes in milliseconds

        if (now - createdAt < threeMinutes) {
            return {
                location: old_data.location,
                temperature: old_data.temperature,
                weather: old_data.weather,
                humidity: old_data.humidity,
                wind: old_data.wind,
                rain: old_data.rain,
            };
        }
    }

    const user = await getUser(ip);

    const params = getParams(user);

    const responses = await fetchWeatherApi(WEATHER_URL, params);

    const response = responses[0].current()!;

    const newData: WeatherData = {
        location: `${user.region}, ${user.city}`,
        temperature: response.variables(0)!.value(),
        weather: mapWmoCodeToSimpleEnglish(response.variables(3)!.value()),
        humidity: response.variables(1)!.value(),
        wind: response.variables(2)!.value(),
        rain: response.variables(4)!.value(),
    };

    $data.set({ ...newData, createdAt: new Date().toISOString() });

    return newData;
}