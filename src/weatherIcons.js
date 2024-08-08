import React from 'react';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaBolt, FaSmog } from 'react-icons/fa'; // Importing some example icons

const WeatherIcon = ({ weatherCondition }) => {
  const renderIcon = (condition) => {
    switch (condition) {
      case 'sunny':
        return <FaSun style={{ color: 'orange', fontSize: '48px' }} />;
      case 'cloudy':
        return <FaCloud style={{ color: 'gray', fontSize: '48px' }} />;
      case 'rainy':
        return <FaCloudRain style={{ color: 'blue', fontSize: '48px' }} />;
      case 'snowy':
        return <FaSnowflake style={{ color: 'lightblue', fontSize: '48px' }} />;
      case 'thunderstorm':
        return <FaBolt style={{ color: 'yellow', fontSize: '48px' }} />;
      case 'foggy':
        return <FaSmog style={{ color: 'lightgray', fontSize: '48px' }} />;
      default:
        return null; // Return null if the condition does not match any case
    }
  };

  return (
    <div className="weather-icon">
      {renderIcon(weatherCondition)}
    </div>
  );
};

export default WeatherIcon;
