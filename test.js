var ezFormat = require("./ezFormat");

var old = console.log;
var push = [];
console.log = function (text) {
  push.push(text);
};

var ok = 0, ng = 0;
var ngResults = [];
function doTests (name, what, args, mustBe) {
  var now = new Date();
  for (var i = 0; i < 1000; i++) {
    String.prototype.format.apply(what, args);
  }
  var ms = new Date() - now;
  var result = String.prototype.format.apply(what, args);
  if (result == mustBe) {
    ok++;
    result = "  ";
  } else {
    ng++;
    ngResults.push({name: name, data: result, expected: mustBe});
    result = "NG";
  }
  console.log("{0} ms {1} {2}".format(ms, result, name));
}

doTests("CLEAR", "{0} {1}", ["Easy", "Test"], "Easy Test");

doTests("CHAR", "{0:char}", [49], "1");
doTests("CHAR aka", "{0:c}", [50], "2");

doTests("BOOL1", "{0:bool}", [2], "true");
doTests("BOOL2", "{0:bool}", [0], "false");
doTests("BOOL3", "{0:bool}", [true], "true");
doTests("BOOL4", "{0:bool}", [false], "false");
doTests("BOOL aka", "{0:b}", [0], "false");
doTests("BOOL aka", "{0:b}", [null], "false");

doTests("BASE N", "{0:base}", [1023], "3ff");
doTests("BASE 10", "{0:base:10}", [false], "0");
doTests("BASE 10", "{0:base:10}", [true], "1");
doTests("BASE 2", "{0:base:2}", [1023], "1111111111");
doTests("BASE 2 aka", "{0:a:2}", [1023], "1111111111");
doTests("BASE 3", "{0:base:3}", [1023], "1101220");
doTests("BASE 7", "{0:base:7}", [1023], "2661");
doTests("BASE 16", "{0:base:16}", [1023], "3ff");
doTests("BASE 32", "{0:base:32}", [1023], "vv");

doTests("SCIENTIFIC N", "{0:scientific}", [10.123456789], "1.0123456789e+1");
doTests("SCIENTIFIC 1", "{0:scientific:1}", [10.123456789], "1.0e+1");
doTests("SCIENTIFIC 2", "{0:scientific:2}", [10.123456789], "1.01e+1");
doTests("SCIENTIFIC 2 aka", "{0:s:2}", [10.123456789], "1.01e+1");
doTests("SCIENTIFIC 3", "{0:scientific:3}", [10.123456789], "1.012e+1");

doTests("FIXED N", "{0:fixed}", [10.123456789], "10");
doTests("FIXED N aka", "{0:f}", [10.123456789], "10");
doTests("FIXED N aka", "{0:f}", [true], "1");
doTests("FIXED N aka", "{0:f}", [false], "0");
doTests("FIXED 1", "{0:fixed:1}", [10.123456789], "10.1");
doTests("FIXED 2", "{0:fixed:2}", [10.123456789], "10.12");
doTests("FIXED 3", "{0:fixed:3}", [10.123456789], "10.123");

doTests("JSON", "{0:json}", [{
  TEST: 1,
  YEAH: {IN: [1, 2, 3], MORE: 'MORE', ENOUGH: true}
}], '{"TEST":1,"YEAH":{"IN":[1,2,3],"MORE":"MORE","ENOUGH":true}}');
doTests("JSON aka", "{0:j}", [{
  TEST: 1,
  YEAH: {IN: [1, 2, 3], MORE: 'MORE', ENOUGH: true}
}], '{"TEST":1,"YEAH":{"IN":[1,2,3],"MORE":"MORE","ENOUGH":true}}');
doTests("FORMATTED JSON", "{0:json:4}", [{
  TEST: 1,
  YEAH: {IN: [1, 2, 3], MORE: 'MORE', ENOUGH: true}
}], "{\n    \"TEST\": 1,\n    \"YEAH\": {\n        \"IN\": [\n            1,\n            2,\n            3\n        ],\n        \"MORE\": \"MORE\",\n        \"ENOUGH\": true\n    }\n}");
doTests("FORMATTED JSON a", "{0:j:4}", [{
  TEST: 1,
  YEAH: {IN: [1, 2, 3], MORE: 'MORE', ENOUGH: true}
}], "{\n    \"TEST\": 1,\n    \"YEAH\": {\n        \"IN\": [\n            1,\n            2,\n            3\n        ],\n        \"MORE\": \"MORE\",\n        \"ENOUGH\": true\n    }\n}");


doTests("COMPLEX", "{0} {0:char} {0:bool} {1:base} {1:base:2} 0x{1:base:16} {1:fixed} {1:fixed:3}", [55, 123.1631], "55 7 true 7b 1111011 0x7b 123 123.163");

doTests("BUG TEST", "{{0}} {0{0}}", [1], "{1} {01}");

doTests("PERSON TEST", "Person Name: {name}, Person Age: {age}", [{
  name: "Mr. Brown",
  age: 33
}], "Person Name: Mr. Brown, Person Age: 33");
doTests("MULTI OBJ", "a: {a}, b: {1.b}", [{a: 1}, {b: 2}], "a: 1, b: 2");
doTests("ARRAY TEST", "{.0}", [[1, 2, 3, 4, 5]], "1");
doTests("TOSTRING TEST", "{0}", [{
  a: 1, toString: function () {
    return this.a * 2;
  }
}], "2");

doTests("TOSTRING TEST 2", "{me}", [{
  me: {
    a: 1, toString: function () {
      return this.a * 3;
    }
  }
}], "3");

doTests("DEF TEST", "{0 def(1)}", [null, "default"], "default");
doTests("DEF TEST", "{0 def()}", [null, "default"], "");
doTests("DEF TEST", "{0 json 4 def(1)}", [null, {error: "notExists"}], "{\n    \"error\": \"notExists\"\n}");
doTests("IGNORE TEST", "{0} ~ignore{1}", ["Easy", "Test"], "Easy {1}");
doTests("IGNORE TEST2", "{0} ~ignore{1} {1} ~ignore{2} {2}", ["Easy", "Test", "Life"], "Easy {1} Test {2} Life");


doTests("PADDING 1", "{0:padding:3}", [55], "055");

console.log = old;
setTimeout(function () {
  if (ng > 0) {

    ngResults.forEach(function (res) {
      console.error(res.name + " FAILED!");
      console.log("-----------EXPECTED--------------");
      console.log(res.expected);
      console.log("----------- RESULT --------------");
      console.log(res.data);
      console.log();
    });
  } else {
    console.log("test successful!");
  }
}, 1);
