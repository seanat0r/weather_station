import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type CurrentWeather, type WeatherHistory } from './../services/weatherService'
import '../css/weather-chart.css'
import { useMemo } from 'react';

export default function Graph({ data, metric, timerange }: { data: WeatherHistory | null, metric: any, timerange: string }) {
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
      <h3 className="chart-title">{metric.title} in {metric.unit} ({timerange})</h3>
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              {metric.colors.map((color: string, i: number) => {
                return (<linearGradient
                key={`gradient-${i}`}
                id={`color-${i}`}
                x1="0" y1="0" x2="0" y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
                )
              })}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="time"
              axisLine={true}
              tickLine={true}
              tickFormatter={(timeStr) => {
                if (!timeStr) return ""
                const date = new Date(timeStr);

                if (timerange === '24h') {
                  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }
                if (timerange === '1 Week') {
                  return date.toLocaleDateString([], { day: '2-digit', month: "2-digit" })
                }
                if (timerange === '1 Month') {
                  return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' })
                }
                return "";
              }}
              tick={{ fill: 'white', opacity: 0.5, fontSize: 12 }}
            />
            <YAxis
              hide={false}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '10px', color: 'white' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value: number | undefined) => {
                if (value === undefined) return `N/A`;
                return `${value} ${metric.unit}`;
              }}
            />
            {metric.keys.map((keyName: string, i: number) => (
              <Area
                key={keyName}
                type="monotone"
                dataKey={keyName}
                stroke={metric.colors[i]}
                fill={`url(#color-${i})`}
                connectNulls={true}
                strokeWidth={3}
                fillOpacity={1}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}