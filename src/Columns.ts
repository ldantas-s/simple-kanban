import { Eventing } from "./Eventing";
import { TodoList } from "./TodoList";

export class Columns extends Eventing {
	constructor(private _list: TodoList[] = []) {
		super();
	}

	get list(): TodoList[] {
		return [...this._list];
	}

	add = (columnName: string): void => {
		const newColumn = new TodoList(columnName);

		this._list.push(newColumn);
		this.trigger("add-column", columnName);
	};

	getColumn(columnName: string): TodoList {
		const column = this._list.find((column) => column.name === columnName);

		if (!column) throw new Error("Column not found");

		return column;
	}

	remove(columnName: string): void {
		this._list = this._list.filter((column) => column.name !== columnName);
	}
}
