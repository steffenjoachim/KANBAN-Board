let contacts = [
    {
        'name': 'Anton Mayer',
        ' email': 'antonm@gmail.com',
        'telephone': '+49 1111 111 11 1',
        'initials': 'AM',
        'icon-color': 'orange'
    }
]

let colors = [ 'yellow', 'orange', 'light-orange', 'purple', 'blue', 'light-blue', 'pink','green', 'red']


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

function openEditContacts(){
    document.getElementById('edit-contact').classList.add('slide-in');
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

function openContactDetails(){
    let windowWidth = window.innerWidth;
    if (windowWidth <= 768) {
        document.getElementById('content-big-contact').classList.remove('d-none');
        document.getElementById('content-big-contact').classList.add('slide-in2');
    } else {
        document.getElementById('desktop-hidden').classList.add('slide-in');
    }   
}


/**
 * This function is used to close the contact details of the clicked on contact in the mobile version only.
 * 
 */

function closeContactDetails(){
    document.getElementById('content-big-contact').classList.add('d-none');
    document.getElementById('content-big-contact').classList.remove('slide-in2');

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
        'icon-color': getRandomColor()
    };

    insertContact(newContact);
    deleteInputFields();
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

}


/**
 * This function is used to loade the contacts onload contacts.html from the remote server
 * 
 */

async function loadContacts(){
    try{contacts = JSON.parse(await getItem('contacts'))} catch(e){
        alert('Daten konten nicht geladen werden!')
     }
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


