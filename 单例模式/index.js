// 封装生成单例模式函数

/**
 *  传递一个函数生成一个单例模式函数
 */
var CreateSingle = function (func) {
  var result;
  return function (...args) {
    if (!result) {
      if (new.target) {
        result = new func(...args);
      } else {
        result = func.apply(this, ...args);
      }
    }
    return result;
  }
};

// 常见的单例模式实现方式：

/**
 * 使用对象属性实现  （会在全局变量中添加属性  容易造成数据污染）
 */
function Single(text) {
  // var this = Object.create(Single.prototype)  构造函数隐式生成
  if (!Single.instance) {
    Single.instance = this;
    this.text = text;
  }
  return Single.instance;
}

/**
 *  使用函数重新赋值实现  （无法在prototype上绑定属性）
 */
function Single(text) {
  var instance = this;
  this.text = text;
  Single = function () {
    return instance;
  }
}

/**
 *  圣杯模式 利用函数闭包 (真正意义上实现单例模式  前两种有弊端)
 */
Single = (function () {
  var instance;
  return function (text) {
    if (!instance) {
      instance = this;
      this.text = text;
    }
    return instance;
  }
})()

// var a = new Single('test');
// var b = new Single();

// console.log(a === b);

function Test(text) {
  this.text = text;
}
var TestSingle = CreateSingle(Test);
var a = new TestSingle('test');
var b = new TestSingle();

console.log(a === b);

console.log(a.text);
console.log(b.text);