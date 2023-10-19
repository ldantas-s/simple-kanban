import { Eventing } from "./Eventing";
import { Todo } from "./Todo";

export class TodoList extends Eventing {
	constructor(public name: string, private _todos: Todo[] = []) {
		super();
	}

	get todos(): Todo[] {
		return [...this._todos];
	}

	add(todo: Todo): void {
		this._todos.push(todo);
		this.trigger("change");
	}

	remove(todoId: string): void {
		this._todos = this._todos.filter((todo) => todo.id !== todoId);
	}

	update(todo: Todo): void {
		todo.state = this.name;
		this.add(todo);
	}
}
