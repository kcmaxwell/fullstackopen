import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

function CountryView({ country }) {
  const [weather, setWeather] = useState(false);

  useEffect(() => {
    if (!country.capital) return;

    const weatherUrl = "".concat(
      "https://api.openweathermap.org/data/2.5/weather?q=",
      country.capital,
      "&appid=",
      process.env.REACT_APP_API_KEY,
      "&units=metric"
    );
    axios.get(weatherUrl).then((response) => {
      setWeather(response.data);
    });
  }, [country.capital]);

  return (
    <div>
      <h2>{country.name}</h2>
      {country.capital && <p>Capital: {country.capital}</p>}
      <h3>Languages:</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="Country Flag" width="30%" />

      {weather && <Weather capital={country.capital} weather={weather} />}
    </div>
  );
}

export default CountryView;
