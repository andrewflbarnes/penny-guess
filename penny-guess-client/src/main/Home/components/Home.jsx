import React from 'react';
import {Link} from "react-router-dom";
import HomeMessage from './HomeMessage';
import Snake from '../../Snake';
import ROUTES from "../../routes";
import api from "../../api";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSnake: false,
      message: '',
    };

    this.toggleSnakeVisibility = this.toggleSnakeVisibility.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    api.getWhatIs().then(response => {
      const { message } = this.state;

      if (response.length && message === '') {
        const index = Math.floor(Math.random() * response.length);
        this.setState({
          message: `Penny is ${response[index]}`,
        });
      }
    });

    setTimeout(() => {
      const { message } = this.state;

      if (message === '') {
        this.setState({
          message: 'Penny is a squidger',
        });
      }
    }, 1500);
  }

  handleClick() {
    this.toggleSnakeVisibility();
  }

  toggleSnakeVisibility() {
    const { showSnake } = this.state;

    this.setState({
      showSnake: !showSnake,
    });
  }

  render() {
    const { message, showSnake } = this.state;

    return (
      <div>
        <HomeMessage onClick={this.handleClick} message={message}/>
        {showSnake && (
          <div>
            <Snake />
            <Link to={ROUTES.highScores}>High Scores</Link>
          </div>
        )}
      </div>
    );
  }
}
