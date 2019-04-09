import React from 'react';
import Snake from '../snake';
import {Link} from "react-router-dom";
import Routes from "../routes";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      highScores: [],
      showSnake: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      showSnake: !this.state.showSnake,
    });
  }

  render() {
    return (
      <div>
        <h1 onClick={this.handleClick}>Message for Penny</h1>
        {this.state.showSnake && (
          <div>
            <Snake />
            <Link to={Routes.HIGH_SCORES}>High Scores</Link>
          </div>
        )}
      </div>
    );
  }
}
