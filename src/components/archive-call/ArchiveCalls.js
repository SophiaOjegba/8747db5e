import React from "react";
import "./archive_call.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../theme/ThemeContext";

const ArchiveCall = ({ handleArchiveAll, handleUnarchiveAll, isArchived }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`archiveCalls ${isDarkMode ? 'dark' : ''}`}>
      {isArchived ? (
        <button onClick={handleUnarchiveAll}>
          <FontAwesomeIcon icon={faBriefcase} />
<span>{isArchived ? "Unarchive All Calls" : "Archive All Calls"}</span>
        </button>
      ) : (
        <button onClick={handleArchiveAll}>
          <FontAwesomeIcon icon={faBriefcase} />
          <span>{isArchived ? "Unarchive All Calls" : "Archive All Calls"}</span>
        </button>
      )}
    </div>
  );
};

export default ArchiveCall;
