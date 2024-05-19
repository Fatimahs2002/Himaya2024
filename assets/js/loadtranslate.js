let currentActiveLink = null;

window.addEventListener("DOMContentLoaded", function () {
  setInitialLanguage();
  const homeLink = document.querySelector("#navbar a.nav-link[data-en='Home']");
  loadPage('home.html', homeLink);
});

function loadPage(page, link = null) {
  fetch(page)
    .then(response => response.text())
    .then(data => {
      document.getElementById("content").innerHTML = data;
      changeLanguage(getSelectedLanguage());

      // Update active link
      const navLinks = document.querySelectorAll("#navbar a.nav-link");
      navLinks.forEach(navLink => navLink.classList.remove("active"));

      if (link) {
        currentActiveLink = link;
      } else {
        currentActiveLink = Array.from(navLinks).find(navLink => navLink.getAttribute('href') === page);
      }

      if (currentActiveLink) {
        currentActiveLink.classList.add("active");
      }

      saveCurrentPage(page);
    
    })
    .catch(error => console.error("Error loading page:", error));
}

function changeLanguage(language) {
  const elements = document.querySelectorAll(`[data-${language}]`);
  elements.forEach(element => {
    const translation = element.getAttribute(`data-${language}`);
    if (translation) {
      element.textContent = translation;
    }
  });

  // Translate the content of the currently loaded page
  const contentElements = document.querySelectorAll(`#content [data-${language}]`);
  contentElements.forEach(element => {
    const translation = element.getAttribute(`data-${language}`);
    if (translation) {
      element.textContent = translation;
    }
  });

  // Set direction based on language
  document.body.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
}

function setInitialLanguage() {
  const language = getSelectedLanguage();
  changeLanguage(language);
}

function getSelectedLanguage() {
  const languageSelect = document.getElementById("languageSelect");
  return languageSelect.value;
}

function getCurrentPage() {
  return localStorage.getItem('currentPage') || "home.html";
}

function saveCurrentPage(page) {
  localStorage.setItem('currentPage', page);
}

function onLanguageChange(value) {
  changeLanguage(value);
  loadPage(getCurrentPage(), currentActiveLink);
}

window.addEventListener('beforeunload', function () {
  const currentPage = getCurrentPage();
  localStorage.setItem('currentPage', currentPage);
});

// function hideMobileNavbarOnClick() {
//   const mobileNavLinks = document.querySelectorAll('.navbar-mobile ul li a');
//   mobileNavLinks.forEach(link => {
//     link.addEventListener('click', function() {
//       const mobileNavbar = document.querySelector('.navbar-mobile  ');
//       if (mobileNavbar) {
//         mobileNavbar.style.display = 'none';
//       }
//     });
//   });
// }