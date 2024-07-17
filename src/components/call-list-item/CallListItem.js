import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faArrowDown, faArrowUp, faClock, faBoxArchive, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import './call_item.css';
import { formatTime } from '../../util';


const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
};

const CallListItem = ({ call, handleSingleCallArchive, handleSingleCallUnarchive }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);


  let arrowIcon;
  let iconColor;
  if (call.direction === "inbound") {
    arrowIcon = faArrowDown;
    iconColor = call.type === "missed" ? "red" : "green";
  } else if (call.direction === "outbound") {
    arrowIcon = faArrowUp;
    iconColor = "turquoise";
  }

  return (
    <>
      <div className="singleCallItem">
        <div className="singleCall" onClick={toggleModal}>
          <div className="callIcon" style={{ color: iconColor }}>
            <div className='arrow'>{arrowIcon && <FontAwesomeIcon icon={arrowIcon} />}</div>
            <div><FontAwesomeIcon icon={faPhone} /></div>
          </div>
          <div className="callData">
            <p className="callIdentity">
              {call.number}
              {call.count > 1 && <span className="callCount">{call.count}</span>}
            </p>
            <p className="callIdentityDesc">{call.type}</p>
          </div>
          <div className="timeStamp">{formatTime(call.calls[0].created_at)}</div>
        </div>
        {showModal && (
          <>
            <hr />
            <div className="callModal">
              <div>
                <span style={{ color: call.type === "answered" ? "green" : "red", fontSize: "0.7rem" }}>
                  <FontAwesomeIcon icon={faClock} /> {formatDuration(call.calls[0].duration)}
                </span>
              </div>
              <div>
                {call.calls[0].is_archived ? (
                  <button onClick={() => handleSingleCallUnarchive(call.calls[0].id)}>
                    <FontAwesomeIcon icon={faBoxOpen} /> <span>Unarchive</span>
                  </button>
                ) : (
                  <button onClick={() => handleSingleCallArchive(call.calls[0].id)}>
                    <FontAwesomeIcon icon={faBoxArchive} /> <span>Archive</span>
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CallListItem;
