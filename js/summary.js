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
  



  