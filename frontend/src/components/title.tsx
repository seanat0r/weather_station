import './../css/weather-header.css'

export default function WeatherHeader() {
    return (
        <header className="weather-header">
            <div className="hero-section">
                <div className="main-temp">
                    <span className="temp-value">8°C</span>
                    <p className="location-label">📍 Erlinsbach</p>
                </div>
                
                <div className="weather-status">
                    <span className="status-icon">🌧️</span>
                    <p className="status-text">Rain</p>
                </div>

                <div className="main-temp indoor">
                    <span className="temp-value">22°C</span>
                    <p className="location-label">🏠 Indoor</p>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-group">
                    <p className="stat-label">Max / Min Today</p>
                    <div className="temp-row">
                        <span className="loc-icon">🏠</span>
                        <div className="temp-minmax">
                            <span className="temp-up">↑ 22°</span>
                            <span className="temp-separator">/</span>
                            <span className="temp-down">↓ 18°</span>
                        </div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="temp-row">
                        <span className="loc-icon">📍</span>
                        <div className="temp-minmax">
                            <span className="temp-up">↑ 30°</span>
                            <span className="temp-separator">/</span>
                            <span className="temp-down">↓ 1°</span>
                        </div>
                    </div>
                </div>
                
                <div className="stat-group">
                    <p className="stat-label">Conditions</p>
                    <div className="temp-row">
                        <span className="loc-icon">💨</span>
                        <div className="temp-minmax">
                            <span className="wind-value">23 <small>km/h</small></span>
                        </div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="temp-row">
                        <span className="loc-icon">💧</span>
                        <div className="temp-minmax">
                            <span className="rain-value">1.2 <small>L</small></span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}