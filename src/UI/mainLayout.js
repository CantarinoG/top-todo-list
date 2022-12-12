const body = document.querySelector('body');

export function renderLayout() {
    body.innerHTML = `
    <header></header>
    <div class="main-container">
        <nav></nav>
        <main></main>
    </div>
    `;
}