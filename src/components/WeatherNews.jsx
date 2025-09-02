import { useEffect, useState } from "react";

function WeatherNews({ city }) {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeatherNews = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/news.json?key=YOUR_API_KEY&q=${city}`
        );
        const data = await response.json();
        setNews(data.articles);
      } catch (err) {
        setError("Failed to fetch weather news.");
      }
    };

    if (city) fetchWeatherNews();
  }, [city]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="weather-news">
      <h2>🌦 Latest Weather News</h2>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherNews;
