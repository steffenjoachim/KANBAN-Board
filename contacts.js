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