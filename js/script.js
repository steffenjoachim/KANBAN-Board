function init() {
    loadUsers();
    //loadTargetPage();
}

function loadTargetPage() {
    let windowWidth = window.innerWidth;
    if (windowWidth <= 1024) {
      document.getElementById('body').innerHTML = '';
      document.getElementById('body').innerHTML = `
        <div id="logo-container" class="first-page-logo-container">
          <img src="./asssets/img/Logo_white.svg" alt="">
        </div>
      `;
      setTimeout(function() {
        let logoContainer = document.getElementById('logo-container');
        if (logoContainer) {
          logoContainer.innerHTML = '';
        }
        window.location.href = "./index.html?loaded";
      }, 1500);
    }
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
document.getElementById('input').addEventListener('input', togglePasswordVisibility);

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

function signIn() {
    let insideWindow = document.getElementById('inside-window');
    insideWindow.innerHTML = '';
    insideWindow.style.height = '432px'
    document.getElementById('sign-up-container').innerHTML = ''
    insideWindow.innerHTML += generateSignInHtml();
}

function generateSignInHtml() {
    return `
    <div class="arrow-container">
        <a href="index.html">
            <img src="./asssets/img/back_arrow.svg">
        </a>
    </div>
    <h1 class="sign-in-headline">Sign in</h1>
    <img class="line" src="./asssets/img/line.svg" alt="Trennlinie">
    <form onsubmit="register(); return false;">
    <div class="sign-in-input-outter">
        <div class="input-field">
            <input id="userName" class="name" type="name" name="" required placeholder="Name">
            <img class="person-img" src="./asssets/img/person.svg" alt="e-mail icon">
        </div>
        <div class="input-field margin">
            <input id="email" class="e-mail" itemid="email" type="email" name="" required placeholder="Email">
            <img src="./asssets/img/email-icon.svg" alt="e-mail icon">
        </div>
        <div class="input-field margin">
            <input id="input" class="password" type="password" required placeholder="Password">
            <div id="lock-icon-container">
                <img id="lock-icon" src="./asssets/img/lock-icon.svg" alt="lock">
            </div>
        </div>
        </div>
        <div class="btn-container">
            <div class="login-btn-container">
                <button id="registerBtn" class="login-btn sign-up-btn">Sign up</button>
            </div>

        </div>
    </form>
`
};

function forgotPassword() {
    let insideWindow = document.getElementById('inside-window');
    insideWindow.innerHTML = '';
    insideWindow.style.height = '432px'
    document.getElementById('sign-up-container').innerHTML = ''
    insideWindow.innerHTML += generateForgotHtml();
}

function generateForgotHtml() {
    return `
    <div class="arrow-container">
        <a href="index.html">
            <img src="./asssets/img/back_arrow.svg">
        </a>
    </div>
    <h1 class="forgot-password-headline">I forgot my password</h1>
    <img class="line" src="./asssets/img/line.svg" alt="Trennlinie">
    <p class="forgot-password-text">Don't worry! We will send you an email with the instructions to reset your password.
    <form onsubmit="showEmailSendInfo()">
    <div class="forgot-input-outer-container">
        <div class="input-field">
            <input class="e-mail" itemid="email" type="email" name="" required placeholder="Email">
            <img src="./asssets/img/email-icon.svg" alt="e-mail icon">
        </div>
        </div>
        <div class="btn-container">
        <div class="forgot-btn-container">
            <button class="fortgot-password-btn">Send me the E-Mail</button>
        </div>

    </div>
    </form>
    `
    return false
}

function showEmailSendInfo() {
    document.getElementById('sign-up-container').innerHTML = '<img src="./asssets/img/An_e-mail_sent.svg" alt="e-mail icon">'
    document.getElementById('sign-up-container').classList.add('fedback-popup-container');
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

function generateResetPasswordHtml() {
    return `
    <div class="arrow-container">
        <div onclick="forgotPassword()" class="arrow-img-container">
            <img src="./asssets/img/back_arrow.svg">
        </div>    
    </div>
    <h1 class="reset-password-headline">Reset your password</h1>
    <img class="line-reset-password" src="./asssets/img/line.svg" alt="Trennlinie">
    <p class="reset-password-text">Change your account password<br>here.
    <div class="input-field">
        <input id="input" class="password" type="password" required placeholder="New password">
        <div id="lock-icon-container">
            <img id="lock-icon" src="./asssets/img/lock-icon.svg" alt="lock">
        </div>
    </div>
    <div class="input-field margin-reset-password-input">
        <input id="input" class="password" type="password" required placeholder="Confirm password">
        <div id="lock-icon-container">
            <img id="lock-icon" src="./asssets/img/lock-icon.svg" alt="lock">
        </div>
    </div>
    <div class="btn-container">
        <div class="forgot-btn-container">
            <button onclick="showResetPasswordInfo()" class="fortgot-password-btn">Continue</button>
        </div>
    </div>
 `
}

function guestLogin() {
    let personImg = document.getElementById('person-img');
}

function showResetPasswordInfo() {
    document.getElementById('sign-up-container').innerHTML = '<img src="./asssets/img/Reset_your_password.svg">'
    document.getElementById('sign-up-container').classList.add('fedback-popup-container');
    setTimeout(function () {
        window.location.href = "./index.html";
    }, 1500);
}