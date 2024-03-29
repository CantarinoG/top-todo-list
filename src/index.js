import './styles/mainLayout.css';
import './styles/header.css';
import './styles/nav.css';
import './styles/tasks.css';

import { renderPage } from './logic/DOMManipulation';
renderPage();

import { fbInit, initFirebaseAuth } from './logic/fireBaseManipulation';
fbInit();
initFirebaseAuth();

import { main } from './logic/DOMManipulation';
main();

