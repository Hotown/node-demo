/**
 * 闭包的坑
 */
// for (var i = 0; i < 5; i++) {
//   setTimeout(function() {
//     console.log(i);
//   }, 5);
// }

// for (var i = 0; i < 5; i++) {
//   (function(idx) {
//     setTimeout(function() {
//       console.log(idx);
//     }, 5);
//   })(i);
// }

// const myObject = {value: 100}
// myObject.getValue = function() {
//     console.log(this.value)
//     console.log(this)
//     return this.value
// }

// console.log(myObject.getValue())

// const myObject = {value: 100}
// myObject.getValue = function() {
//     const foo = function() {
//         console.log(this.value) // => undefined
//         console.log(this)       // 输出全局变量
//     }
//     foo()
//     return this.value
// }
// console.log(myObject.getValue())    // => 100

const myObject = { value: 100 };

const foo = function() {
  console.log(this);
};

foo();
foo.apply(myObject);
foo.call(myObject);

const newFoo = foo.bind(myObject);
newFoo();
