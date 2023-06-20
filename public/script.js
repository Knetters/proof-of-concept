// Dark and light mode logic
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

function toggleDarkMode(e) {
  const html = document.querySelector('html');
  if (e.matches) {
    html.classList.add('dark-mode');
    html.classList.remove('light-mode');
  } else {
    html.classList.add('light-mode');
    html.classList.remove('dark-mode');
  }
}

toggleDarkMode(prefersDarkMode);
prefersDarkMode.addListener(toggleDarkMode);

// Add event listener to the back button
backButton = document.getElementById("back-button")

if(backButton) {
  document.querySelector('.back-button').addEventListener('click', function() {
    // Go back to the previous page
    window.history.back();
  });
}

// Add play button with rotate function
const selectedPodcast = document.getElementById("selected-podcast");
const needle = document.getElementById("needle");
const buttonContent = document.getElementById("button-content");

let isPlaying1 = false;

if(selectedPodcast){
  document.getElementById("white-play-button").addEventListener("click", rotateToggle);

  function rotateToggle() {
    selectedPodcast.classList.toggle("rotate");
    needle.classList.toggle("needle-rotate");

    if (isPlaying1) {
      buttonContent.innerHTML = `<i class="btn-side-margin fa fa-play" aria-hidden="true"></i> Afspelen`;
    } else {
      buttonContent.innerHTML = `<i class="btn-side-margin fa fa-pause" aria-hidden="true"></i> Pauzeren`;
    }

    isPlaying1 = !isPlaying1;
  }
}

const soundPopUp = document.getElementById("sound-pop-up");
const soundList = document.getElementById("sound-list");
const windowBack = document.getElementById("windowBack");

if (soundList) {
  const podcastTitles = document.querySelectorAll(".playable-podcast-title");
  podcastTitles.forEach((title) => {
    title.addEventListener("click", soundDetails);
  });

  function soundDetails() {
    soundPopUp.classList.toggle("move-down");
    soundList.classList.toggle("move-left");

    windowBack.innerHTML = `<button onclick="revert()" id="back-button" class="back-button"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>Terug naar collectie`;
  }
}

function revert() {
  location.reload();
}