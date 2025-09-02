import React from "react";
import "./WeatherBackground.css";

const WeatherBackground = ({ weatherCode }) => {
  const isSunny = weatherCode === 0;
  const isCloudy = [1, 2, 3].includes(weatherCode);
  const isRain = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode);
  const isSnow = [71, 73, 75, 77, 85, 86].includes(weatherCode);

  return (
    <div className="weather-background">
      {isSunny && <div className="sun"></div>}
      {isCloudy && (
        <>
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
        </>
      )}
      {isRain &&
        Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="raindrop"></div>
        ))}
      {isSnow &&
        Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="snowflake">❄</div>
        ))}
    </div>
  );
};

export default WeatherBackground;
