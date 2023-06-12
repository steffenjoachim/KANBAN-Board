async function init() {
  await headerIncludeHTML();
  await footerIncludeHTML();
}

async function headerIncludeHTML() {
  let includeElements = document.querySelectorAll('[w3-header-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-header-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = 'Page not found';
    }
  }
}

async function footerIncludeHTML() {
  let includeElements = document.querySelectorAll('[w3-footer-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-footer-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = 'Page not found';
    }
  }
}

let firstClick = false;

function burgerMenu() {
  document.getElementById('burger-menu').classList.add = ('slide')
  document.getElementById('background-container').style.display = 'block';
  firstClick = true;
}

function closeBurgerMenu() {
  let div = document.getElementById('background-container');

  if (
    event.target.id === 'web-header' ||
    event.target.id === 'background-container' ||
    event.target.id === 'header' ||
    event.target.id === 'nav-bar'
  ) {
    div.style.display = 'none';
  }
  firstClick = false;
}

function burgerMenuWithCallback() {
  if (!firstClick) {
    burgerMenu(); // Aufruf der burgerMenu-Funktion beim ersten Klick
  } else {
    setTimeout(function () {
      closeBurgerMenu(); // Aufruf der weiteren Funktion nach einer Verzögerung von 1,5 Sekunden beim zweiten Klick
    }, 1500);
  }
}

function guestLogin() {
  let windowWidth = window.innerWidth;
  if (windowWidth <= 1024) {
    window.location.href = './guest_hello.html';

  } else {
    loadSummary();
  }
}

function loadSummary() {
  headerIncludeHTML();
  footerIncludeHTML();
  let windowWidth = window.innerWidth;
  if (windowWidth >= 1024) {
    window.location.href = './summary.html';
  } else {
    changePage(); // Animation ausführen
    setTimeout(function () {
      fetch('./summary.html') // Laden der summary.html-Seite
        .then(response => response.text()) // Konvertieren der Serverantwort in Text
        .then(data => {
          let parser = new DOMParser(); // Erstellen eines DOM-Parsers
          parser.parseFromString(data, 'text/html'); // Parsen des HTML-Texts zu einem DOM-Dokument
          window.location.href = 'summary.html'; // Weiterleitung zur summary.html-Seite
        });
    }, 2500); // Verzögerung von 1500 Millisekunden (1,5 Sekunden)
  }
}

function changePage() {
  let currentPage = document.querySelector('.page.show'); // Auswählen der aktuellen Seite mit der CSS-Klasse 'show'
  let nextPage = currentPage.nextElementSibling; // Auswählen der nächsten Seite

  // Entfernen der CSS-Klasse 'show' von der aktuellen Seite
  currentPage.classList.remove('show');

  // Hinzufügen der CSS-Klasse 'show' zur nächsten Seite
  nextPage.classList.add('show');
}