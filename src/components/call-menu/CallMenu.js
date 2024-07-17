import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import ArchiveCall from "../archive-call/ArchiveCalls";
import { useTheme } from '../../theme/ThemeContext';
import "./call_menu.css";

const CallMenu = ({ setActiveCallMenu, isArchived, setIsArchived, handleArchiveAll, handleUnarchiveAll }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isDarkMode, toggleTheme } = useTheme();

  const menuList = [
    { name: "Inbox" },
    { name: "All calls" },
    { name: "Archive" },
  ];

  const handleMenuClick = (menuName, index) => {
    setActiveIndex(index);
    setIsArchived(menuName === "Archive");
    setActiveCallMenu(menuName);
  };

  return (
    <>
      <div className="menuList">
        <div className="phoneActivity">
          <span className="phoneIcon">
            <FontAwesomeIcon icon={faPhone} />
          </span>
          <span className={`activityTitle ${isDarkMode ? 'dark' : ''}`}>Activity</span>
        </div>
        <div className={`menuItem ${isDarkMode ? 'dark' : ''}`}>
          {menuList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMenuClick(item.name, index)}
              style={{
                borderBottom: activeIndex === index ? "2px solid red" : "none",
                fontWeight: activeIndex === index ? "bold" : "normal",
              }}
              className="singleMenuItem"
            >
              <p>{item.name}</p>
            </div>
          ))}
        </div>
        <div className={`shuffleIcon ${isDarkMode ? 'dark' : ''}`} onClick={toggleTheme}>
          <FontAwesomeIcon icon={isDarkMode ? faToggleOff : faToggleOn} />
        </div>
      </div>
      <ArchiveCall
        handleArchiveAll={handleArchiveAll}
        handleUnarchiveAll={handleUnarchiveAll}
        isArchived={isArchived}
      />
    </>
  );
};

export default CallMenu;
