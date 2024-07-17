import moment from "moment";

// Generate a random integer
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generating a random timestamp within a given base date
function generateRandomTimestamp(baseTimestamp) {
  const hours = getRandomInt(0, 23);
  const minutes = getRandomInt(0, 59);
  const seconds = getRandomInt(0, 59);
  const randomTime = new Date(baseTimestamp);
  randomTime.setHours(hours, minutes, seconds, 0);
  return Math.floor(randomTime.getTime() / 1000);
}

// generating a list of random number
export const generateCallLogs = (days, itemsPerDay) => {
  const callLogs = [];
  const baseNumber = "+33 6 45 13 ";

  for (let day = 0; day < days; day++) {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - day); 
    baseDate.setHours(0, 0, 0, 0); 

    for (let item = 0; item < itemsPerDay; item++) {
      const callLog = {
        number: baseNumber + getRandomInt(10, 99) + " " + getRandomInt(10, 99),
        type: ["voicemail", "incoming", "missed"][getRandomInt(0, 2)],
        timeStamp: generateRandomTimestamp(baseDate),
        isArchived: getRandomInt(10, 99) % 2 === 0 ? true : false,
      };
      callLogs.push(callLog);
    }
  }

  return callLogs;
};

// Timestamp formatted to 12hr clock
export const formatTime = (dateString, am = true) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; 
  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return am ? `${formattedHours}:${formattedMinutes} ${ampm}` : `${formattedHours}:${formattedMinutes}`;
};


// Grouping calls wih same date
export const formatCallLog = (calls) => {
  calls = calls.sort((a, b) => parseInt(b.timeStamp) - parseInt(a.timeStamp));

  return calls.map((call) => ({
    ...call,
    timeStamp: new Date(call.timeStamp * 1000).toLocaleString(),
  }));
};

const formatDate = (timestamp) => {
  return moment(timestamp).format('MMMM D, YYYY');
};

export const groupCallsByDateNumberAndType = (calls) => {
  const groupedByDate = calls.reduce((acc, call) => {
    const date = formatDate(call.created_at);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(call);
    return acc;
  }, {});

  return Object.entries(groupedByDate).map(([date, callsOnDate]) => {
    const groupedByNumberAndType = callsOnDate.reduce((acc, call) => {
      const key = `${call.from}-${call.direction}-${call.call_type}`; 
      if (!acc[key]) {
        acc[key] = {
          number: call.from,
          type: call.call_type,
          direction: call.direction,
          count: 0,
          calls: [],
        };
      }
      acc[key].count += 1;
      acc[key].calls.push(call);
      return acc;
    }, {});

    return {
      date,
      calls: Object.values(groupedByNumberAndType),
    };
  });
};



// filtering with menu title
export const filterWRTMenuTitle = (callLog, callMenuTitle, archive = false) => {
  if (archive) return callLog.filter((call) => call.is_archived);
  if (callMenuTitle === "All calls") return callLog.filter((call) => !call.is_archived);
  callMenuTitle = callMenuTitle === "Inbox" ? "inbound" : "";
  return callLog.filter(
    (call) => call.direction === callMenuTitle && !call.is_archived
  );
};

// Archive or unarchive all calls
export const archiveAllCallsUtil = (callList, archiveAllCalls) => {
  return callList.map((call) => ({
    ...call,
    is_archived: archiveAllCalls,
  }));
};
