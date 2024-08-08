import React from 'react';
import './Popup.css'; // Add styles for your popup

const Popup = ({ isOpen, onClose, searchHistory, onSelectCity, settings, onSettingChange }) => {
  if (!isOpen) return null;

  const handleCityClick = (city) => {
    onSelectCity(city);
    onClose();
  };

  const handleUnitChange = (unit) => {
    onSettingChange({ ...settings, temperatureUnit: unit });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* MANAGING YOUR CITIES */}
        <div className='manage-cities'>
          <h3>Manage Cities</h3>
          <ul>
            {searchHistory.map((city, index) => (
              <li key={index} onClick={() => handleCityClick(city)}>{city}</li>
            ))}
          </ul>
        </div>
        {/* ENDS */}

        {/* SETTINGS */}
        <div className='settings'>
            <h3>Settings</h3>
            <div>
              <p>Temperature Unit:</p>
              <button
                className={settings.temperatureUnit === 'metric' ? 'active' : ''}
                onClick={() => handleUnitChange('metric')}
              >
                °C
              </button>
              <button
                className={settings.temperatureUnit === 'imperial' ? 'active' : ''}
                onClick={() => handleUnitChange('imperial')}
              >
                °F
              </button>
            </div>
        </div>
        {/* ENDS */}

        {/* MORE, WHICH INCLUDE ABOUT US AND LATER IT WILL FEATURE A LIVE NEWS LETTER IN IT */}
        <div className='more'>
            <h3>More</h3>
            <ul>
                <li>News</li>
                <li>Maps</li>
                <li>Developer</li>
            </ul>
        </div>
        {/* ENDS */}

        {/* BUTTON FOR CLOSING THE POPUP */}
        <button className="popup-close" onClick={onClose}>+</button>
        {/* ENDS */}
      </div>
    </div>
  );
};

export default Popup;