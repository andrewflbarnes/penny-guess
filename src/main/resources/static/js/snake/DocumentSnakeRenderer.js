function DocumentSnakeRenderer(tileCount, idCanvas, idBoard, classScore, classHighScore) {
  this.canvas = document.getElementById(idCanvas);
  this.tileSize = this.canvas.height / tileCount;
  this.context = this.canvas.getContext('2d');
  this.canvasSize = this.canvas.height;
  this.elBoard = KITTEH(idBoard);
  this.elHighScore = KITTEH(classHighScore);
  this.elScore = KITTEH(classScore);
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

DocumentSnakeRenderer.prototype.clearCanvas = function() {
  const self = this;

  self.context.clearRect(0, 0, self.canvasSize, self.canvasSize);
};
