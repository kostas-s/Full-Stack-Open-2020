import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CountryName = ({country}) => {
    return <h1>{country.name}</h1>
}

const Capital = ({country}) => {
    return <p>capital {country.capital}</p>
}

const Population = ({country}) => {
    return <p>population {country.population}</p>
}

const Languages = ({country}) => {
    return (
      <div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(lang => <li key={lang['name']}>{lang['name']}</li>)}
      </ul>
      </div>
    )
}

const Flag = ({country}) => {
    return <img src={country.flag} alt={country.name} width="250vw"></img>
}

const CountryDetails = ({country}) => {
  const [weatherData, setWeatherData] = useState({})
  const url = "http://api.weatherstack.com/current" +
  "?access_key=" + process.env.REACT_APP_API_KEY +
  "&query=" + country['name']

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeatherData(response.data.current)
      })
  },[url])

    return (
      <div>
        <CountryName country={country}/>
        <Capital country={country}/>
        <Population country={country}/>
        <Languages country={country}/>
        <Flag country={country}/>
        <Weather weatherData={weatherData} country={country}/>
      </div>
    )
}

const Temperature = ({temp}) =>
  <p><strong>Temperature:</strong> {temp} Celsius</p>

const WeatherIcon = ({url}) => <img src={url} alt="weather icon"/>

const WindInfo = ({wind_speed, wind_dir}) =>
  <p><strong>Wind:</strong> {wind_speed} mph direction {wind_dir}</p>

const Weather = ({weatherData, country}) => {
  return (
    <div>
      <h3>Weather in {country.name}</h3>
      <Temperature temp={weatherData.temperature}/>
      <WeatherIcon url={weatherData.weather_icons}/>
      <WindInfo wind_speed={weatherData.wind_speed} wind_dir={weatherData.wind_dir}/>
    </div>
  )
}

const Countries = ({countries, handleClick}) => {

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (countries.length === 1) {
    return <CountryDetails country={countries[0]}/>
  }
  return (
    <div>
      {countries.map(country => <p key={country['name']}>
        {country['name']}
        <Button handleClick={handleClick} text="show" linkedCountry={country}/>
        </p>)}
    </div>
  )
}

const Button = ({handleClick, text, linkedCountry}) =>{
  return <button onClick={() => handleClick(linkedCountry)}>{text}</button>
}

const App = () => {
  const url="https://restcountries.eu/rest/v2/all"
  
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState("")
  const [filteredCountries, setFilteredCountries] = useState(countries)

  const handleClick = (linkedCountry) => {
    setCountryFilter(linkedCountry['name'])
    setFilteredCountries(
      countries.filter(country => country['name'] === linkedCountry['name']))
  }

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    const value = event.target.value
    setCountryFilter(value)
    setFilteredCountries(
      countries.filter(country => 
        country['name'].toLowerCase().includes(value.toLowerCase()))
    )
  }

  return (
    <div>
      <p>Find Countries
      <input value={countryFilter} onChange={handleChange}/>
      </p>
      <Countries countries={filteredCountries} handleClick={handleClick}/>
    </div>
  )
}

export default App;
