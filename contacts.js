/**
 * This function is used to opent the 'Edit Contact' page, so that this contact can be editted.
 * 
 */

function openEditContacts(){
    document.getElementById('edit-contact').classList.remove('d-none');
}

/**
 *  This function is used to close the 'Edit Contact' page. The contact displayed before will be shown again.
 * 
 */

function closeEditContacts(){
    document.getElementById('edit-contact').classList.add('d-none');
}

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
 * This function is used to open the contact details of the clicked on contact on the right side in the desktop version.
 * 
 */

function openContactDetails(){
    const desktopHidden = document.getElementById('desktop-hidden');
    desktopHidden.classList.remove('d-none');
    desktopHidden.classList.add('slide-in');
}