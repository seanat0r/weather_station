import { useEffect, useState } from "react"
import Graph from "./graph"
import { type WeatherHistory, getWeatherHistory } from './../services/weatherService'
import { type GraphData, icons } from "./../config/config"

function Tile() {
  const [dailyData, setDailyData] = useState<WeatherHistory | null>(null);
  const [weeklyData, setWeeklyData] = useState<WeatherHistory | null>(null);
  const [monthlyData, setMonthlyData] = useState<WeatherHistory | null>(null); 
  const task = [{time: '24', setter: 'setDailyData'}, {time: '1W', setter: 'setWeeklyData'}, {time: '1M', setter: 'setMonthlyData'}];

  useEffect ((time:string, setter) => {
    const fetchWeather = async () => {
      const data = await getWeatherHistory(time)
      setter(data);
    }
    fetchWeather(time, setter);
  })

  function mappingApiCalls() {

  }
  
  }
    return (
        <>
            <div className="tile">
              {/* Graphen durch mappen */}
                <Graph /> {/* 24 h temp */}
                <Graph /> {/* 07 d temp */}
                <Graph /> {/* 01 M temp */}
                <Graph /> {/* 24 h hum */}
                <Graph /> {/* 07 d hum */}
                <Graph /> {/* 01 M hum */}
                <Graph /> {/* 24 h press */}
                <Graph /> {/* 07 d press*/}
                <Graph /> {/* 01 M press*/}
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