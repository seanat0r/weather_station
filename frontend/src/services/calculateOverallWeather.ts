import { icons, treshholdsWeatherStatus as tresh } from './../config/config.ts';
import { type CurrentWeather } from './../services/weatherService.ts'

interface IconPacket {
    icon: string,
    label: string,
}


export function getWeatherStatus(weatherObj: CurrentWeather): IconPacket {
    if (weatherObj.rain > tresh.MIN_RAIN && weatherObj.wind_speed > tresh.MIN_STORM_WIND) {
        return {icon: icons.storm, label: "Storm"};
    } else if (weatherObj.rain > tresh.MIN_RAIN && weatherObj.outdoor_temp <= tresh.MIN_SNOW_TEMP) {
        return {icon: icons.snow, label: "Snow"};
    } else if (weatherObj.rain > tresh.MIN_RAIN) {
        return {icon: icons.rain, label: "Rain"};
    } else if (weatherObj.wind_speed > tresh.MIN_WINDY_WIND) {
        return {icon: icons.windy, label: "Windy"};
    } else if (weatherObj.outdoor_press < tresh.MAX_CLOUDY_PRESS || weatherObj.outdoor_hum > tresh.MIN_CLOUDY_HUM) {
        return {icon: icons.cloudy, label: "Cloudy"};
    } else {
        return {icon: icons.sun, label: "Sun"};
    }
}