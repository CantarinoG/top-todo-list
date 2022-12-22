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

export function testShit() {

    const appHandler = new AppHandler();

    const addProjectBtn = document.querySelector('#add');

    addProjectBtn.addEventListener('click', () => {
        let name = prompt('Name your new project');
        if (name != null && name != '') {
            let newProject = new Project(name);
            appHandler.addProject(newProject);
            renderProjectsTab(projectsUl, appHandler.getProjects());
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
            }
            document.getElementById(`edt-btn-${i}`).onclick = () => {
                appHandler.editProject(projectList[i]);
                renderProjectsTab(projectsUl, appHandler.getProjects());
            }
            document.getElementById(`open-btn-${i}`).onclick = () => {
                renderProjectContent(main, appHandler.getProjects()[i]);
                //let project = appHandler.getProjects()[i].getName();
                //alert(project);
            }
        }
    }

    function renderProjectContent(containerElement, project) {
        let HTMLContent = '<ul>';
        for (let i = 0; i < project.getTasks().length; i++) {
            HTMLContent += `<li><span>${project.getTasks()[i].getName()}</span></li>`;
        }
        HTMLContent += '</ul><button id="add-task">Add Task</button>';
        containerElement.innerHTML = HTMLContent;
        let addTaskBtn = document.querySelector("#add-task");
        addNewTaskListener(addTaskBtn, project);
    }

    function addNewTaskListener(button, project) {
        button.onclick = () => {
            let name = prompt("Choose your task name");
            let description = prompt("Choose your task description");
            let task = new Task(name, description);
            project.addTask(task);
            renderProjectContent(main, project)
        }
    }
}