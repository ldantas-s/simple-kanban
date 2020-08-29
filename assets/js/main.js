import { createNewTodo } from './card.js';
import { el } from './elements.js';


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

el.form.addEventListener('submit', function(e) {
  e.preventDefault();
  createNewTodo(this.new_todo.value);
  this.reset();
  hiddenBtn()
});




function hiddenBtn() {
    el.btnNewTodo.style.transform = '';
    el.btnNewTodo.style.width = '';
    el.btnNewTodo.style.height = '';
}