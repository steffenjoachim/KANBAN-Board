let todos = []

async function loadNewtasks() {
  try {todos = JSON.parse(await getItem('task'))}
  catch (e) {
    alert('Error')
  }
} 

//  beim hovern auf dem div-count1 wird das img verändert das div bekommt zudem eine onmouseover="changeDoneimage(this)"

function changeimage(element) {
    let img = element.querySelector('#add-card');
    img.src = './asssets/img/add-card-hover.svg';
}
// Funktion die das ursprüngliche Bild wiederherzustellt das div bekommt zudem onmouseout="restoreDoneimage(this)"

function restoreimage(element) {
    let img = element.querySelector('#add-card');
    img.src = './asssets/img/add-card.svg';
}




//  beim hovern auf dem edit-secondBtn wird das img verändert das div bekommt zudem eine onmouseover="changeDoneimage(this)"


//----------------Add-task PopUp--------------------

document.addEventListener('DOMContentLoaded', () => {
    const openPopupBtn = document.querySelector('.open-popup');
    const popupOverlay = document.querySelector('.popup-overlay');
  
    openPopupBtn.addEventListener('click', () => {
      popupOverlay.classList.add('active');
    });
  
    popupOverlay.addEventListener('click', (event) => {
      if (event.target === popupOverlay) {
        popupOverlay.classList.remove('active');
      }
    });
  });


  //----------------task-popup-----------------

  // document.addEventListener('DOMContentLoaded', () => {  // Wenn das Dokument vollständig geladen ist
  //   const openTaskPopupBtn = document.querySelector('#task-card-id'); // Der Button, der das Overlay öffnet
  //   const taskOverlayPopup = document.querySelector('.task-overlay-popup'); // Das Overlay selbst

  //   openTaskPopupBtn.addEventListener('click', () => { // Wenn auf den Button geklickt wird
  //     taskOverlayPopup.classList.add('active'); // Fügen Sie die "active" Klasse hinzu, um das Overlay anzuzeigen
  //   });
  
  //   taskOverlayPopup.addEventListener('click', (event) => { // Wenn auf das Overlay geklickt wird
  //     if (event.target === taskOverlayPopup) { // Wenn das Ziel des Klicks das Overlay selbst ist (und nicht ein Element im Overlay)
  //       taskOverlayPopup.classList.remove('active'); // Entfernen Sie die "active" Klasse, um das Overlay zu verbergen
  //     }
  //   });
  // });
  


// let todos = [
// {

//   'id': '0',
//   'title': 'Create landingpage',
//   'description': `The header and footer on top and bottom of the 
//                    page for the mobile version. On top and left side of the page 
//                    for desktop version`,
//   'category': 'Web development',
//   'assignedTo': 'MM',          
//   'dueDate': '20.10.2023',
//   'prio': 'Medium',
//   'subtask': '2',
//   'status': 'todo',
// },
// {

//   'id': '1',
//   'title': 'Create footer',
//   'description': `The header and footer on top and bottom of the 
//                    page for the mobile version. On top and left side of the page 
//                    for desktop version`,
//   'category': 'HR',
//   'assignedTo': 'MM',          
//   'dueDate': '20.10.2023',
//   'prio': 'Medium',
//   'subtask': '2',
//   'status': 'todo',
// },

// {
//   'id': '2',
//   'title': 'Create header',
//   'description': `The header and footer on top and bottom of the 
//                    page for the mobile version. On top and left side of the page 
//                    for desktop version`,
//   'category': 'Sales',
//   'assignedTo': 'MM',          
//   'dueDate': '20.10.2023',
//   'prio': 'Medium',
//   'subtask': '2',
//   'status': 'inProgress',
// },

// ];

let currentDraggedElement;


function updateHTML() {

  let filterTodo = todos.filter(t => t['status'] == 'todo');
  document.getElementById('todo-card').innerHTML = '';
  
  for (let index = 0; index < filterTodo.length; index++) {
    const element = filterTodo[index];
    document.getElementById('todo-card').innerHTML += generateTodoHTML(element);
  }
  checkEmptyList()

  
  let filterInpro = todos.filter(t => t['status'] == 'inProgress' );
  document.getElementById('progress-card').innerHTML = '';

  for (let index = 0; index < filterInpro.length; index++) {
    const element = filterInpro[index];
    document.getElementById('progress-card').innerHTML += generateTodoHTML(element);
    
  }
  checkEmptyListProgress();


  let filterFeedback = todos.filter(t => t['status'] == 'feedback' );
  document.getElementById('Feedback-card').innerHTML = '';

  for (let index = 0; index < filterFeedback.length; index++) {
    const element = filterFeedback[index];
    document.getElementById('Feedback-card').innerHTML += generateTodoHTML(element);
    
  }
  checkEmptyListFeedback();
  

  let filterDone = todos.filter(t => t['status'] == 'done' );
  document.getElementById('done-card').innerHTML = '';

  for (let index = 0; index < filterDone.length; index++) {
    const element = filterDone[index];
    document.getElementById('done-card').innerHTML += generateTodoHTML(element);
    
  }
  checkEmptyListDone();
  
}


function startDragging(id) {
  currentDraggedElement = id;
}

function generateTodoHTML(element) {
  return `<div draggable="true" ondragstart="startDragging(${element['id']})" id="card" class="item task-card card-with-PBar">
     <div class="task-category orange">${element['category']}</div>
     <div class="task-title">${element['title']}</div>
     <div class="task-description">${element['description']}</div>
     <div class="task-progress">
         <div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
             <div class="progress-bar bg-info" ></div>
         </div>
         <div class="progress-steps">0/2 Done</div>
     </div>
     <div class="task-assignedTo">
         <div class="task-icons">
             <span class="orange">SM</span>
             <span class="purple">MN</span>
             <span class="green">EF</span>
         </div>
         <img src="./asssets/img/toDo icon.svg" alt="">
     </div>
     </div>
     `;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(status) {
  todos[currentDraggedElement]['status'] = status;
  updateHTML()
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}


//////////// funktionen die die Anzeige (NO TASKS ...) je Liste eine Funktion //////////////
 
function checkEmptyList() {
  var todoCard = document.getElementById("todo-card");
  var emptyCard = document.getElementsByClassName("empty-card")[0];

  if (todoCard.children.length === 0) {
    emptyCard.style.display = "flex";
  } else {
    emptyCard.style.display = "none";
  }
}

function checkEmptyListProgress() {
  var progressCard = document.getElementById("progress-card");
  var emptyCard = document.getElementById("empty-card-progress");

  if (progressCard.children.length === 0) {
    emptyCard.style.display = "flex";
  } else {
    emptyCard.style.display = "none";
  }
}

function checkEmptyListFeedback() {
  var feedbackCard = document.getElementById("Feedback-card");
  var emptyCard = document.getElementById("empty-card-feedback");

  if (feedbackCard.children.length === 0) {
    emptyCard.style.display = "flex";
  } else {
    emptyCard.style.display = "none";
  }
}

function checkEmptyListDone() {
  var doneCard = document.getElementById("done-card");
  var emptyCard = document.getElementById("empty-card-done");

  if (doneCard.children.length === 0) {
    emptyCard.style.display = "flex";
  } else {
    emptyCard.style.display = "none";
  }
}



//////////////// Search function ///////////////


function filterTasks() {
  let search = document.getElementById('searchTask-input').value.toLowerCase();

  let todoCard = document.getElementById('todo-card');
  let progressCard = document.getElementById('progress-card');
  let feedbackCard = document.getElementById('Feedback-card');
  let doneCard = document.getElementById('done-card');

  todoCard.innerHTML = '';
  progressCard.innerHTML = '';
  feedbackCard.innerHTML = '';
  doneCard.innerHTML = '';

  for (let index = 0; index < todos.length; index++) {
    const element = todos[index];

    if (element.title.toLowerCase().includes(search) || element.description.toLowerCase().includes(search)) {
      if (element.status === 'todo') {
        todoCard.innerHTML += generateTodoHTML(element);
      } else if (element.status === 'inProgress') {
        progressCard.innerHTML += generateTodoHTML(element);
      } else if (element.status === 'feedback') {
        feedbackCard.innerHTML += generateTodoHTML(element);
      } else if (element.status === 'done') {
        doneCard.innerHTML += generateTodoHTML(element);
      }
    }
  }
}


