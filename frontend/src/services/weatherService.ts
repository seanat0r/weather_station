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

export async function getCurrentData() {
    try {
        const response = await fetch(`${import.meta.env.VITE_WEATHER_API}/current`);
        if (!response.ok) {
            console.warn("HTTP Error: " + response.status);
            return null;
        }
        const data = await response.json();
        return {
            timestamp: data.timestamp,
            indoor_temp: data.indoor_temp,
            indoor_hum: data.indoor_hum,
            indoor_press: data.indoor_press,
            outdoor_temp: data.outdoor_temp,
            outdoor_hum: data.outdoor_hum,
            outdoor_press: data.outdoor_press,
            rain: data.rain,
            wind_speed: data.wind_speed
    };
        
    } catch (err) {
        console.warn("Network error: " + err)
        return null;
    }
}

/**
     * Get Collection of Weather data from the Backend
     * * @param "Input valid: '24' , '1M' , '1W'"
     * @returns a promise with a list of weather data
     */
export async function getWeatherHistory(time:string) {
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