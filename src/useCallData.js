import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { filterWRTMenuTitle, archiveAllCallsUtil } from "./util.js";

const BASE_URL = "https://aircall-backend.onrender.com";

const useCallData = () => {
  const [activeCallMenu, setActiveCallMenu] = useState("Inbox");
  const [isArchived, setIsArchived] = useState(false);
  const [initialCallData, setInitialCallData] = useState([]);
  const [renderedCalls, setRenderedCalls] = useState([]);

  // Call data
  useEffect(() => {
    const fetchCallData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/activities`);
        const callData = res.data;
        const archivedCalls = JSON.parse(localStorage.getItem('archivedCalls')) || {};
        const updatedCallData = callData.map(call => ({
          ...call,
          is_archived: archivedCalls[call.id] || call.is_archived
        }));
        setInitialCallData(updatedCallData);
      } catch (err) {
        console.log("An error occurred", err);
      }
    };
    fetchCallData();
  }, []);

  // updating renderedCalls whenever initialdata change
  useEffect(() => {
    const filteredCallLog = filterWRTMenuTitle(initialCallData, activeCallMenu, isArchived);
    setRenderedCalls(filteredCallLog);
  }, [initialCallData, activeCallMenu, isArchived]);

  // archiving/unarchiving all calls
  const handleArchiveAll = useCallback(() => {
    const updatedCalls = archiveAllCallsUtil(initialCallData, true);
    setInitialCallData(updatedCalls);
    const archivedCalls = updatedCalls.reduce((acc, call) => {
      acc[call.id] = true;
      return acc;
    }, {});
    localStorage.setItem('archivedCalls', JSON.stringify(archivedCalls));
    setIsArchived(false);
  }, [initialCallData]);

  const handleUnarchiveAll = useCallback(() => {
    const updatedCalls = archiveAllCallsUtil(initialCallData, false);
    setInitialCallData(updatedCalls);
    localStorage.removeItem('archivedCalls');
    setIsArchived(true);
  }, [initialCallData]);

  const handleSingleCallArchive = useCallback((id) => {
    const updatedCalls = initialCallData.map((call) =>
      call.id === id ? { ...call, is_archived: true } : call
    );
    setInitialCallData(updatedCalls);

    const archivedCalls = JSON.parse(localStorage.getItem('archivedCalls')) || {};
    archivedCalls[id] = true;
    localStorage.setItem('archivedCalls', JSON.stringify(archivedCalls));

    const filteredCallLog = filterWRTMenuTitle(updatedCalls, activeCallMenu, isArchived);
    setRenderedCalls(filteredCallLog);
  }, [initialCallData, activeCallMenu, isArchived]);

  const handleSingleCallUnarchive = useCallback((id) => {
    const updatedCalls = initialCallData.map((call) =>
      call.id === id ? { ...call, is_archived: false } : call
    );
    setInitialCallData(updatedCalls);

    const archivedCalls = JSON.parse(localStorage.getItem('archivedCalls')) || {};
    delete archivedCalls[id];
    localStorage.setItem('archivedCalls', JSON.stringify(archivedCalls));

    const filteredCallLog = filterWRTMenuTitle(updatedCalls, activeCallMenu, isArchived);
    setRenderedCalls(filteredCallLog);
  }, [initialCallData, activeCallMenu, isArchived]);

  const handleGroupArchive = useCallback((groupCall) => {
    const updatedCalls = initialCallData.map((call) =>
      call.from === groupCall.from ? { ...call, is_archived: true } : call
    );
    setInitialCallData(updatedCalls);

    const archivedCalls = JSON.parse(localStorage.getItem('archivedCalls')) || {};
    updatedCalls.forEach((call) => {
      archivedCalls[call.id] = true;
    });
    localStorage.setItem('archivedCalls', JSON.stringify(archivedCalls));

    const filteredCallLog = filterWRTMenuTitle(updatedCalls, activeCallMenu, isArchived);
    setRenderedCalls(filteredCallLog);
  }, [initialCallData, activeCallMenu, isArchived]);

  return {
    activeCallMenu,
    isArchived,
    renderedCalls,
    setActiveCallMenu,
    setIsArchived,
    handleArchiveAll,
    handleUnarchiveAll,
    handleSingleCallArchive,
    handleSingleCallUnarchive,
    handleGroupArchive,
  };
};

export default useCallData;
