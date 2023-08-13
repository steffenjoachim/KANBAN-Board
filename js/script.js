function init() {
    loadTargetPage();
    loadUsers();
    setLocalStorage();
}

function loadTargetPage() {
    setTimeout(function () {
        indexHTML()
    }, 880);
}
function setLocalStorage() {
    localStorage.removeItem('name');
    localStorage.setItem('name', JSON.stringify('Guest'));
}

/**
 * 
 * if input > s
 * 
 */

function togglePasswordVisibility() {
    document.getElementById('input').type = 'password'
    let passwordIcon = document.getElementById('lock-icon-container');
    let input = document.getElementById('input').value;
    if (input.length >= 1) {
        passwordIcon.innerHTML = '<img onclick="visibilPassword()" class="password-icon" src="./asssets/img/show.svg" alt="">';
    } else {
        passwordIcon.innerHTML = '<img id="lock-icon" src="./asssets/img/lock-icon.svg" alt="lock">';
    }
}

function visibilPassword() {
    let visiblePasswordInput = document.getElementById('input');
    let passwordIcon = document.getElementById('lock-icon-container');

    visiblePasswordInput.type = 'text'; // Ändere den Eingabetyp auf "text", um das Passwort sichtbar zu machen
    passwordIcon.innerHTML = '<img onclick="hidePassword()" class="password-icon" src="./asssets/img/hide.svg" alt="">';
}

function hidePassword() {
    togglePasswordVisibility();
}

function checkmarkChecked() {
    let checkMarkContainer = document.getElementById('checkmark-container');
    checkMarkContainer.innerHTML = '';
    checkMarkContainer.innerHTML += `
    <img onclick="checkmarkUnChecked()" src="./asssets/img/checked_full.svg" alt="">
`
}

function checkmarkUnChecked() {
    let checkMarkContainer = document.getElementById('checkmark-container');
    checkMarkContainer.innerHTML = '';
    checkMarkContainer.innerHTML = `<img class="checkbox-empty" onclick="checkmarkChecked()" src="./asssets/img/checkmark_container.svg" alt="">`
}

function updateArrow() {
    if (window.innerWidth > 1024) {
        document.getElementById('arrow-a').innerHTML = `
        <img src="asssets/img/arrow-left-blue.svg" style="width:34px; height:34px;">
        `;
    } else {
        document.getElementById('arrow-a').innerHTML = `
        <img src="./asssets/img/back_arrow.svg"style="width:16px; height:16px;">
        `
    }
}
function signIn() {
    let insideWindow = document.getElementById('inside-window');
    insideWindow.innerHTML = '';
    insideWindow.style.height = '432px'
    document.getElementById('sign-up-container').innerHTML = ''
    insideWindow.innerHTML += generateSignInHtml();
    updateArrow(); // Überprüfung beim Aufruf der Funktion
    window.addEventListener('resize', updateArrow); // Überprüfung bei Änderung der Fenstergröße
}



function forgotPassword() {
    let insideWindow = document.getElementById('inside-window');
    insideWindow.innerHTML = '';
    insideWindow.style.height = '432px';
    document.getElementById('sign-up-container').innerHTML = '';
    insideWindow.innerHTML += generateForgotHtml();
    updateArrow(); // Überprüfung beim Aufruf der Funktion
    window.addEventListener('resize', updateArrow); // Überprüfung bei Änderung der Fenstergröße
}



function showEmailSendInfo() {
    document.getElementById('sign-up-container').innerHTML = '<img id="e-mail-sent-img" src="./asssets/img/An_e-mail_sent.svg" alt="e-mail icon">'
    document.getElementById('sign-up-container').classList.add('fedback-popup-container');
    document.getElementById('e-mail-sent-img').classList.add('slide-in');
     setTimeout(function () {
         resetPassword()
     }, 1500);
}

function resetPassword() {
    document.getElementById('sign-up-container').classList.remove('fedback-popup-container');
    let insideWindow = document.getElementById('inside-window');
    insideWindow.innerHTML = ''
    insideWindow.style.height = '455px'
    insideWindow.innerHTML = generateResetPasswordHtml();
    document.getElementById('sign-up-container').innerHTML = '';
}

function showResetPasswordInfo() {
    document.getElementById('sign-up-container').innerHTML = '<img src="./asssets/img/Reset_your_password.svg">'
    document.getElementById('sign-up-container').classList.add('fedback-popup-container');
    setTimeout(function () {
        indexHTML();
    }, 1500);
}