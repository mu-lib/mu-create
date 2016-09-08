(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-compose/process"] = factory.apply(root, modules.map(function(m) {
      return root[m.replace(/^\./, "mu-compose")];
    }));
  }
})([], this, function() {
  var slice = Array.prototype.slice;
  var concat = Array.prototype.concat;

  return function() {
    var self = this;
    var rules = concat.apply([], arguments);

    return function(input) {
      var skip = false;
      var args = slice.call(arguments, 1);

      return rules.reduce(function(output, rule) {
        var composed = skip ? output : rule.apply(self, concat.call([output], args));

        if (composed !== undefined) {
          if (composed === false) {
            skip = true;
          }
          else {
            output = composed;
          }
        }

        return output;
      }, input);
    }
  }
});