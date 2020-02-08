var Interactor = Class.extnd({

  connect: function() {
    var contact = function(event) {
      interator.gid(f({x: event.pageX, y: event.pageY}).toArray().sample());
    };
    $(document).click(function(event) {
    });
  },

  gid: function(selected) {
    if (this.selectedBit) {
      this.selectedBit = null;
      imgs.forEach(function(img) {
        var $img = $(img);
        var previousData = $img.data("velocityData");
        $img.velocity({
          opacity: previousData.opacity,
          translateX: previousData.translateX
        }, {
          duration: 200
        }).velocity({
          rotateZ: previousData.rotateZ
        }, {
          duration: 60
        })
      });
    } else {
      imgs.filter(function(img) {
        if (selected == img) {
          return;
        }
        var $img = $(img);
        $img.velocity({
          opacity:.1
        }, {
          duration: 200
        })
      });

      $(selected).velocity({
        rotateZ: 0
      }, {
        duration: 1
      }).velocity({
        opacity: 1,
        zIndex: 200,
        translateX: "200px"
      }, {
        duration: 200
      });
      this.selectedBit = selected;
    }
  },

  exp2: function(inv) {
    var inc = (360 / imgs.length) * .0174532925;
    for (var i = 0; i < imgs.length; i++) {
      var $img = $(imgs[i]);
      var previousData = $img.data("velocityData");
      var x, y;
      if (inv) {
        x = previousData.translateX;
        y = previousData.translateY;
      } else {
        var xDist = window.innerWidth * Math.cos(inc * i);
        var yDist = window.innerHeight * Math.sin(inc * i);
        x = (window.innerWidth / 2) + xDist;
        y = (window.innerHeight / 2) + yDist;
      }
      $img.velocity({
        translateX: x,
        translateY: y
      }, {
        duration: 300
      })
    }
  },

  exp: function(inv) {
    for (var i = 0; i < imgs.length; i++) {
      var $img = $(imgs[i]);
      var previousData = $img.data("velocityData");
      if (inv) {
        $img.velocity(previousData, {
          duration: 200,
          easing: "easeInOut"
        });
      } else {
        var scale = r(1);
        var whacko = {
          rotateZ: r(180) + "deg",
          scaleX: scale,
          scaleY: scale,
          translateX: r(100) + "px",
          translateY: r(100) + "px",
          opacity: r(1)
        };
        forcefeed(previousData, whacko);
        $img.velocity(whacko, {
          duration: 1000,
          easing: "easeInOut"
        });
      }
    }
  }
});
