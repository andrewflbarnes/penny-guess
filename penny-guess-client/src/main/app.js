/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import {Home, HighScores} from '.';
import ROUTES from './routes';
import store from './store';
import './static/styles/app.css';

const pageRouter = (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route exact path={ROUTES.home} component={Home}/>
          <Route path={ROUTES.highScores} component={HighScores}/>
        </Switch>
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(pageRouter, document.getElementById('app'));
