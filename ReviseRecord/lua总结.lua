
菜鸟学院的lua教程网站
https://www.runoob.com/lua/lua-data-types.html

----------------------------------------
8个基础类型
nil number string boolen thread table function userdata

nil	        这个最简单，只有值nil属于该类，表示一个无效值（在条件表达式中相当于false）。
boolean	    包含两个值：false和true。
number	    表示双精度类型的实浮点数
string	    字符串由一对双引号或单引号来表示
function	由 C 或 Lua 编写的函数
userdata	表示任意存储在变量中的C数据结构
thread	    表示执行的独立线路，用于执行协同程序
table	    Lua 中的表（table）其实是一个"关联数组"（associative arrays），
            数组的索引可以是数字、字符串或表类型。在 Lua 里，
            table 的创建是通过"构造表达式"来完成，最简单构造表达式是{}，用来创建一个空表。
----------------------------------------
type() 使用type 判断变量的类型
xxx = nil 代表删除一个变量
boolean 类型只有两个可选值：true（真） 和 false（假），Lua 把 false 和 nil 看作是 false，其他的都为 true，数字 0 也是 true:
用#计算字符串长度

----------------------------------------
if xxx or xxx and xxx then
else
end

function factorial1(n)
    return n
end

function(key,val)--匿名函数
    return key.."="..val;
end
匿名函数可以用来作为参数传递
----------------------------------------
for k, v in pairs(a) do
    print(k .. " : " .. v)
end

pairs() 和 ipairs()区别
----------------------------------------
不同于其他语言的数组把 0 作为数组的初始索引，在 Lua 里表的默认初始索引一般以 1 开始。
----------------------------------------
thread（线程）
在 Lua 里，最主要的线程是协同程序（coroutine）。它跟线程（thread）差不多，
拥有自己独立的栈、局部变量和指令指针，可以跟其他协同程序共享全局变量和其他大部分东西。

线程跟协程的区别：线程可以同时多个运行，而协程任意时刻只能运行一个，
并且处于运行状态的协程只有被挂起（suspend）时才会暂停。
----------------------------------------
userdata（自定义类型）
userdata 是一种用户自定义数据，用于表示一种由应用程序或 C/C++ 语言库所创建的类型，
可以将任意 C/C++ 的任意数据类型的数据（通常是 struct 和 指针）存储到 Lua 变量中调用。
----------------------------------------

----------------------------------------

----------------------------------------
