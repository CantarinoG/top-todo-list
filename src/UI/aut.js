import "../styles/aut.css";

export function renderAut(query) {
    query.innerHTML = `
    <button id="log-google-btn">Login via GOOGLE</button>
    <button id="log-anon-btn">Anonymous Login</button>
    `
}