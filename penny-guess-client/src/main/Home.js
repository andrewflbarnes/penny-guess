import React from 'react';
import { Snake } from './snake/Snake';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
          <Snake />
        )}
      </div>
    );
  }
}
