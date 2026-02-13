import './../css/weather-header.css'

function HeroSection() {
    return (
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