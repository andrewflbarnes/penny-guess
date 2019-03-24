const kittehPaws = [];

function KittehPaw(elId) {
  this.elId = document.getElementById(elId);
  this.elClass = document.getElementsByClassName(elId);
}

KittehPaw.prototype.show = function() {
  const self = this;

  self.visibility('visible');
};

KittehPaw.prototype.hide = function() {
  const self = this;

  self.visibility('hidden');
};

KittehPaw.prototype.visibility = function(visibleness) {
  const self = this;

  if (self.elId) {
    self.elId.style.visibility = visibleness;
  }
  [].forEach.call(self.elClass, function(el) {el.style.visibility = visibleness})
};

KittehPaw.prototype.setContent = function(content) {
  const self = this;

  if (self.elId) {
    self.elId.innerHTML = content;
  }
  [].forEach.call(self.elClass, function(el) {el.innerHTML = content})
};

function KITTEH(elId) {
  let kp = kittehPaws[elId];

  if (!kp) {
    kp = new KittehPaw(elId);
    kittehPaws[elId] = kp;
  }

  return kp;
}
