/**
 * This method is defining a JavaScript function called indexHTML(). When this function is called, it will redirect the user to the index.html page.
 */
function indexHTML() {
    let body = document.getElementById('body');
    body.innerHTML = '';
    body.innerHTML =  `
    <div class="main-content">
            <header>
                <div class="logo-container">
                    <img src="/asssets/img/mobile-login-logo-dark.svg" alt="">
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
/**
 * 
 * @returns This method is generating HTML code for a sign-up form. It includes input fields for name, email, and password, as well as a submit button for registering the user. The method also includes some CSS classes and images to style the form.
 */
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
/**
 * 
 * @returns This method is generating HTML code for a "forgot password" form. It includes a heading, a line image, a paragraph explaining that the user will receive an email with instructions on how to reset their password, and a form with an input field for the user's email address and a "Send me the E-Mail" button. When the user submits the form, the method calls a function called "showEmailSendInfo()" to display information about the email being sent.
 */
function generateForgotHtml() {
    return `
    <div class="arrow-container">
        <a id="arrow-a" onclick="indexHTML()">

        </a>
    </div>
    <h1 class="forgot-password-headline">I forgot my password</h1>
    <img class="line" src="./asssets/img/line.svg" alt="Trennlinie">
    <p class="forgot-password-text">Don't worry! We will send you an email with the instructions to reset your password.
    <form onsubmit="showEmailSendInfo(); return false;">
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
/**
 * 
 * @returns This method is generating an HTML code for a reset password form. It includes input fields for a new password and a confirmation password, as well as a "Continue" button to submit the form. The method also includes some CSS classes and images to style the form. The "togglePasswordVisibility()" function is likely used to show or hide the password input field when the user clicks on it.
 */
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
 `;
}
/**
 * @returns This function generates HTML markup for a guest login page. 
 * It includes various CSS and JavaScript files, sets up the page structure with a header, content section, and footer, and initializes some functions and elements for displaying a greeting and user name.
 */
function generateGuestLoginHTML() {
    return `
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
}