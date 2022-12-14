const musicPlayer = document.getElementById("mini-music-player");
const miniPlayerSongName = document.getElementById("mini-player-song-name");
const miniPlayerCoverArt = document.getElementById("mini-player-cover-art");
const title = document.getElementById("title");
const playPause = document.getElementById("play-pause");
const playPauseImg = document.getElementById("play-pause-img");
import { findCategory } from "./songCategories.js";
import {
  getMinutesForTotalTime,
  getSecondsForTotalTime,
} from "./totalSongTime.js";

const songInfo = {
  songId: 0,
  songName: "",
  songCoverArt: "",
  songArtist: "",
  songState: "../assets/pause.png",
  songBoolean: false,
  songFav: false,
  shuffle: false,
  currentProgressBar: "",
  totalTime: "",
  currentSongDuration: "",
};

const serverURL = {
  link: "http://localhost:3000",
};

//object for Audio;
let audio = new Audio();

//function to fetch music from the server
const fetchSong = (songCategory, songId) => {
  songInfo.songId = parseInt(songId);
  fetch(`${serverURL.link}/${songCategory}/${songId}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      miniPlayerSongName.innerText = data.song_name;
      songInfo.songName = data.song_name;
      miniPlayerCoverArt.src = data.cover_art;
      songInfo.songCoverArt = data.cover_art;
      miniPlayerCoverArt.alt = data.song_name;
      const songArtist = data.artists.split(",");
      songInfo.songArtist = songArtist[0];
      audio.src = data.audio;
      title.innerText = `Playing ${data.song_name} by ${songInfo.songArtist}`;

      //mini player activation
      musicPlayer.classList.add("active");

      if (songInfo.songBoolean) {
        songInfo.songBoolean = false;
        loadInfo();
      }
      audio.play();
      playPauseImg.src = "../assets/pause.png";
    })
    .catch((error) => console.log(error));
};

//function to play and pause music
let audioPlayPause = false;
const audioPlayer = () => {
  if (audio.src) {
    if (audioPlayPause) {
      audio.play();
      playPauseImg.src = "../assets/pause.png";
      songInfo.songState = "../assets/pause.png";
      loadInfo();
      audioPlayPause = false;
    } else {
      audio.pause();
      playPauseImg.src = "../assets/play.png";
      songInfo.songState = "../assets/play.png";
      loadInfo();
      audioPlayPause = true;
    }
  }
};

//function to skip song backward
const skipSongBackward = () => {
  const songCategory = findCategory(songInfo.songId - 1);
  if (songCategory) {
    fetchSong(songCategory, songInfo.songId - 1);
    songInfo.songBoolean = true;
  } else {
    console.log(songCategory);
  }
};

//function to skip song forward
const skipSongForward = () => {
  const songCategory = findCategory(songInfo.songId + 1);
  if (songCategory) {
    fetchSong(songCategory, songInfo.songId + 1);
    songInfo.songBoolean = true;
  } else {
    console.log(songCategory);
  }
};

//function to load info to main music player
const loadInfo = () => {
  const mainPlayerSongTitle = document.getElementById("song-title");
  const mainPlayerSongCoverArt = document.getElementById("current-cover-art");
  const mainPlayerSongName = document.getElementById("current-song-name");
  const mainPlayerSongArtists = document.getElementById("current-song-artists");
  const mainPlayerSongState = document.getElementById("main-player-play-pause");
  const skipBackward = document.getElementById("skip-backward");
  const skipForward = document.getElementById("skip-forward");
  const shuffleSong = document.getElementById("shuffle");
  songInfo.currentSongDuration = document.getElementById("current-duration");
  songInfo.totalTime = document.getElementById("total-time");

  const setTotalTime = () => {
    songInfo.totalTime.innerText = `${getMinutesForTotalTime(
      audio.duration
    )} : ${getSecondsForTotalTime(audio.duration)}`;
  };

  setTimeout(setTotalTime, 200);

  songInfo.currentProgressBar = document.getElementById("currentProgressBar");
  mainPlayerSongTitle.innerText = songInfo.songName;
  mainPlayerSongCoverArt.src = songInfo.songCoverArt;
  mainPlayerSongCoverArt.alt = songInfo.songName;
  mainPlayerSongName.innerText = songInfo.songName;
  mainPlayerSongArtists.innerText = songInfo.songArtist;
  mainPlayerSongState.src = songInfo.songState;
  mainPlayerSongState.addEventListener("click", audioPlayer);
  skipBackward.addEventListener("click", skipSongBackward);
  skipForward.addEventListener("click", skipSongForward);
  shuffleSong.addEventListener("click", () => {
    songInfo.shuffle = !songInfo.shuffle;
    if (songInfo.shuffle) {
      shuffleSong.classList.toggle("active");
    }
  });
};

//event listener to skip song when one song finished playing
audio.addEventListener("ended", skipSongForward);

//event listener to play and pause song
playPause.addEventListener("click", audioPlayer);

//progress bar and current duration of song
audio.addEventListener("timeupdate", (event) => {
  const { currentTime, duration } = event.path[0];

  const getMinutesForCurrentTime = (currentTime) => {
    if (Math.floor(currentTime / 60) < 10) {
      return "0" + Math.floor(currentTime / 60);
    } else {
      return Math.floor(currentTime / 60);
    }
  };

  const getSecondsForCurrentTime = (currentTime) => {
    if (Math.floor(currentTime % 60) < 10) {
      return "0" + Math.floor(currentTime % 60);
    } else {
      return Math.floor(currentTime % 60);
    }
  };

  //current duration of song
  if (songInfo.currentSongDuration) {
    songInfo.currentSongDuration.innerText = `${getMinutesForCurrentTime(
      currentTime
    )} : ${getSecondsForCurrentTime(currentTime)}`;
  }
  //progress bar
  let currentDuration = (currentTime / duration) * 100;
  if (songInfo.currentProgressBar) {
    songInfo.currentProgressBar.style.width = `${currentDuration}%`;
  }
});

//play and pause function on spacebar
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    audioPlayer();
  }
});

export { fetchSong, loadInfo };
