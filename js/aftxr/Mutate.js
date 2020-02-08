(function(css) {
  var delay = 3000;
  // https://github.com/borisschapira/preloadr
  // https://github.com/DominicTobias/extnd

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
  if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
      targetLength = targetLength>>0; //floor if number or convert non-number to 0;
      padString = String(padString || ' ');
      if (this.length > targetLength) {
        return String(this);
      }
      else {
        targetLength = targetLength-this.length;
        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
        }
        return padString.slice(0,targetLength) + String(this);
      }
    };
  }

  Array.prototype.sample = function(items) {
    if ( ! items) {
      items = 1;
    }
    var result = [];
    for (var i = 0; i < items; i++) {
      result.push(this[Math.floor(Math.random() * this.length)]);
    }
    return result;
  };

  var clone = function(obj) {
    return $.extend({}, obj);
  };

  var forcefeed = function(from, to) {
    if (from) {
      for (var key in to) {
        var previousValue = from[key];
        if (previousValue) {
          to[key] = [to[key], previousValue];
        }
      }
    }
  };

  var p = function(num, digits) {
    if (!digits) {
      digits = 4;
    }
    return ("0000000000" + num).slice(-1 * digits);
  };

  var c = function(v, min, max) {
    if (v > max) {
      return max
    }
    if (v < min) {
      return min;
    }
    return v;
  };

  var w = function(target, element) {
    return target.x > element.offset().left &&
      target.x < element.offset().left + element.width() &&
      target.y > element.offset().top &&
      target.y < element.offset().top + element.height();
  };

  var f = function(target) {
    return $("#stage")
      .find(".bit")
      .filter(function() {
        return w(target, $(this));
      });
  };

  var r = function(scale) {
    if (!scale) {
      scale = 1;
    }
    return Math.random() * scale;
  };

  var rf = function(scale) {
    return Math.round(r(scale));
  };

  var Body = Class.extnd({
    init: function() {
      this.origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    },

    nextY: function(range) {
      var amount = range / 2 - rf(range);
      return this.origin.y + amount - 80;
    },

    nextX: function(range) {
      var amount = range / 2 - rf(range);
      return this.origin.x + amount;
    },

    nextEntityLocation: function(range, constraint) {
      var x = this.nextX(range);
      var y = this.nextY(range);
      if (constraint) {
        if (constraint.x) {
          x = c(x, 0, constraint.x);
        }
        if (constraint.y) {
          y = c(y, 0, constraint.y);
        }
      }
      return { x: x, y: y };
    }
  });

  var DNA = Class.extnd({
    init: function(growthMachine, body) {
      var identities = 3;
      this.body = body;
      this.genes = [];
      this.activeGenes = [];
      for (var i = 0; i < identities; i++) {
        var gene = new Gene(growthMachine);
        gene.attach(data);
        this.genes.push(gene);
      }
    },

    withinAllActiveGenes: function(target) {
      var within = false;
      for (var i = 0; i < this.activeGenes.length; i++) {
        if (this.activeGenes[i].isWithin(target)) {
          within = true;
          break;
        }
      }
      return within;
    },

    potentialLocation: function(gene) {
      var bounded = true;
      var target;
      while (bounded) {
        target = this.body.nextEntityLocation(300, { x: window.innerWidth - gene.width});
        target.dimension = gene.dimension;
        if ( ! this.withinAllActiveGenes(target)) {
          bounded = false;
        }
      }
      return target;
    },

    identifyMutation: function() {
      if (Math.random() < .03 && this.genes.length > 0) {
        var gene = this.genes.pop();
        this.activate(gene);
      }
    },

    activate: function(gene) {
      gene.next();
      var location = this.potentialLocation(gene);
      gene.dominant(location);
      this.activeGenes.push(gene);
      setTimeout(function() {
        this.clearIdentity(gene);
      }.bind(this), delay);
    },

    clearIdentity: function(gene) {
      gene.recess();
      this.activeGenes.splice(this.activeGenes.indexOf(gene), 1);
      this.genes.push(gene);
    }
  });

  var Gene = Class.extnd({
    init: function(growthMachine) {
      this.codex = ["MXCHINE", "MXCH!NE", "SOMAT!C"];
      this.nucleotides = [ "cytos!ne", "guan:ne", "aden!ne", "thxmine"];
      this.offsets = ["reset", "evalMutation", "transmit", "send", "void", "function", "kernel", "opt", "aux", "in", "format",
        "map", "TX", "RX", "violation", "reject", "abort", "abandon", "create", "join", "include", "export"];

      this.growthMachine = growthMachine;
      this.active = false;
      this.container = $("<div class='gene'/>");
      this.marker = $("<span class='genetic-marker'/>");
      var geneticContent = $("<span class='genetic-content'/>");

      this.codexPart = $("<span class='codex'/>");
      this.nucleotidePart = $("<span class='nucleotide'/>");
      this.offsetPart = $("<span class='offset'/>");

      this.marker.appendTo(this.container);
      geneticContent.appendTo(this.container);

      this.codexPart.appendTo(geneticContent);
      this.nucleotidePart.appendTo(geneticContent);
      geneticContent.append("<br/>");
      this.offsetPart.appendTo(geneticContent);
    },

    attach: function(element) {
      this.container.appendTo(element);
    },

    recess: function() {
      this.active = false;
      this.container.css({
        opacity: 0
      });
    },

    dominant: function(location) {
      var x = location.x;
      var y = location.y;
      this.container.css({
        transform: "translate3d(" + x + "px, " + y + "px, 0px)",
        opacity: 1
      });
      this.location = { x: x, y: y};
      this.active = true;
      this.flicker();
    },

    isWithin: function(target) {
      return target.x + target.dimension.width > this.location.x &&
        target.x < this.location.x + this.dimension.width &&
        target.y + target.dimension.height > this.location.y &&
        target.y < this.location.y + this.dimension.height;
    },

    next: function() {
      if (this.growthMachine.fear || Math.random() > .8) {
        this.container.addClass("genetic-error");
        this.codexPart.text("ERR0R/" + Math.round(Math.random() * 10));
        this.nucleotidePart.text(".V/RUS+" + Math.round(Math.random() * 30));
      } else {
        this.container.removeClass("genetic-error");
        this.codexPart.text(this.codex.sample());
        this.nucleotidePart.text(this.nucleotides.sample());
      }
      this.evalMutation();
      this.dimension = {
        width: this.container.width(),
        height: this.container.height()
      };
    },

    evalMutation: function() {
      this.offsetPart.text(this.offsets.sample(4).join(".") + ":" + Math.random().toString(36).split("").sample());
    },

    flicker: function() {
      if (this.active) {
        if (Math.random() > .02) {
          this.on();
        } else {
          this.off();
        }

        setTimeout(function() {
          this.flicker();
        }.bind(this), 1)
      }
    },

    on: function() {
      this.container.css({ display: 'block' });
    },

    off: function() {
      this.container.css({ display: 'none' });
    },
  });

  var GrowthMachine = Class.extnd({

    init: function() {
      this.imgBits = 125;
      this.bits = 135;
      this.imgs = [];
      this.counter = 0;
      this.fear = false;
    },

    onUpdateProgress: function(onUpdateProgressCallback) {
      this.onUpdateProgressCallback = onUpdateProgressCallback;
    },

    onLoad: function(onLoadCallback) {
      this.onLoadCallback = onLoadCallback
    },

    updateProgress: function() {
      this.counter++;
      var percent = Math.round(this.counter / this.bits * 100);
      this.onUpdateProgressCallback(percent);
      if (percent >= 100) {
        this.onLoadCallback();
      }
    },

    download: function() {
      var i;
      for (i = 1; i <= this.bits; i++) {
        this.initializeConstructBit(i);
      }
    },

    begin: function() {
      $(growthMachineElement).addClass("orbit");
      this.forAll(function(img) {
        this.mutateComponentNow(img, 2000, true);
      }.bind(this));
      this.mutate();
    },

    mutate: function() {
      setTimeout(function() {
        this.forAll(function(img) {
          this.mutateComponent(img)
        }.bind(this));
        this.mutate();
      }.bind(this), Math.round(Math.random() * 4000) + 8000);
    },

    forAll: function(callback) {
      for (var i = 0; i < this.imgs.length; i++) {
        var img = this.imgs[i];
        callback(img);
      }
    },

    mutateComponent: function(img) {
      this.mutateComponentNow(img, delay);
    },

    mutateComponentNow: function(img, duration, initial) {
      var entityLocation = body.nextEntityLocation(200);
      var $img = $(img);
      var scale = (rf(70) + 10) / 100;
      var rotate = rf(180);
      var opacity = r(.35);
      var x = entityLocation.x;
      var y = entityLocation.y;

      var previousData = $img.data("velocityData");

      var velocityData = {
        rotateZ: rotate + "deg",
        scaleX: scale,
        scaleY: scale,
        opacity: initial ? 0 : opacity
      };

      velocityData.transformOriginX = x + "px";
      velocityData.transformOriginY = y + "px";
      velocityData.translateX = x + "px";
      velocityData.translateY = y + "px";

      $img.data("velocityData", clone(velocityData));

      forcefeed(previousData, velocityData);

      var id = $img.attr("id");
      var progressBit = id === "bit1";

      $img.velocity({
        zIndex: rf(100)
      }).velocity(velocityData, {
        duration: initial ? 10 : duration,
        easing: [0.98, 0.1, 0.28, 1.01],
        complete: function() {
          dna.identifyMutation();
        }.bind(this),
        progress: progressBit ? function(elements, complete, remaining, start, tweenValue) {
          statusClock.innerText = ("" + Math.floor(remaining * 10)).padStart(5, "0");
        }.bind(this) : function() {}
      });

      if (initial) {
        $img.velocity({
          opacity: opacity
        }, {
          duration: duration
        });
      }
    },

    remission: function() {
      this.fear = false;
      for (var i = 1; i <= this.bits; i++) {
        var img = document.getElementById("bit" + i);
        var src = img.getAttribute("data-bit");
        img.src = "images/blue-bits/"+ src + ".png";
      }
    },

    operand: function() {
      this.fear = true;
      for (var i = 1; i <= this.bits; i++) {
        var img = document.getElementById("bit" + i);
        var src = img.getAttribute("data-bit");
        img.src = "images/rust-bits/"+ src + ".png";
      }
    },

    initializeConstructBit: function(i) {
      var img = document.createElement("img");
      var imgIdx = (i % this.imgBits) + 1;
      img.src = "images/blue-bits/" + imgIdx + ".png";
      img.className = "bit";
      img.setAttribute("data-bit", "" + imgIdx);
      img.setAttribute("id", "bit" + i);
      img.onload = function() {
        this.updateProgress();
      }.bind(this);
      var x = window.innerWidth / 2;
      var y = window.innerHeight / 2;
      img.style[css.transform] = "translate3d(" + x + "px, " + y + "px, 0)";
      growthMachineElement.appendChild(img);
      this.imgs.push(img);
    }

  });

  var ProgressBar = Class.extnd({
    init: function() {
      this.info = document.getElementById("info");
      this.progress = document.getElementById("progress");
      this.meter = document.getElementById("meter");
    },

    update: function(percent) {
      this.meter.style.width = percent + "%";
      this.info.innerText = percent + "%";
    },

    done: function() {
      this.meter.style.display = "none";
      this.progress.style.display = "none";
      this.info.style.display = "none";
    }
  });

  var Logo = Class.extnd({
    init: function() {
      this.logo = document.getElementById("logo");
      this.$logo = $(this.logo);
    },

    fadeIn: function(callback) {
      this.$logo.velocity({
        opacity: 1
      }, {
        duration: 2000,
        complete: function() {
          callback();
        }
      });
    },

    fadeOut: function(callback) {
      this.$logo.velocity({
        opacity: 0
      }, {
        duration: 2000,
        complete: function() {
          callback();
        }
      });
    }
  });

  var growthMachineElement = document.getElementById("growthMachine");
  var data = document.getElementById("data");
  var statusClock = document.getElementById("status-clock");

  var logo;
  var growthMachine;
  var dna;
  var body;
  var progressBar;

  function initialize() {
    logo = new Logo();
    progressBar = new ProgressBar();
    growthMachine = new GrowthMachine();
    body = new Body();
    dna = new DNA(growthMachine, body);

    growthMachine.onUpdateProgress(function(percent) {
      progressBar.update(percent);
    });

    growthMachine.onLoad(function() {
      progressBar.done();
      logo.fadeOut(function() {
        growthMachine.begin();
      });
    });

    growthMachine.download();

    logo.fadeIn(function() {
    });
  }

  initialize();

})(window.CSSUtils);
