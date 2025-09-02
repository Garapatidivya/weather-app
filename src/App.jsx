import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import HourlyStrip from "./components/HourlyStrip";
import DetailsCard from "./components/DetailsCard";
import Footer from "./components/Footer";
import WeatherBackground from "./components/WeatherBackground";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    try {
      setError("");
      setWeather(null);

      const q = cityName?.trim();
      if (!q) {
        setError("Please enter a city name.");
        return;
      }

      // 1) Geocoding
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        q
      )}&count=1&language=en&format=json`;
      const geoRes = await fetch(geoUrl);
      if (!geoRes.ok) throw new Error("Geocoding request failed.");
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found.");
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2) Weather
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode,relativehumidity_2m&daily=sunrise,sunset&timezone=auto&forecast_days=2`;
      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) throw new Error("Weather request failed.");
      const weatherData = await weatherRes.json();

      if (
        !weatherData.current_weather ||
        !weatherData.hourly ||
        !Array.isArray(weatherData.hourly.time) ||
        !Array.isArray(weatherData.hourly.temperature_2m) ||
        !Array.isArray(weatherData.hourly.weathercode)
      ) {
        throw new Error("Unexpected weather data shape.");
      }

      const nowIso = weatherData.current_weather.time;
      const now = new Date(nowIso);
      const times = weatherData.hourly.time;
      const temps = weatherData.hourly.temperature_2m;
      const codes = weatherData.hourly.weathercode;

      let startIdx = times.findIndex((t) => new Date(t) >= now);
      if (startIdx === -1) startIdx = 0;

      const endIdx = Math.min(startIdx + 12, times.length);
      const nextTimes = times.slice(startIdx, endIdx);
      const nextTemps = temps.slice(startIdx, endIdx);
      const nextCodes = codes.slice(startIdx, endIdx);

      setWeather({
        city: `${name}, ${country}`,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        winddirection: weatherData.current_weather.winddirection,
        weathercode: weatherData.current_weather.weathercode,
        humidity: weatherData.hourly.relativehumidity_2m[0],
        sunrise: weatherData.daily.sunrise[0],
        sunset: weatherData.daily.sunset[0],
        hourly: nextTemps,
        hourlyCodes: nextCodes,
        hourlyTimes: nextTimes,
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try another city or check your internet.");
    }
  };

  const getBackground = (code) => {
    if (code === 0) return "from-yellow-300 to-orange-400";
    if ([1, 2, 3].includes(code)) return "from-gray-300 to-gray-500";
    if ([45, 48].includes(code)) return "from-gray-600 to-gray-800";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
      return "from-blue-500 to-blue-800";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "from-blue-200 to-white";
    return "from-blue-400 to-indigo-500";
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 bg-gradient-to-r ${getBackground(
        weather?.weathercode
      )}`}
    > 
      {/* Background animation */}
      <WeatherBackground weatherCode={weather?.weathercode} />
      <h1 className="center-heading">Weather Now</h1>

      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />

      {error && <p className="text-white-90 mt-4">{error}</p>}

      {weather && (
        <>
          <WeatherCard weather={weather} />
          <HourlyStrip
            hourly={weather.hourly}
            codes={weather.hourlyCodes}
            times={weather.hourlyTimes}
          />
          <DetailsCard weather={weather} />

          {/* Weather Tips */}
          <div className="weather-news">
            <h2>Weather Tips Today</h2>
            <ul>
              <li>🌞 Apply sunscreen if sunny.</li>
              <li>☔ Carry an umbrella if rainy.</li>
              <li>❄️ Wear warm clothes if snowing.</li>
            </ul>
          </div>

          {/* Dynamic Weather Alerts */}
          {weather.weathercode === 0 && weather.temperature > 35 && (
            <div className="system-visibility">
              🌞 <span>Heat Alert!</span> Stay hydrated and avoid direct sun.
            </div>
          )}

          {[51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weather.weathercode) && (
            <div className="system-visibility">
              ☔ <span>Rain Alert!</span> Carry an umbrella and drive carefully.
            </div>
          )}

          {[71, 73, 75, 77, 85, 86].includes(weather.weathercode) && (
            <div className="system-visibility">
              ❄️ <span>Snow Alert!</span> Wear warm clothes and be cautious on roads.
            </div>
          )}

          {weather.windspeed > 50 && (
            <div className="system-visibility">
              ⚠️ <span>High Wind Alert!</span> Stay indoors if possible.
            </div>
          )}
        </>
      )}
    
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
