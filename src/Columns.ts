import { TodoList } from "./TodoList";

export class Columns {
	private columns: TodoList[] = [];
	parent: Element;

	constructor(parent: Element | undefined) {
		if (!parent) throw new Error("Needs a HTML element");

		this.parent = parent;
	}

	add(columnName: string): void {
		const newColumn = new TodoList(columnName);
		this.columns.push(newColumn);
		this.render();
	}

	columnElement(column: TodoList): Element {
		const section = document.createElement("section");
		section.classList.add("columns");

		const header = document.createElement("h1");

		header.innerText = column.name;

		section.append(header);

		return section;
	}

	createColumnElement() {
		const section = document.createElement("section");
		section.classList.add("columns");

		const input = document.createElement("input");
		const button = document.createElement("button");
		button.textContent = "New Column";
		button.addEventListener("click", () => {
			if (!input.value) return;

			this.add(input.value);
		});

		section.append(input, button);

		return section;
	}

	render(): void {
		this.parent.innerHTML = "";

		this.columns.forEach((column) =>
			this.parent.append(this.columnElement(column))
		);
		this.parent.append(this.createColumnElement());
	}
}
