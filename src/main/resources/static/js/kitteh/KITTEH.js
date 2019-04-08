const kittehPaws = [];

function KittehPaw(elId) {
  this.elId = document.getElementById(elId);
  this.elClass = document.getElementsByClassName(elId);
}

KittehPaw.prototype.show = function() {
  const self = this;

  self.visibility('');
};

KittehPaw.prototype.hide = function() {
  const self = this;

  self.visibility('none');
};

KittehPaw.prototype.visibility = function(visibleness) {
  const self = this;

  if (self.elId) {
    self.elId.style.display = visibleness;
  }
  [].forEach.call(self.elClass, function(el) {el.style.display = visibleness})
};

KittehPaw.prototype.setContent = function(content) {
  const self = this;

  if (self.elId) {
    self.elId.innerHTML = content;
  }
  [].forEach.call(self.elClass, function(el) {el.innerHTML = content})
};

KittehPaw.prototype.setValue = function(content) {
  const self = this;

  if (self.elId) {
    self.elId.value = content;
  }
  [].forEach.call(self.elClass, function(el) {el.value = content})
};

function KITTEH(elId) {
  let kp = kittehPaws[elId];

  if (!kp) {
    kp = new KittehPaw(elId);
    kittehPaws[elId] = kp;
  }

  return kp;
}
