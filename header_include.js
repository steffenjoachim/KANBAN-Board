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
     document.getElementById('background-container').style.display = 'block'
}

function closeBurgerMenu() {
    let div = document.getElementById(`background-container`);
    if (event.target.id !== `background-container`) {
      return;
    }
    div.style.display = 'none'
 }