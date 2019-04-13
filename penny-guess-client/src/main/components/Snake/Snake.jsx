import React from 'react';
import PropTypes from 'prop-types';
import SnakeSubmitHighScore from './SnakeSubmitHighScore';
import SnakeGame from "./SnakeGame";
import SnakeEngine from "./SnakeEngine";
import api from '../../api';
import SCHEMES from './schemes';

const propTypes = {
  speed: PropTypes.number,
  tiles: PropTypes.number,
};

const defaultProps = {
  speed: 15,
  tiles: 20,
};

export default class Snake extends React.Component {
  constructor(props) {
    super(props);

    const snakeEngine = new SnakeEngine(props.tiles, props.speed);

    this.state = {
      tick: 0,
      score: 0,
      highScore: 0,
      name: '',
      colorScheme: SCHEMES.classic,
      snakeEngine,
      interval: {},
      showSnake: true,
      showSubmit: false,
    };

    this.handleDeath = this.handleDeath.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.rotateColorScheme = this.rotateColorScheme.bind(this);
    this.keyPush = this.keyPush.bind(this);
  }

  componentDidMount() {
    const { snakeEngine } = this.state;

    this.setState({
      interval: this.startGameTick(snakeEngine),
    });

    document.addEventListener("keydown", this.keyPush);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPush);
    this.stopGameTick();
  }

  startGameTick(newSnakeEngine) {
    const { snakeEngine: currentSnakeEngine } = this.state;
    const { speed } = this.props;
    const snakeEngine = newSnakeEngine || currentSnakeEngine;

    return setInterval(() => {
      snakeEngine.game();

      const { tick } = this.state;
      const { score, highScore } = snakeEngine;

      this.setState({
        tick: tick + 1,
        score,
        highScore,
      })
    }, 1000 / speed);
  }

  stopGameTick() {
    const { interval } = this.state;

    clearInterval(interval);
  }

  handlePause() {
    const { interval } = this.state;

    if (interval) {
      this.pause();
    } else {
      this.unpause();
    }
  }

  pause() {
    const { interval } = this.state;

    if (interval) {
      clearInterval(interval);

      this.setState({
        interval: undefined,
      });
    }
  }

  unpause() {
    const { interval } = this.state;

    if (!interval) {
      this.setState({
        interval: this.startGameTick(),
      });
    }
  }

  handleDeath() {
    const { snakeEngine } = this.state;

    snakeEngine.tailDeath();
    this.handlePause(true);
    this.setState({
      showSubmit: true,
      showSnake: false,
    })
  }

  rotateColorScheme() {
    let newScheme;
    const { colorScheme } = this.state;

    if (colorScheme === SCHEMES.classic) {
      newScheme = SCHEMES.blend;
    } else {
      newScheme = SCHEMES.classic;
    }

    this.setState({
      colorScheme: newScheme
    })
  }

  keyPush(evt) {
    const { showSnake, snakeEngine } = this.state;

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
        snakeEngine.updateVelocities({vx: -1, vy: 0});
        break;
      case 38:
        // up
        snakeEngine.updateVelocities({vx: 0, vy: -1});
        break;
      case 39:
        // right
        snakeEngine.updateVelocities({vx: 1, vy: 0});
        break;
      case 40:
        // down
        snakeEngine.updateVelocities({vx: 0, vy: 1});
        break;
      default:
        // do nothing
    }
  }

  handleNameChange(e) {
    const { value } = e.target;

    this.setState({
      name: value,
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    api.addHighScore(this.state).then(() => {
      this.unpause();
      this.setState({
        showSubmit: false,
        showSnake: true,
      });
    });
  }

  render() {
    const { snakeEngine, showSnake, score, highScore, colorScheme, showSubmit } = this.state;
    const { trail, ax, ay } = snakeEngine;

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
            onDeath={this.handleDeath}
          />
        )}
        {showSubmit && (
          <SnakeSubmitHighScore
            onChange={this.handleNameChange}
            onSubmit={this.handleSubmit}
            score={score}
          />
        )}
      </div>
    )
  }
}

Snake.propTypes = propTypes;
Snake.defaultProps = defaultProps;
