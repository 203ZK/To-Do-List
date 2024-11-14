import { Todo } from "./todo.js";
import { Project, ProjectManager } from "./todoProject.js";
import { displayPage } from "./pageController.js";
import "./styles.css";

export var counter = { todo_id: 0 };

export const proj = new ProjectManager(new Project("Test Project"));

for (let i = 0; i < 5; i++) {
    const todo = new Todo(counter.todo_id, proj.getProject(), "Todo " + String(i), "New Todo", "Low", false);
    proj.addTodos(todo);
}

displayPage();
