import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../css/weather-chart.css'

const data = [
  { time: '00:00', temp: 12 },
  { time: '04:00', temp: 10 },
  { time: '08:00', temp: 15 },
  { time: '12:00', temp: 22 },
  { time: '16:00', temp: 24 },
  { time: '20:00', temp: 18 },
  { time: '23:59', temp: 14 },
];

function Tile() {
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

function Graph() {
    return (
        <div className="chart-container">
      <h3 className="chart-title">temperature progression (24h)</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#acd9ff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#acd9ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: 'white', opacity: 0.5, fontSize: 12}} 
            />
            <YAxis 
              hide={true} 
              domain={['auto', 'auto']} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '10px', color: 'white' }}
              itemStyle={{ color: '#acd9ff' }}
            />
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="#acd9ff" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTemp)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
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