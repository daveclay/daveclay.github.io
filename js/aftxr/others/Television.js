var Channel = Class.extnd({
  init: function(growthMachine) {
    this.growthMachine = growthMachine;
    this.element = $("<div class='channel reception'/>");
    this.available = false;
    this.degauss();
  },

  corrupt: function() {
    var x = 0;
    var y = rf(window.innerHeight);
    this.element.css({
      backgroundColor: "rgba(" + rf(256) + ", " + rf(256) + ", " + rf(256) + ", .075)",
      transform: "translate3d(" + x + "px, " + y + "px, 0px)",
      width: window.innerWidth,
      height: rf(window.innerHeight / 2)
    });
  },

  trigger: function() {
    this.available = true;
    setTimeout(function() {
      this.degauss();
    }.bind(this), r(2331));
  },

  degauss: function() {
    this.available = false;
    this.off();
    setTimeout(function() {
      this.trigger();
    }.bind(this), (r(10312)) + 8301);
  },

  on: function() {
    if (this.available) {
      this.element.velocity({ display: 'block' });
      if (!this.growthMachine.fear && Math.random() > .3) {
        this.corrupt();
      }
    }
  },

  off: function() {
    this.element.velocity({ display: 'none' });
  }
});

var Television = Class.extnd({
  init: function() {
    this.channels = [];
    this.interrupted = false;
  },

  reception: function(channel) {
    this.channels.push(channel);
  },

  interrupt: function() {
    this.interrupted = true;
  },

  transmit: function() {
    if (!this.interrupted) {
      this.channels.forEach(function(channel) {
        if (Math.random() > 0.5) {
          channel.on();
        } else {
          channel.off();
        }
      }.bind(this));
    }
    setTimeout(function() {
      this.transmit();
    }.bind(this), Math.random() * 20);
  }
});


/*
television = new Television();

for (i = 0; i < 4; i++) {
    var channel = new Channel();
    channel.element.appendTo(document.getElementById("transmission"));
    television.reception(channel);
}

television.transmit();
*/

