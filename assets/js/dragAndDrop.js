import { el } from './elements.js';


let draggable;

export function dragFunctions() {
  
  el.itemsDraggable.forEach(itemDrag => {
    itemDrag.addEventListener('dragstart', function(e) {
      draggable = e.target;
      setTimeout(()=> this.style.display = 'none', 0);
    });
    
    itemDrag.addEventListener('dragend', function(e) {
      this.style.display = '';
    });
  });

  el.dropAreas.forEach(dropArea => {

    dropArea.addEventListener('dragover', function(e) {
      e.preventDefault();
    });

    dropArea.addEventListener('dragenter', function(e) {
      e.preventDefault();
      console.log(e)

      this.style.border = '2px dashed gray';
      this.style.height = '112px';
    });

    dropArea.addEventListener('dragleave', function(e) {
      this.style.border = '';
      this.style.height = '';

    });

    dropArea.addEventListener('drop', function(e) {
      this.style.border = '';
      this.style.height = '';

      this.append(draggable)
    });

  });  

}