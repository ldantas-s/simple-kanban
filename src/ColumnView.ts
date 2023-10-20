import { Todo } from "./Todo";
import { TodoList } from "./TodoList";

export class ColumnView {
	static render(parent: Element, column: TodoList): Element {
		return new ColumnView(parent, column).render();
	}

	constructor(public parent: Element, public column: TodoList) {
		this.bindRender();
	}

	private bindRender(): void {
		this.column.on("add-todo", () => {
			this.parent.replaceChild(
				this.render(),
				this.parent.children.namedItem(this.column.name) as Element
			);
		});
	}

	private add(title: string): void {
		this.column.add(new Todo(title, this.column.name, Date.now()));
	}

	private createCard(todo: Todo): Element {
		const card = document.createElement("article");
		const cardTitle = document.createElement("h2");
		cardTitle.textContent = todo.title;

		card.classList.add("column__card");
		card.append(cardTitle);

		return card;
	}

	private createTodoElement(): Element {
		// TODO: it needs to abstract this bunch of code
		const card = document.createElement("article");
		card.classList.add("column__card");

		const input = document.createElement("input");
		const button = document.createElement("button");

		button.textContent = "New Todo";
		button.addEventListener("click", () => {
			if (!input.value) return;

			this.add(input.value);
		});

		card.append(input, button);

		return card;
	}

	render(): Element {
		const section = document.createElement("section");
		section.setAttribute("id", this.column.name);

		section.classList.add("columns");

		const header = document.createElement("h1");
		header.innerText = this.column.name;

		section.append(header);

		this.column.todos.forEach((todo) => section.append(this.createCard(todo)));
		section.append(this.createTodoElement());

		return section;
	}
}
