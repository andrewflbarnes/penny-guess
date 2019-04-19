import React from 'react';
import {Link} from "react-router-dom";
import HomeMessage from './HomeMessage';
import ROUTES from "../../routes";
import api from "../../api";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
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

  render() {
    const { message } = this.state;

    return (
      <Link style={{ textDecoration: 'none' }} to={ROUTES.snake}>
        <HomeMessage message={message}/>
      </Link>
    );
  }
}
