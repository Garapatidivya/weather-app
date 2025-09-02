import "./WeatherCard.css";

const getWeatherIcon = (code) => {
  if (code === 0) return "☀️"; 
  if ([1, 2, 3].includes(code)) return "⛅"; 
  if ([45, 48].includes(code)) return "🌫"; 
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧"; 
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️"; 
  return "🌍";
};

function WeatherCard({ weather }) {
  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="weather-card-horizontal">
      <div className="weather-icon-large">{getWeatherIcon(weather.weathercode)}</div>

      <div className="weather-info">
        <h2 className="city-name">{weather.city}</h2>
        <p className="temperature">{weather.temperature}°C</p>

        <div className="weather-details-horizontal">
          <div className="detail-badge">💨 {weather.windspeed} km/h</div>
          <div className="detail-badge">💧 {weather.humidity}%</div>
          <div className="detail-badge">🌅 {formatTime(weather.sunrise)}</div>
          <div className="detail-badge">🌇 {formatTime(weather.sunset)}</div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
