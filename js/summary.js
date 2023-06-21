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
    document.getElementById('name').innerHTML = name
}

let boardTodos = [];

async function loadNewtasksboardd() {
  try {boardTodos = JSON.parse(await getItem('task'))}
  catch (e) {
    alert('Error')
  }
  displayTodoCount(boardTodos);
  getNextDueDate(boardTodos);
} 

/**
 * This function is used to filter the next upcomming 'due date' out of the array boardTodos that has the priority "urgent" (which has the following img-path: ./asssets/img/inProgress-icon.svg)
 * 
 * @param {object} boardTodos - array including all tasks displayed in board.html
 */

function getNextDueDate(boardTodos) {
  const filteredArray = boardTodos.filter(todo => todo.selectedPriorityImagePath === './asssets/img/inProgress-icon.svg');

  const sortedArray = filteredArray.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const nextDueDate = new Date(sortedArray[0].dueDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  document.getElementById('summary-date').innerHTML = nextDueDate
}





function displayTodoCount(boardTodos) {
    let countTodos = 0;
    let countInProgress = 0;
    let countFeedback = 0;
    let countDone = 0;
    let countPrio = 0;

    for (let i = 0; i < boardTodos.length; i++) {
      if (boardTodos[i].status === 'todo') {
        countTodos++;
      }
    }

    for (let i = 0; i < boardTodos.length; i++) {
        if (boardTodos[i].status === 'inProgress') {
          countInProgress++;
        }
      }

    for (let i = 0; i < boardTodos.length; i++) {
        if (boardTodos[i].status === 'feedback') {
          countFeedback++;
        }
      }

    for (let i = 0; i < boardTodos.length; i++) {
        if (boardTodos[i].status === 'done') {
            countDone++;
        }
      }

    for (let i = 0; i < boardTodos.length; i++) {
        if (boardTodos[i]['selectedPriorityImagePath'] == './asssets/img/inProgress-icon.svg') {
            countPrio++;
        }
      }
   
    document.getElementById('countTodo').textContent = boardTodos.length.toString();
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
