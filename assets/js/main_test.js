// Elements
const el = {
  form: document.querySelector('.main__column-header-form'),
  input: document.querySelector('.main__column-header-form__input'),
  // Columns
  cardListTodo: document.querySelector('#c-todo'),
  cardListInProgress: document.querySelector('#c-inProgress'),
  cardListDone: document.querySelector('#c-done'),
  // DragAndDrop
  itemsDraggable: document.querySelectorAll('.main__column-cardList__card'),
  dropAreas: document.querySelectorAll('.main__column-cardList-dropArea'),
  // Action Buttons
  btnNewTodo: document.querySelector('#btnNewTodo'),
  btnUpdateTodo: document.querySelector('.main__column-cardList__card-actionsChange__update'),
  btnDeleteTodo: document.querySelector('.main__column-cardList__card-actionsChange__delete'),
};



// Firestore
const firebaseConfig = {
  apiKey: "AIzaSyAjJGz7Bicg1MrDc81LIRqDCTz5sMIuj50",
  authDomain: "ldantas-learn-firebase.firebaseapp.com",
  databaseURL: "https://ldantas-learn-firebase.firebaseio.com",
  projectId: "ldantas-learn-firebase",
  storageBucket: "ldantas-learn-firebase.appspot.com",
  messagingSenderId: "912550901440",
  appId: "1:912550901440:web:f0a9e90ec0575ade34df25"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const
  db = firebase.firestore(),
	timestamp = firebase.firestore.FieldValue.serverTimestamp,
	todosCollectionRef = db.collection('todos');


// FUNCTIONS

// to hidden the button createNewTodo
function hiddenBtn() {
  el.btnNewTodo.style.transform = '';
  el.btnNewTodo.style.width = '';
  el.btnNewTodo.style.height = '';
}

// ! está com um bug que está deixando um espaço vazio na coluna Todo
// ordinate function
function cardsOrder(column) {
  for (let listEl of column.children) {
    if (!listEl.children.length > 0) {
      column.append(listEl);
    }
  }
}


// Functions Card Element
const card = {
  async display(doc = null) {
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
    iconUpdate.setAttribute('data-id', doc.id);


    iconDelete.classList.add('main__column-cardList__card-actionsChange__delete');
    iconDelete.setAttribute('src', './assets/images/minus-square-solid.svg');
    iconDelete.setAttribute('alt', 'icon update');
    iconDelete.setAttribute('data-id', doc.id);

    blockFunctionsChange.appendChild(iconUpdate);
    blockFunctionsChange.appendChild(iconDelete);

		div.classList.add('main__column-cardList-dropArea');

    li.classList.add('main__column-cardList__card');
    li.setAttribute('draggable', 'true');
		li.setAttribute('data-id', doc.id);

    p1.classList.add('main__column-cardList__card__title');
    p1.textContent = doc.data().title;
		p2.classList.add('main__column-cardList__card__date');
		try {
			p2.textContent = new Date(doc.data().createdAt.toDate()).toLocaleString();
		} catch(err) {
			console.log('Wait a minute!')
		}

    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(blockFunctionsChange);

    div.appendChild(li);
		switch(doc.data().state) {
      case 'c-todo':
        el.cardListTodo.appendChild(div);
				break;
			case 'c-inProgress':
				el.cardListInProgress.appendChild(div);
				break;
			case 'c-done':
				el.cardListDone.appendChild(div);
				break;
		}
		this.addDropArea();

		cardsOrder(el.cardListTodo);
		cardsOrder(el.cardListInProgress);
		cardsOrder(el.cardListDone);

		iconDelete.addEventListener('click', this.remove);
		iconUpdate.addEventListener('click', this.update);
		li.addEventListener('dragstart', dragStart);
		li.addEventListener('dragend', dragEnd);
		this.dragAndDropArea(div);

  },

  async remove(event) {
    await todosCollectionRef.doc(event.target.getAttribute('data-id')).delete();
  },

  update(event) {
		let idCard = event.target.getAttribute('data-id');
		let contentCard = document.querySelector(`li[data-id="${idCard}"] p:first-child`).textContent;
		el.input.value = contentCard;
		el.input.setAttribute('data-id', idCard);
	},

  addDropArea() {
    let dropArea1 = document.createElement('div');
    let dropArea2 = document.createElement('div');
    let dropArea3 = document.createElement('div');

    dropArea1.classList.add('main__column-cardList-dropArea');
    dropArea2.classList.add('main__column-cardList-dropArea');
    dropArea3.classList.add('main__column-cardList-dropArea');

		el.cardListTodo.appendChild(dropArea3);
    el.cardListInProgress.appendChild(dropArea2);
		el.cardListDone.appendChild(dropArea1);

		this.dragAndDropArea(dropArea1);
		this.dragAndDropArea(dropArea2);
		this.dragAndDropArea(dropArea3);


	},
	dragAndDropArea(dropArea) {

		dropArea.addEventListener('dragover', dragOver);
		dropArea.addEventListener('dragenter', dragEnter);
		dropArea.addEventListener('dragleave', dragLeave);
		dropArea.addEventListener('drop', drop);

	}
}


// Functions DragAndDrop
let draggable, dropAreaState = false;

function dragStart(e) {
	console.log('dragStart')
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

  dropAreaState = this.children.length > 0 ? true : false;
}
function dragLeave(e) {
  this.style.border = '';
	this.style.height = '';
}
function drop(e) {
	this.style.border = '';
	this.style.height = '';


	if (e.target.children.length !== 0 || dropAreaState) {
		return;
	}

	todosCollectionRef.doc(draggable.getAttribute('data-id')).update({
		state: e.target.parentElement.getAttribute('id'),
		createdAt: timestamp()
	});

  this.append(draggable);
}




// OPERATION WITH FORM
// Listen title input
el.input.addEventListener('input', function() {
  if (this.value) {
    el.btnNewTodo.style.transform = 'scale(1)';
    el.btnNewTodo.style.width = '50px';
    el.btnNewTodo.style.height = '50px';

    // UI warning max letters
    if (this.value.length > 100) {
      this.style.borderColor = 'var(--color-error)';
      return;
    }
    this.style.borderColor = '';

  } else {
    hiddenBtn();
  }
});

// Submition of form
el.form.addEventListener('submit', async function(event) {
  event.preventDefault();
  // max letters
  if (this.title.value.length > 100 || this.title.value.length < 1 ) {
    return;
	}

	let idCard = this.title.getAttribute('data-id');

	if (idCard === '') {
		await todosCollectionRef.add({
			title: this.title.value,
			state: 'c-todo',
			createdAt: timestamp(),
		});
	} else {
		await todosCollectionRef.doc(idCard).update({
			title: this.title.value,
			createdAt: timestamp()
		});
		this.title.setAttribute('data-id', '');
	}

  this.reset();
  hiddenBtn();
});




// Realtime firestore updates
todosCollectionRef.onSnapshot(function(snapshot) {
	snapshot.docChanges().forEach(async function(change) {


		switch(change.type) {
			case 'added':
				card.display(change.doc);
				break;
			case 'removed':
				const cardDelete = document.querySelector(`li[data-id="${change.doc.id}"]`).parentElement;
				cardDelete.parentElement.removeChild(cardDelete);
				break;
			case 'modified':
				const cardUpdate = document.querySelector(`li[data-id="${change.doc.id}"]`);
				const cardTitle = cardUpdate.children[0];
				const cardDate = cardUpdate.children[1];

				try {
					cardTitle.textContent = change.doc.data().title;
					cardDate.textContent = new Date(change.doc.data().createdAt.toDate()).toLocaleString();
				} catch(err) {
					console.log('Wait a minute! :)')
				}

				cardsOrder(el.cardListTodo);
				cardsOrder(el.cardListInProgress);
				cardsOrder(el.cardListDone);
				break;
      }
    });

  });

