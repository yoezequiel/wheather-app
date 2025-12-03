import { WeatherCategory } from "../types/WeatherCategory";
import { mapWmoCodeToSimpleEnglish } from "../helpers/wmoToSimpleCode";
import { getCoordinatesByIpAdrress } from "./ip";
import { fetchWeatherApi } from "openmeteo";

export interface WeatherData {
    location: string;
    temperature: number;
    weather: WeatherCategory;
    humidity: number;
    wind: number;
    rain: number;
}

const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeatherData(ip: string): Promise<WeatherData> {

    const user = await getCoordinatesByIpAdrress(ip);

    const params = {
        latitude: user.loc.latitude,
        longitude: user.loc.longitude,
        hourly: ["temperature_2m", "relative_humidity_2m", "wind_speed_10m", "rain"],
        current: ["temperature_2m", "relative_humidity_2m", "wind_speed_10m", "weather_code", "rain"],
        forecast_days: 1,
    };

    const responses = await fetchWeatherApi(WEATHER_URL, params);

    const response = responses[0].current()!;

    return {
        location: `${user.region}, ${user.city}`,
        temperature: response.variables(0)!.value(),
        weather: mapWmoCodeToSimpleEnglish(response.variables(3)!.value()),
        humidity: response.variables(1)!.value(),
        wind: response.variables(2)!.value(),
        rain: response.variables(4)!.value(),
    };
}