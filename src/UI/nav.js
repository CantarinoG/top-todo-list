import all from '../icons/all.svg';
import today from '../icons/today.svg';
import week from '../icons/week.svg';

export function renderNav(query) {
    query.innerHTML = `
    <ul>
        <li><img class="icon" src="${all}" alt="All Icon"><button>All</button></li>
        <li><img class="icon" src="${today}" alt="Today Icon"><button>Today</button></li>
        <li><img class="icon" src="${week}" alt="This week Icon"><button>This Week</button></li>
    </ul>
    <span>Projects</span>
    <ul id="projects-list">
    </ul>
    <ul>
        <li id="add-container"><button id="add">Add Project</button></li>
    </ul>
    `;
}