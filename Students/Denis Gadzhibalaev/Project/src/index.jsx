import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './layout/style/main.sass';


//components
import Router from './router.jsx';
import { BrowserRouter } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';
import initStore from './store/store.js';


ReactDom.render(
    <BrowserRouter>
        <Provider store = { initStore() }>
            <MuiThemeProvider>
                <Router />
            </MuiThemeProvider>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root') );