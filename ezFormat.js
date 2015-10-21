(function () {
  var formatReg = /(~ignore)?\{ *([\w\.]+) *(?:(?::|(?: +)) *([\d\w]+))? *(?:(?::|(?: +)) *([\d\w]+))? *(?:def(?:ault)?\((\w*)\))? *}/g;

  function fetchFromObject(obj, prop, _index) { // thanks to "Prusprus" url: http://jsfiddle.net/amofb8xa/8/
    if (typeof obj === 'undefined') return false;
    if ((_index = prop.indexOf('.')) > -1) {
      return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }
    return obj[prop];
  }

  var nothing = "null";

  String.prototype.format = function () {
    var args = arguments;
    return this.replace(formatReg, function (match, ignore, id, type, modifier, def) {
      if (ignore) {
        return match.substring(7);
      }

      var selected;

      if (id.indexOf(".") != -1) { // has access modifier?
        var split = id.split(".");
        var line = 0;
        if (!isNaN(+split[0])) {
          line = split.shift();
        }
        if (line == "") {
          line = 0;
        }
        selected = fetchFromObject(args[line], split.join("."));

      } else {
        if (isNaN(+id)) {
          if (args[0]) {
            selected = args[0][id];
          } else {
            selected = nothing;
          }
        } else {
          if (args[id] != null) {
            selected = args[id];
          }
        }
      }


      if (selected == null) {
        if (def != null) {
          if (def == "") {
            selected = "";
          } else {
            selected = args[def] || "";
          }
        } else {
          selected = nothing;
        }
      }

      switch (type) {
        case "f":
        case "fixed":
          return parseFloat(+selected).toFixed(modifier);
        case "s":
        case "scientific":
          return parseFloat(+selected).toExponential(modifier);
        case "a":
        case "base":
          modifier || (modifier = 16);
          return parseInt(+selected).toString(modifier);
        case "b":
        case "bool":
          return selected == "null" ? false : !!selected;
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