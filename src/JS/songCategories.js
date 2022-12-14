//function to find to which category the song should skip to.

const findCategory = (songId) => {
  try {
    if (songId >= 1 && songId <= 4) {
      return "worlds_best";
    } else if (songId >= 5 && songId <= 8) {
      return "recommended";
    } else if (songId >= 9 && songId <= 12) {
      return "top_tracks";
    } else if (songId >= 13 && songId <= 16) {
      return "popular_releases";
    } else if (songId >= 17 && songId <= 20) {
      return "top_malayalam";
    } else {
      return 0;
    }
  } catch {
    console.log("failed to get song category :-(");
  }
};

export { findCategory };
