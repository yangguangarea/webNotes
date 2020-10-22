
/*
 * 第001课js开发环境搭建_变量_表达式
----------------------------------------
变量没初始化的话，默认值是undefined
var a;
console.log(a);//输出是undefined
----------------------------------------
console.log(a);//输出是undefined,并不会报错，
var a = 5;
----------------------------------------
变量的类型判断 用 typeof
var b = false
console.log(typeof b)
----------------------------------------
变量定义在哪里，作用范围就在那里;
var test_value;//此处test_value的作用范围是这个js文件
----------------------------------------
null 和 undefined 的区别
null表示"没有对象"，即该处不应该有值。典型用法是：
1.作为函数的参数，表示该函数的参数不是对象。
2.作为对象原型链的终点。

Object.getPrototypeOf(Object.prototype)
// null

undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：

1.变量被声明了，但没有赋值时，就等于undefined。
2.调用函数时，应该提供的参数没有提供，该参数等于undefined。
3.对象没有赋值的属性，该属性的值为undefined。
4.函数没有返回值时，默认返回undefined。
----------------------------------------
JS的数据类型有8种
undefined, null, number, object, boolean, string, symbol, bigint

5个基本数据类型：string、number、boolean、null、undefined

在ES5的时候，我们认知的数据类型确实是 6种：Number、String、Boolean、undefined、object、Null。
ES6 中新增了一种 Symbol 。这种类型的对象永不相等，即始创建的时候传入相同的值，可以解决属性名冲突的问题，做为标记。
谷歌67版本中还出现了一种 bigInt。是指安全存储、操作大整数。（但是很多人不把这个做为一个类型）。
----------------------------------------
一些常用操作符
delete

var person = {'name':jiujizi}
delete person['name']  // 删除person中的'name'这个key
person.name  //undefined(无value)，因为delete操作符将key和value都删了
用于删除对象对应的key值
，把key删了，value自然也就没了

in
var person = {name:'jiujizi'}
person.name = undefined  //  给name这个key赋值为'undefined'
'name' in person  //  true，用in操作符来检验key是否存在于对象中
用于检测一个key是否存在于一个对象中

for...in...
var person = {name:'jiujizi',age:20}
for(var key in person){
console.log(key)  //  打印出person对象中的所有key
}  //  但打印的顺序是不确定的
用for...in...可以用来遍历对象，但输出但值顺序却是不一定的

typeof
typeof 1  //  'number'
typeof 'aaa'  //  'string'
typeof symbol  //  'symbol'
typeof true  //  'boolean'
typeof null  //  'object'
typeof undefined  //  'undefined'
var a = {}
typeof a  //  'object'
用typeof()可以打印出数据类型
打印出来的值都用单引号(双引号)包住，表示一个名词


//for in和for of的区别

for in 的特点：
for … in 循环返回的值都是数据结构的 键值名。
遍历对象返回的对象的key值；
遍历数组返回的数组的下标(key)。
for … in 循环不仅可以遍历数字键名,还会遍历原型上的key值和手动添加的其他键；
特别情况下, for … in 循环会以任意的顺序遍历键名
for in 遍历对象的时候，会将原型链上的属性也遍历出来，所以用 hasOwnProperty(key)来判断
总结一句: for in 循环特别适合遍历对象。

for of是es6的新特性
for-of总是得到对象的value或数组、字符串的值，另外还可以用于遍历Map和Set
for of前提对象本身定义了迭代器
我也想让对象可以使用 for of循环怎么办?使用 Object.keys() 获取对象的 key值集合后,再使用 for of
const obj = {a: 'x', b: 'y'};
for (let i of Object.keys(obj)) {
    console.log(i) // a, b
}

*/



/*
 * 第002课js顺序执行_条件判断_循环执行
----------------------------------------

*/


/*
 * 第003课JS基本数据_函数对象_表_数组_字符串_函数调用
----------------------------------------

1: 定义一个数组  [value1, value2, ...]
2:使用索引 -->值
3:索引从0开始,使用数组名字[索引]来访问;
4:数组里面的每个元素可以存放任何类型的数据;

var array = [];

console.log(typeof array); //输出是object，所以array其实也是object
访问数组的索引的时候，索引不要越界，不要超过了我们的长度，也不要< 0;
超过的输出是undefined
----------------------------------------

1: 定义一个表 {key: value, key2: value, ....}
2:key可以是整数,字符串;
3: value可以是任意类型;
4:访问value的每个元素 表[key], 表.key;

var obj = {};

var a = {
    "1":'bbb',
    1:'aaa',
    
};
console.log(a),后者的aaa会覆盖前者的bbb，所以其实只有一个key存在

----------------------------------------
函数对象
1:function(参数1, ...) {}
2: return; 返回语句;
3: 函数调用，与代码跳转;
function func_name(lhs, rhs) { 
	// 编写代码，函数体
	// 返回语句，返回到调用函数的下一个语句;
	return;
}

*/




/*
 * 第004课Math库_数组_表
----------------------------------------
Math工具函数:
1:Math.PI
2:Math.random 返回 [0, 1)范围的数;
3:Math.floor(); 向下取整数;
4:Math.sin, Math.cos, Math.tan 三角函数
5: 角度转弧度，弧度转角度;
6: 反三角函数Math.asin, Math.acos, Math.atan;
7: Math.atan2(y, x), 返回一个坐标(y, x)对应的角度;(-PI, PI];
8: Math.sqrt 开根号;

// 随机产生 一个[a, b]之前的整数;
function random_int (min, max) {
	var value = min + (max - min + 1) * Math.random(); // [0, max-min)--> min + [min, max + 1)
	value = Math.floor(value);
	
	return value;
}

// 弧度转角度
function rad2deg(r) {
	var degree = r * 180 / Math.PI;
	return degree;
}
//角度转弧度
function deg2rad(degree) {
	var r = (degree / 180) * Math.PI;
	return r;
}


----------------------------------------
数组的高级使用:
1:array.length; 获取数组的长度;
2:遍历一个数组; for(var key in array);
3: 向数组末尾加入一个元素; array.push()
4: 查找对象在数组中所对应的索引; array.indexOf(),没找到返回-1
5: 删除数组的某个元素; array.splice(开始索引，要删除的个数),返回删除的数组, 原来的数组元素少了;
6: 数组的排序array.sort();
7: 随机 打乱一个数列;
8: 随机的从一堆的数据里面抽取一个值;


比较函数, 传给这个排序的函数，排序的函数，使用这个比较函数的结果，来决定大小，来排序;
返回负数，第一个参数排在第二个参数前边
array_data.sort(function(lhs, rhs) {
	if (lhs > rhs) {
		return -1; // lhs排在rhs前面
	}
	else if(lhs < rhs) {
		return 1; // rhs排在lhs前面
	}
	else {
		return 0; // lhs == rhs ;
	}
});

随机 打乱一个数列
function random_array(array_data)  {
	array_data.sort(function(lhs, rhs) { // 随机决定他们的大小
		if(Math.random() <= 0.5) {
			return -1;
		}
		else {
			return 1;
		}
	})
}

----------------------------------------
表的高级使用:
1:遍历一个表; for(key in table)
2: 删除表中的数据; delete list_data[4] 或者 delete list_data.keyName;

----------------------------------------
字符串对象高级使用
1:str.length;返回字符串长度属性
2:str.indexOf();返回子串首次出现的位置，没找到返回-1;
3:str.replace(/Microsoft/,"W3School");返回被替换的字符串，不会改变原来的字符串，只替换找到的第一个
4:str.toLowerCase, str.toUpperCase;返回新的字符串对象

*/


/*
 * 第005课模块_require_new_this
----------------------------------------
代码模块
1:js里面代码可以放在不同的文件里，称为代码模块;
2:一个模块需要引用其它模块代码的时候使用 require;
3: require:
    (1)如果是第一次调用，那么就加载,执行脚本;
    (2)每个代码模块由module.exports 导出的对象;
    (3)每次require的时候，都返回module.exports;
    (4)如果不是第一次执行，那么直接返回module.exports;

es6中 用import xxx from "./xxx"; 替换了require("./xxx")
      用export default xxx; 替换了module.exports = xxx;
----------------------------------------
this 机制
1:function.call(this, param1, param2);//显示的传递this
2:表.函数名(参数):
    (1)在函数里面 有一个this对象，指的是外面的表;
    (2)如果外面没有表，this是什么是由调用的环境来决定的, 不确定的;
    (3)函数.bind(数据对象)，不会改变原来的函数对象的this,而是会产生一个新的函数对象，bind好了this;
    强制绑定this, 优先级式最高的

apply，call，bind三者的区别
    1.三者都可以改变函数的this对象指向。
    2.三者第一个参数都是this要指向的对象，如果如果没有这个参数或参数为undefined或null，则默认指向全局window。
    3.三者都可以传参，但是apply是数组，而call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入。
    4.bind 是返回绑定this之后的函数，便于稍后调用；apply 、call 则是立即执行
    5.强制bind了this之后，哪怕显式的调用call传递this，实际上的this也是之前bind好的this
----------------------------------------
new 与构造函数
1: js 构造函数: 普通的函数(参数),一般和类的名字是一样的;
    每一个函数对象都有一个表, prototype;
2: new +构造(参数1, 参数2....);
    (1)先创建一个{}对象;
    (2)将这个新对象绑定到函数里面的this;
    (3)构造函数对象的prototype 复制给新对象的 __proto__
    (4)返回新创建的对象;
3: 表.函数调用搜索顺序,现在key, value里查找，再到__proto__里找;

函数对象有一个表prototype， 保存了
对象有__proto__, __proto__是一个表，里边保存了它的函数原型对象的prototype的所有的key和value

*/


/*
 * 第006课类_类的实例_继承
----------------------------------------
原型引用
1:每个函数对象都有prototype属性; 这个prototype表叫类的原型
3:clone一个函数对象的prototype;
    (1)定义一个空函数;
    (2)空函数的prototype = 函数对象的prototype;
    (3)新构造函数.prototype = new 空函数();

----------------------------------------
js实现继承
1: 子类clone 基类构造函数的prototype;
2: 子类和基类如果有同名的方法，会现在当前这个类的函数;
3: 子类的实例显示的调用基类的函数
    基类.prototype.函数名字.call(实例, 参数1,参数2);
4: 编写一个Class()方法来定义一个类,让它继承基类;

function Child(param1...) {
	// 调用基类的构造函数
	Parent.call(param1...);
	// 扩展自己的成员;
	this.xxx = yyy;
}
var temp = function() {};
temp.prototype = Parent.prototype;
Child.prototype = new temp();
//new temp是为了获得一个新的表，表里保存了和父类一样的prototype


实现一个Class(),具有继承功能的函数
function Class(class_desic) {
	var new_class = function(param1...) {
		if (class_desic.extend) { // 有基类
			class_desic.extend.call(this, param1...);
		}
		if (class_desic.init) {
			class_desic.init.call(this);
		}
	}
	if (class_desic.extend) {
		var a = function() {};
		a.prototype = class_desic.extend.prototype;
		new_class.prototype = new a();	
	}
	for(var i in class_desic) {
		if (i == "extend") {
			continue;
		}
		new_class.prototype[i] = class_desic[i];
	}
	return new_class;
}

var ChildClassName = Class({
	// 定义写死的关键字 extend 是继承自那个基类
	extend: ParentClassName, // 对象的名字
})

----------------------------------------
es6 可以使用class 来创建一个类
class Enemy {
    constructor(param1,...) {
        初始化
	}
}
继承的话用 extends
class Child extends Parent {
    constructor(param1,...){
        super(param...);
    }
}

*/




/*
 * ES6新特性总结
----------------------------------------
1.声明变量的关键字：const 和 let
const声明一个只读的常量。一旦声明，常量的值不能被改变。
const声明一个变量，就必须立即初始化，不能留到以后再赋值。
const value = 'aaa';
value = 'bbb'; //会报错

被let关键字声明的变量可以被改变。
let声明的变量只有所在的代码块有效。
不存在变量的提升：使用let声明的变量要在声明后使用，否则会报错。

//使用var定义的变量，存在变量的提升。
console.log(a);   //undefined
var a = 10; 

//使用let定义的变量，不存在变量的提升，所以下面的代码会报错
console.log(b);  // ReferenceError: b is not defined
let b = 20;

----------------------------------------
2.模板字符串
//普通字符串
`In JavaScript '\n' is a line feed`

//多行字符串
`In JavaScript this is
 not legal`
 
//字符串中嵌入变量
let name = 'Bob',time = 'today';
`Hello ${name},how are you ${time}`

----------------------------------------
3.箭头函数
ES6中允许使用“箭头”（=>）定义函数。
若箭头函数需要多个参数，则参数要用圆括号括起来。
var f = () => 5;
//等同于
var f = function(){return 5;}

var sum = (num1,num2) => num1+num2;
//等同于
var sum = function(num1,num2){
    return num1 + num2;
}
箭头函数中的this

1.箭头函数没有自己的this, 它的this是继承而来; 
默认指向在定义它时所处的对象(宿主对象),而不是执行时的对象, 
定义它的时候,可能环境是window; 箭头函数可以方便地让我们在 setTimeout ,setInterval中方便的使用this

2.箭头函数中，this指向的固定化，并不是因为箭头函数内部有绑定this的机制，
实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。

----------------------------------------
4.使用export和import实现模块化
//export.js
exports var firstName = 'Micheal';
exports var lastName = 'JackJson';
exports var year = 1958;

//import.js
import {firstName,lastName} from './export.js'
console.log(firstName+' '+lastName);   //Micheal JackJson

一个文件只能有一个exports default xxxx

----------------------------------------
Symbol 类型
Symbol 类型的对象永远不相等，即便创建的时候传入相同的值。
因此，可以用解决属性名冲突的问题（适用于多少编码），做为标记。

----------------------------------------
BigInt 类型
Javascript 中的任意精度整数，可以安全存储和操作大整数。
即始超出 Number 能够表示的安全整数范围。是 chrome 67中的新功能。


----------------------------------------
for ... of 也是es6的新特性

----------------------------------------
可以使用class来创建一个类
继承的话用 extends

*/
