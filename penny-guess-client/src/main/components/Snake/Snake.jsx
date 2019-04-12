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

    this.handleDeath = this.handleDeath.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.rotateColorScheme = this.rotateColorScheme.bind(this);
    this.keyPush = this.keyPush.bind(this);

    const snakeEngine = new SnakeEngine(props.tiles, props.speed);

    this.state = {
      tick: 0,
      score: 0,
      highScore: 0,
      name: '',
      colorScheme: SCHEMES.classic,
      snakeEngine: snakeEngine,
      interval: this.startGameTick(snakeEngine),
      showSnake: true,
      showSubmit: false,
    };

    document.addEventListener("keydown", this.keyPush);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPush);
    this.stopGameTick();
  }

  startGameTick(snakeEngine = this.state.snakeEngine) {
    return setInterval(() => {
      snakeEngine.game();
      this.setState({
        tick: this.state.tick + 1,
        score: this.state.snakeEngine.score,
        highScore: this.state.snakeEngine.highScore,
      })
    }, 1000 / this.props.speed);
  }

  stopGameTick() {
    clearInterval(this.state.interval);
  }

  handlePause() {
    if (this.state.interval) {
      this.pause();
    } else {
      this.unpause();
    }
  }

  pause() {
    if (this.state.interval) {
      clearInterval(this.state.interval);

      this.setState({
        interval: undefined,
      });
    }
  }

  unpause() {
    if (!this.state.interval) {
      this.setState({
        interval: this.startGameTick(),
      });
    }
  }

  handleDeath() {
    this.state.snakeEngine.tailDeath();
    this.handlePause(true);
    this.setState({
      showSubmit: true,
      showSnake: false,
    })
  }

  rotateColorScheme() {
    let newScheme;
    if (this.state.colorScheme === SCHEMES.classic) {
      newScheme = SCHEMES.blend;
    } else {
      newScheme = SCHEMES.classic;
    }

    this.setState({
      colorScheme: newScheme
    })
  }

  keyPush(evt) {
    if (!this.state.showSnake) {
      return;
    }

    const snakeEngine = this.state.snakeEngine;

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
    }
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
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
    return (
      <div>
        {this.state.showSnake && (
          <SnakeGame
            rotateColorScheme={this.rotateColorScheme}
            score={this.state.score}
            highScore={this.state.highScore}
            colorScheme={this.state.colorScheme}
            trail={this.state.snakeEngine.trail}
            ax={this.state.snakeEngine.ax}
            ay={this.state.snakeEngine.ay}
            onDeath={this.handleDeath}
          />
        )}
        {this.state.showSubmit && (
          <SnakeSubmitHighScore
            onChange={this.handleNameChange}
            onSubmit={this.handleSubmit}
            score={this.state.score}
          />
        )}
      </div>
    )
  }
}

Snake.propTypes = propTypes;
Snake.defaultProps = defaultProps;
