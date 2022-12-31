import React from "react";

function Weather({ capital, weather }) {
  const weatherIconUrl = "".concat(
    "http://openweathermap.org/img/wn/",
    weather.weather[0].icon,
    "@2x.png"
  );

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.main.temp} Celsius</p>
      <img src={weatherIconUrl} alt="Weather Icon" />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
}

export default Weather;
