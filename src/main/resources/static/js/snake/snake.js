const tileCount = 20;

// Color schemes
const schemeClassic = {bgColor: 'black', snakeHeadColor: 'lime', snakeBodyColor: 'green', appleColor: 'red'};
const schemeBlend = {bgColor: '#532F8C', snakeHeadColor: 'white', snakeBodyColor: 'grey', appleColor: 'cyan'};
let currentScheme = schemeClassic;

// Create a snake game
const renderer = new DocumentSnakeRenderer(tileCount);
const snakeEngine = new SnakeEngine(tileCount, renderer);
const startStopSnake = function() {
  snakeEngine.snakeTrigger(true)
};

renderer.hideBoard();
renderer.hideSubmitScore();

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

const submitHighScore = function() {
  fetch('./api/scores/high', {
    method: 'POST',
    body: JSON.stringify({
      'name': document.getElementById('snake-submit-score-name').value,
      'score': snakeEngine.highScore,
    }),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.json();
  }).then(json => {
    console.log(json);
    alert('Score submitted')
  }).catch(error => {
    console.log(error);
    alert('Unable to submit score at this time: ' + error.message)
  }).finally(() => {
      renderer.hideSubmitScore();
      renderer.showBoard();
  });

};
