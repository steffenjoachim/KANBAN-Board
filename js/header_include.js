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

function burgerMenu() {
  let burgerMenu = document.getElementById('burger-menu');
  document.getElementById('background-container').style.display = 'block';
  firstClick = true;
}

function closeBurgerMenu() {
  if (
    event.target.id === 'web-header' ||
    event.target.id === 'background-container' ||
    event.target.id === 'header' ||
    event.target.id === 'nav-bar'
  ) {
    document.getElementById('background-container').style.display = 'none';
  }
}

function userGreetingMobile() {
  let currentTime = new Date().getHours();
  let greetingText;
  if (currentTime < 6) {
    greetingText = "Good night!";
  } else if (currentTime < 12) {
    greetingText = "Good morning!";
  } else if (currentTime < 18) {
    greetingText = "Good afternoon!";
  } else {
    greetingText = "Good evening!";
  }
  document.getElementById('greeting').innerHTML = greetingText;
  let name = JSON.parse(localStorage.getItem('name'))
  setTimeout(function () {
    document.getElementById('user-name').innerHTML = name
  }, 5);
}

function guestLogin(user) {
  let windowWidth = window.innerWidth;
  if (windowWidth <= 1024) {

    document.getElementById('body').innerHTML = '';
    document.getElementById('body').innerHTML =
      `
    <link rel="stylesheet" href="./asssets/css/header.css">
    <link rel="shortcut icon" href="./asssets/img/mobile-login-logo-dark.svg" type="image/x-icon">
    <link rel="stylesheet" href="./asssets/css/footer.css">
    <link rel="stylesheet" href="./asssets/css/guest_hello.css">
    <script src="./js/header_include.js"></script>
    <script src="/js/register.js"></script>
    <script src="/js/storage.js"></script>
    <script src="/js/login.js"></script>
</head>
<body onload="loadSummary()">
    <div w3-header-include-html="./asssets/templates/header.html"></div>
    <div id="guest-hello" class="page show content">
        <h1 id="greeting"></h1>
        <span id="user-name"></span>
    </div>
    <footer w3-footer-include-html="./asssets/templates/footer.html"></footer>
</body>
    `;
    userGreetingMobile();
    headerIncludeHTML();
    footerIncludeHTML();
  } else {
    loadSummary(user);
  }
  setTimeout(function () {
    loadSummary(user);
  }, 1500)
}

function loadSummary(user) {
  loadUsers();
  localStorage.removeItem('name');
  localStorage.setItem('name', JSON.stringify('Guest'));
  if (user) {
    usersGreeting(user);
  }

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
    }, 1500); // Verzögerung von 1500 Millisekunden (1,5 Sekunden)
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