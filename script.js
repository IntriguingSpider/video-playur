const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

//State Variables

// Play & Pause ----------------------------------- //

const showPlayIcon = function () {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
};
const togglePlay = function () {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  } else {
    video.pause();
    showPlayIcon();
  }
};

// Progress Bar ---------------------------------- //

const updateProgress = function () {
  // Update Progress Bar Time
  const progressBarPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${progressBarPercent}%`;
  // Get Progress Number Indicators for Seconds
  const currentTimeElapsedSeconds = Math.floor(
    (video.duration * (video.currentTime / video.duration)) % 60
  );
  //Get Progress Number Indicators for Minutes
  const currentTimeElapsedMinutes = Math.floor(
    (video.duration * (video.currentTime / video.duration)) / 60
  );
  //Render Current Elapsed Time Seconds/Minutes
  if (currentTimeElapsedSeconds < 10) {
    currentTime.innerText = `${currentTimeElapsedMinutes}:0${currentTimeElapsedSeconds} / `;
  } else {
    currentTime.innerText = `${currentTimeElapsedMinutes}:${currentTimeElapsedSeconds} / `;
  }
  //Calculate and Render total Duration
  const durationSeconds = Math.floor(video.duration % 60);
  const durationMinutes = Math.floor(video.duration / 60);
  if (durationSeconds < 9) {
    duration.innerText = `${durationMinutes}:0${durationSeconds}`;
  } else {
    duration.innerText = `${durationMinutes}:${durationSeconds}`;
  }
};

const setProgress = function (e) {
  console.log(e);
  //Set the currentTime upon click
  const progressClickPercent = e.offsetX / progressRange.offsetWidth;
  video.currentTime = video.duration * progressClickPercent;
  console.log(progressClickPercent);
  //Render Progress Bar with new CurrentTime
  const progressBarPercent = progressClickPercent * 100;
  progressBar.style.width = `${progressBarPercent}%`;
};

// Volume Controls --------------------------- //

const updateVolume = function (e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  //Render Bar Volume
  volumeBar.style.width = `${volume * 100}%`;
  //Apply new Volume Settings on video
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  video.volume = e.offsetX / volumeRange.offsetWidth;
  //Change icon depending on volume
  volumeIcon.className = '';
  if (volume > 0.7) {
    //
  }
};

const toggleVolume = function () {
  //Toggle between video muted and not, render bar at the same time
  if (video.muted) {
    video.muted = false;
    volumeBar.style.width = `${30}%`;
  } else {
    video.muted = true;
    volumeBar.style.width = `${0}%`;
  }
};
// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

//On Video End Show PayBtn
video.addEventListener('ended', showPlayIcon);

//Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
//Listener for video duration Text / Progressbar
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
//Listener for SeekingProgressBar
progressRange.addEventListener('click', setProgress);
//Event Listener for Volume
volumeRange.addEventListener('click', updateVolume);
volumeIcon.addEventListener('click', toggleVolume);
//click anywhere on progress bar to jump through video
//Problem, when i try to click on progress range, my click goes on progressBar instead, giving a wrong offsetX
