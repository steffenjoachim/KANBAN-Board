function indexHTML() {
    let body = document.getElementById('body');
    body.innerHTML = '';
    body.innerHTML =  `
    <div class="main-content">
            <header>
                <div class="logo-container">
                    <img src="/asssets/img/mobile-login-logo-dark.svg" alt="" style="padding-top:37px">
                </div>
            </header>
    
            <div id="inside-window" class="inside-window">
                <h1>Log in</h1>
                <img class="login-line" src="/asssets/img/line.svg" alt="Trennlinie">
                <form onsubmit="logIn(); return false">
                    <div class="input-field-outter-container">
                        <div class="input-field">
                            <input id="email" class="e-mail" type="email" name="" required placeholder="Email">
                            <img src="/asssets/img/email-icon.svg" alt="e-mail icon">
                        </div>
                        <div class="input-field">
                            <input onkeyup="togglePasswordVisibility()" id="input" class="password" type="password" required placeholder="Password">
                            <div id="lock-icon-container">
                                <img id="lock-icon" src="./asssets/img/lock-icon.svg" alt="lock">
                            </div>
                        </div>
                    </div>
                    <div id="wrong-password" class="wrong-password"></div>
                    <div class="remember-frogot-container">
                        <a onclick="forgotPassword()" class="forgot" href="#">Forgot my Password</a>
                        <div id="checkbox-container" class="checkbox-container">
                            <div id="checkmark-container">
                                <img class="checkbox-empty" onclick="checkmarkChecked()"
                                    src="./asssets/img/checkmark_container.svg" alt="">
                            </div>
                            <label>Remember me</label>
                        </div>
                    </div>
                    <div class="guest-login-container">
                        <div class="btn-container">
                            <div class="login-btn-container">
                                <button class="login-btn">Log in</button>
                            </div>
                        </div>
                </form>
                <div class="guest-btn-container">
                    <button type="button" onclick="guestLogin()" class="guest-btn">Guest Log
                            in</button>
                </div>
            </div>
        </div>
        </div>
        <div class="outer-container">
            <div id="sign-up-container" class="sign-up-container">
                <span>Not a Join user?</span>
                <div>
                    <button onclick="signIn()">Sign up</button>
                </div>
            </div>
        </div>
        <script src="/js/script.js"></script>
    `
};

function generateSignInHtml() {
    return `
    <div class="arrow-container">
    <a id="arrow-a" onclick="indexHTML()">
           <div class="back-arrow">
           <img src="./asssets/img/back_arrow.svg">
           </div>       
           </a>
    </div>
    <h1 class="sign-in-headline">Sign up</h1>
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

function generateForgotHtml() {
    return `
    <div class="arrow-container">
        <a id="arrow-a" onclick="indexHTML()">

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
};

function generateResetPasswordHtml() {
    return `
    <div class="arrow-container">
        <div id="forgot-pass-img-container" onclick="forgotPassword()" class="arrow-img-container">
            <img src="./asssets/img/back_arrow.svg">
        </div>    
    </div>
    <h1 class="reset-password-headline">Reset your password</h1>
    <img class="line-reset-password" src="./asssets/img/line.svg" alt="Trennlinie">
    <p class="reset-password-text">Change your account password<br>here.
    <div class="input-field">
        <input onkeyup="togglePasswordVisibility()" id="input" class="password" type="password" required placeholder="New password">
        <div id="lock-icon-container">
            <img id="lock-icon" src="./asssets/img/lock-icon.svg" alt="lock">
        </div>
    </div>
    <div class="input-field margin-reset-password-input">
        <input id="input-confirm" class="password" type="password" required placeholder="Confirm password">
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
};