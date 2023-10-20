import { InputElement } from "./InputElement";

export class CreateColumnInput extends InputElement {
	constructor(public add: (value: string) => void) {
		super();
	}

	wrapper(): Element {
		const wrapper = document.createElement("section");
		wrapper.classList.add("columns");

		return wrapper;
	}

	button(): HTMLButtonElement {
		const button = document.createElement("button");

		button.textContent = "New Column";
		button.addEventListener("click", () => {
			const value = this.inputEl.value;

			if (!value) return;

			this.add(value);
		});

		return button;
	}
}
