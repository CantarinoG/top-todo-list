import { renderLayout } from "../UI/mainLayout";
import { renderHeader } from '../UI/header';
import { renderNav } from '../UI/nav';

import project from '../icons/project.svg';
import deleteIcon from '../icons/delete.svg';
import edit from '../icons/edit.svg';

export function renderPage() {
    const body = document.querySelector('body');
    renderLayout(body);

    const header = document.querySelector('header');
    renderHeader(header);

    const nav = document.querySelector('nav');
    renderNav(nav);
}

/***************************************/

import { AppHandler } from "./AppHandler";
import { Project } from "./Project";
import { Task } from "./Task";

export function main() {

    let appHandler = new AppHandler();

    let data;

    if (localStorage.getItem('handlerData') != null) {
        data = JSON.parse(localStorage.getItem('handlerData'));
    }

    for (let i = 0; i < data.projects.length; i++) {
        let name = data.projects[i].name;
        let proj = new Project(name);
        appHandler.addProject(proj);
        for (let j = 0; j < data.projects[i].tasks.length; j++) {
            let name = data.projects[i].tasks[j].name;
            let description = data.projects[i].tasks[j].description;
            let date = data.projects[i].tasks[j].date;
            let isCompleted = data.projects[i].tasks[j].isCompleted;
            let task = new Task(name, description, date, isCompleted);
            appHandler.getProjects()[i].addTask(task);
        }
    }

    const addProjectBtn = document.querySelector('#add');

    addProjectBtn.addEventListener('click', () => {
        let name = prompt('Name your new project');
        if (name != null && name != '') {
            let newProject = new Project(name);
            appHandler.addProject(newProject);
            renderProjectsTab(projectsUl, appHandler.getProjects());
            console.log(appHandler);
            localStorage.setItem('handlerData', JSON.stringify(appHandler));
        }
    });

    const projectsUl = document.querySelector('#projects-list');

    function renderProjectsTab(containerElement, projectList) {
        let HTMLContent = '';
        for (let i = 0; i < projectList.length; i++) {
            HTMLContent += `<li><img class="icon" src="${project}" alt="Project Icon"><button id="open-btn-${i}">${projectList[i].getName()}</button>&nbsp<div class="badger">${projectList[i].getSize()}</div>
            <button id="edt-btn-${i}"><img class="icon" src="${edit}" alt="Edit Icon"></button><button id="del-btn-${i}"><img class="icon" src="${deleteIcon}" alt="Delete Icon"</button>
            </li>`;
        }
        containerElement.innerHTML = HTMLContent;
        addProjectListeners(projectList);

    }

    const main = document.querySelector("body > div > main");

    function addProjectListeners(projectList) {
        for (let i = 0; i < projectList.length; i++) {
            document.getElementById(`del-btn-${i}`).onclick = () => {
                appHandler.deleteProject(projectList[i]);
                renderProjectsTab(projectsUl, appHandler.getProjects());
                localStorage.setItem('handlerData', JSON.stringify(appHandler));
            }
            document.getElementById(`edt-btn-${i}`).onclick = () => {
                appHandler.editProject(projectList[i]);
                renderProjectsTab(projectsUl, appHandler.getProjects());
                localStorage.setItem('handlerData', JSON.stringify(appHandler));
            }
            document.getElementById(`open-btn-${i}`).onclick = () => {
                renderProjectContent(main, appHandler.getProjects()[i]);
                localStorage.setItem('handlerData', JSON.stringify(appHandler));
            }
        }
    }

    function renderProjectContent(containerElement, project) {
        let HTMLContent = '<ul>';
        for (let i = 0; i < project.getTasks().length; i++) {
            HTMLContent += `<li`;

            if (project.getTasks()[i].getIsCompleted()) {
                HTMLContent += ` style="text-decoration: line-through;"`;
            }

            HTMLContent += `><span>${project.getTasks()[i].getName()}</span><button id="edt-name-${i}"><img class="icon" src="${edit}" alt="Edit Icon"></button>
            <span>${project.getTasks()[i].getDescription()}</span><button id="edt-desc-${i}"><img class="icon" src="${edit}" alt="Edit Icon"></button>
            <input id="date-${i}" type="date" value="${project.getTasks()[i].getDate()}"><input id="check-${i}" type="checkbox" `;
            if (project.getTasks()[i].getIsCompleted()) {
                HTMLContent += "checked";
            }
            if (project != projectAllTasks) {
                HTMLContent += `><button id="del-${i}"><img class="icon" src="${deleteIcon}" alt="Delete Icon"></button></li>`;
            } else {
                HTMLContent += `></li>`;
            }

        }
        if (project != projectAllTasks) {
            HTMLContent += '</ul><button id="add-task">Add Task</button>';
        }
        containerElement.innerHTML = HTMLContent;

        addTaskListeners(project);
        if (project != projectAllTasks) {
            let addTaskBtn = document.querySelector("#add-task");
            addNewTaskListener(addTaskBtn, project);
        }

    }

    function addTaskListeners(project) {
        for (let i = 0; i < project.getTasks().length; i++) {
            document.getElementById(`edt-name-${i}`).onclick = () => {
                let name = prompt("Choose a new name:");
                if (name != null && name != '') {
                    project.getTasks()[i].setName(name);
                    renderProjectContent(main, project);
                    localStorage.setItem('handlerData', JSON.stringify(appHandler));
                }
            }
            document.getElementById(`edt-desc-${i}`).onclick = () => {
                let desc = prompt("Choose a new description:");
                if (desc == "") {
                    desc = "No description...";
                }
                if (desc == null) {} else {
                    project.getTasks()[i].setDescription(desc);
                    renderProjectContent(main, project);
                    localStorage.setItem('handlerData', JSON.stringify(appHandler));
                }

            }
            document.getElementById(`date-${i}`).onchange = () => {
                let date = document.getElementById(`date-${i}`).value;
                project.getTasks()[i].setDate(date);
                localStorage.setItem('handlerData', JSON.stringify(appHandler));
            }
            document.getElementById(`check-${i}`).onclick = () => {
                let checked = document.getElementById(`check-${i}`).checked;
                project.getTasks()[i].setIsCompleted(checked);
                renderProjectContent(main, project);
                localStorage.setItem('handlerData', JSON.stringify(appHandler));
            }
            if (project != projectAllTasks) {
                document.getElementById(`del-${i}`).onclick = () => {
                    let task = project.getTasks()[i];
                    project.deleteTask(task);
                    renderProjectContent(main, project);
                    renderProjectsTab(projectsUl, appHandler.getProjects());
                    localStorage.setItem('handlerData', JSON.stringify(appHandler));
                }
            }

        }
    }

    function addNewTaskListener(button, project) {
        button.onclick = () => {
            let name = prompt("Choose your task name");
            let description = prompt("Choose your task description");
            if (description == null || description == "") {
                description = "No description...";
            }
            if (name != null && name != '') {
                let task = new Task(name, description);
                project.addTask(task);
                renderProjectContent(main, project);
                renderProjectsTab(projectsUl, appHandler.getProjects());
                localStorage.setItem('handlerData', JSON.stringify(appHandler));
            }

        }
    }

    let projectAllTasks = new Project("All");
    updateAllTasks();
    renderProjectContent(main, projectAllTasks);
    renderProjectsTab(projectsUl, appHandler.getProjects());

    function updateAllTasks() {
        let allTasks = [];
        for (let i = 0; i < appHandler.getProjects().length; i++) {
            for (let j = 0; j < appHandler.getProjects()[i].getTasks().length; j++) {
                allTasks.push(appHandler.getProjects()[i].getTasks()[j]);
            }
        }
        projectAllTasks.setTasks(allTasks);

    }

    const allTasksBtn = document.querySelector("body > div > nav > ul:nth-child(1) > li:nth-child(1) > button");
    allTasksBtn.onclick = () => {
        updateAllTasks();
        renderProjectContent(main, projectAllTasks);
    }

    function updateTodayTasks() {
        let time = new Date();
        let formattedDate = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
        let todayTasks = [];
        for (let i = 0; i < appHandler.getProjects().length; i++) {
            for (let j = 0; j < appHandler.getProjects()[i].getTasks().length; j++) {
                if (appHandler.getProjects()[i].getTasks()[j].getDate() == formattedDate) {
                    todayTasks.push(appHandler.getProjects()[i].getTasks()[j]);
                }
            }
        }
        projectAllTasks.setTasks(todayTasks);
    }

    const todayTasksBtn = document.querySelector("body > div > nav > ul:nth-child(1) > li:nth-child(2) > button");
    todayTasksBtn.onclick = () => {
        updateTodayTasks();
        renderProjectContent(main, projectAllTasks);
    }

    function updateWeekTasks() {
        let timeNow = Date.now();
        let timeNextWeek = timeNow + 604800000;


        let weekTasks = [];
        for (let i = 0; i < appHandler.getProjects().length; i++) {
            for (let j = 0; j < appHandler.getProjects()[i].getTasks().length; j++) {
                let date = new Date(appHandler.getProjects()[i].getTasks()[j].getDate());
                date = date.getTime();
                if (date > timeNow && date < timeNextWeek) {
                    weekTasks.push(appHandler.getProjects()[i].getTasks()[j]);
                }
            }
        }
        projectAllTasks.setTasks(weekTasks);
    }

    const weekTasksBtn = document.querySelector("body > div > nav > ul:nth-child(1) > li:nth-child(3) > button");
    weekTasksBtn.onclick = () => {
        updateWeekTasks();
        renderProjectContent(main, projectAllTasks);
    }
}