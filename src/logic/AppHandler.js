export class AppHandler {
    constructor(projects = []) {
        this.projects = projects;
    }
    getProjects() {
        return this.projects;
    }
    addProject(project) {
        this.projects.push(project);
    }
    deleteProject(project) {
        this.projects.splice(this.projects.indexOf(project), 1);
    }
    editProject(project) {
        let name = prompt('Choose a new name for your project:')
        this.projects[this.projects.indexOf(project)].setName(name);
    }



    /*
        getAllTasks() {
            let allTasks = [];
            for (let i = 0; i < this.projects.length; i++) {
                for (let j = 0; j < this.projects[i].getTasks().length; j++) {
                    allTasks.push(this.projects[i].getTasks()[j]);
                }
            }
        }*/
}