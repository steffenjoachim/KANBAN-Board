
async function loadNewtasksboard() {
  try { todos = JSON.parse(await getItem('task')) }
  catch (e) {
    alert('Error')
  }
  updateHTML()
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

if (window.location.pathname.includes('board.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    const openPopupBtn = document.querySelector('.open-popup');
    const openPopupBtnResponiv = document.querySelector('.edit-btn');
    const popupOverlay = document.querySelector('.popup-overlay');

    openPopupBtn.addEventListener('click', openPopup);
    openPopupBtnResponiv.addEventListener('click', openPopup);

    popupOverlay.addEventListener('click', (event) => {
      if (event.target === popupOverlay) {
        closePopup();
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    function adjustPopupContent() {
      const popupOverlay = document.querySelector('.popup-overlay');
      const popupContent = document.getElementById('popupContent');
      const body = document.body;

      // Überprüfen, ob das Popup aktiv ist
      if (popupOverlay && popupOverlay.classList.contains('active')) {
        if (window.innerWidth <= 900 && window.innerWidth >= 280) {
          if (popupContent) {
            body.appendChild(popupContent);
          }
        } else {
          if (popupContent) {
            popupOverlay.appendChild(popupContent);
          }
        }
      }
    }

    // Resize-Event-Listener hinzufügen
    window.addEventListener('resize', adjustPopupContent);

    // Call the function initially to account for the current window size
    adjustPopupContent();
  });

  function openPopup() {
    const popupOverlay = document.querySelector('.popup-overlay');
    popupOverlay.classList.add('active');
    disableBackgroundScroll();
    checkScrollbar();
  }

  function closePopup() {
    const popupOverlay = document.querySelector('.popup-overlay');
    popupOverlay.classList.remove('active');
    enableBackgroundScroll();
    resetInputFields();
    resetTaskCategoryDropdown();
    resetSelectedCategory();
    checkScrollbar();
  }

  function disableBackgroundScroll() {
    document.body.style.overflow = 'hidden';
  }

  function enableBackgroundScroll() {
    document.body.style.overflow = '';
  }

  function checkScrollbar() {
    const popupContent = document.querySelector('.popup-content');
    if (popupContent.scrollHeight > popupContent.clientHeight) {
      popupContent.classList.add('scrolling');
    } else {
      popupContent.classList.remove('scrolling');
    }
  }
}

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





let todos = [];
let currentDraggedElement;

function updateHTML() {

  let filterTodo = todos.filter(t => t['status'] == 'todo');
  document.getElementById('todo-card').innerHTML = '';
  for (let index = 0; index < filterTodo.length; index++) {
    const element = filterTodo[index];
    document.getElementById('todo-card').innerHTML += generateTodoHTML(element);
    listdesign(element);
  }checkEmptyList();


  let filterInpro = todos.filter(t => t['status'] == 'inProgress');
  document.getElementById('progress-card').innerHTML = '';
  for (let index = 0; index < filterInpro.length; index++) {
    const element = filterInpro[index];
    document.getElementById('progress-card').innerHTML += generateTodoHTML(element);
    listdesign(element);
  }checkEmptyListProgress();


  let filterFeedback = todos.filter(t => t['status'] == 'feedback');
  document.getElementById('Feedback-card').innerHTML = '';
  for (let index = 0; index < filterFeedback.length; index++) {
    const element = filterFeedback[index];
    document.getElementById('Feedback-card').innerHTML += generateTodoHTML(element);
    listdesign(element);
  }checkEmptyListFeedback();


  let filterDone = todos.filter(t => t['status'] == 'done');
  document.getElementById('done-card').innerHTML = '';
  for (let index = 0; index < filterDone.length; index++) {
    const element = filterDone[index];
    document.getElementById('done-card').innerHTML += generateTodoHTML(element);
    listdesign(element);
  }checkEmptyListDone();
}

function listdesign(element) {
  document.getElementById(`task-category${element['id']}`).style.backgroundColor = element['color'];
  document.getElementById(`task-category${element['id']}`).innerHTML = element['category'];
  document.getElementById(`assigned-contacts${element['id']}`).innerHTML = renderAssignedContacts(element['id']);
  document.getElementById(`task-icon${element['id']}`).src = element['selectedPriorityImagePath']
  showProgressBar(element, element['id'])
}


async function chageStatusToToDo(id) {
  todos[id]['status'] = 'todo';
  await setItem('task', JSON.stringify(todos))
  updateHTML()
}
async function chageStatusToInProgress(id) {
  todos[id]['status'] = 'inProgress';
  await setItem('task', JSON.stringify(todos))
  updateHTML()
}
async function chageStatusToFeedback(id) {
  todos[id]['status'] = 'feedback';
  await setItem('task', JSON.stringify(todos))
  updateHTML()
}
async function chageStatusToDone(id) {
  todos[id]['status'] = 'done';
  await setItem('task', JSON.stringify(todos))
  updateHTML()
}
function moveTaskup(id) {
  let card = document.getElementById(`card${id}`);
  card.innerHTML = '';
  card.innerHTML = `
<div class="card-change-status">
<h3>Move to:</h3>
<span onclick="chageStatusToToDo(${id}); event.stopPropagation()">To do</span>
<span onclick="chageStatusToInProgress(${id}); event.stopPropagation()">In Progress</span>
<span onclick="chageStatusToFeedback(${id}); event.stopPropagation()">Awaiting Feedback</span>
<span onclick="chageStatusToDone(${id}); event.stopPropagation()">Done</span>
<div onclick="updateHTML(); event.stopPropagation()">X</div>
</div>
`
}

function startDragging(id) {
  currentDraggedElement = id;
}

function generateTodoHTML(element) {
  return `<div draggable="true" ontouchstart="startDragging(${element['id']})" ondragstart="startDragging(${element['id']})" id="card${element['id']}" class="item task-card card-with-PBar" onclick="openEditPopup(${element['id']})">
  <div class="menu-container"><img onclick="moveTaskup(${element['id']}); event.stopPropagation()" class="menu-points" id="arrowUp" src="./asssets/img/list.png" alt=""></div>
  <div id="task-category${element['id']}" class="task-category ">${element['category']}</div>
  <div class="task-title">${element['title']}</div>
  <div class="task-description">${element['description']}</div>
  <div id="task-progress${element['id']}" class="task-progress dis-none">
      <div class="progress" role="progressbar" aria-label="Example with label">
          <div id="progress-bar${element['id']}" class="progress-bar" style="width: 25%"></div>
      </div>
      <div id="progress-steps${element['id']}" class="progress-steps"></div>
  </div>
  <div class="task-assignedTo">
      <div id="assigned-contacts${element['id']}" class="task-icons">
      </div>
      <img id="task-icon${element['id']}" src="./asssets/img/toDo-icon.svg" alt="">
  </div>
  </div>`;

}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(status) {
  todos[currentDraggedElement]['status'] = status;
  await setItem('task', JSON.stringify(todos))
  updateHTML()

}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}

function countProgressSteps(id) {
  let totalSubTask = todos[id]['subtasks'].length;
  let totalSubTaskChecked = 0;

  for (let j = 0; j < totalSubTask; j++) {
    if (todos[id]['subtasks'][j]['checked'] === true) {
      totalSubTaskChecked++
    }
  }
  progressAnimation(totalSubTask, totalSubTaskChecked, id)
  return `${totalSubTaskChecked} / ${totalSubTask} Done`
}

function showProgressBar(element, id) {
  if (todos[id] && todos[id].subtasks && todos[id].subtasks.length > 0) {
    document.getElementById(`task-progress${element.id}`).classList.remove('dis-none');
    document.getElementById(`progress-steps${element.id}`).innerHTML = countProgressSteps(id);
  }
}


function progressAnimation(totalSubTask, totalSubTaskChecked, id) {

  let percent = totalSubTaskChecked / totalSubTask;
  percent = Math.round(percent * 100)
  document.getElementById(`progress-bar${id}`).style = `width: ${percent}%;`
}

function renderAssignedContacts(id) {
  let renderedContacts = '';

  if (todos[id] && todos[id].assignedTo) {
    const assignedContacts = todos[id].assignedTo;
    const remainingContacts = assignedContacts.length - 2;

    for (let j = 0; j < 2 && j < assignedContacts.length; j++) {
      const assignedContact = assignedContacts[j];
      const contact = `<span class="${assignedContact.iconColor}">${assignedContact.initials}</span>`;
      renderedContacts += contact;
    }

    if (remainingContacts > 0) {
      renderedContacts += `<span class="remaining-contacts">+${remainingContacts}</span>`;
    }
  }

  return renderedContacts;
}


////////////// Check if the lists are empty //////////////

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

  if (search == '') {
    updateHTML()
  } else {

    let todoCard = document.getElementById('todo-card');
    let progressCard = document.getElementById('progress-card');
    let feedbackCard = document.getElementById('Feedback-card');
    let doneCard = document.getElementById('done-card');

    // Clear the HTML content of the cards
    todoCard.innerHTML = '';
    progressCard.innerHTML = '';
    feedbackCard.innerHTML = '';
    doneCard.innerHTML = '';

    for (let index = 0; index < todos.length; index++) {
      const element = todos[index];
      if (element.title.toLowerCase().includes(search) || element.description.toLowerCase().includes(search)) {
        if (element.status === 'todo') {
          todoCard.innerHTML += generateTodoHTML(element);
          listdesign(element)
        } else if (element.status === 'inProgress') {
          progressCard.innerHTML += generateTodoHTML(element);
          listdesign(element)
        } else if (element.status === 'feedback') {
          feedbackCard.innerHTML += generateTodoHTML(element);
          listdesign(element)
        } else if (element.status === 'done') {
          doneCard.innerHTML += generateTodoHTML(element);
          listdesign(element)
        }
      }
    }
    // Check if the filtered lists are empty
    checkEmptyList();
    checkEmptyListProgress();
    checkEmptyListFeedback();
    checkEmptyListDone();
  }
}











// -------------Edit Task popup---------------

// function openEditPopup(taskId) {
//   let task = todos.find(t => t.id == taskId);

//   if (!task) {
//     console.error(`Keine Aufgabe mit der ID ${taskId} gefunden`);
//     return;
//   }

//   document.getElementById('popup-title').innerText = task.title;
//   document.getElementById('popup-description').innerText = task.description;
//   // und so weiter für alle Felder, die du in deinem Popup hast...

//   // Füge die "active" Klasse zum Popup hinzu, um es anzuzeigen
//   document.getElementById('task-overlay-popup').classList.add('active');
// }

// function closeEditPopup() {
//   // Entferne die "active" Klasse vom Popup, um es zu verbergen
//   document.getElementById('task-overlay-popup').classList.remove('active');
// }

function openEditPopup(taskId) {
  let task = todos.find(t => t.id === Number(taskId));

  if (!task) {
    console.error(`Keine Aufgabe mit der ID ${taskId} gefunden`);
    return;
  }

  function getImagePath(priorityImagePath) {
    switch (priorityImagePath) {
      case "./asssets/img/inProgress-icon.svg":
        return "./asssets/img/urgent-edit-task.svg";
      case "./asssets/img/Feedback-icon.svg":
        return "./asssets/img/medium-edit-task.svg";
      case "./asssets/img/toDo-icon.svg":
        return "./asssets/img/low-edit-task.svg";
      default:
        return priorityImagePath;
    }
  }

  // Generiere den HTML-Inhalt
  let popupContentHtml = `
  <div class="edit-wrap">
    <div class="popUp-head-task">
      <div class="task-category-one" style="background-color:${task.color};">${task.category}</div>
      <img id="close-popUp-one" class="close-popUp-arrows" src="./asssets/img/popUp-arrow.svg" alt="" />
      <img onclick="closeEditPopup()" class="close-popUp-xx display-none" src="./asssets/img/popUp-close.svg" alt="" />
    </div>

    <span class="popUp-titled">${task.title}</span>

    <p class="popUp-description">${task.description}</p>

    <div class="popUp-date">
      <span class="bolder">Due date:</span>
      <span>${task.dueDate}</span>
    </div>

    <div class="popUp-prio">
      <span class="bolder">Priority:</span>
      <div class="popUp-prio-btn">
        <img src="${getImagePath(task.selectedPriorityImagePath)}" alt="" />
      </div>
    </div>
  </div>
  `;

  // Generiere HTML für "Assigned To" Abschnitt
  popupContentHtml += `<span class="bolder assignedTo-divE">Assigned To:</span>`
  task.assignedTo.forEach(assignedPerson => {
    popupContentHtml += `
      <div class="assignedTo-divE">
        <div class="assignedTo-iconE ${assignedPerson.iconColor}" ;">${assignedPerson.initials}</div>
        <div class="assignedTo-name">${assignedPerson.name}</div>
      </div>
    `;
  });



  // Generiere HTML für die Schließen und Bearbeiten Buttons
  popupContentHtml += `
    <div class="btns-responsive firstTypebtns">
      <div></div>
      <div class="popUp-btns">
        <img class="popUp-delete" src="./asssets/img/popUp-deleteBTN.svg" alt="" />
        <img class="popUp-edit" src="./asssets/img/popUp-editBTN.svg" alt="" />
      </div>
    </div>

    <div class="btns-responsive">
      <div></div>
      <div class="popUp-btns secondTypebtns">
      <div id="popUpDelete" class="popUp-delete-responsive" data-id="${taskId}">
        <img src="./asssets/img/popUpDelete.svg" alt="" />
      </div>
      <div class="popUp-edit-responsive" onclick="editingTask(${taskId})">
        <img src="./asssets/img/popUpEditPen.svg" alt="" />
      </div>
      </div>
    </div>
    
  `;

  // Zeige das Popup
  document.querySelector('.task-overlay-popup').classList.add('active');
  // Füge den Inhalt zum Popup hinzu
  document.getElementById('taskContent').innerHTML = popupContentHtml;
  // Füge den Event Listener hinzu
  document.getElementById('taskContent').addEventListener('click', function(event) {
    if (event.target.closest('#popUpDelete')) {
      const taskId = event.target.closest('#popUpDelete').dataset.id;
      console.log(`Lösche Aufgabe mit ID: ${taskId}`);
      deleteTask(taskId);
      closeEditPopup();
    }
  });
}



function closeEditPopup() {
  // Verstecke das Popup
  document.querySelector('.task-overlay-popup').classList.remove('active');
  // Leere den Inhalt des Popups
  document.getElementById('taskContent').innerHTML = '';
}

async function deleteTask(id) {
  console.log(`Lösche Aufgabe mit ID: ${id}`);
  // Convert id to number
  id = Number(id);

  // Finden Sie den Index des zu löschenden Auftrags im todos Array
  const taskIndex = todos.findIndex((task) => task.id === id);

  // Überprüfen, ob der Auftrag gefunden wurde
  if (taskIndex !== -1) {
    // Entfernen Sie den Auftrag aus dem todos Array
    todos.splice(taskIndex, 1);

    // Speichern Sie das aktualisierte todos Array im Speicher
    await setItem('task', JSON.stringify(todos));

    // Aktualisieren Sie die Darstellung
    updateHTML();
    closeEditPopup();
  }
}

// function editingTask(taskId) {
//   // Finde den Task mit der angegebenen taskId
//   let task = todos.find(t => t.id === Number(taskId));

//   if (!task) {
//     console.error(`Keine Aufgabe mit der ID ${taskId} gefunden`);
//     return;
//   }

//   // Führe den Bearbeitungsvorgang für den Task durch
//   // Verwende die Informationen aus dem "task" Objekt, um die entsprechenden Felder zu aktualisieren oder anzeigen

//   // Beispiel:
//   console.log(`Bearbeite Task mit ID ${taskId}`);
//   console.log('Titel:', task.title);
//   console.log('Beschreibung:', task.description);
//   console.log('Priorität:', task.priority);
//   console.log('Zugewiesen an:', task.assignedTo);
//   console.log('Fälligkeitsdatum:', task.dueDate);
//   console.log('Kategorie:', task.category);

//   // Hier können Sie den Code hinzufügen, um das Popup oder das Formular zur Bearbeitung des Tasks anzuzeigen
// }
function openDropDownContacts(taskId) {
  let contactsContainer = document.getElementById('contacts-container');
  contactsContainer.innerHTML = '';
  if (contactsContainer.style.display === 'flex') {
    contactsContainer.style.display = 'none';

  } else {
    contactsContainer.style.display = 'flex';
  }
  

}



function editingTask(taskId) {
  let task = todos.find(t => t.id === Number(taskId));

  if (!task) {
    console.error(`Keine Aufgabe mit der ID ${taskId} gefunden`);
    return;
  }

  // Generiere den HTML-Inhalt für das Bearbeitungsfenster
  let editFormHtml = `
    <div class="edit-wrap">
      <div class="popUp-head-task">
        <div class="task-category-one" style="background-color:${task.color};">${task.category}</div>
        <img id="close-popUp-one" class="close-popUp-arrows" src="./asssets/img/popUp-arrow.svg" alt="" />
        <img onclick="closeEditPopup()" class="close-popUp-xx display-none" src="./asssets/img/popUp-close.svg" alt="" />
      </div>
      
      <label for="title-input">Title</label>
          <input class="all-input" id="title-input${taskId}" type="text" name="title" value="${task.title}" required />

          <label for="description-input" >Description</label>
          <textarea id="description-input${taskId}" name="description" value="${task.description}" required>${todos[taskId]['description']}</textarea>

          <label for="date-input">Due Date</label>
          <div class="date-input-container">
            <input id="date${taskId}" class="all-input" type="date" placeholder="dd/mm/yyyy" value="${task.dueDate}" />
          </div>

      
      <div class="popUp-prio">
        <span class="bolder">Priority:</span>
        <label for="prio-buttons"></label>
        <div id="prio-buttons${taskId}">
        <img id="urgent" class="prio-img2" src="./asssets/img/urgent-urgent.svg" alt="" onclick="selectImageEdit(event)">
        <img id="medium" class="prio-img2" src="./asssets/img/medium-urgent.svg" alt="" onclick="selectImageEdit(event)">
        <img id="low" class="prio-img2" src="./asssets/img/low-urgent.svg" alt="" onclick="selectImageEdit(event)">
      </div>
      </div>

      <label for="Assigned-to">Assigned to</label>
              <div onclick="selectAssignedTo(${taskId})" id="assign-one${taskId}" class="select-one">
                <span>Select assigned person</span>
                <img onclick="selectAssignedTo2(${taskId})" src="./add_task_img/open.svg" alt="" />
                <div id="contacts-container" class="contacts"></div>

              <div id="dropdown-assign${taskId}" class="d-none">
                <div onclick="showInviteContactFields()" id="assigned-three${taskId}" class="selected">
                  <span>Invite new contact</span>
                  <img src="./add_task_img/kontakt.svg" id="contact-icon" class="icon-style" />
                </div>
              </div>

              <div id="selected-contact"></div>

              <div id="new-contact-fields" class="d-none">
                <input type="text" id="new-contact-email" placeholder="Enter email address">
                <div class="icons-wrapper-three">
                  <img src="./asssets/img/cancel-svg.svg" id="cross-icon2" onclick="cancelInviteContact()">
                  |
                  <img src="./asssets/img/checkmark.svg" id="check-icon2" onclick="saveInviteContact()">
                </div>
              </div>


      
      </div>
      <button onclick="saveTask(${taskId})">OK</button>
    </div>
  `;

  // Zeige das Bearbeitungsfenster
  document.querySelector('.task-overlay-popup').classList.add('active');
  // Füge den Inhalt zum Popup hinzu
  document.getElementById('taskContent').innerHTML = editFormHtml;
}

function saveTask(id) {
  let title = document.getElementById(`title-input${id}`).value;
  let description = document.getElementById(`description-input${id}`).value;
  let date = document.getElementById(`date${id}`).value;

  // Verwende die ausgewählte Priorität
  let priorityImagePath;
  switch (selectedPriority) {
    case "urgent":
      priorityImagePath = "./asssets/img/inProgress-icon.svg";
      break;
    case "medium":
      priorityImagePath = "./asssets/img/Feedback-icon.svg";
      break;
    case "low":
      priorityImagePath = "./asssets/img/toDo-icon.svg";
      break;
    default:
      priorityImagePath = "./asssets/img/inProgress-icon.svg";
  }

  todos[id].dueDate = date;
  todos[id].description = description;
  todos[id].title = title;
  todos[id].selectedPriorityImagePath = priorityImagePath; // Aktualisiere das Bildpfad-Feld mit der ausgewählten Priorität
  updateHTML();

  console.log(title);
  console.log(id);
  console.log(selectedPriority);
  closeEditPopup();
}

function resetImages() {
  const prioImages = document.querySelectorAll('.prio-img2');
  prioImages.forEach(img => {
    img.src = images[img.id].default;
  });
}

const imagesEdit = {
  "urgent": {
    "default": "./asssets/img/urgent-urgent.svg",
    "selected": "./asssets/img/urgent-toggle.svg"
  },
  "medium": {
    "default": "./asssets/img/medium-urgent.svg",
    "selected": "./asssets/img/medium-urgent-toggle.svg"
  },
  "low": {
    "default": "./asssets/img/low-urgent.svg",
    "selected": "./asssets/img/low-urgent-toggle.svg"
  }
};

let selectedPriority = ''; // Füge eine Variable hinzu, um die ausgewählte Priorität zu speichern

function selectImageEdit(event) {
  const selectedImage = event.target;
  const imageId = selectedImage.id;

  // Setze alle Bilder zurück und entferne die ausgewählte Klasse
  const prioImages = document.querySelectorAll('.prio-img2');
  prioImages.forEach(img => {
    img.src = imagesEdit[img.id].default;
    img.setAttribute("data-selected", "false");
    // Füge spezifische CSS-Stile hinzu oder entferne sie (falls gewünscht)
    img.style.border = "";
  });

  // Aktiviere das ausgewählte Bild
  selectedImage.src = imagesEdit[imageId].selected;
  selectedImage.setAttribute("data-selected", "true");
  // Füge spezifische CSS-Stile hinzu oder entferne sie (falls gewünscht)

  // Speichere die ausgewählte Priorität
  selectedPriority = imageId;
}