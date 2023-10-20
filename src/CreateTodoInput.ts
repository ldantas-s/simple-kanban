import { InputElement } from "./InputElement";

export class CreateTodoInput extends InputElement {
	constructor(public add: (value: string) => void) {
		super();
	}

	wrapper(): Element {
		const wrapper = document.createElement("article");
		wrapper.classList.add("column__card");

		return wrapper;
	}

	button(): HTMLButtonElement {
		const button = document.createElement("button");

		button.textContent = "New Todo";
		button.addEventListener("click", () => {
			const value = this.inputEl.value;

			if (!value) return;

			this.add(value);
		});

		return button;
	}
}
