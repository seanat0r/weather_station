import { type WeatherHistory } from './../services/weatherService'

export interface GraphData {
  title: string,
  unit: string,
  data: WeatherHistory,
  dataKey: string[]
}

export const icons = {
  sun: "☀️",
  sundCloudy: "🌤️",
  rain: "🌧️",
  water: "💧",
  cloudy: "☁️",
  windy: "💨",
  snow: "❄️",
  storm: "⛈️",
  home: "🏠",
  outdoor: "📍",
  loading: "❓",
}

export const treshholdsWeatherStatus = {
  MIN_RAIN: 0,
  MIN_STORM_WIND: 15,
  MIN_SNOW_TEMP: 0,
  MIN_WINDY_WIND: 10,
  MAX_CLOUDY_PRESS: 950,
  MIN_CLOUDY_HUM: 80
}

export const METRICS = [
    { title: 'temperature', unit: 'ºC', keys: ['indoor_temp', 'outdoor_temp'], colors: ["#acd9ff","#ffb347" ] },
    { title: 'humidity', unit: '%', keys: ['indoor_hum', 'outdoor_hum'], colors: ["#acd9ff","#ffb347" ] },
    { title: 'pressure', unit: 'hPa', keys: ['indoor_press', 'outdoor_press'], colors: ["#acd9ff","#ffb347" ] },
    { title: 'rain', unit: 'mm', keys: ['rain'], colors: ["#acd9ff","#ffb347" ]},
    { title: 'windspeed', unit: 'km/h', keys: ['wind_speed'], colors: ["#acd9ff","#ffb347" ] }
  ];

export const TIMERANGE = [{time: '24h'}, {time: '1 Week'}, {time: '1 Month'}];