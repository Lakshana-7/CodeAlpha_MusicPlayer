const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const songs = [
  { title: "Jesus Song", artist: "Christian Worship", src: "songs/jesus.mp3" },
  { title: "Night Changes", artist: "One Direction", src: "songs/night_changes.mp3" },
  { title: "Singari", artist: "Tamil Song", src: "songs/singari.mp3" }
];

let songIndex = 0;

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.innerText = "⏸";
}

function pauseSong() {
  audio.pause();
  playBtn.innerText = "▶";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) playSong();
  else pauseSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;

  if (duration) {
    progress.value = (currentTime / duration) * 100;

    let curMin = Math.floor(currentTime / 60);
    let curSec = Math.floor(currentTime % 60);
    if (curSec < 10) curSec = "0" + curSec;

    let durMin = Math.floor(duration / 60);
    let durSec = Math.floor(duration % 60);
    if (durSec < 10) durSec = "0" + durSec;

    currentTimeEl.innerText = `${curMin}:${curSec}`;
    durationEl.innerText = `${durMin}:${durSec}`;
  }
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

loadSong(songs[songIndex]);