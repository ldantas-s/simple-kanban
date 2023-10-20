import { randomID } from "./utils";

export class Todo {
	readonly id: string;

	constructor(
		public title: string,
		public state: string,
		readonly createdAt: Date
	) {
		this.id = randomID();
	}
}
