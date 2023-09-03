// Select Elements
const toggleThemeBtn = document.getElementById("toggleThemeBtn");
const audioElem = document.querySelector("audio");
const nextSongBtn = document.getElementById("nextSong");
const prevSongBtn = document.getElementById("prevSong");
const songImageElem = document.getElementById("songImg");
const songNameElem = document.getElementById("songName");
const songSingerElem = document.getElementById("songSinger");
const forwardBtn = document.getElementById("forwardBtn");
const backwardBtn = document.getElementById("backwardBtn");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const currentTimeElem = document.getElementById("currentTimeElem");
const totalTimeElem = document.getElementById("totalTimeElem");
const timeLineElem = document.getElementById("timeLineElem");
const progressBarElem = document.getElementById("progressBarElem");
const background = document.getElementById("background");

function chagneThem() {
    if(localStorage.theme == "dark") {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
    } else {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
    }
}

// Songs object
const songs = [
    {
        source: "./Songs/Imagine Dragons - Believer [320].mp3",
        songTitle: "Believer",
        songComposer: "Imagine Dragons",
        songImage: "./Images/imagine-dragons-believer.jpg"
    },
    {
        source: "./Songs/moon deity - neon blade (128) (1).mp3",
        songTitle: "Neon Blade",
        songComposer: "Moon Deity",
        songImage: "./Images/neonblade.jpg"
    },
    {
        source: "./Songs/Tommee Profitt Feat. Beacon Light & Sam Tinnesz - Enemy ( GandomMusic.ir ) .mp3",
        songTitle: "My Enemy",
        songComposer: "Tommee Profitt",
        songImage: "./Images/you-are-my-enemy.jpg"
    }
];

// Function to show/hide elements
function hideShowElems(hiddenElem, shwonElem) {
    hiddenElem.classList.remove("flex");
    shwonElem.classList.add("flex");
    hiddenElem.classList.add("hidden");
    shwonElem.classList.remove("hidden");
}

// Play song
function playSong() {
    audioElem.play();
    hideShowElems(playBtn, pauseBtn);
    setTime(audioElem.duration, totalTimeElem);
    songImageElem.classList.remove("scale-100");
    songImageElem.classList.add("scale-90");
};

// /Pause song
function pauseSong() {
    audioElem.pause();
    hideShowElems(pauseBtn, playBtn);
    songImageElem.classList.remove("scale-90");
    songImageElem.classList.add("scale-100");
};

// Load song properties
function loadSong(songIndex) {
    audioElem.src = songs[songIndex].source;
    songImageElem.src = songs[songIndex].songImage;
    songNameElem.innerText = songs[songIndex].songTitle;
    songSingerElem.innerText = songs[songIndex].songComposer;
    background.style.backgroundImage = `url(${songs[songIndex].songImage})`;
}

// Index for which song shown
let index = 0;

// Switch to next song
function nextSong() {
    index++;
    if(index == 3) {
        index = 0;
    }
    loadSong(index);
    hideShowElems(pauseBtn, playBtn);
}

// Switch to previous song
function prevSong() {
    index--;
    if(index == -1) {
        index = songs.length - 1;
    }
    loadSong(index);
    hideShowElems(pauseBtn, playBtn);
}

// Forward song for 5 seonds
function forwardSong() {
    // Check if it is the end of song
    let currentTime = Math.floor(audioElem.currentTime);
    let totalTime = Math.floor(audioElem.duration);
    if(currentTime >= totalTime - 5) {
        audioElem.currentTime = totalTime;
        hideShowElems(pauseBtn, playBtn);
    } else {
        audioElem.currentTime += 5;
    }
}

// Backward song for 5 seonds
function backwardSong() {
    audioElem.currentTime -= 5;
}

// Setting time for current/duration
function setTime(timeState, timeStateElem) {
    let minutes = Math.floor(timeState / 60);
    let seconds = Math.floor(timeState % 60);

    // Check if minutes/seconds needs 0 behind
    if(minutes < 10) {
        timeStateElem.innerHTML = "0" + minutes + ":";
    } else {
        timeStateElem.innerHTML = minutes + ":";
    }
    if(seconds < 10) {
        timeStateElem.innerHTML += "0" + seconds;
    } else {
        timeStateElem.innerHTML += seconds;
    }
}

// Set current time per second
function setCurrentTime() {
    setTimeout(() => {
        setTime(audioElem.currentTime, currentTimeElem);
    }, 1000);
}

// Progress of timeline 
function progressBar() {
    // Get current time in percent
    let totalTime = audioElem.duration;
    let currentTime = (audioElem.currentTime / totalTime);
    // Set current width via current time
    let totalWidth = timeLineElem.offsetWidth;
    let currentWidth = currentTime * totalWidth;
    progressBarElem.style.width = currentWidth + "px"; 
}

// Click to change the time of song
function setProgressBar(e) {
    // Get current width in percent
    let totalWidth = timeLineElem.offsetWidth;
    let widthClicked = e.offsetX / totalWidth;
    // Set current time via current width
    let totalTime = audioElem.duration;
    let timeClicked = widthClicked * totalTime;
    audioElem.currentTime = timeClicked;
}

// Events
toggleThemeBtn.addEventListener("click" , chagneThem);
playBtn.addEventListener("click" , playSong);
pauseBtn.addEventListener("click" , pauseSong);
nextSongBtn.addEventListener("click" , nextSong);
prevSongBtn.addEventListener("click" , prevSong);
forwardBtn.addEventListener("click" , forwardSong);
backwardBtn.addEventListener("click" , backwardSong);
audioElem.addEventListener("timeupdate" , () => { setCurrentTime(); progressBar(); });
timeLineElem.addEventListener("click" , setProgressBar)
progressBarElem.addEventListener("click" , setProgressBar)
audioElem.addEventListener("ended" , () => { hideShowElems(pauseBtn, playBtn); nextSong(); });