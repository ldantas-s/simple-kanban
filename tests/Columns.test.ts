import { Columns } from "../src/Columns";

let columns: Columns;

beforeEach(() => {
	columns = new Columns();

	columns.add("Backlog");
	columns.add("In Progress");
});

test("should be able to create a list of TodoList and add a new TodoList", () => {
	expect(columns.list).toHaveLength(2);
});

test("should be able to get a TodoList by name", () => {
	expect(columns.getColumn("Backlog").name).toEqual("Backlog");
});

test("should return nothing if try to get a column that not exist", () => {
	expect(() => columns.getColumn("Done")).toThrow("Column not found");
});

test("should be able to remove a column", () => {
	columns.add("Done");
	expect(columns.list).toHaveLength(3);

	columns.remove("Done");
	expect(columns.list).toHaveLength(2);
});
