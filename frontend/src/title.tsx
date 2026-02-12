import './css/weather-header.css'

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
                    <div className="stat-values">
                        <span className="max-temp">↑ 30°</span>
                        <span className="min-temp">↓ 1°</span>
                    </div>
                </div>
                
                <div className="stat-group">
                    <p className="stat-label">Wind & Rain</p>
                    <div className="stat-values">
                        <span>🌬️ 23 km/h</span>
                        <span>💧 1 L</span>
                    </div>
                </div>
            </div>
        </header>
    );
}