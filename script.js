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
        passwordIcon.innerHTML = '<img onclick="visibilPassword()" class="password-icon" src="/asssets/img/show.svg" alt="">';
    } else {
        passwordIcon.innerHTML = '<img id="lock-icon" src="asssets/img/lock-icon.svg" alt="lock">';
    }
}
document.getElementById('input').addEventListener('input', togglePasswordVisibility);

function visibilPassword() {
    let visiblePasswordInput = document.getElementById('input');
    let passwordIcon = document.getElementById('lock-icon-container');

    visiblePasswordInput.type = 'text'; // Ändere den Eingabetyp auf "text", um das Passwort sichtbar zu machen
    passwordIcon.innerHTML = '<img onclick="hidePassword()" class="password-icon" src="/asssets/img/hide.svg" alt="">';
}

function hidePassword() {
    togglePasswordVisibility();
}

function checkmarkChecked() {
    let checkMarkContainer = document.getElementById('checkmark-container');
    checkMarkContainer.innerHTML = '';
    checkMarkContainer.innerHTML += `
    <img onclick="checkmarkUnChecked()" src="/asssets/img/checked_full.svg" alt="">
`
}

function checkmarkUnChecked() {
    let checkMarkContainer = document.getElementById('checkmark-container');
    checkMarkContainer.innerHTML = '';
    checkMarkContainer.innerHTML = `<img class="checkbox-empty" onclick="checkmarkChecked()" src="/asssets/img/checkmark_container.svg" alt="">`
}

function signIn() {
    let insideWindow = document.getElementById('inside-window');
    insideWindow.innerHTML = '';
    insideWindow.style.height = '501px'
    insideWindow.innerHTML += generateSignInHtml();
}

function generateSignInHtml() {
    return `
    <div class="arrow-container">
        <a href="index.html">
            <img src="/asssets/img/back_arrow.svg">
        </a>
    </div>
    <h1 class="sign-in-headline">Sign in</h1>
    <img src="/asssets/img/line.svg" alt="Trennlinie">
    <form action="onsubmit">
        <div class="input-field">
            <input class="e-mail" itemid="email" type="email" name="" required placeholder="Email">
            <img src="/asssets/img/email-icon.svg" alt="e-mail icon">
        </div>
        <div class="input-field">
            <input id="input" class="password" type="password" required placeholder="Password">
            <div id="lock-icon-container">
                <img id="/lock-icon" src="asssets/img/lock-icon.svg" alt="lock">
            </div>
        </div>
        <div class="input-field">
            <input id="input" class="password" type="password" required placeholder="Confirm Password">
            <div id="lock-icon-container">
                <img id="lock-icon" src="/asssets/img/lock-icon.svg" alt="lock">
            </div>
        </div>
        <div class="btn-container">
            <div class="login-btn-container">
                <button class="login-btn">Sign in</button>
            </div>

        </div>
    </form>

`
}