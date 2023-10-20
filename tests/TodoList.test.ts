import { Todo } from "../src/Todo";
import { TodoList } from "../src/TodoList";

test("should create a list of todo empty", () => {
	const todoList = new TodoList("backlog");

	expect(todoList.todos).toEqual([]);
	expect(todoList.name).toEqual("backlog");
});

test("should be able to create a todo in a todolist", () => {
	const todoList = new TodoList("Backlog");

	todoList.createTodo("First Todo");

	expect(todoList.getTodo("First Todo").title).toEqual("First Todo");
});

test("should be able to get a todo in todolist by the name", () => {
	const todoList = new TodoList("backlog");

	todoList.createTodo("First Todo");

	expect(todoList.getTodo("First Todo").title).toEqual("First Todo");
});

test("should be able to add todos inside the list", () => {
	const todoList = new TodoList("backlog");

	const todo = new Todo("First Todo", todoList.name, new Date(Date.now()));
	const todoSecond = new Todo(
		"Second Todo",
		todoList.name,
		new Date(Date.now())
	);

	todoList.addTodo(todo);
	todoList.addTodo(todoSecond);

	expect(todoList.todos).toEqual([todo, todoSecond]);
	expect(todoList.getTodo(todo.title).state).toEqual(todoList.name);
});

test("should be able to remove a todo from the list", () => {
	const todoList = new TodoList("backlog");

	todoList.createTodo("First Todo");
	todoList.createTodo("Second Todo");

	const firstTodo = todoList.getTodo("First Todo");
	const secondTodo = todoList.getTodo("Second Todo");

	expect(todoList.todos).toContain(firstTodo);
	expect(todoList.todos).toContain(secondTodo);

	todoList.removeTodo(firstTodo.id);

	expect(todoList.todos).toContain(secondTodo);
});

test("should be able to update the name of todo state and add it inside of the list", () => {
	const backlog = new TodoList("backlog");
	const inProgress = new TodoList("inProgress");

	backlog.createTodo("Analyze the project");
	backlog.createTodo("Create task to start the implementation");

	const firstTodo = backlog.getTodo("Analyze the project");
	const secondTodo = backlog.getTodo("Create task to start the implementation");

	expect(backlog.todos).toEqual([firstTodo, secondTodo]);
	expect(inProgress.todos).toEqual([]);

	inProgress.addTodo(firstTodo);
	backlog.removeTodo(firstTodo.id);

	expect(backlog.todos).toEqual([secondTodo]);
	expect(inProgress.todos).toEqual([firstTodo]);
	expect(firstTodo.state).toEqual(inProgress.name);
});
