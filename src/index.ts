import { Columns } from "./Columns";
import { ColumnsView } from "./ColumnsView";
import { Todo } from "./Todo";

const main = document.querySelector(".main") || undefined;

const columns = new ColumnsView(main, new Columns());

columns.render();
