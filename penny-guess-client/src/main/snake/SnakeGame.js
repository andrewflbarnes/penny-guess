import React from 'react';
import PropTypes from 'prop-types';

const CANVAS_ID = 'snake-canvas';
const CANVAS_SIZE = 400;
const TILE_SIZE = 20;

export class SnakeGame extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.drawBackground();
    this.drawApple();
    this.drawSnake();
  }

  drawApple() {
    SnakeGame.drawTile(this.props.ax, this.props.ay, this.props.colorScheme.appleColor);
  }

  drawSnake() {
    const length = this.props.trail.length - 1;
    const trail = this.props.trail;
    const { snakeBodyColor, snakeHeadColor } = this.props.colorScheme;

    for (let i = 0; i <= length; i++) {
      let color = snakeBodyColor;

      if (i === length) {
        color = snakeHeadColor;
      } else if (trail[i].x === trail[length].x && trail[i].y === trail[length].y) {
        this.props.onDeath();
      }

      SnakeGame.drawTile(trail[i].x, trail[i].y, color);
    }
  }

  drawBackground() {
    const context = SnakeGame.getContext();
    const { snakeHeadColor, bgColor } = this.props.colorScheme;
    const borderColor = snakeHeadColor;

    context.fillStyle = bgColor;
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    if (borderColor) {
      context.strokeStyle = borderColor;
      context.lineWidth = 2;
      context.strokeRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
  }

  static drawTile(x, y, color) {
    const context = SnakeGame.getContext();

    context.fillStyle = color;
    context.fillRect(x * TILE_SIZE + 1, y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);
  }

  static getContext() {
    return document.getElementById(CANVAS_ID).getContext('2d');
  }

  render() {
    return (
      <div id="snake-board">
        <canvas id={'snake-canvas'} height={CANVAS_SIZE} width={CANVAS_SIZE} onClick={this.props.rotateColorScheme} />
        <h2>Score: {this.props.score}</h2>
        <h2>High Score: {this.props.highScore}</h2>
        {/*<h3><a href="/highscores">All Time High Scores</a></h3>*/}
      </div>
    );
  }
}

SnakeGame.propTypes = {
  rotateColorScheme: PropTypes.func.isRequired,
  onDeath: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
  colorScheme: PropTypes.object.isRequired,
  trail: PropTypes.array.isRequired,
  ax: PropTypes.number.isRequired,
  ay: PropTypes.number.isRequired,
};
