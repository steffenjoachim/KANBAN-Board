//  beim hovern auf dem div-count1 wird das img verändert das div bekommt zudem eine onmouseover="changeDoneimage(this)"

function changePenimage(element) {
    let img = element.querySelector('#add-card');
    img.src = './asssets/img/add-card-hover.svg';
}
// Funktion die das ursprüngliche Bild wiederherzustellt das div bekommt zudem onmouseout="restoreDoneimage(this)"

function restorePenimage(element) {
    let img = element.querySelector('#add-card');
    img.src = './asssets/img/add-card.svg';
}




//  beim hovern auf dem edit-secondBtn wird das img verändert das div bekommt zudem eine onmouseover="changeDoneimage(this)"

// function changeimage(element) {
//     let img = element.querySelector('#edit-secondBtn-hover');
//     img.src = './asssets/img/add-btn-hoover.png';
// }
// Funktion die das ursprüngliche Bild wiederherzustellt das div bekommt zudem onmouseout="restoreDoneimage(this)"

// function restoreimage(element) {
//     let img = element.querySelector('#edit-secondBtn-hover');
//     img.src = './asssets/img/add-button.png';
// }

document.addEventListener('DOMContentLoaded', () => {
    const openPopupBtn = document.querySelector('.open-popup');
    const popupOverlay = document.querySelector('.popup-overlay');
  
    openPopupBtn.addEventListener('click', () => {
      popupOverlay.classList.add('active');
    });
  
    popupOverlay.addEventListener('click', (event) => {
      if (event.target === popupOverlay) {
        popupOverlay.classList.remove('active');
      }
    });
  });