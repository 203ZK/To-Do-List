import { createComponent, 
         createButton, 
         createTodoCard, 
         createNewCard } from "./components.js";
import { proj, counter } from "./index.js";
import { Todo } from "./todo.js";

function getNewTodoDetails() {
    const title = document.querySelector("input[name='title']").value;
    const description = document.querySelector("input[name='description']").value;
    const priority = document.querySelector(".priority-input > select").value;
    return [title, description, priority];
}

export function addTodoHandler(e) {
    const new_card = createNewCard();
    displayPage(new_card);
}

export function editTodoHandler(e) {
    const todo_item = proj.getTodoItem(parseInt(e.target.id));
    const [title, description, priority] = [todo_item.getTitle(), todo_item.getDescription(), todo_item.getPriority()];
    const todo_item_editing = createNewCard(title, description, priority, "Confirm", todo_item.getId());
    e.target.closest("div.card").replaceWith(todo_item_editing);
}

export function createTodoHandler(e) {
    const [title, description, priority] = getNewTodoDetails();
    if (title === "") {
        alert("New todo items must have a title!");
    }
    const new_todo_item = new Todo(counter.todo_id, proj.getProject(), title, description, priority, false);
    proj.addTodos(new_todo_item);
    
    displayPage();
}

export function deleteTodoHandler(e) {
    e.preventDefault();
    proj.removeTodos(parseInt(e.target.id));
    displayPage();
}

export function cancelHandler(e) {
    displayPage();
}

export function confirmTodoHandler(e) {
    const [title, description, priority] = getNewTodoDetails();
    const todo_item = proj.getTodoItem(parseInt(e.target.id));
    console.log(todo_item);

    todo_item.setTitle(title);
    todo_item.setDescription(description);
    todo_item.setPriority(priority);
    
    displayPage();
}

function projectPage(new_card = null) {
    console.log("Updating page...");
    const todos = proj.getProject().getTodos();
    var page_children = todos.map((todo_item) => createTodoCard(todo_item));

    if (new_card !== null) {
        page_children.unshift(new_card);
    }

    return createComponent("div", {"class": "todos"}, undefined, page_children);
}

export function displayPage(new_card = null) {
    const body = document.querySelector("body");
    body.textContent = "";

    const header = createComponent("div", { "class": "header" }, "TODO LIST");
    const project_title = createComponent("h2", { "class": "project-title" }, proj.getProject().getTitle());
    body.appendChild(header);
    body.appendChild(project_title);

    const add_todo_btn = createButton({ "class": "add-todo-btn" }, "Add To-Do", addTodoHandler);
    body.appendChild(add_todo_btn);

    const page = projectPage(new_card);
    body.appendChild(page);
}