import './styles/mainLayout.css';
import './styles/header.css';

import { renderLayout } from "./UI/mainLayout";
import { renderHeader } from './UI/header';

let body = document.querySelector('body');
renderLayout(body);

let header = document.querySelector('header');
renderHeader(header);