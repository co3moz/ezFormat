(function () {
  var formatReg = /\{ *(\d+) *(?:: *([\d\w]+))? *(?:: *([\d\w]+))? *}/g;

  String.prototype.format = function () {
    var args = arguments;
    return this.replace(formatReg, function (match, id, type, modifier) {
      var selected = args[id];

      switch (type) {
        case "f":
        case "fixed":
          return parseFloat(selected).toFixed(modifier);
        case "s":
        case "scientific":
          return parseFloat(selected).toExponential(modifier);
        case "a":
        case "base":
          modifier || (modifier = 16);
          return parseInt(selected).toString(modifier);
        case "b":
        case "bool":
          return !!selected;
        case "c":
        case "char":
          return String.fromCharCode(selected);
        case "j":
        case "json":
          if (typeof modifier === "undefined") {
            return JSON.stringify(selected);
          }
          return JSON.stringify(selected, null, parseInt(modifier));
        default:
          return selected.toString();
      }
    });
  };
})();