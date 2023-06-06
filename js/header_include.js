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
      setTimeout(function() {
        closeBurgerMenu(); // Aufruf der weiteren Funktion nach einer Verzögerung von 1,5 Sekunden beim zweiten Klick
      }, 1500);
    }
  }

 
function loadSummary() {
    setTimeout(function() {
      window.location.href = "summary.html";
    },2000);
init();  
}