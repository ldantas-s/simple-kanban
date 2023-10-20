import { Eventing } from "./Eventing";
import { Todo } from "./Todo";

export class TodoList extends Eventing {
	constructor(public name: string, private _todos: Todo[] = []) {
		super();
	}

	get todos(): Todo[] {
		return [...this._todos];
	}

	createTodo(title: string): void {
		const todo = new Todo(title, this.name, new Date(Date.now()));

		this._todos.push(todo);
		this.trigger("createtodo", this.name);
	}

	getTodo(todoTitle: string): Todo {
		const todo = this._todos.find((todo) => todo.title === todoTitle);

		if (!todo) throw new Error("Todo not found");

		return todo;
	}

	addTodo(todo: Todo): void {
		this._todos.push(this.updateTodoState(todo));
		this.trigger("add-todo", this.name);
	}

	removeTodo(todoId: string): void {
		this._todos = this._todos.filter((todo) => todo.id !== todoId);
	}

	private updateTodoState(todo: Todo): Todo {
		todo.state = this.name;

		return todo;
	}
}
