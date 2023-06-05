  //  beim hovern auf dem div-count1 wird das img verändert das div bekommt zudem eine onmouseover="changeDoneimage(this)"
  function changePenimage(element) {
    let img = element.querySelector('#summary-pen');
    img.src = './asssets/img/summary-pen.svg';
}
// Funktion die das ursprüngliche Bild wiederherzustellt das div bekommt zudem onmouseout="restoreDoneimage(this)"
function restorePenimage(element) {
    let img = element.querySelector('#summary-pen');
    img.src = './asssets/img/edit-icon.png';
}

    // Funktionen für das andere div

function changeDoneimage(element) {
    let img = element.querySelector('#summary-done');
    img.src = './asssets/img/summary-done.svg';
}
function restoreDoneimage(element) {
    let img = element.querySelector('#summary-done');
    img.src = './asssets/img/done-icon.png';
}