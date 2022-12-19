const hamMenuIcon = document.getElementById("ham-menu");
const sidenav = document.getElementById("sidenav");
const body = document.querySelector("body");
const close = document.getElementById("close-icon");
const music = document.getElementById("worlds-best");
const recommendedMusic = document.getElementById("recommended-music");
const topTrackMusic = document.getElementById("top-tracks");
const popularReleasesMusic = document.getElementById("popular-releases");
const topMalayalamMusic = document.getElementById("top-malayalam");
import { fetchSong } from "./fetchSongAndPlay.js";

let id = "";
let medias = "";
const mediaQueries = () => {
  medias = document.getElementsByClassName("media");
  Array.from(medias).forEach((media) => {
    media.addEventListener("click", (e) => {
      id = e.target.id;
      const category = e.target.dataset.category;
      fetchSong(category, id);
    });
  });
};

setTimeout(mediaQueries, 600);

//open and close side nav
const toggleSideNav = () => {
  sidenav.classList.toggle("active");
  body.classList.toggle("active");
};

//side nav
if (window.location.pathname === "/index.html") {
  hamMenuIcon.addEventListener("click", toggleSideNav);
  close.addEventListener("click", toggleSideNav);
}

// General Music Template
const template = (coverArt, id, category, songName) => {
  return `
      <div class="media" title="${songName}">
        <div class="artwork">
          <img
            src="${coverArt}"
            width="100%"
            id="${id}"
            loading="lazy"
            data-category=${category}
            alt=${songName}
          />
        </div>
        <div>
          <p class="media-name">${songName}</p>
        </div>
      </div>
  `;
};

const categories = [
  "worlds_best",
  "recommended",
  "top_tracks",
  "popular_releases",
  "top_malayalam",
];

const html = [
  music,
  recommendedMusic,
  topTrackMusic,
  popularReleasesMusic,
  topMalayalamMusic,
];

const getSongs = async (category, HTML) => {
  try {
    let response = await fetch(
      `https://audionest-web-api.onrender.com/${category}`
    );
    response = await response.json();
    let songs = "";
    for (let data of response) {
      songs += template(data.cover_art, data.id, category, data.song_name);
    }
    HTML.innerHTML = songs;
  } catch (e) {
    console.log(e);
  }
};

if (window.location.pathname === "/index.html") {
  for (let j = 0; j < categories.length; j++) {
    getSongs(categories[j], html[j]);
  }
}
