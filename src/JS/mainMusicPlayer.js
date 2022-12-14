const mainMusicPlayer = document.getElementById("main-music-player");
const miniPlayer = document.getElementById("mini-player-song-name-div");
const miniPlayerSongCoverImage = document.getElementById(
  "mini-player-cover-art"
);
const body = document.querySelector("body");
import { loadInfo } from "./fetchSongAndPlay.js";

let backBtn;
const setBackBtn = () => {
  backBtn = document.getElementById("back-btn");
  backBtn.addEventListener("click", () => {
    mainMusicPlayer.classList.remove("active");
    body.classList.remove("active");
  });
};

const openMainMusicPlayer = () => {
  mainMusicPlayer.classList.add("active");
  body.classList.add("active");
  setBackBtn();
  loadInfo();
};

miniPlayerSongCoverImage.addEventListener("click", openMainMusicPlayer);
miniPlayer.addEventListener("click", openMainMusicPlayer);

mainMusicPlayer.innerHTML = `
    <!-- menu  -->
    <div class="main-player-div">
    <section class="player-menu">
        <nav>
          <section class="back-btn" id="back-btn">
            <img src="../assets/back.png" alt="go back" width="20px" />
          </section>
          <section class="song-title" id="song-title">
            Kesariya (from "Brahmastra")
          </section>
          <section class="kebab-menu">
            <img src="../assets/meatball.png" alt="menu" width="20px" />
          </section>
        </nav>
    </section>
      <!-- song details  -->
    <section class="song-details">
        <section class="current-song-cover-art">
            <img
              src="https://e.snmc.io/i/600/s/0d140adfa8423b657b6d89257e4d63a8/10107265/pritam-kesariya-Cover-Art.jpg"
              alt=""
              class="img-cover-art"
              id="current-cover-art"
              loading="lazy"
            />
        </section>
    </section>
    <section class="song-controls-and-general-details">
      <section class="general-details">
          <section class="song-and-artists">
              <p class="current-song-name" id="current-song-name">Kesariya (From "Brahmastra")</p> 
              <p class="current-song-artists" id="current-song-artists">Prithm</p>
          </section>
          <section class="like">
              <img src="../assets/heart.png" id="main-player-fav-btn" alt="favorite" width="25px" />
          </section>
      </section>
      <section class="duration-and-progress-bar">
        <section class="duration">
          <div class="current-time song-duration" id="current-duration">00:00</div>
          <div class="total-time song-duration" id="total-time">00:00</div>
        </section>
        <section class="progress-bar">
          <div class="current-progress-bar" id="currentProgressBar"></div>
        </section>
      </section>
      <section class="audio-controls">
          <section class="shuffle" id="shuffle">
            <img src="../../assets/shuffle.png" id="shuffleSong" alt="shuffle" />
          </section>
          <section class="skip-backward skip-btn">
            <img src="../../assets/backward.png" id="skip-backward" alt="skip back" />
          </section>
          <section class="main-player-play-pause">
            <img src="../../assets/pause.png" id="main-player-play-pause" alt="play or pause" />
          </section>
          <section class="skip-forward skip-btn">
            <img src="../../assets/forward.png" id="skip-forward" alt="skip forward" />
          </section>
          <section class="repeat">
            <img src="../../assets/repeat.png" alt="repeat" />
          </section>
      </section>
    </section>
    </div>
`;
