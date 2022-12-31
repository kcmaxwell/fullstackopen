import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const showCountryPage = (event) => {
    setFilter(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div>
        Find countries: <input value={filter} onChange={handleFilterChange} />
      </div>
      <div>
        {filteredCountries.length === 1 ? (
          <div>
            <h2>{filteredCountries[0].name}</h2>
            <p>Capital: {filteredCountries[0].capital}</p>
            <ul>
              {filteredCountries[0].languages.map((language) => (
                <li key={language.name}>{language.name}</li>
              ))}
            </ul>
            <img src={filteredCountries[0].flag} alt="Country Flag" />
          </div>
        ) : filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          filteredCountries.map((country) => (
            <p key={country.name}>
              {country.name}{" "}
              <button value={country.name} onClick={showCountryPage}>
                Show
              </button>
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
