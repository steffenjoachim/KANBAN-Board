let categories = []; // Array zum Speichern der Kategorien
let selectedColor = null;

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

  addToCategoriesArray(newCategoryId, categoryName, selectedColor);

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

function addToCategoriesArray(id, name, color) {
  categories.push({
    id: id,
    name: name,
    color: color
  });
}



/**
 * Wechselt die Sichtbarkeit eines Dropdown-Menüs und ändert den Randradius der Container-Elemente.
 * Ist das Dropdown-Menü derzeit ausgeblendet, wird es angezeigt und der Randradius der Container-Elemente angepasst, so dass nur die oberen Ecken abgerundet sind.
 * Ist das Dropdown-Menü derzeit sichtbar, wird es ausgeblendet und der Randradius der Container-Elemente zurückgesetzt.
 */
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

/**
 * Aktualisiert den Textinhalt eines Auswahlfeldes mit der ausgewählten Option und verbirgt das Dropdown-Menü.
 * Wird jedoch ein Kontrollkästchen (Checkbox) angeklickt, bleibt das Dropdown-Menü sichtbar.
 * 
 * @param {Event} event - Das Event-Objekt, das die Benutzeraktion darstellt, z. B. ein Klick-Event.
 */
function selectAssign(event) {
  // Prüfen, ob das Ziel nicht ein Kontrollkästchen ist
  if (event.target.type !== 'checkbox') {
    let assignOne = document.getElementById('assign-one');
    assignOne.textContent = event.target.textContent;
    let dropdownAssign = document.getElementById('dropdown-assign');
    dropdownAssign.classList.add('d-none');
    assignOne.style.borderRadius = "10px";
    assignOne.style.borderBottom = "";  
  }
}

const cancelBtn = document.querySelector('.cancel-btn-desktop');
const cancelImg = cancelBtn.querySelector('.cancel-img');

cancelBtn.addEventListener('mouseenter', () => {
  cancelImg.src = './asssets/img/blue-cancel.svg';
});

cancelBtn.addEventListener('mouseleave', () => {
  cancelImg.src = './asssets/img/cancel-svg.svg';
});




// function removeBackgroundImage() {
//   const subTaskInput = document.getElementById('subTask');
//   subTaskInput.style.backgroundImage = "none";
// }

// function addBackgroundImage() {
//   const subTaskInput = document.getElementById('subTask');
//   subTaskInput.style.backgroundImage = "url(../../asssets/img/plus-black.svg)";
// }   

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
  // Neues div für die Subtask erstellen
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