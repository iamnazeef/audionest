// const title = document.getElementById("title");
// const query1 = window.location.search.indexOf("=") + 1;
// const query2 = window.location.search.indexOf("&");
// const songCategory = window.location.search.substring(query1, query2);
// const songId = window.location.search.substring(query2 + 4);
// const backBtn = document.getElementById("back-btn");
// const songTitle = document.getElementById("song-title");
// const coverArt = document.getElementById("cover-art");
// const songName = document.getElementById("song-name");
// const artists = document.getElementById("artists");
// const playPause = document.getElementById("play-pause");
// const playPauseImg = document.getElementById("play-pause-img");
// const skipBackward = document.getElementById("skip-backward");
// const skipForward = document.getElementById("skip-forward");

//Back to home page
backBtn.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/index.html";
});

//Function to fetch song
let audio = new Audio();
const fetchSong = (songCategory, songId) => {
  //the link is of the server
  fetch(`http://localhost:3000/${songCategory}/${songId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      songTitle.innerText = data.song_name;
      coverArt.src = data.cover_art;
      coverArt.alt = data.song_name;
      songName.innerText = data.song_name;
      const songArtist = data.artists.split(",");
      artists.innerText = songArtist[0];
      audio.src = data.audio;
      title.innerText = `Playing ${data.song_name}`;
    })
    .catch((error) => console.log(error));
};

//Function call to fetch song
fetchSong(songCategory, songId);

//Play and Pause Logic
let audioPlayPause = true;
const audioPlayer = () => {
  if (audioPlayPause) {
    audio.play();
    playPauseImg.src = "../assets/pause.png";
    audioPlayPause = false;
  } else {
    audio.pause();
    playPauseImg.src = "../assets/play.png";
    audioPlayPause = true;
  }
};

//Play and Pause Song
window.onload = audioPlayer;
playPause.addEventListener("click", audioPlayer);
window.addEventListener("keydown", (e) => {
  if (e.which === 32) {
    audioPlayer();
  }
});

//Checks category and id of the song to skip to.
const songSkipChecker = (songId) => {
  if (songId >= 1 && songId <= 4) {
    return "worlds_best";
  } else if (songId >= 5 && songId <= 8) {
    return "recommended";
  } else if (songId >= 9 && songId <= 12) {
    return "top_tracks";
  } else if (songId >= 13 && songId <= 16) {
    return "popular_releases";
  } else {
    return "error";
  }
};

//Skip Song
const skipSong = (skipToWhere) => {
  const skipTo = skipToWhere ? parseInt(songId) + 1 : songId - 1;
  const checkerResult = songSkipChecker(skipTo);
  if (checkerResult === "error") {
    console.log("error");
  } else {
    location.href = `http://127.0.0.1:5500/src/player.html?category=${checkerResult}&id=${skipTo}`;
  }
};

//Skip Backward
skipBackward.addEventListener("click", () => skipSong(false));

//Skip Forward
skipForward.addEventListener("click", () => skipSong(true));
