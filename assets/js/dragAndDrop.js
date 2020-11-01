import { el } from './elements.js';


let draggable;

export function dragFunctions() {

  el.itemsDraggable.forEach(itemDrag => {
    itemDrag.addEventListener('dragstart', dragStart);
    itemDrag.addEventListener('dragend', dragEnd);
  });

  el.dropAreas.forEach(dropArea => {
    dropArea.addEventListener('dragover', dragOver);
    dropArea.addEventListener('dragenter', dragEnter);
    dropArea.addEventListener('dragleave', dragLeave);
    dropArea.addEventListener('drop', drop);
  });
}

function dragStart(e) {
  draggable = e.target;
  setTimeout(()=> this.style.display = 'none', 0);
}
function dragEnd(e) {
  this.style.display = '';
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
  this.style.border = '2px dashed gray';
  this.style.height = '112px';
}
function dragLeave(e) {
  this.style.border = '';
  this.style.height = '';
}
function drop(e) {
  this.style.border = '';
  this.style.height = '';

  if (e.path[0].localName === 'li' || e.path[0].localName === 'p') {
    return;
  }
  this.append(draggable);

  cardsOrder(el.cardListTodo);
  cardsOrder(el.cardListInProgress);
  cardsOrder(el.cardListDone);
}


// ! the code below needs refactoring
export function cardsOrder(column) {
  for (let listEl of column.children) {
    if (listEl.children.length < 1) {
      column.appendChild(listEl);
    }
  }
}
