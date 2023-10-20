import { ColumnView } from "./ColumnView";
import { Columns } from "./Columns";

export class ColumnsView {
	parent: Element;

	constructor(parent: Element | undefined, public columns: Columns) {
		if (!parent) throw new Error("Needs a HTML element");

		this.parent = parent;
		this.columns.add("Backlog");

		this.bindRender();
	}

	private bindRender(): void {
		this.columns.on("add-column", () => this.render());
	}

	private createColumnElement() {
		// TODO: it needs to abstract this bunch of code
		const section = document.createElement("section");
		section.classList.add("columns");

		const input = document.createElement("input");
		const button = document.createElement("button");
		button.textContent = "New ColumnView";
		button.addEventListener("click", () => {
			if (!input.value) return;

			this.columns.add(input.value);
		});

		section.append(input, button);

		return section;
	}

	render(): void {
		this.parent.innerHTML = "";

		this.columns.list.forEach((column) => {
			this.parent.append(new ColumnView(this.parent, column).render());
		});
		this.parent.append(this.createColumnElement());
	}
}
