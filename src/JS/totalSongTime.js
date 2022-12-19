//functions to get total song duration

const getMinutesForTotalTime = (duration) => {
  const minute = Math.floor(duration / 60);
  if (minute < 10) {
    return "0" + minute;
  } else {
    return minute;
  }
};

const getSecondsForTotalTime = (duration) => {
  const seconds = Math.floor(duration % 60);
  if (seconds < 10) {
    return "0" + seconds;
  } else {
    return seconds;
  }
};

export { getMinutesForTotalTime, getSecondsForTotalTime };
