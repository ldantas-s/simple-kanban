import { el } from './elements.js';


let date = new Date();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let createdAt = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

export function createNewTodo(title) {
  let 
    div = document.createElement('div'),
    li = document.createElement('li'),
    p1 = document.createElement('p'),
    p2 = document.createElement('p'),
    blockFunctionsChange = document.createElement('div'),
    iconDelete = document.createElement('img'),
    iconUpdate = document.createElement('img');
  
  blockFunctionsChange.classList.add('main__column-cardList__card-actionsChange');
  
  iconUpdate.classList.add('main__column-cardList__card-actionsChange__update');
  iconUpdate.setAttribute('src', './assets/images/pen-square-solid.svg');
  iconUpdate.setAttribute('alt', 'icon update');
  
  iconDelete.classList.add('main__column-cardList__card-actionsChange__delete');
  iconDelete.setAttribute('src', './assets/images/minus-square-solid.svg');
  iconDelete.setAttribute('alt', 'icon update');

  blockFunctionsChange.appendChild(iconUpdate);
  blockFunctionsChange.appendChild(iconDelete);

  div.classList.add('main__column-cardList-dropArea');

  li.classList.add('main__column-cardList__card');
  li.setAttribute('draggable', 'true');

  p1.classList.add('main__column-cardList__card__title');
  p1.textContent = title;
  p2.classList.add('main__column-cardList__card__date');
  p2.textContent = createdAt;

  li.appendChild(p1);
  li.appendChild(p2);
  li.appendChild(blockFunctionsChange);

  div.appendChild(li);

  el.cardListTodo.appendChild(div);
  addDropArea();
}

function addDropArea() {
  let div = document.createElement('div');
  let div1 = document.createElement('div');
  
  div.classList.add('main__column-cardList-dropArea');
  div1.classList.add('main__column-cardList-dropArea');

  el.cardListInProgress.appendChild(div1);
  el.cardListDone.appendChild(div);
}