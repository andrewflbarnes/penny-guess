function DocumentSnakeRenderer(tileCount) {
  this.canvas = document.getElementById('snake-canvas');
  this.tileSize = this.canvas.height / tileCount;
  this.context = this.canvas.getContext('2d');
  this.canvasSize = this.canvas.height;
  this.elBoard = KITTEH('snake-board');
  this.elHighScore = KITTEH('snake-high-score');
  this.elScore = KITTEH('snake-score');
  this.elSubmitScore = KITTEH('snake-submit-score');
}

DocumentSnakeRenderer.prototype.drawBackground = function(color, borderColor) {
  const self = this;
  const context = self.context;

  context.fillStyle = color;
  context.fillRect(0, 0, self.canvasSize, self.canvasSize);
  if (borderColor) {
    context.strokeStyle = borderColor;
    context.lineWidth = 2;
    context.strokeRect(0, 0, self.canvasSize, self.canvasSize);
  }
};

DocumentSnakeRenderer.prototype.drawTile = function(color, x, y) {
  const self = this;
  const tileSize = self.tileSize;
  const context = self.context;

  context.fillStyle = color;
  context.fillRect(x * tileSize + 1, y * tileSize + 1, tileSize - 2, tileSize - 2);
};

DocumentSnakeRenderer.prototype.updateHighScore = function(score) {
  const self = this;

  self.elHighScore.setContent(score);
};

DocumentSnakeRenderer.prototype.updateScore = function(score) {
  const self = this;

  self.elScore.setContent(score);
};

DocumentSnakeRenderer.prototype.hideBoard = function() {
  const self = this;

  self.elBoard.hide();
};

DocumentSnakeRenderer.prototype.showBoard = function() {
  const self = this;

  self.elBoard.show();
};

DocumentSnakeRenderer.prototype.hideSubmitScore = function() {
  const self = this;

  self.elSubmitScore.hide();
};

DocumentSnakeRenderer.prototype.showSubmitScore = function() {
  const self = this;

  self.elSubmitScore.show();
};

DocumentSnakeRenderer.prototype.clearCanvas = function() {
  const self = this;

  self.context.clearRect(0, 0, self.canvasSize, self.canvasSize);
};
