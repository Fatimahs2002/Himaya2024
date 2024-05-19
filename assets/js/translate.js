

document.addEventListener('DOMContentLoaded', function () {
  // Initial language setting on page load
  const savedLanguage = getSavedLanguage();
  if (savedLanguage) {
    setLanguage(savedLanguage);
  } else {
    setLanguage(getSelectedLanguage());
  }

  // Ensure language is set correctly on initial load and after content changes
  setLanguage(getSavedLanguage() || getSelectedLanguage());

  // Event listener for language selection change
  document.getElementById('languageSelect').addEventListener('change', function () {
    const selectedLanguage = this.value;
    setLanguage(selectedLanguage);
    saveLanguage(selectedLanguage);
  });
});

function setLanguage(lang) {
  // Target elements with data attributes matching the chosen language
  const elements = document.querySelectorAll('[data-' + lang + ']');
  elements.forEach(element => {
    const translation = element.getAttribute('data-' + lang);
    if (translation) {
      element.textContent = translation;
    }
  });
}

function getSelectedLanguage() {
  // This function retrieves the selected language from the element with ID "languageSelect"
  return document.getElementById('languageSelect').value;
}

function saveLanguage(lang) {
  // This function stores the selected language in localStorage
  localStorage.setItem('selectedLanguage', lang);
}

function getSavedLanguage() {
  // This function retrieves the previously saved language from localStorage
  return localStorage.getItem('selectedLanguage');
}

function loadPage(page, link = null) {
  fetch(page)
    .then(response => response.text())
    .then(data => {
      document.getElementById("content").innerHTML = data;

      // Ensure language is set after loading new content
      setLanguage(getSavedLanguage() || getSelectedLanguage());

      // Update active link (optional functionality)
      const navLinks = document.querySelectorAll("#navbar a.nav-link");
      navLinks.forEach(link => link.classList.remove("active"));
      if (link) {
        link.classList.add("active");
      }
    })
    .catch(error => console.error("Error loading page:", error));
}
