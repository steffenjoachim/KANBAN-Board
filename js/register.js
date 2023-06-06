let users = [];

async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


async function register() {
    registerBtn.disabled = true;
    users.push({
        email: email.value,
        password: input.value,
        name: userName.value,
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
}

function resetForm() {
    email.value = '';
    input.value = '';
    userName.value = '';
    registerBtn.disabled = false;

    window.location.href = "./index.html?loaded"
}