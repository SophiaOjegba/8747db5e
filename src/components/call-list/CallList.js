import React from 'react';
import './call_list.css';
import CallListItem from '../call-list-item/CallListItem';
import { groupCallsByDateNumberAndType } from '../../util';

const CallList = ({ callLog, handleSingleCallArchive, handleSingleCallUnarchive, activeCallMenu }) => {
  // Group calls by date, number, and type
  const groupedCalls = groupCallsByDateNumberAndType(callLog);

  return (
    <div className="callList">
      {groupedCalls.map(({ date, calls }) => (
        <div key={date} className="dateGroup">
          <div className="dateHeader">{date}</div>
          <ul className="callListItems">
            {calls.map((callGroup, index) => (
              <li key={index} className="callGroupItem">
                <CallListItem
                  call={callGroup}
                  handleSingleCallArchive={handleSingleCallArchive}
                  handleSingleCallUnarchive={handleSingleCallUnarchive}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CallList;
