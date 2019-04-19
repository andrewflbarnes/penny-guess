import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import HomeMessage from './HomeMessage';
import * as actions from '../action_creators';
import ROUTES from "../../routes";

export class RawHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
  }

  componentDidMount() {
    const { fetchHomeMessage, updateHomeMessage } = this.props;

    fetchHomeMessage();

    setTimeout(() => {
      const { message } = this.props;

      if (message === '') {
        updateHomeMessage('Penny is a squidger');
      }
    }, 1500);
  }

  render() {
    const { message } = this.props;

    return (
      <Link style={{ textDecoration: 'none' }} to={ROUTES.snake}>
        <HomeMessage message={message}/>
      </Link>
    );
  }
}

const mapStateToProps = state => {
  const { home } = state;

  return {
    message: home.message,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
};

const Home = connect(mapStateToProps, mapDispatchToProps)(RawHome);

export default Home;
