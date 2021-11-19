function Flicker(el) {
    this.el = el;
    this.onCall = function(el) {
        el.style.display = "block";
    };

    this.offCall = function(el) {
        el.style.display = "none";
    };
}

Flicker.prototype.on = function(callback) {
    this.onCall = callback
};

Flicker.prototype.off = function(callback) {
    this.offCall = callback
};

Flicker.prototype.doAnimate = function() {
    if (Math.random() > .45) {
        this.onCall(this.el);
    } else {
        this.offCall(this.el);
    }
    this.animate();
};

Flicker.prototype.animate = function() {
    var self = this;
    setTimeout(function() {
        self.doAnimate();
    }, Math.random() * 100);
};
