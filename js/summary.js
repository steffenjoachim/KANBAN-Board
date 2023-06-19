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
    try {countTodo = JSON.parse(await getItem('counttodo'))}
    catch(e) {
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


function displayTodoCount(todos) {
    let countTodos = 0;
    let countInProgress = 0;
    let countFeedback = 0;
    let countDone = 0;
    let countPrio = 0;

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].status === 'todo') {
        countTodos++;
      }
    }

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].status === 'inProgress') {
          countInProgress++;
        }
      }

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].status === 'feedback') {
          countFeedback++;
        }
      }

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].status === 'done') {
            countDone++;
        }
      }

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].prio === 'urgent') {
            countPrio++;
        }
      }
   
    document.getElementById('countTodo').textContent = todos.length.toString();
    document.getElementById('countInprogress').textContent = countInProgress.toString();
    document.getElementById('countFeedback').textContent = countFeedback.toString();
    document.getElementById('countTodos').textContent = countTodos.toString();
    document.getElementById('countDone').textContent = countDone.toString();
    document.getElementById('countPrio').textContent = countPrio.toString();
  }
  

/////   Funktion die bei einem Klick auf ein div-Element zur "board.html"-Seite weiterleitet /////

  function redirectToBoard() {
    window.location.href = 'board.html';
  }
