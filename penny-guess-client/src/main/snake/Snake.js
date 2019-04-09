import React from 'react';
import { SnakeSubmitHighScore } from './SnakeSubmitHighScore';
import {SnakeGame} from "./SnakeGame";
import {SnakeEngine} from "./SnakeEngine";

const schemeClassic = {bgColor: 'black', snakeHeadColor: 'lime', snakeBodyColor: 'green', appleColor: 'red'};
const schemeBlend = {bgColor: '#532F8C', snakeHeadColor: 'white', snakeBodyColor: 'grey', appleColor: 'cyan'};
const SPEED = 15;
const TILES = 20;

export class Snake extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeath = this.handleDeath.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.rotateColorScheme = this.rotateColorScheme.bind(this);
    this.keyPush = this.keyPush.bind(this);

    const snakeEngine = new SnakeEngine(TILES, SPEED);

    this.state = {
      tick: 0,
      score: 0,
      highScore: 0,
      name: '',
      colorScheme: schemeClassic,
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
    }, 1000 / SPEED);
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
    if (this.state.colorScheme === schemeClassic) {
      newScheme = schemeBlend;
    } else {
      newScheme = schemeClassic;
    }

    this.setState({
      colorScheme: newScheme
    })
  }

  keyPush(evt) {
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
      case 81:
        // q
        this.handlePause();
        this.setState({
          showSnake: false,
        });
        break;
    }
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    })
  }

  handleSubmit(e) {
    console.log(`submitted with name ${this.state.name}`);
    e.preventDefault();
    this.unpause();
    this.setState({
      showSubmit: false,
      showSnake: true,
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
