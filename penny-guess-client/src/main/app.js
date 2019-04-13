/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import {Home, HighScores} from './components';
import ROUTES from './routes';
import './static/styles/app.css';

const pageRouter = (
  <Router>
    <div>
      <Switch>
        <Route exact path={ROUTES.home} component={Home}/>
        <Route path={ROUTES.highScores} component={HighScores}/>
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(pageRouter, document.getElementById('app'));
