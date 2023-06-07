function logIn() {
    let email = document.getElementById('email');
    let password = document.getElementById('input');
    let user = users.find(u => u.email == email.value && u.password == password.value)
    if (user) {
        window.location.href = './summary.html';
        console.log('match');
    } else {

        document.getElementById('wrong-password').innerHTML = 'The entered email or password is incorrect.'
    }
}