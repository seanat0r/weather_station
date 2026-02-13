export interface CurrentWeather {
    id: number,
    timestamp: string,
    indoor_temp: number,
    indoor_hum: number,
    indoor_press: number,
    outdoor_temp: number,
    outdoor_hum: number,
    outdoor_press: number,
    rain: number,
    wind_speed: number
}
export type WeatherHistory = CurrentWeather[];

export interface dailyWeather {
  max_temp_in: number,
  max_temp_out: number,
  max_wind: number,
  min_temp_in: number,
  min_temp_out: number,
  total_rain: number
}

export type TotalRain = number;

export interface ForecastItem {
    outdoor_press: number;
}

export type Forecast = ForecastItem[];

export async function getCurrentData(): Promise<CurrentWeather | null> {
    try {
        const response = await fetch(`${import.meta.env.VITE_WEATHER_API}/current`);
        if (!response.ok) {
            console.warn("HTTP Error: " + response.status);
            return null;
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn("Network error: " + err)
        return null;
    }
}

/**
     * Get Collection of Weather data from the Backend.
     * 24 -> last 24h,
     * 1W -> last 1 Week,
     * 1M -> last 1 Month
     * @param "Input valid: '24' , '1M' , '1W'"
     * @returns a promise with a list of weather data
     */
export async function getWeatherHistory(time:string): Promise<WeatherHistory | null> {
    const validInput = ['24', '1M', '1W'];
    let urlEndPoint = "";
    if (!validInput.includes(time)) {
        console.warn("Wrong Input! Only 24, 1M or 1W: Input: " + time);
        return null
    }
    switch (time) {
        case '24':
        urlEndPoint = "history_24";
        break;

        case '1W':
        urlEndPoint = "history_1_week";
        break;

        case '1M':
        urlEndPoint = "history_1_month";
        break;
    }

    try {

        const response = await fetch(`${import.meta.env.VITE_WEATHER_API}/${urlEndPoint}`);
        if (!response.ok) {
            console.warn("HTTP Error: " + response.status);
            return null;
        }
        const data = await response.json();

        return data;
    } catch (err) {
        console.warn("Network error: " + err)
        return null;
    }
}

export async function getDailyWeather(): Promise<dailyWeather | null> {
    try {
        const response = await fetch(`${import.meta.env.VITE_WEATHER_API}/daily`);
        if (!response.ok) {
            console.warn("HTTP Error: " + response.status);
            return null;
        }
        const data = await response.json();
        return  data;
        
    } catch (err) {
        console.warn("Network error: " + err)
        return null;
    }
}

export async function getTotalRain(): Promise<TotalRain | null> {
    try {
        const response = await fetch(`${import.meta.env.VITE_WEATHER_API}/rain`);
        if (!response.ok) {
            console.warn("HTTP Error: " + response.status);
            return null;
        }
        const data = await response.json();
        return  data;
        
    } catch (err) {
        console.warn("Network error: " + err)
        return null;
    }
}

export async function getForecast(): Promise<Forecast | null> {
    try {
        const response = await fetch(`${import.meta.env.VITE_WEATHER_API}/forecast`);
        if (!response.ok) {
            console.warn("HTTP Error: " + response.status);
            return null;
        }
        const data = await response.json();
        return  data;
        
    } catch (err) {
        console.warn("Network error: " + err)
        return null;
    }
}