export class Project {


    constructor(name, tasks = []) {
        this.name = name;
        this.tasks = tasks;
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