import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type CurrentWeather, type WeatherHistory } from './../services/weatherService'
import '../css/weather-chart.css'
import { useMemo } from 'react';

export default function Graph({ data, metric }: { data: WeatherHistory | null, metric: any }) {
  const formattedData = useMemo(() => {
    if (!data) return [];

    return data.map((entry) => {
      const newPoint: any = {
        time: entry.timestamp,
      }
      metric.keys.forEach((key: string) => {
        newPoint[key] = entry[key as keyof CurrentWeather];
      })
      return newPoint;
    })
  }, [data, metric]);

  return (
    <div className="chart-container">
      <h3 className="chart-title">temperature progression (24h)</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#acd9ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#acd9ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'white', opacity: 0.5, fontSize: 12 }}
            />
            <YAxis
              hide={true}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '10px', color: 'white' }}
              itemStyle={{ color: '#acd9ff' }}
            />
            {metric.keys.map((keyName: string) => (
              <Area
                key={keyName}
                type="monotone"
                dataKey={keyName}
                stroke="#acd9ff"
                fill="url(#colorTemp)"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}