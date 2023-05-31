/**
 * Wechselt die Sichtbarkeit eines Dropdown-Menüs und ändert den Randradius der Container-Elemente.
 * Wenn das Dropdown-Menü derzeit ausgeblendet ist, wird es angezeigt und der Randradius der Container-Elemente wird so angepasst, dass nur die oberen Ecken abgerundet sind.
 * Wenn das Dropdown-Menü derzeit sichtbar ist, wird es ausgeblendet und der Randradius der Container-Elemente wird zurückgesetzt.
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
  
}

/**
* Aktualisiert den Textinhalt eines Auswahlfelds mit der ausgewählten Option und blendet das Dropdown-Menü aus.
* 
* @param {Event} event - Das Event-Objekt, das die Benutzeraktion repräsentiert, z.B. ein Klick-Event.
*/
function selectOption(event) {
  let selectOne = document.getElementById('select-one');
  selectOne.textContent = event.target.textContent;
  let dropdown = document.getElementById('dropdown');
  dropdown.classList.add('d-none');
  selectOne.style.borderRadius = "10px";
  selectOne.style.borderBottom = "";  // Setzt den unteren Rand zurück, wenn eine Option ausgewählt ist.
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