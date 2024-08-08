import React from 'react';
import './Consent.css'; // Assuming you have a CSS file for styling

const Consent = ({ onAccept, onDecline }) => {
  return (
    <div className="consent-overlay">
      <div className="consent-content">
        <h2>Cookies and Privacy Policy</h2>
        <p>
          We use cookies to enhance your experience. By continuing to use our site, you agree to our
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"> Privacy Policy</a> and
          <a href="/cookies-policy" target="_blank" rel="noopener noreferrer"> Cookies Policy</a>.
        </p>
        <button onClick={onAccept}>Accept</button>
        <button onClick={onDecline}>Decline</button>
      </div>
    </div>
  );
};

export default Consent;
