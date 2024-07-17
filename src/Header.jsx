import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faBatteryThreeQuarters, faSignal } from '@fortawesome/free-solid-svg-icons';
import './css/header.css';
import { useTheme } from './theme/ThemeContext';

const Header = ({ renderedCalls }) => {
  const { isDarkMode } = useTheme(); 

  return (
    <header className={`iphone-header ${isDarkMode ? 'dark' : ''}`}>
      <div className="header-circles">
        <FontAwesomeIcon icon={faCircle} style={{ color: 'red', fontSize: '16px' }} />
        <FontAwesomeIcon icon={faCircle} style={{ color: 'orange', fontSize: '16px' }} />
        <FontAwesomeIcon icon={faCircle} style={{ color: 'green', fontSize: '16px' }} />
      </div>
      <div className="header-title">
        <span>({renderedCalls.length})</span>
        <span> Aircall Phone</span>
      </div>
      <div className="header-left">
        <FontAwesomeIcon icon={faSignal} style={{ color: 'green', fontSize: '16px' }} />
        <FontAwesomeIcon icon={faBatteryThreeQuarters} style={{ color: 'green', fontSize: '16px' }} />
      </div>
    </header>
  );
};

export default Header;
