class Project {


    constructor(name, tasks) {
        this.name = name;
        this.tasks = tasks;
    }

    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    getTasks() {
        return this.tasks;
    }
}