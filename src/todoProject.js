import { counter } from "./index.js";

export function ProjectManager(project) {
    this._project = project;

    const getProject = () => this._project;

    const getTodoIndex = (todo_id) => {
        for (const todo_item of this._project.getTodos()) {
            if (todo_item.getId() === todo_id) {
                return this._project.getTodos().indexOf(todo_item);
            };
        }
        return new Error("Todo item not found.");
    };

    const getTodoItem = (todo_id) => {
        for (const todo_item of this._project.getTodos()) {
            if (todo_item.getId() === todo_id) {
                return todo_item;
            };
        }
        return new Error("Todo item not found.");
    };

    const addTodos = (...todos) => {
        for (const todo of todos) {
            this._project.getTodos().unshift(todo);
        }
        counter.todo_id++;
    };

    const removeTodos = (...todo_ids) => {
        for (const todo_id of todo_ids) {
            const idx = getTodoIndex(todo_id);
            if (idx !== undefined) {
                this._project.getTodos().splice(idx, 1);
            }
        }
    };

    return { getProject, getTodoItem, addTodos, removeTodos };
}

export function Project(title, todos = []) {
    this._title = title;
    this._todos = todos;

    const getTitle = () => this._title;
    const setTitle = (new_title) => { this._title = new_title; };

    const getTodos = () => this._todos;

    const toJSON = () => {
        return {
            "title": this._project.getTitle(),
            "todos": this._project.getTodos()
        };
    };

    return { getTitle, setTitle, getTodos, toJSON };
}