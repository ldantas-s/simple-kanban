import { Columns } from "./Columns";
import { Todo } from "./Todo";

const main = document.querySelector(".main") || undefined;

const columns = new Columns(main);

columns.add("Backlog");
