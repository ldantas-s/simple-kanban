import { createNewTodo } from './card.js';
import { el } from './elements.js';
import { dragFunctions, cardsOrder } from './dragAndDrop.js';


// active function drag
dragFunctions();
// show btnNewTodo function
el.form.new_todo.addEventListener('input', function(e) {
  if (this.value) {
    el.btnNewTodo.style.transform = 'scale(1)';
    el.btnNewTodo.style.width = '50px';
    el.btnNewTodo.style.height = '50px';
  } else {
    hiddenBtn();
  }
});

// form submit
el.form.addEventListener('submit', function(e) {
  e.preventDefault();
  createNewTodo(this.new_todo.value);
  this.reset();
  hiddenBtn();
  // update the tree DOM
  el.itemsDraggable = document.querySelectorAll('.main__column-cardList__card');
  el.dropAreas = document.querySelectorAll('.main__column-cardList-dropArea');

  // active function drag
  dragFunctions();
  // card order
  cardsOrder(el.cardListInProgress);
  cardsOrder(el.cardListTodo);
  cardsOrder(el.cardListDone);
});


// function to hidden the button input
function hiddenBtn() {
    el.btnNewTodo.style.transform = '';
    el.btnNewTodo.style.width = '';
    el.btnNewTodo.style.height = '';
}