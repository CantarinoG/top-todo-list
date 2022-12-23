export class Task {


    constructor(name, description, date = "0000-00-00", isCompleted = false) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.isCompleted = isCompleted;
    }


    setName(name) {
        this.name = name;
    }
    setDescription(description) {
        this.description = description;
    }
    setDate(date) {
        this.date = date;
    }
    setIsCompleted(isCompleted) {
        this.isCompleted = isCompleted;
    }


    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getDate() {
        return this.date;
    }
    getIsCompleted() {
        return this.isCompleted;
    }
}