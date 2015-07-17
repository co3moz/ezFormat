var ezFormat = require("./ezFormat");

function doTests(what, args) {
  var now = new Date();
  for(var i = 0; i<1000;i++) {
    String.prototype.format.apply(what, args);
  }
  var ms = new Date() - now;
  console.log(ms + " ms " + String.prototype.format.apply(what, args));
}

doTests("CLEAR            {0} {1}", ["Easy", "Test"]);

doTests("CHAR             {0:char}", [49]);

doTests("BOOL             {0:bool}", [2]);
doTests("BOOL             {0:bool}", [0]);

doTests("BASE N           {0:base}", [1023]);
doTests("BASE 2           {0:base:2}", [1023]);
doTests("BASE 3           {0:base:3}", [1023]);
doTests("BASE 7           {0:base:7}", [1023]);
doTests("BASE 16          {0:base:16}", [1023]);
doTests("BASE 32          {0:base:32}", [1023]);

doTests("SCIENTIFIC N     {0:scientific}", [10.123456789]);
doTests("SCIENTIFIC 1     {0:scientific:1}", [10.123456789]);
doTests("SCIENTIFIC 2     {0:scientific:2}", [10.123456789]);
doTests("SCIENTIFIC 3     {0:scientific:3}", [10.123456789]);

doTests("FIXED N          {0:fixed}", [10.123456789]);
doTests("FIXED 1          {0:fixed:1}", [10.123456789]);
doTests("FIXED 2          {0:fixed:2}", [10.123456789]);
doTests("FIXED 3          {0:fixed:3}", [10.123456789]);

doTests("JSON             {0:json}", [{TEST:1, YEAH: {IN: [1, 2, 3], MORE: 'MORE', ENOUGH: true}}]);
doTests("FORMATTED JSON   {0:json:4}", [{TEST:1, YEAH: {IN: [1, 2, 3], MORE: 'MORE', ENOUGH: true}}]);


doTests("COMPLEX {0} {0:char} {0:bool} {1:base} {1:base:2} 0x{1:base:16} {1:fixed} {1:fixed:3}", [55, 123.1631]);

doTests("BUG TEST {{0}}  {0{0}}", [0]);