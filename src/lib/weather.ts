/**
 * Define las categorías simplificadas de clima en inglés.
 */
enum WeatherCategory {
  CLEAR_SKY = "Clear",
  CLOUDY = "Cloudy",
  FOG = "Fog",
  HAZE = "Haze",
  DRIZZLE = "Drizzle",
  RAIN = "Rain",
  SNOW = "Snow",
  SHOWER = "Shower",
  SLEET = "Sleet",
  THUNDERSTORM = "Thunderstorm",
  HAIL = "Hail",
  DUST = "Dust",
  UNKNOWN = "Unknown",
}

/**
 * @param wmoCode El código numérico de tiempo presente de la OMM (WMO).
 * @returns Una cadena de texto de una sola palabra en inglés que describe la condición meteorológica simplificada.
 */
function mapWmoCodeToSimpleEnglish(wmoCode: number): WeatherCategory {
  // Asegúrate de que el código sea un número entero.
  const code = Math.floor(wmoCode);

  if (code === 0) {
    // 0: Despejado
    return WeatherCategory.CLEAR_SKY;
  } else if (code >= 1 && code <= 3) {
    // 1: Parcialmente nublado, 2: Mayormente nublado, 3: Cubierto
    return WeatherCategory.CLOUDY;
  } else if (code >= 4 && code <= 9) {
    // 4-9: Visibilidad reducida (humo, neblina atmosférica)
    return WeatherCategory.HAZE;
  } else if (code >= 10 && code <= 19) {
    // 10-12: Neblina poco profunda o parches de niebla
    // 18-19: Tormenta de polvo o arena
    return WeatherCategory.FOG;
  } else if (code >= 20 && code <= 29) {
    // 20-29: Precipitación intermitente
    return WeatherCategory.SHOWER;
  } else if (code >= 30 && code <= 39) {
    // 30-39: Tormenta de arena o polvo
    return WeatherCategory.DUST;
  } else if (code >= 40 && code <= 49) {
    // 40-49: Niebla densa
    return WeatherCategory.FOG;
  } else if (code >= 50 && code <= 59) {
    // 50-59: Llovizna (Drizzle)
    return WeatherCategory.DRIZZLE;
  } else if (code >= 60 && code <= 69) {
    // 60-69: Lluvia (Rain)
    return WeatherCategory.RAIN;
  } else if (code >= 70 && code <= 79) {
    // 70-79: Nieve (Snow)
    return WeatherCategory.SNOW;
  } else if (code >= 80 && code <= 84) {
    // 80-84: Chubascos (Shower)
    return WeatherCategory.SHOWER;
  } else if (code >= 85 && code <= 86) {
    // 85-86: Chubascos de nieve (Snow)
    return WeatherCategory.SNOW;
  } else if (code >= 87 && code <= 89) {
    // 87-89: Aguanieve (Sleet)
    return WeatherCategory.SLEET;
  } else if (code >= 90 && code <= 99) {
    // 90-99: Tormenta (Thunderstorm)
    return WeatherCategory.THUNDERSTORM;
  } else if (code === 100) {
    // 100: Granizo
    return WeatherCategory.HAIL;
  }

  // Código desconocido
  return WeatherCategory.UNKNOWN;
}

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  weather: WeatherCategory;
  humidity: number;
  wind: number;
  rain: number;
  feelsLike: number;
}

export async function getWeatherData(): Promise<WeatherData> {
  return {
    location: "Buenos Aires",
    temperature: 24,
    condition: "Lluvia moderada",
    weather: WeatherCategory.CLEAR_SKY,
    humidity: 65,
    wind: 18,
    rain: 75,
    feelsLike: 22,
  };
}
