import { editTodoHandler, 
         createTodoHandler,
         deleteTodoHandler, 
         confirmTodoHandler,
         cancelHandler } from "./pageController.js";

export function createComponent(element, attributes = {}, text = "", children = []) {
    const comp = document.createElement(element);

    for (const attribute in attributes) {
        comp.setAttribute(attribute, attributes[attribute]);
    }
    comp.textContent = text;

    for (const child of children) {
        comp.appendChild(child);
    }

    return comp;
}

function createDropdown(options = ["Low", "Medium", "High"], selected = "") {
    var option_list = [];

    for (const option of options) {
        const choice = createComponent("option", { "value": option }, option);
        if (option === selected) {
            choice.selected = true;
        }
        option_list.push(choice);
    }

    const dropdown = createComponent("select", undefined, undefined, option_list);
    return dropdown;
}

export function createButton(attributes = {}, text = "", listener = null) {
    const btn = createComponent("button", attributes, text);
    btn.addEventListener("click", listener);
    return btn;
}

export function createTodoCard(todo_item, options = ["Low", "Medium", "High"]) {
    const checkbox_div = createComponent(
        "div", { "class": "checkbox-div"},
        undefined, [createComponent("input", { "class": "completed", "type": "checkbox" })]
    );

    const title = createComponent("div", { "class": "title" }, todo_item.getTitle());
    const description = createComponent("div", { "class": "description" }, todo_item.getDescription());
    const priority = createComponent("div", { "class": "priority" }, "Priority: " + todo_item.getPriority());;
    const details_div = createComponent("div", { "class": "details-div" }, undefined, [title, description, priority]);

    const edit_btn = createButton({ "class": "edit-btn", "id": todo_item.getId() }, "Edit", editTodoHandler);
    const delete_btn = createButton({ "class": "delete-btn", "id": todo_item.getId() }, "Delete", deleteTodoHandler);
    const btns_div = createComponent(
        "div", { "class": "btns-div" }, undefined, 
        [createComponent("div", { "class": "edit-div" }, undefined, [edit_btn]),
         createComponent("div", { "class": "delete-div"}, undefined, [delete_btn])]
    );

    const card = createComponent("div", { "class": "card" }, undefined, [checkbox_div, details_div, btns_div]);
    return card;
}

export function createNewCard(title = "", description = "", priority = "", create_btn_text = "", todo_id = "") {
    const title_input = createComponent("input", { "type": "text", "name": "title", "placeholder": "Enter a title" });
    const description_input = createComponent("input", { "type": "text", "name": "description", "placeholder": "Enter a description" });
    const priority_input = createDropdown();

    const create_btn = createButton({ "type": "submit", "class": "create-btn" }, "Create");

    if (arguments.length > 1) {
        title_input.setAttribute("value", title);
        description_input.setAttribute("value", description);
        priority_input.value = priority;

        create_btn.textContent = create_btn_text;
        create_btn.id = todo_id;
        create_btn.addEventListener("click", confirmTodoHandler);
    } else {
        create_btn.addEventListener("click", createTodoHandler);
    }
    
    const title_input_div = createComponent("div", { "class": "title-input" }, undefined, [title_input]);
    const description_input_div = createComponent("div", { "class": "description-input" }, undefined, [description_input]);
    const priority_input_div = createComponent("div", { "class": "priority-input" }, undefined, [priority_input]);
    const input_div = createComponent("div", { "class": "input-div" }, undefined, [title_input_div, description_input_div, priority_input_div]);
    
    const cancel_btn = createButton({ "class": "cancel-btn" }, "Cancel");
    const btns_div = createComponent("div", { "class": "btns-div" }, undefined, [create_btn, cancel_btn]);

    const card = createComponent("div", { "class": "new card" }, undefined, [input_div, btns_div]);
    return card;
}