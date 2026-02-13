import './../css/weather-header.css'
import { type CurrentWeather, type dailyWeather, getCurrentData, getDailyWeather } from './../services/weatherService.ts'
import { icons } from './../config/config'
import { useEffect, useState } from 'react'
import { getWeatherStatus } from './../services/calculateOverallWeather.ts'

interface StatRowDataProps {
    max: number | undefined;
    min?: number | null;
    unit: string;
}

interface StatRowProps {
    title: string;
    iconTop: string;
    maxTop?: number;
    minTop?: number | null;
    unitTop: string;
    iconBottom: string;
    maxBottom?: number;
    minBottom?: number | null;
    unitBottom: string;
}


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
    const icon = iconPacket?.icon || icons.loading;
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



function StatRowData({ max, min, unit }: StatRowDataProps) {
    return (
        <div className="temp-minmax">
            <span className="temp-up">
            {max !== undefined ? `${max}${unit}` : '--'}
            </span>
            {min !== undefined && min !== null && (
                <>
                    <span className="temp-separator">/</span>
                    <span className="temp-down">{min}{unit}</span>
                </>
            )}
        </div>
    )
}

function StatRow({ title, iconTop, maxTop, minTop, unitTop, iconBottom, maxBottom, minBottom, unitBottom }: StatRowProps) {
    return (
        <div className="stat-group">
            <p className="stat-label">{title}</p>
            {/* Top Row */}
            <div className="temp-row">
                <span className="loc-icon">{iconTop}</span>
                <StatRowData max={maxTop} min={minTop} unit={unitTop} />
            </div>

            <div className="stat-divider"></div>
            {/* Bottom Row */}
            <div className="temp-row">
                <span className="loc-icon">{iconBottom}</span>
                <StatRowData max={maxBottom} min={minBottom} unit={unitBottom} />
            </div>
        </div>
    );
}

export default function WeatherHeader() {
    const [dailyWeather, setDailyWeather] = useState<dailyWeather | null>(null);
    
    useEffect ( () => {
        const fetchWeather = async () => {
            const data = await getDailyWeather();
            setDailyWeather(data);
        };
        fetchWeather();
    }, []);

    return (
        <header className="weather-header">
            <HeroSection />

            <div className='stats-grid'>
                {/* Box 1: Temperaturen (Klassisch Indoor/Outdoor) */}
                <StatRow 
                    title="Temperature Today"
                    iconTop={icons.home}
                    maxTop={dailyWeather?.max_temp_in}
                    minTop={dailyWeather?.min_temp_in}
                    unitTop="°C"
                    iconBottom={icons.outdoor}
                    maxBottom={dailyWeather?.max_temp_out}
                    minBottom={dailyWeather?.min_temp_out}
                    unitBottom="°C"
                />

                {/* Box 2: Wind & Regen kombiniert */}
                <StatRow 
                    title="Wind & Rain"
                    iconTop={icons.windy}
                    maxTop={dailyWeather?.max_wind}
                    unitTop=" km/h"
                    iconBottom={icons.water}
                    maxBottom={dailyWeather?.total_rain}
                    unitBottom=" mm"
                />
            </div>
        </header>
    );
}