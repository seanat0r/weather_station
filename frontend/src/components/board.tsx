import { useEffect, useMemo, useState } from "react"
import Graph from "./graph"
import { type CurrentWeather, type WeatherHistory, getWeatherHistory } from './../services/weatherService'
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
        <MetricBox />
      </div>
    </>
  )

}

function MetricBox() {
  return (
    <>
      <h3>Forecast</h3>
      <span>⛈️</span>
      <p>It's likely to comes a storm!</p>
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