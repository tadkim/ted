(function() {
  var _symbol = d3.svg.symbol(),
      _line = d3.svg.line();

  d3.superformula = function() {
    var type = _symbol.type(),
        size = _symbol.size(),
        segments = size,
        params = {};

    function superformula(d, i) {
      var n, p = _superformulaTypes[type.call(this, d, i)];
      for (n in params) p[n] = params[n].call(this, d, i);
      return _superformulaPath(p, segments.call(this, d, i), Math.sqrt(size.call(this, d, i)));
    }

    superformula.type = function(x) {
      if (!arguments.length) return type;
      type = d3.functor(x);
      return superformula;
    };

    superformula.param = function(name, value) {
      if (arguments.length < 2) return params[name];
      params[name] = d3.functor(value);
      return superformula;
    };

    // size of superformula in square pixels
    superformula.size = function(x) {
      if (!arguments.length) return size;
      size = d3.functor(x);
      return superformula;
    };

    // number of discrete line segments
    superformula.segments = function(x) {
      if (!arguments.length) return segments;
      segments = d3.functor(x);
      return superformula;
    };

    return superformula;
  };

  function _superformulaPath(params, n, diameter) {
    var i = -1,
        dt = 2 * Math.PI / n,
        t,
        r = 0,
        x,
        y,
        points = [];

    while (++i < n) {
      t = params.m * (i * dt - Math.PI) / 4;
      t = Math.pow(Math.abs(Math.pow(Math.abs(Math.cos(t) / params.a), params.n2)
        + Math.pow(Math.abs(Math.sin(t) / params.b), params.n3)), -1 / params.n1);
      if (t > r) r = t;
      points.push(t);
    }

    r = diameter * Math.SQRT1_2 / r;
    i = -1; while (++i < n) {
      x = (t = points[i] * r) * Math.cos(i * dt);
      y = t * Math.sin(i * dt);
      points[i] = [Math.abs(x) < 1e-6 ? 0 : x, Math.abs(y) < 1e-6 ? 0 : y];
    }

    return _line(points) + "Z";
  }


  var _superformulaTypes = {
    explorer: {m:1.362, n1:1.362, n2:9.237, n3:5.938, a:-0.9625, b:1.025},
    art: {m:6.612, n1:5.487, n2:2.337, n3:14.26, a:1.775, b:1.362},
    management: {m:-2.537, n1:407.1, n2:603.1, n3:936.3, a:1.287, b:0.5375},
    media: {m:0.6875, n1:0.3500, n2:2.825, n3:8.863, a:-3.625, b:-1.675},
    vip: {m:3.950, n1:0.2750, n2:1.662, n3:2.675, a:73.90, b:14.94},
    public: {m:-4.188, n1:8.263, n2:-0.6250, n3:15.84, a:3.313, b:2.337},
    humanist: {m:1.915, n1:39.60, n2:113.1, n3:19.18, a:1.250, b:0.5375},
    science: {m:19.96, n1:16.14, n2:2.337, n3:9.987, a:0.3125, b:0.9875},
    profession: {m:4, n1:632.5, n2:421.8, n3:100, a:2, b:1},
    religion: {m:3.313, n1:10.89, n2:11.23, n3:16.81, a:-0.9625, b:-1.525},
    gear: {m: 19, n1: 100, n2: 50, n3: 50, a: 1, b: 1},
    heart: {m: 1, n1: .8, n2: 1, n3: -8, a: 1, b: .18},
    heptagon: {m: 7, n1: 1000, n2: 400, n3: 400, a: 1, b: 1},
    hexagon: {m: 6, n1: 1000, n2: 400, n3: 400, a: 1, b: 1},
    malteseCross: {m: 8, n1: .9, n2: .1, n3: 100, a: 1, b: 1},
    pentagon: {m: 5, n1: 1000, n2: 600, n3: 600, a: 1, b: 1},
    rectangle: {m: 4, n1: 100, n2: 100, n3: 100, a: 2, b: 1},
    roundedStar: {m: 5, n1: 2, n2: 7, n3: 7, a: 1, b: 1},
    square: {m: 4, n1: 100, n2: 100, n3: 100, a: 1, b: 1},
    star: {m: 5, n1: 30, n2: 100, n3: 100, a: 1, b: 1},
    triangle: {m: 3, n1: 100, n2: 200, n3: 200, a: 1, b: 1}
  };

  d3.superformulaTypes = d3.keys(_superformulaTypes);
})();