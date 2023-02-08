import React from 'react';
import './WeatherInfo.css';
import unknownConditionImg from '../assets/img/unknown.png';
import unknownFlagImg from '../assets/img/unknown-flag.png';

export type WeatherData = {
  name: string;
  temperature: number;
  humidity: number;
  condition: string;
  country: string;
  windSpeed: number;
  icon: string;
};

type DataApiProps = {
  weatherData: WeatherData;
};

export const WeatherInfo = ({ weatherData }: DataApiProps) => {
  return (
    <div className='weather-card-info'>
      <div className='city-info'>
        <i className='fa-solid fa-location-dot'></i>
        <p className='city-name'>{weatherData ? weatherData.name : '-'}</p>
        <img
          src={weatherData ? `https://flagcdn.com/h40/${weatherData.country}.png` : unknownFlagImg}
          alt='bandeira'
          id='country-flag'
        ></img>
      </div>

      <div className='temperature-info'>
        <p>{weatherData ? weatherData.temperature?.toFixed() : '-'} &deg;C</p>
      </div>

      <div className='conditions-info'>
        <p className='condition'>{weatherData ? weatherData.condition : '-'}</p>
        <img
          src={
            weatherData
              ? `http://openweathermap.org/img/wn/${weatherData.icon}.png`
              : unknownConditionImg
          }
          alt='condicoes'
        ></img>
      </div>

      <div className='conditions-details'>
        <div className='humidity'>
          <i className='fa-solid fa-droplet'></i>
          <span>{weatherData ? weatherData.humidity : '-'}%</span>
        </div>

        <span className='vertical-line'>|</span>

        <div className='wind'>
          <i className='fa-solid fa-wind'></i>
          <span>{weatherData ? weatherData.windSpeed?.toFixed(1) : '-'} km/h</span>
        </div>
      </div>
    </div>
  );
};
