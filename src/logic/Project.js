export class Project {


    constructor(name, tasks = []) {
        this.name = name;
        this.tasks = tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }
    deleteTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
    }

    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    getSize() {
        return this.tasks.length
    }
    getTasks() {
        return this.tasks;
    }
}