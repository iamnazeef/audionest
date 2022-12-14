//functions to get total song duration

const getMinutesForTotalTime = (duration) => {
  if (Math.floor(duration / 60) < 10) {
    return "0" + Math.floor(duration / 60);
  } else {
    return Math.floor(duration / 60);
  }
};

const getSecondsForTotalTime = (duration) => {
  if (Math.floor(duration % 60) < 10) {
    return "0" + Math.floor(duration % 60);
  } else {
    return Math.floor(duration % 60);
  }
};

export { getMinutesForTotalTime, getSecondsForTotalTime };
