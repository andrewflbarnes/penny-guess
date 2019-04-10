import React from 'react';
import {Link} from "react-router-dom";
import HomeMessage from './HomeMessage';
import Snake from '../Snake';
import ROUTES from "../../routes";
import api from '../../api/';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      highScores: [],
      showSnake: false,
      message: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    api.getWhatIs().then(response => {
      if (response.length && this.state.message === '') {
        const index = Math.floor(Math.random() * response.length);
        this.setState({
          message: `Penny is ${response[index]}`,
        });
      }
    });

    setTimeout(() => {
      if (this.state.message === '') {
        this.setState({
          message: 'Penny is a squidger',
        });
      }
    }, 1500);
  }

  handleClick() {
    this.setState({
      showSnake: !this.state.showSnake,
    });
  }

  render() {
    return (
      <div>
        <HomeMessage onClick={this.handleClick} message={this.state.message}/>
        {this.state.showSnake && (
          <div>
            <Snake />
            <Link to={ROUTES.highScores}>High Scores</Link>
          </div>
        )}
      </div>
    );
  }
}
