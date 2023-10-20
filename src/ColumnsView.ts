import { ColumnView } from "./ColumnView";
import { Columns } from "./Columns";
import { CreateColumnInput } from "./CreateColumnInput";

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

	render(): void {
		this.parent.innerHTML = "";

		this.columns.list.forEach((column) => {
			this.parent.append(new ColumnView(this.parent, column).render());
		});
		this.parent.append(new CreateColumnInput(this.columns.add).render());
	}
}
