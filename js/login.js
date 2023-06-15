let name = [];

function logIn() {
    let email = document.getElementById('email');
    let password = document.getElementById('input');
    let user = users.find(u => u.email == email.value && u.password == password.value)
    if (user) {
        guestLogin(user);
    } else {
        document.getElementById('wrong-password').innerHTML = 'The entered email or password is incorrect.'
    }
}

function usersGreeting(user) {
    localStorage.removeItem('name');
    name.push(user['name']);
    localStorage.setItem('name', JSON.stringify(name));
    let windowWidth = window.innerWidth;
    if (windowWidth <= 1024) {
        document.getElementById('user-name').innerHTML = name;
    }
}