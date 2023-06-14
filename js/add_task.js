let categories = []; // Array zum Speichern der Kategorien
let selectedColor = null;
let tasksArray = [];
const subtasks = [];


function createTask() {
  // Hier holen wir die Werte aus den verschiedenen Eingabefeldern
  let title = document.getElementById("title-input").value;
  let description = document.getElementById("description-input").value;
  let category = document.getElementById("select-one").innerText;  // Sie müssen den richtigen Weg finden, um den ausgewählten Wert zu erhalten
  let assignedTo = getAssignedTo(); // Neue Funktion, um die zugewiesene Person zu erhalten
  let dueDate = document.querySelector(".date-input-container input").value;
  let prio = getSelectedPrio();  

  // Hier holen wir die Subtasks aus dem Subtask-Array
  let subtasks = [];
  const subtaskElements = document.querySelectorAll(".subtask");
  subtaskElements.forEach((subtaskElement) => {
    const checkbox = subtaskElement.querySelector(".checkbox-subtask");
    const label = subtaskElement.querySelector(".subtask-name");
    const subtaskObj = {
      id: checkbox.id,
      name: label.textContent,
      checked: checkbox.checked
    };
    subtasks.push(subtaskObj);
  });

  // Nun erstellen wir ein neues Task-Objekt mit diesen Werten
  let newTask = {
    title: title,
    description: description,
    category: category,
    assignedTo: assignedTo,
    dueDate: dueDate,
    prio: prio,
    subtasks: subtasks  // Hier fügen wir die Subtasks zum Task-Objekt hinzu
  };

  // Jetzt können wir das Task-Objekt zu unserem Array hinzufügen
  tasksArray.push(newTask);

  // Und schließlich können wir die Eingabefelder zurücksetzen, damit sie bereit für die Eingabe einer neuen Aufgabe sind
  resetInputFields();
}

function resetInputFields() {
  document.getElementById("title-input").value = "";
  document.getElementById("description-input").value = "";
  document.getElementById("select-one").innerText = "Select task category";  
  document.getElementById("assign-one").innerText = "Select assigned person";
  document.querySelector(".date-input-container input").value = "";
  document.getElementById("subTask").value = "";

  // Subtasks zurücksetzen
  const subtasksContainer = document.getElementById("subtasks");
  subtasksContainer.innerHTML = "";
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
}

function showNewCategoryFields() {
    document.getElementById('select-one').classList.add('d-none'); // versteckt das Select task category Element
    document.getElementById('new-category-fields').classList.remove('d-none'); // zeigt das Eingabefeld und die Farbauswahl
    document.getElementById('dropdown').classList.add('d-none');
}

function selectOption(event) {
    let selectOne = document.getElementById('select-one');
    const selectedText = event.target.querySelector('span').cloneNode(true);
    const selectedImg = event.target.querySelector('img') ? event.target.querySelector('img').cloneNode(true) : null;

    // select the div containing the span and the img
    const textAndImgContainer = selectOne.querySelector('div');

    // clear the content of the container and add the new content
    textAndImgContainer.innerHTML = '';

    textAndImgContainer.appendChild(selectedText);
    if (selectedImg) {
      textAndImgContainer.appendChild(selectedImg);
    }
  
    let dropdown = document.getElementById('dropdown');
    dropdown.classList.add('d-none');
    selectOne.style.borderRadius = "10px";
    selectOne.style.borderBottom = "";  // Setzt den unteren Rand zurück, wenn eine Option ausgewählt ist.
}

function selectColor(event) {
    selectedColor = event.target.src;
    // Hier können Sie eine Funktion hinzufügen, um das ausgewählte Bild hervorzuheben oder eine andere visuelle Rückmeldung zu geben
}

function cancelNewCategory() {
    document.getElementById('select-one').classList.remove('d-none'); // zeigt das Select task category Element
    document.getElementById('new-category-fields').classList.add('d-none'); // versteckt das Eingabefeld und die Farbauswahl
    document.getElementById('new-category-name').value = '';
    selectedColor = null;
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

  selectOption({ target: newCategory }); // Category auswählen

  document.getElementById('select-one').classList.remove('d-none'); // zeigt das Select task category Element
  document.getElementById('new-category-fields').classList.add('d-none'); // versteckt das Eingabefeld und die Farbauswahl
  document.getElementById('new-category-name').value = '';
  selectedColor = null;
  // Hier können Sie eine Funktion hinzufügen, um die visuelle Rückmeldung für die ausgewählte Farbe zurückzusetzen
}

function createCategoryElement(id, name, color) {
  let newCategory = document.createElement('div');
  newCategory.setAttribute('onclick', 'selectOption(event)');
  newCategory.className = 'selected';
  newCategory.id = id;

  let newCategorySpan = document.createElement('span');
  newCategorySpan.textContent = name;

  let newCategoryImg = document.createElement('img');
  newCategoryImg.src = color;
  newCategoryImg.className = 'color-circle';

  newCategory.appendChild(newCategorySpan);
  newCategory.appendChild(newCategoryImg);

  return newCategory;
}





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
}

function selectAssign(event) {
  const assignOne = document.getElementById('assign-one');
  const dropdownAssign = document.getElementById('dropdown-assign');
  
  if (event.target.type === 'checkbox') {
    // Überprüfen, ob die Checkbox ausgewählt ist
    if (event.target.checked) {
      const selectedPerson = event.target.parentElement.textContent.trim();
      // Hier können Sie die ausgewählte Person weiterverarbeiten, z.B. in einem Array speichern
      console.log('Ausgewählte Person:', selectedPerson);
    }
    
    // Dropdown-Verhalten aktualisieren
    if (!event.target.checked) {
      dropdownAssign.classList.remove('d-none');
      assignOne.style.borderRadius = '10px 10px 0 0';
      assignOne.style.borderBottom = 'none';
    }
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

const cancelBtn = document.querySelector('.cancel-btn-desktop');
const cancelImg = cancelBtn.querySelector('.cancel-img');

cancelBtn.addEventListener('mouseenter', () => {
  cancelImg.src = './asssets/img/blue-cancel.svg';
});

cancelBtn.addEventListener('mouseleave', () => {
  cancelImg.src = './asssets/img/cancel-svg.svg';
});

function getAssignedTo() {
  const checkboxes = document.querySelectorAll('#dropdown-assign input[type="checkbox"]');
  const selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
  const assignedTo = selectedCheckboxes.map(checkbox => checkbox.parentElement.textContent.trim());
  return assignedTo;
}

document.querySelector(".create-btn-desktop").addEventListener("click", createTask);



//---------------renderContacts-----------

console.log(populateContactList())
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


function validateFormSubmission() {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
      // Sie können hier den Selector anpassen, um die ausgewählten Personen zu selektieren
      const assignedPersons = document.querySelectorAll('#dropdown-assign .selected');
      
      if (assignedPersons.length === 0) {
          alert('Bitte wählen Sie mindestens eine Person aus.');
          e.preventDefault();
      }
  });
}

// Rufen Sie die Funktion auf, sobald das Dokument geladen ist
window.addEventListener('DOMContentLoaded', validateFormSubmission);


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

  // Die neuen Elemente zum div hinzufügen
  newSubtask.appendChild(newInput);
  newSubtask.appendChild(newLabel);

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

function getSelectedPrio() {
  const prioImages = document.querySelectorAll('.prio-img');
  let selectedPriority = "";
  prioImages.forEach(img => {
      if (img.src.includes("toggle")) {
          selectedPriority = img.id; // "urgent", "medium" oder "low"
      }
  });
  return selectedPriority;
}