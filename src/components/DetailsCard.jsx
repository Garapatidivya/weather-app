import "./DetailsCard.css";

function DetailsCard({ weather }) {
  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const details = [
    { title: "🌡 Temperature", value: `${weather.temperature} °C`, explanation: "Current air temperature" },
    { title: "💨 Wind Speed", value: `${weather.windspeed} km/h`, explanation: "Current wind speed" },
    { title: "🧭 Wind Direction", value: `${weather.winddirection}°`, explanation: "Direction wind is blowing from" },
    { title: "💧 Humidity", value: `${weather.humidity}%`, explanation: "Relative humidity at current time" },
    { title: "🌅 Sunrise", value: formatTime(weather.sunrise), explanation: "Local sunrise time" },
    { title: "🌇 Sunset", value: formatTime(weather.sunset), explanation: "Local sunset time" },
    { title: "📍 Location", value: weather.city, explanation: "Selected city and country" },
  ];

  return (
    <div className="details-card-container">
      <h3 className="text-3xl font-bold text-center mb-8 text-blue-700">Weather Details</h3>
      <div className="details-card-grid">
        {details.map((item, idx) => (
          <div key={idx} className="detail-box">
            <h4 className="detail-title">{item.title}</h4>
            <p className="detail-value">{item.value}</p>
            <p className="detail-explanation">{item.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailsCard;
