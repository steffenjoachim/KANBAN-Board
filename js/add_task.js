let categories = []; // Array zum Speichern der Kategorien
let selectedColor = null;
const subtasks = [];


/**
 * Asynchronously load contacts from storage.
 */
async function loadContactsForAssign() {
  try { 
    contacts = JSON.parse(await getItem('contacts'));
  } catch (e) {
    alert('Daten konten nicht geladen werden!');
  }
  populateContactList();
}

/**
 * Asynchronously load tasks from storage.
 */
async function loadNewtasks() {
  try { 
    todos = JSON.parse(await getItem('task'));
  } catch (e) {
    alert('Error');
  }
}


function validateForm() {
  const title = document.getElementById("title-input").value;
  const description = document.getElementById("description-input").value;
  const category = document.getElementById("select-one").innerText;
  const assignedTo = getAssignedTo();
  const dueDate = document.querySelector(".date-input-container input").value;
  const selectedPriorityImagePath = getSelectedPrioImagePath();

  if (!title || !description || !category || !assignedTo || !dueDate ||  !selectedPriorityImagePath) {
    alert('Bitte füllen Sie alle Felder aus');
    return false;
  }

  // Wenn alle Felder ausgefüllt sind, ist die Formularvalidierung erfolgreich
  return true;
}


/**
 * Collects and creates a new task, adds it to task array, and updates UI.
 */
async function createTask() {
  if (!validateForm()) {
    return;
  }
    let title = document.getElementById("title-input").value;
    let description = document.getElementById("description-input").value;

    

    // Rest des Codes hier
    let category = document.getElementById("select-one").innerText; 
    let assignedTo = getAssignedTo(); 
    let dueDate = document.querySelector(".date-input-container input").value;
    let taskId = calculateId();
    let subtasks = collectSubtasks();
    let selectedPriorityImagePath = getSelectedPrioImagePath();

    let newTask = createNewTask(taskId, title, description, category, assignedTo, dueDate, subtasks, selectedPriorityImagePath);

    await addTaskToArray(newTask);

    resetInputFields();

    // Versuchen, die Benachrichtigung anzuzeigen
    showTaskAddedNotification();
  
}

/**
 * Collects all subtasks from the UI and return them as an array.
 *
 * @return {Object[]} An array of subtask objects.
 */
function collectSubtasks() {
  let subtasks = [];
  const subtaskElements = document.querySelectorAll(".subtask");
  subtaskElements.forEach((subtaskElement, index) => {
    const checkbox = subtaskElement.querySelector(".checkbox-subtask");
    const label = subtaskElement.querySelector(".subtask-name");
    const subtaskObj = {
      id: index,
      name: label.textContent,
      checked: checkbox.checked
    };
    subtasks.push(subtaskObj);
  });
  return subtasks;
}

/**
 * Creates a new task object with provided data.
 *
 * @param {number} taskId - The id of the task.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} category - The category of the task.
 * @param {string} assignedTo - The individual assigned to the task.
 * @param {string} dueDate - The due date of the task.
 * @param {Object[]} subtasks - An array of subtask objects.
 * @param {string} selectedPriorityImagePath - The path to the image representing task priority.
 * @return {Object} The created task object.
 */
function createNewTask(taskId, title, description, category, assignedTo, dueDate, subtasks, selectedPriorityImagePath) {
  return {
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
}

/**
 * Asynchronously adds a new task to the task array and saves it to storage.
 *
 * @param {Object} newTask - The task to add.
 */
async function addTaskToArray(newTask) {
  todos.push(newTask);
  // todos.splice(0, todos.length);
  await setItem("task", JSON.stringify(todos));
}

/**
 * Displays a notification indicating that a task was added.
 */
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

/**
 * Resets all input fields in the UI.
 */
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


/**
 * Calculates a unique ID for a new task.
 *
 * @return {number} The calculated unique ID.
 */
function calculateId() {
  if (todos.length === 0) {
    return 0; // Wenn keine Tasks vorhanden sind, starte mit der ID 1
  }
  // Finde die maximale ID unter den vorhandenen Tasks:
  const maxId = Math.max(...todos.map(task => task.id));
  // Erhöhe die maximale ID um 1, um eine neue eindeutige ID zu generieren:
  return maxId + 1;
}



/**
 * Manages the dropdown for selecting task category.
 */
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
  if (window.location.pathname.includes('board.html') || window.location.pathname.includes('contacts.html')) {
    checkScrollbar();
  }
}

/**
 * Shows the fields for adding a new task category.
 */
function showNewCategoryFields() {
  document.getElementById('select-one').classList.add('d-none'); // versteckt das Select task category Element
  document.getElementById('new-category-fields').classList.remove('d-none'); // zeigt das Eingabefeld und die Farbauswahl
  document.getElementById('dropdown').classList.add('d-none');
  if (window.location.pathname.includes('board.html') || window.location.pathname.includes('contacts.html')) {
    checkScrollbar();
  }
}

/**
 * Gets the selected text and color elements from the event target.
 *
 * @param {Event} event - The DOM event from the click
 * @return {Object} An object containing the selected text and color div elements
 */
function getSelectedElements(event) {
  const selectedText = event.target.querySelector('span').cloneNode(true);
  const selectedColorDiv = event.target.querySelector('.circle') ? event.target.querySelector('.circle').cloneNode(true) : null;
  return {selectedText, selectedColorDiv};
}

/**
 * Updates the select one container with the selected text and color elements.
 *
 * @param {HTMLElement} selectOne - The select one element
 * @param {Object} selectedElements - An object containing the selected text and color div elements
 */
function updateSelectOneContainer(selectOne, selectedElements) {
  const {selectedText, selectedColorDiv} = selectedElements;
  const textAndColorContainer = selectOne.querySelector('div');
  if (textAndColorContainer) {
    textAndColorContainer.innerHTML = '';
    textAndColorContainer.appendChild(selectedText);
    if (selectedColorDiv) {
      textAndColorContainer.appendChild(selectedColorDiv);
    }
  }
}

/**
 * Updates the dropdown and select one styles.
 *
 * @param {HTMLElement} dropdown - The dropdown element
 * @param {HTMLElement} selectOne - The select one element
 */
function updateDropdown(dropdown, selectOne) {
  dropdown.classList.add('d-none');
  if (selectOne) {
    selectOne.style.borderRadius = "10px";
    selectOne.style.borderBottom = "";
  }
}

/**
 * Updates the selected color container with the selected color div.
 *
 * @param {HTMLElement} selectedColorContainer - The selected color container element
 * @param {HTMLElement} selectedColorDiv - The selected color div element
 */
function updateSelectedColorContainer(selectedColorContainer, selectedColorDiv) {
  if (selectedColorContainer) {
    selectedColorContainer.innerHTML = '';
    if (selectedColorDiv) {
      const clonedColorDiv = selectedColorDiv.cloneNode(true);
      selectedColorContainer.appendChild(clonedColorDiv);
    }
  }
}

/**
 * Handles the select option event, updates the UI accordingly and calls additional functions.
 *
 * @param {Event} event - The DOM event from the click
 * @param {string} color - The selected color value
 */
function selectOption(event, color) {
  let selectOne = document.getElementById('select-one');
  let dropdown = document.getElementById('dropdown');
  let selectedColorContainer = document.getElementById('selected-color');
  const {selectedText, selectedColorDiv} = getSelectedElements(event);
  if (selectOne) {
    updateSelectOneContainer(selectOne, {selectedText, selectedColorDiv});
  }
  updateDropdown(dropdown, selectOne);
  updateSelectedColorContainer(selectedColorContainer, selectedColorDiv);

  if (window.location.pathname.includes('board.html') || window.location.pathname.includes('contacts.html')) {
    checkScrollbar();
  }
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

//-SaveNewCategory functions


/**
 * Creates a new category element and inserts it into the dropdown menu.
 *
 * @param {string} newCategoryId - The id of the new category.
 * @param {string} categoryName - The name of the new category.
 * @param {string} color - The color of the new category.
 * @return {HTMLElement} The created category element.
 */
function createAndInsertCategory(newCategoryId, categoryName, color) {
  let newCategory = createCategoryElement(newCategoryId, categoryName, color);
  const dropdown = document.getElementById('dropdown');
  const firstCategory = dropdown.querySelector('.selected');
  dropdown.insertBefore(newCategory, firstCategory);
  return newCategory;
}

/**
 * Updates the UI after a new category is created.
 */
function updateUIAfterCategoryCreation() {
  document.getElementById('select-one').classList.remove('d-none');
  document.getElementById('new-category-fields').classList.add('d-none');
  document.getElementById('new-category-name').value = '';
  // Hier können Sie eine Funktion hinzufügen, um die visuelle Rückmeldung für die ausgewählte Farbe zurückzusetzen
}

/**
 * Validates the input for a new category.
 *
 * @param {string} categoryName - The name of the new category.
 * @param {string} color - The color of the new category.
 * @return {boolean} Returns true if the inputs are valid, false otherwise.
 */
function validateNewCategoryInputs(categoryName, color) {
  if (!categoryName || !color) {
    alert('Bitte geben Sie einen Kategorienamen ein und wählen Sie eine Farbe aus.');
    return false;
  }
  return true;
}

/**
 * Saves a new category, validates the inputs, updates the dropdown menu and UI.
 */
function saveNewCategory() {
  const categoryName = document.getElementById('new-category-name').value;
  if (!validateNewCategoryInputs(categoryName, selectedColor)) return;

  const newCategoryId = categoryName;
  const newCategory = createAndInsertCategory(newCategoryId, categoryName, selectedColor);

  selectOption({ target: newCategory }, selectedColor);

  updateUIAfterCategoryCreation();
}
//-------------------------------//

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


//---------------------------------------------------

function selectAssignedTo() {
  let dropdownAssign = document.getElementById(`dropdown-assign`);
  let assignOne = document.getElementById(`assign-one`);
  let assignThree = document.getElementById(`assigned-three`)

  if (!contacts) {
    // Das 'contacts'-Array ist noch nicht geladen, daher keine Aktion ausführen
    return;
  }

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

  if (window.location.pathname.includes('board.html') || window.location.pathname.includes('contacts.html')) {
    checkScrollbar();
  }
}
function checkboxValue(i, contact) {
  let isChecked = document.getElementById(`checkbox${i}`).checked
  if (isChecked == true) {

    console.log(isChecked + contact)
  }
  else {
    console.log(isChecked + contact)
  }
}

function createDropdownAssignedHTML(id, contact, i) {
  let dropdownAssign = document.getElementById(`dropdown-assign${id}`)
  return dropdownAssign.innerHTML += `<div class="selected">${contact['name']}
<input onclick="checkboxValue(${i}, '${contact['name']}')" id="checkbox${i}" type="checkbox">
</div>`
}
function selectAssignedTo2(id) {
  let dropdownAssign = document.getElementById(`dropdown-assign${id}`);
  dropdownAssign.innerHTML = '';
  let assignOne = document.getElementById(`assign-one${id}`);
  let assignThree = document.getElementById(`assigned-three${id}`);
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    createDropdownAssignedHTML(id, contact, i);
    for (let j = 0; j < todos[id]['assignedTo'].length; j++) {
      const checkedContacts = todos[id]['assignedTo'][j]['name'];
      if (contact['name'] == checkedContacts) {
        setTimeout(() => {
          let checkbox = document.getElementById(`checkbox${i}`);
          checkbox.checked = true;
        }, 0);
      }
    }
  }
  {

    if (!contacts) {
      // Das 'contacts'-Array ist noch nicht geladen, daher keine Aktion ausführen
      return;
    }

    if (dropdownAssign.classList.contains('d-none')) {
      dropdownAssign.classList.remove('d-none');
      assignOne.style.borderRadius = "10px 10px 0 0";
      assignOne.style.borderBottom = "none";
      //assignThree.style.borderRadius = "0 0 10px 10px";
    } else {
      dropdownAssign.classList.add('d-none');
      assignOne.style.borderRadius = "10px";
      assignOne.style.borderBottom = "";
    }

    if (window.location.pathname.includes('board.html') || window.location.pathname.includes('contacts.html')) {
      checkScrollbar();
    }
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
        contactDiv.classList.add(selectedContact['icon-color']);
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

  if (window.location.pathname.includes('board.html') || window.location.pathname.includes('contacts.html')) {
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
    newDiv.id = `assigned-${i + 1}`; // Setze die id für das div

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
  deleteImage.onclick = function () {
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
    img.addEventListener('click', function (event) {
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

loadContactsForAssign().then(() => {

  populateContactList();
});

// Event-Listener für das DOMContentLoaded-Event
document.addEventListener('DOMContentLoaded', () => {

  // Hier können Sie weitere Funktionen oder Logik hinzufügen, die nach dem Laden des DOM ausgeführt werden sollen.
});