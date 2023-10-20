import { Todo } from "./Todo";

export class CardView {
	constructor(public todo: Todo) {}

	render(): Element {
		const card = document.createElement("article");
		const cardTitle = document.createElement("h2");
		cardTitle.textContent = this.todo.title;

		const createdAt = document.createElement("p");
		createdAt.textContent = this.todo.createdAt.toLocaleString("pt-br");

		card.classList.add("column__card");
		card.append(cardTitle, createdAt);

		return card;
	}
}
