export abstract class InputElement {
	inputEl: HTMLInputElement;

	constructor() {
		this.inputEl = this.input();
	}

	abstract wrapper(): Element;
	abstract button(): HTMLButtonElement;

	input(): HTMLInputElement {
		const input = document.createElement("input");
		return input;
	}

	render(): Element {
		const section = this.wrapper();

		const button = this.button();

		section.append(this.inputEl, button);

		return section;
	}
}
