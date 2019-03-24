export default class DocumentSnakeRenderer {
  constructor(tileCount, idCanvas, idBoard, idScore, idHighScore) {
    const canvas = document.getElementById(idCanvas);
    const context = canvas.getContext('2d');
    const tileSize = canvas.height / tileCount;

    this.state = {
      tileCount: tileCount,
      tileSize: tileSize,
      context: context,
      canvasSize: canvas.height,
      elBoard: document.getElementById(idBoard),
      elHighScore: document.getElementById(idHighScore),
      elScore: document.getElementById(idScore),
    }
  };

  getState() {
    return this.state;
  };
};

DocumentSnakeRenderer.prototype.drawBackground = function (color) {
  const state = this.getState();
  state.context.fillStyle = color;
  state.context.fillRect(0, 0, state.canvasSize, state.canvasSize);
};

DocumentSnakeRenderer.prototype.drawTile = function (color, x, y) {
  const state = this.getState();
  const tileSize = state.tileSize;
  state.context.fillStyle = color;
  state.context.fillRect(x * tileSize + 1, y * tileSize + 1, tileSize - 2, tileSize - 2);
};

DocumentSnakeRenderer.prototype.updateHighScore = function (score) {
  this.getState().elHighScore.innerHTML = score;
};

DocumentSnakeRenderer.prototype.updateScore = function (score) {
  this.getState().elScore.innerHTML = score;
};

DocumentSnakeRenderer.prototype.hideBoard = function () {
  this.getState().elBoard.style.visibility = 'hidden';
};

DocumentSnakeRenderer.prototype.showBoard = function () {
  this.getState().elBoard.style.visibility = 'visible';
};

DocumentSnakeRenderer.prototype.clearCanvas = function () {
  const state = this.getState();

  state.context.clearRect(0, 0, state.canvasSize, state.canvasSize);
};
