import { useEffect, useMemo, useState } from "react"
import Graph from "./graph"
import { type WeatherHistory, getWeatherHistory } from './../services/weatherService'
import { type GraphData, icons } from "./../config/config"

function Tile() {
  const [dailyData, setDailyData] = useState<WeatherHistory | null>(null);
  const [weeklyData, setWeeklyData] = useState<WeatherHistory | null>(null);
  const [monthlyData, setMonthlyData] = useState<WeatherHistory | null>(null);
  const task = [{ time: '24', setter: setDailyData, state: dailyData },
  { time: '1W', setter: setWeeklyData, state: weeklyData },
  { time: '1M', setter: setMonthlyData, state: monthlyData }
  ];
  const METRICS = [
    { title: 'temperature', unit: 'ºC', keys: ['indoor_temp', 'outdoor_temp'] },
    { title: 'humidity', unit: '%', keys: ['indoor_hum', 'outdoor_hum'] },
    { title: 'pressure', unit: 'hPa', keys: ['indoor_press', 'outdoor_press'] },
    { title: 'rain', unit: 'mm', keys: ['rain'] },
    { tilte: 'windspeed', unit: 'km/h', keys: ['wind_speed'] }
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
        {/* Graphen durch mappen */}
        <Graph data={dailyData} metric={METRICS[0]} /> {/* 24 h temp */}
        <Graph data={weeklyData} metric={METRICS[0]} /> {/* 07 d temp */}
        <Graph data={monthlyData} metric={METRICS[0]} /> {/* 01 M temp */}
        <Graph data={dailyData} metric={METRICS[1]} /> {/* 24 h hum */}
        <Graph data={weeklyData} metric={METRICS[1]} /> {/* 07 d hum */}
        <Graph data={monthlyData} metric={METRICS[1]} /> {/* 01 M hum */}
        <Graph data={dailyData} metric={METRICS[2]} /> {/* 24 h press */}
        <Graph data={weeklyData} metric={METRICS[2]} /> {/* 07 d press*/}
        <Graph data={monthlyData} metric={METRICS[2]} /> {/* 01 M press*/}
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