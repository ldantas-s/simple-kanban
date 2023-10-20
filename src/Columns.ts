import { Eventing } from "./Eventing";
import { TodoList } from "./TodoList";

export class Columns extends Eventing {
	constructor(readonly list: TodoList[] = []) {
		super();
	}

	add(columnName: string): void {
		const newColumn = new TodoList(columnName);

		this.list.push(newColumn);
		this.trigger("add-column", columnName);
	}

	getColumn(columnName: string): TodoList {
		const column = this.list.find((column) => column.name === columnName);

		if (!column) throw new Error("Column not found");

		return column;
	}
}
