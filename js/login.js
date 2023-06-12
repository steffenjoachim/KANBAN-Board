function logIn() {
    let email = document.getElementById('email');
    let password = document.getElementById('input');
    let user = users.find(u => u.email == email.value && u.password == password.value)
    if (user) {
        signedUser()
        // window.location.href = './summary.html';
        console.log('match');
    } else {
        document.getElementById('wrong-password').innerHTML = 'The entered email or password is incorrect.'
    }
}

function signedUser(){
    let body = document.getElementById('body');
    body.innerHTML = '';

    body.innerHTML = 
    `
    <div w3-header-include-html="./asssets/templates/header.html"></div>
    <div  id="guest-hello" class="page show content">
        <h1>Good morning</h1>
    </div>
    <footer w3-footer-include-html="./asssets/templates/footer.html"></footer>
    `
    loadSummary();
    ;
}