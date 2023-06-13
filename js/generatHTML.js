function indexHTML() {
    return `
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
}