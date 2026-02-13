import './../css/weather-header.css'
import { type CurrentWeather, getCurrentData } from './../services/weatherService.ts'
import { icons } from './../config/config'
import { useEffect, useState } from 'react'
import { getWeatherStatus } from './../services/calculateOverallWeather.ts'

function HeroHelperDisplay({ value }: { value: null | undefined | number}) {
    if (value === undefined || value === null) {
        return <span className='temp-value'>...</span>
    } else {
        return <span className='temp-value'>{value}°C</span>
    }
}

function HeroSection() {
    const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
    const iconPacket = currentWeather ? getWeatherStatus(currentWeather) : null;
    const icon = iconPacket?.icon || "❓";
    const label = iconPacket?.label || "Lade...";

    useEffect(() => {
        const fetchWeather = async () => {
        const data = await getCurrentData();
        setCurrentWeather(data);
    };

        fetchWeather();
    }, []);
    

    return (
         <div className="hero-section">
                <div className="main-temp">
                    <HeroHelperDisplay value={currentWeather?.outdoor_temp} />
                    <p className="location-label">{icons.outdoor} Erlinsbach</p>
                </div>
                
                <div className="weather-status">
                    <span className="status-icon">{icon}</span>
                    <p className="status-text">{label}</p>
                </div>

                <div className="main-temp indoor">
                    <HeroHelperDisplay value={currentWeather?.indoor_temp} />
                    <p className="location-label">{icons.home} Indoor</p>
                </div>
            </div>
    )
}
function StatRow() {
    return (
        <div className="stat-group">
            <p className="stat-label">Max / Min Today</p>
                <div className="temp-row">
                    <span className="loc-icon">🏠</span>
                    <StatRowData />
                    </div>
                    <div className="stat-divider"></div>
                <div className="temp-row">
                    <span className="loc-icon">📍</span>
                    <StatRowData />
                </div>
        </div>
    )
}

function StatRowData() {
    return (
        <div className="temp-minmax">
            <span className="temp-up">↑ 22°</span>
            <span className="temp-separator">/</span>
            <span className="temp-down">↓ 18°</span>
        </div>
    )
}
export default function WeatherHeader() {
    return (
        <header className="weather-header">
            <HeroSection />
            <div className="stats-grid">
                <StatRow />
                
                <StatRow />
            </div>
        </header>
    );
}