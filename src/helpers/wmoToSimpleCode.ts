import { WeatherCategory } from "../types/WeatherCategory";

// Mapa que asocia validadores de códigos WMO con categorías de clima
const map: [(code: number) => boolean, WeatherCategory][] = [
    [
        (code) => code === 0,
        WeatherCategory.CLEAR_SKY
    ],
    [
        (code) => code >= 1 && code <= 3,
        WeatherCategory.CLOUDY
    ],
    [
        (code) => code >= 4 && code <= 9,
        WeatherCategory.HAZE
    ],
    [
        (code) => code >= 10 && code <= 19,
        WeatherCategory.FOG
    ],
    [
        (code) => code >= 20 && code <= 29,
        WeatherCategory.SHOWER
    ],
    [
        (code) => code >= 30 && code <= 39,
        WeatherCategory.DUST
    ],
    [
        (code) => code >= 40 && code <= 49,
        WeatherCategory.FOG
    ],
    [
        (code) => code >= 50 && code <= 59,
        WeatherCategory.DRIZZLE
    ],
    [
        (code) => code >= 60 && code <= 69,
        WeatherCategory.RAIN
    ],
    [
        (code) => code >= 70 && code <= 79,
        WeatherCategory.SNOW
    ],
    [
        (code) => code >= 80 && code <= 84,
        WeatherCategory.SHOWER
    ],
    [
        (code) => code >= 85 && code <= 86,
        WeatherCategory.SNOW
    ],
    [
        (code) => code >= 87 && code <= 89,
        WeatherCategory.SLEET
    ],
    [
        (code) => code >= 90 && code <= 99,
        WeatherCategory.THUNDERSTORM
    ],
    [
        (code) => code === 100,
        WeatherCategory.HAIL
    ]
];

/**
 * @param wmoCode El código numérico de tiempo presente de la OMM (WMO).
 * @returns Una cadena de texto de una sola palabra en inglés que describe la condición meteorológica simplificada.
 */
export function mapWmoCodeToSimpleEnglish(wmoCode: number): WeatherCategory {
    const code = Math.floor(wmoCode);

    for (const [validator, category] of map) {
        if (validator(code)) {
            return category;
        }
    }

    // Código desconocido
    return WeatherCategory.UNKNOWN;
}