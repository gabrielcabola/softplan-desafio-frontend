import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom' // importando o BrowserRouter para criar as rotas e views internas

import './styles/css/index.css';

import App from './pages/App';
import SearchList from './pages/SearchList';
import Error404 from './pages/Error404';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <BrowserRouter>
        <Switch>

            <Route path="/" exact={true} component={App} />
            <Route path="/result/" component={SearchList} />
            <Route path='*' component={Error404} />

        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
