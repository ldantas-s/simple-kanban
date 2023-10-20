import { CreateTodoInput } from "./CreateTodoInput";
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
		this.column.on("create-todo", () => {
			this.parent.replaceChild(
				this.render(),
				this.parent.children.namedItem(this.column.name) as Element
			);
		});
	}

	add = (title: string): void => {
		this.column.createTodo(title);
	};

	private createCard(todo: Todo): Element {
		const card = document.createElement("article");
		const cardTitle = document.createElement("h2");
		cardTitle.textContent = todo.title;

		card.classList.add("column__card");
		card.append(cardTitle);

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
		section.append(new CreateTodoInput(this.add).render());

		return section;
	}
}
