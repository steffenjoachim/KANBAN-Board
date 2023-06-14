 let contacts = [
   
]


let colors = [ 'yellow', 'orange', 'light-orange', 'purple', 'blue', 'light-blue', 'pink','dark-pink','light-green', 'green','dark-green','dark-red', 'red', 'ligh-red','brown']


/**
 * This funktion is used to change the color of the pen to blue, if hovered over, by changing the source of the image.
 * 
 */

function changePenColorToBlue(){
    document.getElementById('edit-contact-logo').src = "./asssets/img/edit-contact-blue.svg"
}


/**
* This funktion is used to change the color of the pen to black again, after hovering, by changing the source of the image.
* 
*/

function changePenColorToBlack(){
   document.getElementById('edit-contact-logo').src = "./asssets/img/edit-contact.svg"
}


/**
 * This function is used to opent the 'Edit Contact' page, so that this contact can be editted.
 * 
 */

function openEditContacts(i){
    document.getElementById('edit-contact').classList.add('slide-in');
    renderEditContactPage(i);
}


function renderEditContactPage(i){
    const contact = contacts[i];
    let content = document.getElementById('edit-contact')
    content.innerHTML = '';
    content.innerHTML += createEditContactPageHtml(i, contact);
    document.getElementById(`logo-bigger${i}`).innerHTML = contact['initials'];
    document.getElementById(`name-displayed${i}`).innerHTML = contact['name'];
    document.getElementById(`email-displayed${i}`).innerHTML = contact['email'];
    document.getElementById(`phone-displayed${i}`).innerHTML = contact['telephone'];
}


function createEditContactPageHtml(i, contact){
    return `
    <div class="edit-contact-frame">
            <div class="edit-contact-head">
                <div onclick="closeEditContacts()" class="x-container">
                    <img class="close-x" src="./asssets/img/close-x.svg" alt="close x-icon">
                </div>
                <img class="join-logo-white d-none" src="./asssets/img/join-logo-white.svg" alt="Join logo">
                <h1 class="white">Edit Contact</h1>
                <hr id="hr-blue-small-left" class="hr-blue-small-left">

            </div>
            <div class="edit-contact-bottom">
                <span id="logo-bigger${i}" class="contact-logo-bigger ${contact['icon-color']}">TW</span>
                <form onsubmit"editContact('${contact['id']}',${i})">
                    <div class="close-x-dark-container" onclick="closeEditContacts()">
                        <img class="close-x-dark d-none" src="./asssets/img/close-x-dark.svg" alt="close x">
                    </div>
                    <div class="input-field-top">
                        <textarea class="name-displayed" name="name" id="name-displayed${i}" cols="50"
                            rows="10">Tatjana Wolf</textarea>
                        <input class="name-input d-none" type="name" required placeholder="Name">
                        <img src="./asssets/img/name-head.svg" alt="name icon">
                    </div>
                    <div class="input-field">
                        <textarea class="email-displayed" name="name" id="email-displayed${i}" cols="50"
                            rows="10">wolf@gmail.com</textarea>
                        <input class="email-input d-none" type="email" placeholder="Email">
                        <img src="./asssets/img/email-icon.svg" alt="email icon">
                    </div>
                    <div class="input-field">
                        <textarea class="phone-displayed" name="name" id="phone-displayed${i}" cols="50"
                            rows="10">+49 2222 222 22 2</textarea>
                        <input class="tel-input d-none" type="tel" placeholder="Phone">
                        <img src="./asssets/img/tel.svg" alt="name icon">
                    </div>
                    <div class="delete-save">
                        <div onclick="deleteContact(${i})" class="delete">Delete</div>
                        <div onclick="editContact('${contact['id']}',${i})"
                        ;
                        class="save">Save</div>
                    </div>
                </form>
            </div>
    
    `
}


/**
 *  This function is used to close the 'Edit Contact' page. The contact displayed before will be shown again.
 * 
 */

function closeEditContacts(){
    document.getElementById('edit-contact').classList.remove('slide-in');
}


/**
 * This function is used to open the contact details of the clicked on contact, as complete overlay in the mobile version and on the right side in the tablet and desktop version. Since the click on event is started by clicking on the same element in all versions the if-request is used to determin in which way the contact details will be displayed.
 * 
 */

function openContactDetails(i){
    let windowWidth = window.innerWidth;
    if (windowWidth <= 768) {
        document.getElementById('content-big-contact').classList.remove('d-none');
        document.getElementById('content-big-contact').classList.add('slide-in2');
        renderContactDetailsMobile(i);
    } else {
        document.getElementById('desktop-hidden').classList.add('slide-in');
        renderContactDetailsDesktop(i);
    }   
}


/**
 * This function is used to close the contact details in the mobile version.
 * 
 * @param {number} i - the index of the current contact.
 */

function closeContactDetails(i){
    document.getElementById('content-big-contact').classList.add('d-none');
    document.getElementById('content-big-contact').classList.remove('slide-in2');
}


/**
 * This function is used to render the contact details of the clicked on contact for the mobile version.
 * 
 * @param {number} i - the index of the current contact.
 */

function renderContactDetailsMobile(i){
    const contact = contacts[i];
    let content = document.getElementById('big-contact-frame');
    content.innerHTML = '';
    content.innerHTML += createContactDetailsMobileHtml(i, contact);
    document.getElementById(`contact-logo-big${i}`).innerHTML = contact['initials'];
    document.getElementById(`big-name${i}`).innerHTML = contact['name'];
    document.getElementById(`email-adress${i}`).innerHTML = contact['email'];
    document.getElementById(`mobile-number${i}`).innerHTML = contact['telephone'];

}


/**
 * This function is used to create the necessary html block to display the contact details.
 * 
 * @param {number} i - the index of the current contact. 
 * @param {object} contact - is the JASON with the data of the current contact.
 * @returns @returns - the html block to be added.
 */

function createContactDetailsMobileHtml(i, contact){
    return `
    <div id="big-contact-frame" class="big-contact-frame">
                <div class="big-contact-frame-header">
                    <h3 class="kpmt">Kanban Project Management Tool</h3>
                    <div onclick="closeContactDetails(${i})" class="h1-back-arrow">
                        <div class="order1">
                            <h1>Contacts</h1>
                        </div>
                        <img class="back-arrow" src="./asssets/img/arrow-left-line.svg" alt="back arrow">
                    </div>
                    <div class="order3">
                        <h3 class="better-with-a-team">Better with a team</h3>
                    </div>
                    <div class="order2">
                        <hr class="hr-blue-small-left">
                    </div>
                </div>
                <div id="desktop-hidden">
                    <div class="name-add-task-logo">
                        <span id="contact-logo-big${i}" class="contact-logo-big ${contact['icon-color']}">AM</span>
                        <div class="name-add-task">
                            <span id="big-name${i}" class="big-name">Anton Mayer</span>
                            <span class="email">+ Add Task</span>
                        </div>
                    </div>
                    <div class="contact-information-frame">
                        <h3 class="contact-information">Contact Information</h3>
                        <div class="edit-pen" onclick="openEditContacts(${i})">
                            <img onmousemove="changePenColorToBlue()" onmouseleave="changePenColorToBlack()"
                                id="edit-contact-logo" class="edit-contact-logo" src="./asssets/img/edit-contact.svg"
                                alt="edit contact logo">
                            <span class="edit-contact-text">Edit Contact</span>
                        </div>
                    </div>
                    <div class="email-data">
                        <span class="email-head">Email</span>
                        <span id="email-adress${i}" class="email-adress-blue">antom@gmail.com</span> 
                    </div>
                    <div class="mobile-data">
                        <span class="mobile-head">Mobil</span>
                        <span id="mobile-number${i}" class="mobile-number-blue">+49 1111 111 11 1</span>
                    </div>
                </div>
                <div class="delet-edit-frame">
                    <img onclick="deleteContact(${i})" class="bin" src="./asssets/img/delete-bin.svg" alt="delete bin">
                    <img onclick="openEditContacts(${i})" class="pen" src="./asssets/img/edit.svg" alt="edit pen">
                </div>
                <div onclick="openAddContactsOverlay()" class="new-contact-container-2">
                    <span>New Contact</span>
                    <img src="./asssets/img/new-contact.svg" alt="New Contact">
                </div>
            </div>
        </div>
    `
}


/**
 * This funktion is used to render the contact details of the clicked on contact on the right side of the contact.html in the desktop version. 
 * 
 * @param {number} i - the index of the current contact
 */

function renderContactDetailsDesktop(i){
    const contact = contacts[i];
    let content = document.getElementById('desktop-hidden');
    content.innerHTML = '';
    content.innerHTML += createContactDetailsDesktopHtml(i, contact);
    document.getElementById(`contact-logo-big${i}`).innerHTML = contact['initials'];
    document.getElementById(`big-name${i}`).innerHTML = contact['name'];
    document.getElementById(`email-adress${i}`).innerHTML = contact['email'];
    document.getElementById(`mobile-number${i}`).innerHTML = contact['telephone'];
}


/**
 * This function is used to create the necessary html block to display the contact details. 
 * 
 * @param {number} i -the index of the current contact.
 * @param {object} contact - is the JASON with the data of the current contact.
 * @returns - the html block to be added.
 */

function createContactDetailsDesktopHtml(i, contact){
    return `
    <div class="name-add-task-logo">
                        <span id="contact-logo-big${i}" class="contact-logo-big ${contact['icon-color']}"></span>
                        <div class="name-add-task">
                            <span id="big-name${i}" class="big-name">Anton Mayer</span>
                            <span class="email">+ Add Task</span>
                        </div>
                    </div>
                    <div class="contact-information-frame">
                        <h3 class="contact-information">Contact Information</h3>
                        <div class="edit-pen" onclick="openEditContacts(${i})">
                            <img onmousemove="changePenColorToBlue()" onmouseleave="changePenColorToBlack()"
                                id="edit-contact-logo" class="edit-contact-logo" src="./asssets/img/edit-contact.svg"
                                alt="edit contact logo">
                            <span class="edit-contact-text">Edit Contact</span>
                        </div>
                    </div>
                    <div class="email-data">
                        <span class="email-head">Email</span>
                        <span id="email-adress${i}" class="email-adress-blue">antom@gmail.com</span>
                    </div>
                        <div class="mobile-data">
                            <span class="mobile-head">Mobil</span>
                            <span id="mobile-number${i}" class="mobile-number-blue">+49 1111 111 11 1</span>
                        </div>    
    `
}


/**
 * This function is used to open the add contact overlay in the desktop version.
 * 
 */

function openAddContactsOverlay(){
    document.getElementById('add-contact').classList.add('slide-in');
}


/**
 * This function is used to close the add contact overlay in the desktop version.
 * 
 */

function closeAddContactsOverlay(){
    document.getElementById('add-contact').classList.remove('slide-in');
}


/**
 * This function is used to clear the input fields of the 'Add Contact' overlay and then close it.
 * 
 */

 function deleteInputFields(){
    document.getElementById('name-input').value = '';
    document.getElementById('email-input').value = '';
    document.getElementById('tel-input').value = '';
    closeAddContactsOverlay()
}


/**
 * This function is used to create a new contact by extracting the data from the input fields. The initials and icon color are determined by seperate functions.
 * 
 */

function createNewContact() {
    const name = document.getElementById('name-input');
    const email = document.getElementById('email-input');
    const telephone = document.getElementById('tel-input');
    const newContact = {
        'name': name.value,
        'email': email.value,
        'telephone': telephone.value,
        'initials': calculateInitials(name.value),
        'icon-color': getRandomColor(),
        'id': calculateId()
    };
    insertContact(newContact);
    loadContacts();
    deleteInputFields();
}


/**
 * This function is used to create a unique ID. It always looks for the largest existing ID and increases it by one.
 * 
 * @returns - calculated ID
 */

function calculateId() {
    if (contacts.length === 0) {
      return 1; // If there is no contact, start with ID 1
    }
  
    // Find the maximum ID in the existing contacts:
    const maxId = Math.max(...contacts.map(contact => contact.id));
  
    // Increase the max ID by 1 to generate a new unique ID:
    return maxId + 1;
  }


/**
 * This funktion is used to insert the created contact in alphabetic order to the array 'contacts' and push it to the remote server.
 * 
 * @param {object} newContact - this is the newly created contact that should be inserted.
 */

async function insertContact(newContact) {
    const insertIndex = findInsertIndex(newContact);
    if (insertIndex === -1) {
        contacts.push(newContact); // Adds at the end if the new contact is alphabetically greater than all existing ones.
    } else {
        contacts.splice(insertIndex, 0, newContact); // Inserts at the calculated index position.
    }  
await setItem('contacts', JSON.stringify(contacts));
loadContacts();
}


/**
 * This function is used to load the contacts onload contacts.html from the remote server. If the 
 * data can not be loaded there is an alert.
 */

async function loadContacts(){
    try{contacts = JSON.parse(await getItem('contacts'))} catch(e){
        alert('Daten konten nicht geladen werden!')
     }
     
     
     if (window.location.pathname.includes('contacts.html')) {
        renderFirstContacts();
      } else {
        populateContactList();
      }
     
}


/**
 * This function is used to render the first contact and to call the function to render the following contacts. The first contact is rendered seperately, because for the next contacts a comparisson betwenn the rendered contact and the contact rendered before is needed. Since the first contact has no contact before, it would cause an error.
 * 
 */

function renderFirstContacts(){
    let content = document.getElementById('contact-frame');
    content.innerHTML = '';

    for (let i = 0; i < 1; i++) {
        const contact = contacts[i];
        const letter = contact['initials'].charAt(0).toUpperCase();
        content.innerHTML += returnHtmlWithH2(i,contact);
        document.getElementById(`letter${i}`).innerHTML = letter;
        document.getElementById(`logo${i}`).innerHTML = contact['initials'];
        document.getElementById(`name${i}`).innerHTML = contact['name'];
        document.getElementById(`email${i}`).innerHTML = contact['email'];
    }
    renderFollowingContacts();
}


/**
 * This function is used to render the following contacts. The if statement is used to check whether the first letter of the initials already exists or not, and the appropriate html block is added accordingly.
 * 
 */

function renderFollowingContacts(){
    let content = document.getElementById('contact-frame');

    for (let i = 1; i < contacts.length; i++) {
        const contact = contacts[i];
        const letter = contact['initials'].charAt(0).toUpperCase();
        if (letter == contacts[i-1]['initials'].charAt(0).toUpperCase()) {
            content.innerHTML += returnHtmlWithoutH2(i, contact);
        } else { 
            content.innerHTML += returnHtmlWithH2(i,contact);
            document.getElementById(`letter${i}`).innerHTML = letter;
        }
 
        document.getElementById(`logo${i}`).innerHTML = contact['initials'];
        document.getElementById(`name${i}`).innerHTML = contact['name'];
        document.getElementById(`email${i}`).innerHTML = contact['email'];
    }
   }


/**
 * This This function is used to insert a html block with h2 heading. This is necessary if the first letter of the initials of the previous contact does not correspond to that of the current contact.
 * 
 * @param {number} i - the in Index of the current contact
 * @param {object} contact - 
 * @returns - the html block to be added
 */

function returnHtmlWithH2(i, contact){

return `
<div class="letter-frame">
    <h2 id="letter${i}"></h2>
    <hr class="standard-hr">
    <div onclick="openContactDetails(${i})" class="single-contact-frame">
        <span id="logo${i}" class="contact-logo ${contact['icon-color']}"></span>
        <div class="name-and-email">
            <span id="name${i}" class="name"></span>
            <span id="email${i}" class="email"></span>
        </div>
    </div>
</div>
`
}


/**
 * This function is used to insert a html block without h2 heading. This is necessary if the first letter of the initials of the previous contact corresponds to that of the current contact.
 * 
 * @param {*} i - the in Index of the current contact
 * @param {*} contact is the JASON with the data of the current contact
 * @returns - the html block to be added
 */
 

function returnHtmlWithoutH2(i, contact){

    return `
    <div class="letter-frame">
        <div onclick="openContactDetails(${i})" class="single-contact-frame">
            <span id="logo${i}" class="contact-logo ${contact['icon-color']}"></span>
            <div class="name-and-email">
                <span id="name${i}" class="name"></span>
                <span id="email${i}" class="email"></span>
            </div>
        </div>
    </div>
    `
    }


/**
 * This function is used to determin the 'initials' that should be added to the new contact.
 * 
 * @param {string} name - the name extracted from the input field 'name-input'
 * @returns - after the name is split at the whitespace the first letters of each part are added. These are the wanted 'initials'.
 */

function calculateInitials(name) {
    const names = name.split(' '); // Split the name at the position where a whitespace occurs.
    const firstNameInitial = names[0].charAt(0).toUpperCase();
    const lastNameInitial = names[names.length - 1].charAt(0).toUpperCase();
    return firstNameInitial + lastNameInitial;
}


/**
 * This function is used to searches for the index at which the new contact, newContact, should be inserted into the contacts array.
 * 
 * @param {object} newContact - this is the newly created contact that should be inserted.
 * @returns - i represents the position at which the new contact will be inserted into the 'contacts' array. -1 is returned as the index if the new contact is alphabetically greater than all previous contacts (the contact will then be inserted at the end of the array).
 */

function findInsertIndex(newContact) {
    const newContactInitials = newContact.initials.toUpperCase();
    const newContactLastName = extractLastName(newContact.name);

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const contactInitials = contact.initials.toUpperCase();
        const contactLastName = extractLastName(contact.name);

        if (compareContacts(contactInitials, newContactInitials, contactLastName, newContactLastName)) {
            return i;
        }
    }
    return -1;
}


/**
 * This function is used to compares two contacts based on their initials and last names. The comparison of the last name is to place two contacts with the same initials (e.g. Anja Schulz amd Albert Schanze) in the correct alphabetic order according to the last name.
 * 
 * @param {*} initials1 - the initials of the existing contact in the array
 * @param {*} initials2 - the initials of the newly created contact
 * @param {*} lastName1 - the last name of the existing contact in the array
 * @param {*} lastName2 - the last name of the newly created contact
 * @returns -  1) return lastName1.localeCompare(lastName2) > 0;: If the initials are the same, this line compares the last names lastName1 and lastName2 using localeCompare(). If lastName1 comes after lastName2 alphabetically, it returns true as the first contact should be placed before the second contact. Otherwise, it returns false., 2) return initialsComparison > 0;: If the initials are not equal, this line is reached. Here, it checks whether initials1 comes alphabetically after initials2. If this is the case, true is returned since the first contact should be placed before the second contact. Otherwise, false is returned.
 */

function compareContacts(initials1, initials2, lastName1, lastName2) {
    const initialsComparison = initials1.localeCompare(initials2);
    if (initialsComparison === 0) {
        return lastName1.localeCompare(lastName2) > 0;
    }

    return initialsComparison > 0;
}


/**
 * This function is used to extract the last name from the full name of the new cantact
 * 
 * @param {string} fullName - is the full name of the new created contact
 * @returns - after the full name is split at the whitespace the second part, which is the last name, is returned
 */

function extractLastName(fullName) {
    const names = fullName.split(' ');
    return names[names.length - 1].toUpperCase();
}


/**
 * This function is used to assign a random color from the colors array to the color property of an element in the contacts array.
 * 
 * @returns - a random color out of the colors array
 */

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

/**
 * This function is used to delete the selected contact.
 * 
 * @param {number} i - index of the contact to be deleted
 */

async function deleteContact(i) {
    contacts.splice(i, 1);
    await setItem('contacts', JSON.stringify(contacts));
    functionsToBeCalledAfterDelete(i);
  }


/**
 * This function is used to determin, what should be shown after aa contact has been deleted.
 * 
 * @param {number} i - the index that the deleted contact had in the contacts array.
 */

  function functionsToBeCalledAfterDelete(i){
    loadContacts();
    let windowWidth = window.innerWidth;
    if (windowWidth <= 768) {
        closeContactDetails(i);
    } else { if (i == 0) {
            openContactDetails(i);} else {
            openContactDetails(i-1);}
        closeEditContacts();
    }   
  }


  /**
   * This function  is used to edit a contact
   * 
   * @param {string} contactId - the unique id of the contact that should be changed
   * @param {number} i - the index of the contact to be editted in the array 'contacts'
   */

  function editContact(contactId, i) {
    const contact = contacts.find(contact => contact.id == contactId); // looking for the contact with the corresponding ID
    if (contact) {
        contact.name = document.getElementById(`name-displayed${i}`).value;
        contact.email = document.getElementById(`email-displayed${i}`).value;
        contact.telephone = document.getElementById(`phone-displayed${i}`).value;
        const name = contact.name;
        contact.initials = calculateInitials(name);
    } else {
       alert("Kontakt nicht gefunden.");
    }
    functionsToBeCalledAfterEdit(i, contact)
}
    

/**
 *  This function is used to determin, what should be shown after aa contact has been editted.
 * 
 * @param {number} i - the index of the contact to be editted in the array 'contacts'
 * @param {object} contact - the json of the editted contact
 */

async function functionsToBeCalledAfterEdit(i, contact){ 
    deleteContact(i);
    insertContact(contact);
    loadContacts();
    openContactDetails(i+1);
    await setItem('contacts', JSON.stringify(contacts));
    closeEditContacts()
}

