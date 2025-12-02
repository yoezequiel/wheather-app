export type WeatherCode = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'foggy';

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  weatherCode: WeatherCode;
  humidity: number;
  wind: number;
  rain: number;
  feelsLike: number;
}

export async function getWeatherData(): Promise<WeatherData> {
  // Aquí puedes cambiar el weatherCode para probar diferentes condiciones:
  // 'sunny', 'cloudy', 'rainy', 'stormy', 'snowy', 'foggy'
  return {
    location: "Buenos Aires",
    temperature: 24,
    condition: "Lluvia moderada",
    weatherCode: "rainy",
    humidity: 65,
    wind: 18,
    rain: 75,
    feelsLike: 22,
  };
}
