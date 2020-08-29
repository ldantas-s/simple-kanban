import { el } from './elements.js';


export function createNewTodo(title) {
  let div = document.createElement('div');
  let li = document.createElement('li');
  let p1 = document.createElement('p');
  let p2 = document.createElement('p');

  div.classList.add('main__column-cardList-dragArea');
  
  li.classList.add('main__column-cardList__card');
  li.setAttribute('draggable', 'true');

  p1.classList.add('main__column-cardList__card__title');
  p1.textContent = title;
  p2.classList.add('main__column-cardList__card__date');
  p2.textContent = '28 ago 2020';

  li.appendChild(p1);
  li.appendChild(p2);

  div.appendChild(li);

  el.cardListTodo.appendChild(div);
}