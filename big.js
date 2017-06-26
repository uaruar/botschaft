function makeIterator(array) {
  var i = 0;

  return {
    current: function() { return array[Math.abs(i % array.length)]; },
    next: function() { return array[Math.abs(++i % array.length)]; },
    prev: function() { return array[Math.abs(--i % array.length)]; }
  }
}

function render(slide) {
  $("body").css("backgroundImage", slide.background);
  $("#bigText").html("&rarr; " + slide.text);
  $("#bigText").fitText();
}

window.onload = function() {
    var slides = makeIterator(slidesData);

    document.onclick = function() { render(slides.next()); };

    document.onkeydown = function(e) {
      if (e.which === 39 || e.which === 34 || e.which === 40) {
        render(slides.next());
        return;
      }
      if (e.which === 37 || e.which === 33 || e.which === 38) {
        render(slides.prev());
        return;
      }
    };

    document.ontouchstart = function(e) {
        var x0 = e.changedTouches[0].pageX;
        document.ontouchend = function(e2) {
            var x1 = e2.changedTouches[0].pageX;
            if (x0 == x1) return;
            if (x1 < x0) render(slides.next());
            else render(slides.prev());
        };
    };

    window.onresize = function() {
      $("#bigText").fitText();
    }

    render(slides.current());
};
