import React, { useState } from 'react';
import './App.css';
import { WeatherInfo, WeatherData } from './components/WeatherInfo';
import fetchData from './services/api';

const App = () => {
  const [weatherData, setWeatherData] = useState({} as WeatherData);
  const [city, setCity] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');

  const handleChange = async (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setCity(target.value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    fetchData(city)
      .then((result) => {
        if (result.cod == '404') {
          setError('Cidade não encontrada!');
          setIsVisible(false);
          setCity('');
          return;
        }

        const dataApi = {
          name: result.name,
          temperature: result.main.temp,
          humidity: result.main.humidity,
          condition: result.weather[0].description,
          country: result.sys.country.toLowerCase(),
          windSpeed: result.wind.speed,
          icon: result.weather[0].icon,
        };

        setWeatherData(dataApi);
        setIsVisible(true);
        setCity('');
        setError('');
      })
      .catch((erro) => {
        setError('Erro inesperado: ' + erro);
        setIsVisible(false);
        setCity('');
      });
  };

  return (
    <div className='weather-card-data'>
      <div className='weather-card-form-container'>
        <p className='text-label'>Confira o clima de uma cidade:</p>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Ex: Fortaleza' value={city} onChange={handleChange} />
          <button className='btn-search'>
            <i className='fa-solid fa-magnifying-glass'></i>
          </button>
        </form>
      </div>

      {isVisible && <WeatherInfo weatherData={weatherData} />}
      {error && <p className='error'>{error}</p>}
    </div>
  );
};

export default App;
