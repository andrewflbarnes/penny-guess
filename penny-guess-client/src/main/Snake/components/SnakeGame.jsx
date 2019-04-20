import React from 'react';
import PropTypes from 'prop-types';

const CANVAS_ID = 'snake-canvas';
const CANVAS_SIZE = 400;
const TILE_SIZE = 20;

const propTypes = {
  rotateColorScheme: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
  colorScheme: PropTypes.shape({
    bgColor: PropTypes.string.isRequired,
    snakeHeadColor: PropTypes.string.isRequired,
    snakeBodyColor: PropTypes.string.isRequired,
    appleColor: PropTypes.string.isRequired,
  }).isRequired,
  trail: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })).isRequired,
  ax: PropTypes.number.isRequired,
  ay: PropTypes.number.isRequired,
};

export default class SnakeGame extends React.Component {

  static drawTile(x, y, color) {
    const context = SnakeGame.get2dContext();

    context.fillStyle = color;
    context.fillRect(x * TILE_SIZE + 1, y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);
  }

  static get2dContext() {
    return document.getElementById(CANVAS_ID).getContext('2d');
  }

  componentDidUpdate() {
    this.drawBackground();
    this.drawApple();
    this.drawSnake();
  }

  drawSnake() {
    const { trail, colorScheme } = this.props;
    const { snakeBodyColor, snakeHeadColor } = colorScheme;
    const length = trail.length - 1;

    for (let i = 0; i <= length; i++) {
      let color = snakeBodyColor;

      if (i === length) {
        color = snakeHeadColor;
      }

      SnakeGame.drawTile(trail[i].x, trail[i].y, color);
    }
  }

  drawBackground() {
    const context = SnakeGame.get2dContext();
    const { colorScheme } = this.props;
    const { snakeHeadColor, bgColor } = colorScheme;
    const borderColor = snakeHeadColor;

    context.fillStyle = bgColor;
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    if (borderColor) {
      context.strokeStyle = borderColor;
      context.lineWidth = 2;
      context.strokeRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
  }

  drawApple() {
    const { ax, ay, colorScheme } = this.props;
    SnakeGame.drawTile(ax, ay, colorScheme.appleColor);
  }

  render() {
    const { rotateColorScheme, score, highScore } = this.props;

    return (
      <div>
        <canvas id={CANVAS_ID} height={CANVAS_SIZE} width={CANVAS_SIZE} onClick={rotateColorScheme} />
        <h2>Score: {score}</h2>
        <h2>High Score: {highScore}</h2>
      </div>
    );
  }
}

SnakeGame.propTypes = propTypes;
