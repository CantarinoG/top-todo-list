export function renderNav(query) {
    query.innerHTML = `
    <ul>
        <li><button>All</button></li>
        <li><button>Today</button></li>
        <li><button>This Week</button></li>
    </ul>
    <span>Projects</span>
    <ul>
        <li><button>Default</button></li>
        <li><button>Default2</button></li>
        <li><button>Default3</button></li>
        <li><button id="add">+ ADD PROJECT</button></li>
    </ul>
    `;
}