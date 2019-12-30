var symbolSize = 20;
var streams = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-1000, 0));
    streams.push(stream);
    x += symbolSize;
  }
  textSize(symbolSize);
}

// Gets called repeatedly at 60fps as setup() runs
function draw() {
  background(0, 120);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.switchInterval = round(random(2, 20));
  this.first = first;

  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(
        // random Katakana character
        0x30a0 + round(random(0, 96))
      );
    }
  };

  this.rain = function() {
    if (this.y >= height) {
      // reached the bottom
      this.y = 0;
    } else {
      this.y += this.speed;
    }
  };
}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 30));
  this.speed = random(5, 12);

  this.generateSymbols = function(x, y) {
    var first = round(random(0, 3)) == 1;
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed);
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  };

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(180, 25, 180);
      } else {
        fill(0, 255, 140);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  };
}
