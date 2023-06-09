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



let todos = [{

    'title': 'Create header and footer',
    'description': `The header and footer on top and bottom of the 
                     page for the mobile version. On top and left side of the page 
                     for desktop version`,
    'category': 'Web development',
    'assignedTo': 'MM',          
    'dueDate': '20.10.2023',
    'prio': 'Medium',
    'subtask': '2',
},
{

  'title': 'Create header and footer',
  'description': `The header and footer on top and bottom of the 
                   page for the mobile version. On top and left side of the page 
                   for desktop version`,
  'category': 'Web development',
  'assignedTo': 'MM',          
  'dueDate': '20.10.2023',
  'prio': 'Medium',
  'subtask': '2',
},

{

  'title': 'Create header and footer',
  'description': `The header and footer on top and bottom of the 
                   page for the mobile version. On top and left side of the page 
                   for desktop version`,
  'category': 'Web development',
  'assignedTo': 'MM',          
  'dueDate': '20.10.2023',
  'prio': 'Medium',
  'subtask': '2',
},

];



function render() {
  let taskSection = document.getElementById('task-card');
  taskSection.innerHTML = '';

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];

    taskSection.innerHTML += `<div draggable="true" ondragstart="drag(event)" id="card" class="task-card card-with-PBar">
    <div class="task-category orange">${todo['category']}</div>
    <div class="task-title">${todo['title']}</div>
    <div class="task-description">${todo['description']}</div>
    <div class="task-progress">
        <div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-info" ></div>
        </div>
        <div class="progress-steps">0/2 Done</div>
    </div>
    <div class="task-assignedTo">
        <div class="task-icons">
            <span class="orange">SM</span>
            <span class="purple">MN</span>
            <span class="green">EF</span>
        </div>
        <img src="./asssets/img/toDo icon.svg" alt="">
    </div>
    </div>
    `;
  }
  

}

var draggedCard;
        var targetList;

        function allowDrop(event) {
            event.preventDefault();
        }

        function drag(event) {
            draggedCard = event.target;
        }

        function dragEnter(event, list) {
            targetList = list;
            if (targetList.classList.contains("list")) {
                targetList.classList.add("highlight");
            }
        }

        function dragLeave(event, list) {
            if (targetList === list && targetList.classList.contains("list")) {
                targetList.classList.remove("highlight");
            }
        }

        function drop(event) {
            event.preventDefault();
            if (targetList.classList.contains("list")) {
                targetList.appendChild(draggedCard);
                targetList.classList.remove("highlight");
            }
        }