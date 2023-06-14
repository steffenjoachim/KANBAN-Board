

//  beim hovern auf dem div-count1 wird das img verändert das div bekommt zudem eine onmouseover="changeDoneimage(this)"
function changePenimage(element) {
    let img = element.querySelector('#summary-pen');
    img.src = './asssets/img/summary-pen.svg';
}
// Funktion die das ursprüngliche Bild wiederherzustellt das div bekommt zudem onmouseout="restoreDoneimage(this)"
function restorePenimage(element) {
    let img = element.querySelector('#summary-pen');
    img.src = './asssets/img/edit-icon.png';
}

// Funktionen für das andere div

function changeDoneimage(element) {
    let img = element.querySelector('#summary-done');
    img.src = './asssets/img/summary-done.svg';
}
function restoreDoneimage(element) {
    let img = element.querySelector('#summary-done');
    img.src = './asssets/img/done-icon.png';
}

async function loadtodos() {
    try { countTodo = JSON.parse(await getItem('counttodo')) }
    catch (e) {
        console.log('Error')
    }
}

function userGreetingOnSummary() {
    let currentTime = new Date().getHours();
    let greetingText;
    if (currentTime < 6) {
        greetingText = "Good night!";
    } else if (currentTime < 12) {
        greetingText = "Good morning!";
    } else if (currentTime < 18) {
        greetingText = "Good afternoon!";
    } else {
        greetingText = "Good evening!";
    }
    document.getElementById('greeting').innerHTML = greetingText;
    let name = JSON.parse(localStorage.getItem('name'))
    setTimeout(function () {
        document.getElementById('name').innerHTML = name
    }, 5);
}
// function numberofTodo() {
//     let todoSpan = document.getElementById('countTodo')

// }



