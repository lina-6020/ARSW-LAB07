var app = handlerBlueprints;

var pointerHandler = (function () {
  var init = function () {
    var canvas = document.getElementById("myCanvas");

    if (window.PointerEvent) {
      canvas.addEventListener("pointerdown", _draw, false);
    } else {
      //Provide fallback for user agents that do not support Pointer Events
      canvas.addEventListener("mousedown", _draw, false);
    }
  };

  var _draw = function (event) {
    // Event handler called for each pointerdown event:
    var canvas = document.getElementById("myCanvas"),
      context = canvas.getContext("2d");
    var offset = _getOffset(canvas);
    app.nuevoPoint({
      x: event.pageX - offset.left,
      y: event.pageY - offset.top,
    });
    context.fillRect(event.pageX - offset.left, event.pageY - offset.top, 5, 5);
  };

  var _getOffset = function (obj) {
    var offsetLeft = 0;
    var offsetTop = 0;
    do {
      if (!isNaN(obj.offsetLeft)) {
        offsetLeft += obj.offsetLeft;
      }
      if (!isNaN(obj.offsetTop)) {
        offsetTop += obj.offsetTop;
      }
    } while ((obj = obj.offsetParent));
    return { left: offsetLeft, top: offsetTop };
  };

  return {
    init: init,
  };
})();
