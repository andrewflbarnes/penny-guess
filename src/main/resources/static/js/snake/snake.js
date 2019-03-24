import SnakeEngine from './SnakeEngine.js';
import DocumentSnakeRenderer from "./DocumentSnakeRenderer.js";

function startStopSnake() {
  snakeEngine.snakeTrigger(true);
}

const tileCount = 20;
const drawer = new DocumentSnakeRenderer(tileCount, 'snake-canvas', 'snake-board', 'snake-score', 'snake-high-score');
const snakeEngine = new SnakeEngine(tileCount, drawer);
document.getElementById('penny-message').addEventListener('click', startStopSnake);
