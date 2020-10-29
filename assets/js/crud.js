import { db, timestamp } from './firebaseConfig.js';

export const todosCollectionRef = db.collection('todos');


export function fbCreateTodo({ title, state }) {
  todosCollectionRef.add({
    title,
    state,
    createdAt: timestamp()
  });
}

export function fbDeleteTodo(id) {
  todosCollectionRef.doc(id).delete();
}
