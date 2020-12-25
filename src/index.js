import React from 'react';
import ReactDOM from 'react-dom';
import { CalendarApp } from './CalendarApp';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


const divRoot = document.querySelector('#root');

ReactDOM.render(<CalendarApp/>, divRoot);

