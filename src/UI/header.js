import menu from '../icons/menu.svg';

export function renderHeader(query) {
    query.innerHTML = `
    <img class="icon" src="${menu}" alt="Menu Icon"/>
    <span id="log-out-btn">LOG OUT</span>
    <h1 class="header-title">✔️DoingIt</h1>
    `;
}