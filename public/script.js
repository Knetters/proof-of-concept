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