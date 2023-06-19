let categories = []; // Array zum Speichern der Kategorien
let selectedColor = null;
'let todos = [];'
const subtasks = [];


async function loadContactsForAssign(){
  try{contacts = JSON.parse(await getItem('contacts'))} catch(e){
      alert('Daten konten nicht geladen werden!')
   }
   
      populateContactList();
    
}

async function loadNewtasks() {
  try {todos = JSON.parse(await getItem('task'))}
  catch (e) {
    alert('Error')
  }
} 


async function createTask() {
  // Hier holen wir die Werte aus den verschiedenen Eingabefeldern
  console.log("At the start of createTask, selectedColor is: " + selectedColor);
  let title = document.getElementById("title-input").value;
  let description = document.getElementById("description-input").value;
  let category = document.getElementById("select-one").innerText;  // Sie müssen den richtigen Weg finden, um den ausgewählten Wert zu erhalten
  let assignedTo = getAssignedTo(); // Neue Funktion, um die zugewiesene Person zu erhalten
  let dueDate = document.querySelector(".date-input-container input").value; 
  let taskId = calculateId(); 

  // Hier holen wir die Subtasks aus dem Subtask-Array
  let subtasks = [];
  const subtaskElements = document.querySelectorAll(".subtask");
  subtaskElements.forEach((subtaskElement, index) => { // Hinzufügen des Index-Parameters in der forEach-Schleife
    const checkbox = subtaskElement.querySelector(".checkbox-subtask");
    const label = subtaskElement.querySelector(".subtask-name");
    const subtaskObj = {
      id: index, // Verwenden Sie den Index als Subtask-ID
      name: label.textContent,
      checked: checkbox.checked
    };
    subtasks.push(subtaskObj);
  });

  let selectedPriorityImagePath = getSelectedPrioImagePath();
  
  

 

  // Nun erstellen wir ein neues Task-Objekt mit diesen Werten
  console.log("Current color: " + selectedColor); // Hinzufügen dieser Zeile
  let newTask = {
    id: taskId,
    status: "todo",
    title: title,
    description: description,
    category: category,
    assignedTo: assignedTo,
    dueDate: dueDate,
    selectedPriorityImagePath: selectedPriorityImagePath,
    subtasks: subtasks,
    color: selectedColor, 
  };

  // Jetzt können wir das Task-Objekt zu unserem Array hinzufügen
  todos.push(newTask);

  // todos.splice(0, todos.length);

  await setItem("task", JSON.stringify(todos));

  // Und schließlich können wir die Eingabefelder zurücksetzen, damit sie bereit für die Eingabe einer neuen Aufgabe sind
  resetInputFields();
  showTaskAddedNotification();
  // selectedColor = null; // Diese Zeile wurde hierher verschoben
}

function showTaskAddedNotification() {
  const taskAddedContainer = document.querySelector('.task-added-container');
  const taskAdded = document.getElementById('task-added');

  // Animation hinzufügen
  taskAdded.style.animation = 'slideInFromBottom 1s forwards';

  // Benachrichtigung anzeigen
  taskAddedContainer.style.display = 'flex';

  setTimeout(() => {
    window.location.href = 'board.html';
  }, 1500);
}


function resetInputFields() {
  document.getElementById("title-input").value = "";
  document.getElementById("description-input").value = "";
  // Zeile zur Rücksetzung von "select-one" entfernt.
  document.getElementById("assign-one").innerText = "Select assigned person";
  document.querySelector(".date-input-container input").value = "";
  document.getElementById("subTask").value = "";
  document.getElementById('selected-contact').innerHTML = "";

  // Subtasks zurücksetzen
  const subtasksContainer = document.getElementById("subtasks");
  subtasksContainer.innerHTML = "";

  

  // Zurücksetzen der ausgewählten Priorität
  resetImages();

  // Zurücksetzen des "assignedTo"-Feldes
  resetAssignedTo();
  resetTaskCategoryDropdown();
  resetSelectedCategory();
  
  
}



function calculateId() {
  if (todos.length === 0) {
    return 0; // Wenn keine Tasks vorhanden sind, starte mit der ID 1
  }

  // Finde die maximale ID unter den vorhandenen Tasks:
  const maxId = Math.max(...todos.map(task => task.id));

  // Erhöhe die maximale ID um 1, um eine neue eindeutige ID zu generieren:
  return maxId + 1;
}


// let contacts = [];

// async function loadContacts(){
//   try{contacts = JSON.parse(await getItem('contacts'))} catch(e){
//       alert('Daten konten nicht geladen werden!')
//    }
// }


function selectTaskCategory() {
    let dropdown = document.getElementById('dropdown');
    let selectOne = document.getElementById('select-one');
    let selectThree = document.getElementById('selected-three')
    
    if (dropdown.classList.contains('d-none')) {
        dropdown.classList.remove('d-none');
        selectOne.style.borderRadius = "10px 10px 0 0";
        selectOne.style.borderBottom = "none";
        selectThree.style.borderRadius = "0 0 10px 10px";
    } else {
        dropdown.classList.add('d-none');
        selectOne.style.borderRadius = "10px";
        selectOne.style.borderBottom = "";  // Setzt den unteren Rand zurück, wenn das Dropdown-Menü geschlossen ist.
    } 
    if (window.location.pathname.includes('board.html')) {
      checkScrollbar();
    }
}

function showNewCategoryFields() {
    document.getElementById('select-one').classList.add('d-none'); // versteckt das Select task category Element
    document.getElementById('new-category-fields').classList.remove('d-none'); // zeigt das Eingabefeld und die Farbauswahl
    document.getElementById('dropdown').classList.add('d-none');
    if (window.location.pathname.includes('board.html')) {
      checkScrollbar();
    }
}

function selectOption(event, color) {
  let selectOne = document.getElementById('select-one');
  
  // Definieren von selectedColorDiv außerhalb der if-Anweisungen
  let selectedColorDiv = null;
  
  // Überprüfen, ob selectOne existiert
  if (selectOne) {
    const selectedText = event.target.querySelector('span').cloneNode(true);
    // Hier wird selectedColorDiv neu zugewiesen, falls das div-Element existiert
    selectedColorDiv = event.target.querySelector('.circle') ? event.target.querySelector('.circle').cloneNode(true) : null;

    // select the div containing the span and the color div
    const textAndColorContainer = selectOne.querySelector('div');
  
    // Überprüfen, ob textAndColorContainer existiert
    if (textAndColorContainer) {
      // clear the content of the container and add the new content
      textAndColorContainer.innerHTML = '';

      textAndColorContainer.appendChild(selectedText);
      if (selectedColorDiv) {
        textAndColorContainer.appendChild(selectedColorDiv);
      }
    }
  }

  let dropdown = document.getElementById('dropdown');
  dropdown.classList.add('d-none');
  if (selectOne) {
    selectOne.style.borderRadius = "10px";
    selectOne.style.borderBottom = "";
  }

  // Anzeigen der ausgewählten Farbe
  const selectedColorContainer = document.getElementById('selected-color');
  if (selectedColorContainer) {
    selectedColorContainer.innerHTML = '';
    if (selectedColorDiv) {
      const clonedColorDiv = selectedColorDiv.cloneNode(true);
      selectedColorContainer.appendChild(clonedColorDiv);
    }
  }

  if (window.location.pathname.includes('board.html')) {
    checkScrollbar();
  }

  // Aufrufen der selectColor-Funktion mit dem übergebenen Farbwert
  selectColor(color);
}

function selectColor(color) {
  console.log("selectColor function called with color: " + color);
  selectedColor = color;
}

function resetColors() {
  selectedColor = null;
  console.log("Color selection reset");
}

function cancelNewCategory() {
    document.getElementById('select-one').classList.remove('d-none'); // zeigt das Select task category Element
    document.getElementById('new-category-fields').classList.add('d-none'); // versteckt das Eingabefeld und die Farbauswahl
    document.getElementById('new-category-name').value = '';
    
    // Hier können Sie eine Funktion hinzufügen, um die visuelle Rückmeldung für die ausgewählte Farbe zurückzusetzen
  }
  
 

  function saveNewCategory() {
    const categoryName = document.getElementById('new-category-name').value;
  
    if (!categoryName || !selectedColor) {
      alert('Bitte geben Sie einen Kategorienamen ein und wählen Sie eine Farbe aus.');
      return;
    }
  
    const newCategoryId = document.getElementById('new-category-name').value;
  
    let newCategory = createCategoryElement(newCategoryId, categoryName, selectedColor);
    const dropdown = document.getElementById('dropdown');
    const firstCategory = dropdown.querySelector('.selected');
    dropdown.insertBefore(newCategory, firstCategory);
  
    selectOption({ target: newCategory }, selectedColor); // Hier wird der Farbwert an die selectOption-Funktion übergeben
  
    document.getElementById('select-one').classList.remove('d-none'); // zeigt das Select task category Element
    document.getElementById('new-category-fields').classList.add('d-none'); // versteckt das Eingabefeld und die Farbauswahl
    document.getElementById('new-category-name').value = '';
    
    // Hier können Sie eine Funktion hinzufügen, um die visuelle Rückmeldung für die ausgewählte Farbe zurückzusetzen
  }

function createCategoryElement(id, name, color) {
  let newCategory = document.createElement('div');
  newCategory.setAttribute('onclick', 'selectOption(event)');
  newCategory.className = 'selected';
  newCategory.id = id;

  let newCategorySpan = document.createElement('span');
  newCategorySpan.textContent = name;

  let newCategoryColorDiv = document.createElement('div');
  newCategoryColorDiv.style.backgroundColor = color; // setzt die Hintergrundfarbe auf die ausgewählte Farbe
  newCategoryColorDiv.className = 'circle'; // diese Klasse sollte in Ihrem CSS definiert sein, um die Form und Größe des Farbkreises zu bestimmen

  newCategory.appendChild(newCategorySpan);
  newCategory.appendChild(newCategoryColorDiv);

  return newCategory;
}


//------------------------reste-categorie

function resetSelectedCategory() {
  const selectOne = document.getElementById('select-one');
  const textAndImgContainer = selectOne.querySelector('div');
  
  // Set default text
  const defaultText = document.createElement('span');
  defaultText.textContent = 'Select task category';

  // Reset content
  textAndImgContainer.innerHTML = '';
  textAndImgContainer.appendChild(defaultText);

  // Check if image exists before trying to reset it
  const imgElement = textAndImgContainer.querySelector('img');
  if (imgElement) {
    imgElement.src = 'the path to the default img';
  }
}

function resetTaskCategoryDropdown() {
  let dropdown = document.getElementById('dropdown');
  let selectOne = document.getElementById('select-one');

  if (!dropdown.classList.contains('d-none')) {
      dropdown.classList.add('d-none');
      selectOne.style.borderRadius = "10px";
      selectOne.style.borderBottom = "";
  }
}

//Add-task-popup-close






// /**
//  * Wechselt die Sichtbarkeit eines Dropdown-Menüs und ändert den Randradius der Container-Elemente.
//  * Ist das Dropdown-Menü derzeit ausgeblendet, wird es angezeigt und der Randradius der Container-Elemente angepasst, so dass nur die oberen Ecken abgerundet sind.
//  * Ist das Dropdown-Menü derzeit sichtbar, wird es ausgeblendet und der Randradius der Container-Elemente zurückgesetzt.
//  */
// function selectAssignedTo() {
//   let dropdownAssign = document.getElementById('dropdown-assign');
//   let assignOne = document.getElementById('assign-one');
//   let assignThree = document.getElementById('assigned-three')

//   if (dropdownAssign.classList.contains('d-none')) {
//       dropdownAssign.classList.remove('d-none');
//       assignOne.style.borderRadius = "10px 10px 0 0";
//       assignOne.style.borderBottom = "none";
//       assignThree.style.borderRadius = "0 0 10px 10px";
//   } else {
//       dropdownAssign.classList.add('d-none');
//       assignOne.style.borderRadius = "10px";
//       assignOne.style.borderBottom = "";  
//   }
// }

// /**
//  * Aktualisiert den Textinhalt eines Auswahlfeldes mit der ausgewählten Option und verbirgt das Dropdown-Menü.
//  * Wird jedoch ein Kontrollkästchen (Checkbox) angeklickt, bleibt das Dropdown-Menü sichtbar.
//  * 
//  * @param {Event} event - Das Event-Objekt, das die Benutzeraktion darstellt, z. B. ein Klick-Event.
//  */
// function selectAssign(event) {
//   // Prüfen, ob das Ziel nicht ein Kontrollkästchen ist
//   if (event.target.type !== 'checkbox') {
//     let assignOne = document.getElementById('assign-one');
//     assignOne.textContent = event.target.textContent;
//     let dropdownAssign = document.getElementById('dropdown-assign');
//     dropdownAssign.classList.add('d-none');
//     assignOne.style.borderRadius = "10px";
//     assignOne.style.borderBottom = "";  
//   }
// }

// const cancelBtn = document.querySelector('.cancel-btn-desktop');
// const cancelImg = cancelBtn.querySelector('.cancel-img');

// cancelBtn.addEventListener('mouseenter', () => {
//   cancelImg.src = './asssets/img/blue-cancel.svg';
// });

// cancelBtn.addEventListener('mouseleave', () => {
//   cancelImg.src = './asssets/img/cancel-svg.svg';
// });
//---------------------------------------------------

function selectAssignedTo() {
  let dropdownAssign = document.getElementById('dropdown-assign');
  let assignOne = document.getElementById('assign-one');
  let assignThree = document.getElementById('assigned-three')

  if (dropdownAssign.classList.contains('d-none')) {
    dropdownAssign.classList.remove('d-none');
    assignOne.style.borderRadius = "10px 10px 0 0";
    assignOne.style.borderBottom = "none";
    assignThree.style.borderRadius = "0 0 10px 10px";
  } else {
    dropdownAssign.classList.add('d-none');
    assignOne.style.borderRadius = "10px";
    assignOne.style.borderBottom = "";
  }

  if (window.location.pathname.includes('board.html')) {
    checkScrollbar();
  }
}


function selectAssign(event) {
  const assignOne = document.getElementById('assign-one');
  const dropdownAssign = document.getElementById('dropdown-assign');
  const selectedContactDiv = document.getElementById('selected-contact');

  if (event.target.type === 'checkbox') {
    // Überprüfen, ob die Checkbox ausgewählt ist
    if (event.target.checked) {
      const selectedPerson = event.target.parentElement.textContent.trim();

      // Suche nach dem ausgewählten Kontakt in Ihrem Array
      let selectedContact = contacts.find(contact => contact.name === selectedPerson);
      
      if (selectedContact) {
        // Erstellung des divs für den ausgewählten Kontakt
        let contactDiv = document.createElement('div');
        contactDiv.style.backgroundColor = selectedContact['icon-color'];
        contactDiv.style.borderRadius = '50%';
        contactDiv.style.width = '50px';
        contactDiv.style.height = '50px';
        contactDiv.style.display = 'flex';
        contactDiv.style.justifyContent = 'center';
        contactDiv.style.alignItems = 'center';
        contactDiv.style.color = 'white';
        contactDiv.textContent = selectedContact.initials;

        // Hinzufügen des erstellten divs in die 'selected-contact'-div
        selectedContactDiv.appendChild(contactDiv);
      }

    } else { // Wenn die Checkbox deaktiviert wird
      // Hier können Sie den Kontakt aus der 'selected-contact'-Div entfernen
      while (selectedContactDiv.firstChild) {
        selectedContactDiv.firstChild.remove();
      }
    }

    // Dropdown-Verhalten aktualisieren
    if (!event.target.checked) {
      dropdownAssign.classList.remove('d-none');
      assignOne.style.borderRadius = '10px 10px 0 0';
      assignOne.style.borderBottom = 'none';
    }
  }

  if (window.location.pathname.includes('board.html')) {
    checkScrollbar();
  }
}

function showInviteContactFields() {
  document.getElementById('assign-one').classList.add('d-none');
  document.getElementById('dropdown-assign').classList.add('d-none');
  document.getElementById('new-contact-fields').classList.remove('d-none');
}

function cancelInviteContact() {
  document.getElementById('assign-one').classList.remove('d-none');
  document.getElementById('dropdown-assign').classList.remove('d-none');
  document.getElementById('new-contact-fields').classList.add('d-none');
  document.getElementById('new-contact-email').value = '';
}

function saveInviteContact() {
  const newContactEmail = document.getElementById('new-contact-email').value;

  if (!newContactEmail) {
    alert('Please enter an email address.');
    return;
  }

  const matchedContact = contacts.find(contact => contact.email === newContactEmail);

  if (!matchedContact) {
    alert('No matching contact found.');
    return;
  }

  const contactDiv = document.createElement('div');
  contactDiv.textContent = matchedContact.name;
  contactDiv.className = 'selected';
  contactDiv.setAttribute('onclick', 'selectAssign(event)');
  document.getElementById('dropdown-assign').insertBefore(contactDiv, document.getElementById('assigned-three'));

  cancelInviteContact();
}



function getAssignedTo() {
  const checkboxes = document.querySelectorAll('#dropdown-assign input[type="checkbox"]');
  const selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
  const assignedTo = selectedCheckboxes.map(checkbox => {
    const selectedPerson = checkbox.parentElement.textContent.trim();
    const matchedContact = contacts.find(contact => contact.name === selectedPerson);

    if (matchedContact) {
      return {
        name: matchedContact.name,
        initials: matchedContact.initials,
        iconColor: matchedContact["icon-color"]
      };
    }
  });

  return assignedTo;
}

document.querySelector(".create-btn-desktop").addEventListener("click", createTask);


function resetAssignedTo() {
  const checkboxes = document.querySelectorAll('#dropdown-assign input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  // Schließen des "assignedTo"-Dropdowns
  const dropdownAssign = document.getElementById('dropdown-assign');
  const assignOne = document.getElementById('assign-one');

  // Rücksetzen des "assignOne"-Elements auf den ursprünglichen Zustand
  assignOne.innerHTML = '<span>Select assigned person</span><img src="./add_task_img/open.svg" alt="" />';

  dropdownAssign.classList.add('d-none');
  assignOne.style.borderRadius = '10px';
  assignOne.style.borderBottom = '';
}

//---------------renderContacts-----------

// console.log(populateContactList())
// Diese Funktion geht durch das 'contacts' Array und erstellt für jeden Kontakt ein div
function populateContactList() {
  const dropdownAssign = document.getElementById('dropdown-assign');
  
  // Gehe durch das 'contacts' Array
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];

    // Erstelle ein neues div
    const newDiv = document.createElement('div');
    newDiv.onclick = selectAssign;  // Verbinde das 'selectAssign' Ereignis mit dem neuen div
    newDiv.className = 'selected space-between'; // Setze die Klasse für das div
    newDiv.id = `assigned-${i+1}`; // Setze die id für das div

    // Erstelle einen neuen Span für den Namen
    const nameSpan = document.createElement('span');
    nameSpan.textContent = contact.name;
    
    // Erstelle ein neues Input-Element für die Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; 
    checkbox.id = `checkbox-${contact.name.toLowerCase()}`; 
    checkbox.className = 'checkbox-style';

    // Füge den Span und das Input-Element zum div hinzu
    newDiv.appendChild(nameSpan);
    newDiv.appendChild(checkbox);
    
    // Füge das div zum 'dropdown-assign' div hinzu
    dropdownAssign.insertBefore(newDiv, document.getElementById('assigned-three'));
  }
}

// Rufe die Funktion auf, wenn das Dokument geladen wird in der contacts.js (function loadContacts)


//----------------------------------// 







//-----------------------------------//

function toggleIcons(displayStatus) {
  const iconsWrapper = document.querySelector('.icons-wrapper');
  const plusIcon = document.querySelector('.plus-icon');
  iconsWrapper.style.display = displayStatus;
  plusIcon.style.display = displayStatus === 'block' ? 'none' : 'block';
}

function clearInput() {
  const subTaskInput = document.getElementById('subTask');
  subTaskInput.value = '';
}


function createSubtask() {
  const subTaskInput = document.getElementById('subTask');
  let taskValue = subTaskInput.value;

  // Das neue div für die Subtask erstellen
  const newSubtask = document.createElement('div');
  newSubtask.className = 'subtask';

  // Neues Input-Feld für die Checkbox erstellen
  const newInput = document.createElement('input');
  newInput.type = 'checkbox';
  newInput.id = taskValue;
  newInput.name = taskValue;
  newInput.className = 'checkbox-subtask';

  // Neues Label für die Subtask erstellen
  const newLabel = document.createElement('label');
  newLabel.className = 'subtask-name';
  newLabel.htmlFor = taskValue;
  newLabel.textContent = taskValue;

  // Neues Bild für die Löschen-Funktion erstellen
  const deleteImage = document.createElement('img');
  deleteImage.id = 'delete-subtask';
  deleteImage.src = './asssets/img/cancel-svg.svg';
  deleteImage.alt = 'Delete Subtask';
  // onclick-Funktion hinzufügen
  deleteImage.onclick = function() {
    newSubtask.remove();
    // Sie können hier auch Code hinzufügen, um das Subtask-Objekt aus dem subtasks-Array zu entfernen.
  }

  // Die neuen Elemente zum div hinzufügen
  newSubtask.appendChild(newInput);
  newSubtask.appendChild(newLabel);
  newSubtask.appendChild(deleteImage); // das Bild hinzufügen

  // Das neue div zum speziellen Container hinzufügen
  const subtasksContainer = document.getElementById('subtasks');
  subtasksContainer.appendChild(newSubtask);

  // Das neue Subtask-Objekt erstellen und zum Subtask-Array hinzufügen
  const newSubtaskObj = {
    id: newInput.id,
    name: taskValue,
    checked: false
  };
  subtasks.push(newSubtaskObj);

  // Das Input-Feld leeren
  clearInput();
}

// Buttons

const images = {
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

function resetImages() {
  const prioImages = document.querySelectorAll('.prio-img');
  prioImages.forEach(img => {
    img.src = images[img.id].default;
  });
}

function selectImage(event) {
  event.target.src = images[event.target.id].selected;
}

function setupPriorityClick() {
  const prioImages = document.querySelectorAll('.prio-img');
  prioImages.forEach(img => {
    img.addEventListener('click', function(event) {
      resetImages();
      selectImage(event);
    });
  });
}

setupPriorityClick();

function getSelectedPrioImagePath() {
  const prioImages = document.querySelectorAll('.prio-img');
  let selectedPriority = '';
  prioImages.forEach(img => {
    if (img.src.includes('toggle')) {
      selectedPriority = img.id;
    }
  });

  let selectedImagePath = '';
  if (selectedPriority === 'urgent') {
    selectedImagePath = './asssets/img/inProgress-icon.svg';
  } else if (selectedPriority === 'medium') {
    selectedImagePath = './asssets/img/Feedback-icon.svg';
  } else if (selectedPriority === 'low') {
    selectedImagePath = './asssets/img/toDo-icon.svg';
  }

  return selectedImagePath;
}