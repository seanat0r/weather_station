import { useEffect, useMemo, useState } from "react"
import Graph from "./graph"
import { type CurrentWeather, type WeatherHistory, type Forecast, getWeatherHistory, getForecast } from './../services/weatherService'
import { icons, METRICS, TIMERANGE } from "./../config/config"

function Tile() {
  const [dailyData, setDailyData] = useState<WeatherHistory | null>(null);
  const [weeklyData, setWeeklyData] = useState<WeatherHistory | null>(null);
  const [monthlyData, setMonthlyData] = useState<WeatherHistory | null>(null);
  const task = [{ time: '24', setter: setDailyData, state: dailyData },
  { time: '1W', setter: setWeeklyData, state: weeklyData },
  { time: '1M', setter: setMonthlyData, state: monthlyData }
  ];
  
  

  useEffect(() => {
    const fetchAllWeather = async () => {
      task.forEach(async (item) => {
        const data = await getWeatherHistory(item.time);
        item.setter(data);
      })
    }
    fetchAllWeather()
  }, [])

  return (
    <>
      <div className="tile">
        {METRICS.map((metric: any) => (
          task.map((item: any, index: number) => (
            <Graph
             key={`${metric.title}-${item.time}`}
             data={item.state}
             metric={metric}
             timerange={TIMERANGE[index].time}
             />
          ))
        ))}
        <MetricBox />
      </div>
    </>
  )

}

function MetricBox() {
  const [forecastPressure, setForecastPressure] = useState<Forecast | null>(null);
  const forecast = calculateForecast();

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getForecast();
      setForecastPressure(data);
    }
    fetchWeather();
  }, [])

  function calculateForecast() {
    if (!forecastPressure || forecastPressure.length < 2) return {
      text: "Loading",
      icon: icons.loading,
    };
    const nowPressure: number = forecastPressure[0].outdoor_press;
    const passtPressure: number = forecastPressure[1].outdoor_press;

    const delta: number = nowPressure - passtPressure;

    if (delta > 1.5) return { text: "Sunny", icon: icons.sun };
    if (delta > 0.5) return { text: "weather improvement", icon: icons.sundCloudy };
    if (delta < -1.5) return { text: "Storm is comming", icon: icons.storm };
    if (delta < -0.5) return { text: "worsening", icon: icons.rain };
  
    return { text: "stable", icon: icons.cloudy };
  }

  return (
    <>
      <h3>Forecast</h3>
      <span>{forecast?.icon}</span>
      <p>{forecast?.text}</p>
    </>
  )
}

export default function Board() {
  return (
    <>
      <Tile />
    </>
  )
}