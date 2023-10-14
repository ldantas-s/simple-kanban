import { Todo } from "../src/Todo";

test("should first", () => {
	expect(new Todo("To do title").title).toEqual("To do title");
});
