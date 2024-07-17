import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faUser,
  faGrip,
  faCog,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./call_footer.css"

const CallFooter = (props) => {
  const {renderedCalls} = props
  return (
    <>
      <div className="callFooter">
        <div className="phone icon"><FontAwesomeIcon icon={faPhone} /> <span>{renderedCalls.length}</span></div>
        <div className="user icon"><FontAwesomeIcon icon={faUser} /></div>
        <div className="grip icon"><FontAwesomeIcon icon={faGrip} /></div>
        <div className="cog icon"><FontAwesomeIcon icon={faCog} /></div>
        <div className="circle icon"><FontAwesomeIcon icon={faCircle} style={{ color: 'green', fontSize: '10px' }}/></div>
      </div>
    </>
  );
};

export default CallFooter;
