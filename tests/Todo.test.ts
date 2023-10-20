import { Todo } from "../src/Todo";

test("should create a new todo with properties", () => {
	const createdAt = new Date(Date.now());
	const todo = new Todo("To do title", "backlog", createdAt);

	expect(todo.title).toEqual("To do title");
	expect(todo.state).toEqual("backlog");
	expect(todo.createdAt).toEqual(createdAt);
});

test("should be able to update todo title", () => {
	const todo = new Todo("To do title", "backlog", new Date(Date.now()));

	expect(todo.title).toEqual("To do title");

	todo.title = "title updated";

	expect(todo.title).toEqual("title updated");
});

test("should be able to update todo title", () => {
	const todo = new Todo("To do title", "backlog", new Date(Date.now()));

	expect(todo.state).toEqual("backlog");

	todo.state = "inProgress";

	expect(todo.state).toEqual("inProgress");
});
