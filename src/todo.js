export function Todo(id, project, title, description, priority, is_done) {
    this._id = id;
    this._project = project;
    this._title = title;
    this._description = description;
    this._priority = priority;
    this._is_done = is_done;

    const getId = () => this._id;
    
    const getProject = () => this._project;
    
    const getTitle = () => this._title;
    const setTitle = (new_title) => { this._title = new_title; };

    const getDescription = () => this._description;
    const setDescription = (new_description) => { this._description = new_description; };

    const getPriority = () => this._priority;
    const setPriority = (new_priority) => { this._priority = new_priority; };

    const getIsDone = () => this._is_done;
    const toggleIsDone = () => { this._is_done = !this._is_done; };

    const toJSON = () => {
        return { "id": this._id, 
                 "title": this._title,
                 "description": this._description,
                 "priority": this._priority,
                 "is_done": this._is_done
        };
    };

    return { getId, getProject, 
             getTitle, setTitle, 
             getDescription, setDescription, 
             getPriority, setPriority,
             getIsDone, toggleIsDone, toJSON };
}