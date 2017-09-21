const Benchmark = require("benchmark");

const suite = new Benchmark.Suite;

const int1 = function(str) {
  return +str;
};

const int2 = function(str) {
  return parseInt(str, 10);
};

const int3 = function(str) {
  return Number(str);
};

const number = "100";

suite
  .add("+", function() {
    int1(number);
  })
  .add("parseInt", function() {
    int2(number);
  })
  .add("Number", function() {
    int3(number);
  })
  .on("cycle", function(event) {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fatest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
