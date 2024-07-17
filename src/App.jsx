import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header.jsx";
import CallMenu from "./components/call-menu/CallMenu.js";
import CallList from "./components/call-list/CallList.js";
import CallFooter from "./components/call-footer/CallFooter.js";
import useCallData from "./useCallData.js";
import { ThemeProvider, useTheme } from './theme/ThemeContext.js';
import './css/app.css'

const App = () => {
  const {
    isArchived,
    renderedCalls,
    setActiveCallMenu,
    setIsArchived,
    setArchiveAllCalls,
    handleSingleCallArchive,
    handleSingleCallUnarchive,
    handleGroupArchive,
    handleArchiveAll,
    handleUnarchiveAll,
  } = useCallData();

  const { isDarkMode } = useTheme(); 

  return (
    <div id="app" className={isDarkMode ? 'dark' : ''}>
      <div className={`container ${isDarkMode ? 'dark' : ''}`}>
        <Header renderedCalls={renderedCalls} />
        <CallMenu
          handleArchiveAll={handleArchiveAll}
          handleUnarchiveAll={handleUnarchiveAll}
          setActiveCallMenu={setActiveCallMenu}
          isArchived={isArchived}
          setIsArchived={setIsArchived}
          setArchiveAllCalls={setArchiveAllCalls}
        />
        <div className="container-view">
          <CallList 
            callLog={renderedCalls} 
            handleSingleCallArchive={handleSingleCallArchive} 
            handleSingleCallUnarchive={handleSingleCallUnarchive} 
            handleGroupArchive={handleGroupArchive} 
          />
        </div>
        <CallFooter renderedCalls={renderedCalls} />
      </div>
    </div>
  );
};

ReactDOM.render(<ThemeProvider><App /></ThemeProvider>, document.getElementById("app"));

export default App;
