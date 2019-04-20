import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SnakeSubmitHighScore from './SnakeSubmitHighScore';
import SnakeGame from "./SnakeGame";
import SCHEMES from '../schemes';
import {Link} from "react-router-dom";
import ROUTES from "../../routes/routes";
import * as actions from '../action_creators';

const propTypes = {
  unpauseSnake: PropTypes.func.isRequired,
  displaySnake: PropTypes.func.isRequired,
  displaySubmit: PropTypes.func.isRequired,
  updateSnakeColourScheme: PropTypes.func.isRequired,
  updateSnakeVelocity: PropTypes.func.isRequired,
  updateSubmitName: PropTypes.func.isRequired,
  game: PropTypes.shape({
    showSnake: PropTypes.bool.isRequired,
    colorScheme: PropTypes.shape({
      bgColor: PropTypes.string.isRequired,
      snakeHeadColor: PropTypes.string.isRequired,
      snakeBodyColor: PropTypes.string.isRequired,
      appleColor: PropTypes.string.isRequired,
    }).isRequired,
    snakeState: PropTypes.shape({
      score: PropTypes.number.isRequired,
      highScore: PropTypes.number.isRequired,
      ax: PropTypes.number.isRequired,
      ay: PropTypes.number.isRequired,
      trail: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      })).isRequired,
    }),
  }).isRequired,
  submit: PropTypes.shape({
    showSubmit: PropTypes.bool.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};

export class RawSnake extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.rotateColorScheme = this.rotateColorScheme.bind(this);
    this.keyPush = this.keyPush.bind(this);
  }

  componentDidMount() {
    const { unpauseSnake, displaySnake, displaySubmit } = this.props;

    displaySnake(true);
    displaySubmit(false);
    unpauseSnake();
    document.addEventListener("keydown", this.keyPush);
  }

  componentWillUnmount() {
    const { pauseSnake } = this.props;

    document.removeEventListener("keydown", this.keyPush);
    pauseSnake();
  }

  handlePause() {
    const { pauseSnake, unpauseSnake, game } = this.props;
    const { interval } = game;

    if (typeof interval !== 'undefined' || interval) {
      pauseSnake();
    } else {
      unpauseSnake();
    }
  }

  rotateColorScheme() {
    const { updateSnakeColourScheme, game } = this.props;
    const { colorScheme } = game;

    let newScheme;

    if (colorScheme === SCHEMES.classic) {
      newScheme = SCHEMES.blend;
    } else {
      newScheme = SCHEMES.classic;
    }

    updateSnakeColourScheme(newScheme);
  }

  keyPush(evt) {
    const { updateSnakeVelocity, game } = this.props;
    const { showSnake } = game;

    if (!showSnake) {
      return;
    }

    switch (evt.keyCode) {
      case 32:
        // space
        this.handlePause();
        break;
      case 37:
        // left
        updateSnakeVelocity({vx: -1, vy: 0});
        break;
      case 38:
        // up
        updateSnakeVelocity({vx: 0, vy: -1});
        break;
      case 39:
        // right
        updateSnakeVelocity({vx: 1, vy: 0});
        break;
      case 40:
        // down
        updateSnakeVelocity({vx: 0, vy: 1});
        break;
      default:
        // do nothing
    }
  }

  handleNameChange(e) {
    const { value } = e.target;

    const { updateSubmitName } = this.props;
    updateSubmitName(value);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { submitScore } = this.props;
    submitScore();
  }

  render() {
    const { game, submit } = this.props;
    const { snakeState, showSnake, colorScheme } = game;
    const { showSubmit, score: submitScore } = submit;
    const { trail, ax, ay, highScore, score } = snakeState;

    return (
      <div>
        {showSnake && (
          <SnakeGame
            rotateColorScheme={this.rotateColorScheme}
            score={score}
            highScore={highScore}
            colorScheme={colorScheme}
            trail={trail}
            ax={ax}
            ay={ay}
          />
        )}
        {showSubmit && (
          <SnakeSubmitHighScore
            onChange={this.handleNameChange}
            onSubmit={this.handleSubmit}
            score={submitScore}
          />
        )}
        <Link to={ROUTES.highScores}>High Scores</Link>
      </div>
    )
  }
}

RawSnake.propTypes = propTypes;

const mapStateToProps = state => {
  const { snake } = state;

  return {
    game: snake.game,
    submit: snake.submit,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

const Snake = connect(mapStateToProps, mapDispatchToProps)(RawSnake);

export default Snake;
