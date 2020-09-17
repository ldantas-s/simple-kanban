import { db, timestamp } from './firebaseConfig.js';


export function fbGetTodos(columnName = 'c-todo') {
  let data = [];
  db.collection('todos')
    .where('state','==',columnName)
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        data.push(doc.data());
      });
    });
  return data;
}

export function fbCreateTodo({ title, state }) {
  db.collection('todos').add({
    title,
    state,
    createdAt: timestamp()
  });
}

export function fbDeleteTodo({ id }) {
  db.collection('todos').doc(id).delete();
}
