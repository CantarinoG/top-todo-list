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
        let name = prompt('Choose a new name for your project:');
        if (name != null && name != '') {
            this.projects[this.projects.indexOf(project)].setName(name);
        }

    }

}