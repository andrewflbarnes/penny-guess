import SnakeEngine from './SnakeEngine.js';

function startStopSnake() {
  snakeEngine.snakeTrigger(true);
}

const snakeEngine = new SnakeEngine();
snakeEngine.initSnake();
document.getElementById('penny-message').addEventListener('click', startStopSnake);
