import { el } from './elements.js';


let date = new Date();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let createdAt = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

export function createNewTodo(title) {
  let div = document.createElement('div');
  let li = document.createElement('li');
  let p1 = document.createElement('p');
  let p2 = document.createElement('p');

  div.classList.add('main__column-cardList-dropArea');

  li.classList.add('main__column-cardList__card');
  li.setAttribute('draggable', 'true');

  p1.classList.add('main__column-cardList__card__title');
  p1.textContent = title;
  p2.classList.add('main__column-cardList__card__date');
  p2.textContent = createdAt;

  li.appendChild(p1);
  li.appendChild(p2);

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