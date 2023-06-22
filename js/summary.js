/**
 * This function change the pen image when hover on the div
 * 
 * @param {object} element - This is the div of the img
 */
function changePenimage(element) {
    let img = element.querySelector('#summary-pen');
    img.src = './asssets/img/summary-pen.svg';
}
/**
 * This function change (restore) the pen image when hover on the div
 * 
 * @param {object} element - This is the div of the img
 */
function restorePenimage(element) {
    let img = element.querySelector('#summary-pen');
    img.src = './asssets/img/edit-icon.png';
}

/**
 * This function change the check image when hover on the div
 * 
 * @param {object} element - This is the div of the img
 */
function changeDoneimage(element) {
    let img = element.querySelector('#summary-done');
    img.src = './asssets/img/summary-done.svg';
}

/**
 * This function change (restore) the check image when hover on the div
 * 
 * @param {object} element - This is the div of the img
 */
function restoreDoneimage(element) {
    let img = element.querySelector('#summary-done');
    img.src = './asssets/img/done-icon.png';
}

/**
 * This function creates a short greeting message based on the current time. 
  It uses the JavaScript date functions to get the current hour. Depending on the time of day, an appropriate welcome message is assigned.
 */
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

/**
 * This function retrieve tasks from local storage and displaying them
 */
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

/**
 * This function counts the number of tasks in different status categories 
   and updates the corresponding counters on a web page.
 * 
 * @param {object} boardTodos - this is the array of the tasks
 */
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
  
/**
 * This function redirects to the "board.html" page when a div element is clicked
 */
  function redirectToBoard() {
    window.location.href = 'board.html';
  }
