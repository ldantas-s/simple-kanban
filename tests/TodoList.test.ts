import { Todo } from "../src/Todo";
import { TodoList } from "../src/TodoList";

test("should create a list of todo empty", () => {
	const todoList = new TodoList("backlog");

	expect(todoList.todos).toEqual([]);
	expect(todoList.name).toEqual("backlog");
});

test("should be able to add todos inside the list", () => {
	const todoList = new TodoList("backlog");

	const todo = new Todo("First Todo", todoList.name, Date.now());
	const todoSecond = new Todo("Second Todo", todoList.name, Date.now());

	todoList.add(todo);
	todoList.add(todoSecond);

	expect(todoList.todos).toEqual([todo, todoSecond]);
	expect(todoList.todos[0].state).toEqual(todoList.name);
});

test("should be able to remove a todo from the list", () => {
	const todoList = new TodoList("backlog");

	const todo = new Todo("First Todo", todoList.name, Date.now());
	const todoSecond = new Todo("Second Todo", todoList.name, Date.now());
	todoList.add(todo);
	todoList.add(todoSecond);

	expect(todoList.todos).toEqual([todo, todoSecond]);

	todoList.remove(todo.id);

	expect(todoList.todos).toEqual([todoSecond]);
});

test("should be able to update the name of todo state and add it inside of the list", () => {
	const backlog = new TodoList("backlog");
	const inProgress = new TodoList("inProgress");

	const todoOne = new Todo("Analyze the project", backlog.name, Date.now());
	const todoTwo = new Todo(
		"Create task to start the implementation",
		backlog.name,
		Date.now()
	);
	backlog.add(todoOne);
	backlog.add(todoTwo);

	expect(backlog.todos).toEqual([todoOne, todoTwo]);
	expect(inProgress.todos).toEqual([]);

	inProgress.update(todoOne);
	backlog.remove(todoOne.id);

	expect(backlog.todos).toEqual([todoTwo]);
	expect(inProgress.todos).toEqual([todoOne]);
	expect(todoOne.state).toEqual(inProgress.name);
});
