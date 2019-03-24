const tileCount = 20;

// Color schemes
const schemeClassic = {bgColor: 'black', snakeHeadColor: 'lime', snakeBodyColor: 'green', appleColor: 'red'};
const schemeBlend = {bgColor: '#532F8C', snakeHeadColor: 'white', snakeBodyColor: 'grey', appleColor: 'cyan'};
let currentScheme = schemeClassic;

// Create a snake game
const renderer = new DocumentSnakeRenderer(tileCount, 'snake-canvas', 'snake-board', 'snake-score', 'snake-high-score');
const snakeEngine = new SnakeEngine(tileCount, renderer);
const startStopSnake = function() {
  snakeEngine.snakeTrigger(true)
};

// Add start/stop triggers to the page
const triggerElements = document.getElementsByClassName('snake-trigger');
const addTriggerListener = function(el) {
  el.addEventListener('click', startStopSnake);
};

// getElementsSnakeRenderer returns HTMLCollection
[].forEach.call(triggerElements, addTriggerListener);

const rotateColorScheme = function() {
  if (currentScheme === schemeClassic) {
    currentScheme = schemeBlend;
  } else {
    currentScheme = schemeClassic;
  }
  snakeEngine.setColorScheme(currentScheme);
};
