import './styles/mainLayout.css';
import './styles/header.css';
import './styles/nav.css';

import { renderLayout } from "./UI/mainLayout";
import { renderHeader } from './UI/header';
import { renderNav } from './UI/nav';

const body = document.querySelector('body');
renderLayout(body);

const header = document.querySelector('header');
renderHeader(header);

const nav = document.querySelector('nav');
renderNav(nav);