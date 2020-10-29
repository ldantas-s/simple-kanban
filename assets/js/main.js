import {card} from './card.js';
import { el } from './elements.js';
import { dragFunctions, cardsOrder } from './dragAndDrop.js';

import { fbCreateTodo, todosCollectionRef } from './crud.js';


// show btnNewTodo function
el.form.title.addEventListener('input', function(e) {
  if (this.value) {
    el.btnNewTodo.style.transform = 'scale(1)';
    el.btnNewTodo.style.width = '50px';
    el.btnNewTodo.style.height = '50px';
  } else {
    hiddenBtn();
  }
});
// listen change in input
el.input.addEventListener('input', function() {
  if (this.value.length > 100) {
    this.style.borderColor = 'var(--color-error)';
    return;
  } else {
    this.style.borderColor = '';
  }
});
// form submit
el.form.addEventListener('submit', function(e) {
  
  e.preventDefault();
  // max letters
  if (this.title.value.length > 100) {
    return;
  }

  fbCreateTodo({
    title: this.title.value,
    state: 'c-todo'
  });
  
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
// function to hidden the button createNewTodo
function hiddenBtn() {
    el.btnNewTodo.style.transform = '';
    el.btnNewTodo.style.width = '';
    el.btnNewTodo.style.height = '';
}

async function distribuirTodosNasColunas(doc) {
  let stateTodo = await doc.data().state;
  const todo = card.display(doc);

  console.log(stateTodo)

  if (stateTodo === 'c-todo') {
    el.cardListTodo.append(todo);

  } else if (stateTodo === 'c-inProgress') {
    el.cardListInProgress.append(todo);

  } else if (stateTodo === 'c-done') {
    el.cardListDone.append(todo);
  }
}


todosCollectionRef.onSnapshot(function(snapshot) {
  snapshot.docChanges().forEach(function(change) {

    switch(change.type) {
      case 'added':
        distribuirTodosNasColunas(change.doc);
        break;
      case 'removed':
        distribuirTodosNasColunas(change.doc);
        break;
    }

  });
});