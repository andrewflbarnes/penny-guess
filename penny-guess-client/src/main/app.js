import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './home';
import './styles/app.css';
import HighScores from "./highscores";
import Routes from './routes';

const pageRouter = (
  <Router>
    <div>
      <Switch>
        <Route exact path={Routes.HOME} component={Home}/>
        <Route path={Routes.HIGH_SCORES} component={HighScores}/>
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(pageRouter, document.getElementById('app'));
