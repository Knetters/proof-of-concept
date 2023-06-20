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
var selectedPodcast = document.getElementById("selected-podcast");
var needle = document.getElementById("needle");
var buttonContent = document.getElementById("button-content");
var isPlaying = false;

if(selectedPodcast){
  document.getElementById("white-play-button").addEventListener("click", rotateToggle);

  function rotateToggle() {
    selectedPodcast.classList.toggle("rotate");
    needle.classList.toggle("needle-rotate");

    if (isPlaying) {
      buttonContent.innerHTML = `<i class="btn-side-margin fa fa-play" aria-hidden="true"></i> Afspelen`;
    } else {
      buttonContent.innerHTML = `<i class="btn-side-margin fa fa-pause" aria-hidden="true"></i> Pauzeren`;
    }

    isPlaying = !isPlaying;
  }
}