

-- [===[  第001课lua环境搭建_数据类型_局部变量
----------------------------------------
lua
1: 高效的,轻量级的,嵌入式脚本语言;
2: Lua是一个语言标准;
3: 脚本语言有对应的解释器(虚拟机),解释器有两个分支:
    官方lua,   LuaJIT(高效,即时编译技术);
4: Lua的官方网站;     

----------------------------------------
创建win Lua开发环境
1:  下载LuaDist;
2: 加压后放到对应的目录下;
3: 将bin目录加入到电脑的环境Path;
4: lua解释器, luac 字节码编译器: lua代码--> lua字节码;
	luac效率高
	lua -o xxxx.luac xxxx.lua --将xxxx.lua 转换成 luac 字节码文件
----------------------------------------
第一个lua程序
1: 编写main.lua;
2: 编写代码print(“HelloWorld!!!”);
3: lua main.lua使用lua解释器解释执行lua代码;
4: luac 可以将lua文件编译成lua字节码;  
5: lua执行字节码;

----------------------------------------
lua基本数据类型
1: Lua基本的数据类型: 整数, 小数, 逻辑数;
2: Lua不分整数和小数;
3: true, false
4: 注释单行: --, 

----------------------------------------
local 局部变量
1: 定义一个局部变量: local 变量名称
2: 局部变量定义在哪里，那么它的作用范围就在哪里;
3: 系统会为局部变量分配一个内存,这个内存只能存基本数据类型或复杂数据类型的引用;
4: 变量在运行的时候存的是什么就是什么;
5: print(变量名称),打印一个变量
6: 如果变量没有赋值或一个空的值，我们可以用nil来表示;
7: 如果是一个不存在的变量或名字，也是nil;

----------------------------------------
表
1: 定义一个表 {key = value, key2 = value, [整数] = value, ....}
	local list = {
		aaa = 5,
		[4] = "hello",
		["4"] = "world" -- ["4"] 和 [4] 是两个不同的
	}
2: key可以是整数,字符串
3: value可以是任意类型;
4: 访问value的每个元素 表[key], 表.key
5: Lua没有数组, 只有表;

----------------------------------------
字符对象
1: 字符串对象: 一串文字;
2: 它也是一种复杂的数据对象;

----------------------------------------
函数对象
1: function name(参数1, 参数2...) 
    end
2: 变量可以保存函数对象;
3:return [返回值]: 返回语句,可以带返回值
4: 函数调用,跳入函数对象，一条一条语句，遇到return后回到函数开始调用的下一条语句;

]===]




-- [===[  第002课lua基本表达式与顺序_条件_循环
----------------------------------------
基本表达式
1: =, +, -, *, /, 赋值,加减剩除;
2: () 改变运算的优先级;
3: 字符串对象加法 ..; “Hello”..”world”
5: lua 没有 c/c++的缩写表达式 += -= *=, ++, --;
6: 逻辑运算：and 逻辑与, or 逻辑或
7: 条件判断 >, >=, <= <, ~= == 判断
----------------------------------------
顺序执行
1:  一条一条语句的执行下去;
2: lua文件一开始就可以执行语句;

----------------------------------------
条件语句
1: if then end: 如果条件成立,就执行if和end之间的代码块
2: if then else end 如果条件成立执行if,否则的话执行else
3: if then elseif then end  多个条件判断;

----------------------------------------
循环语句
1: for循环语句
	for exp1(开始), exp2(结束), exp3(步长) do
		
	end 
	步长可以省略，默认为1

	--包括了结束值
	for i = 1, 10 do -- 默认步长为1
		print(i)
	end 
	for i = 10, 1, -1 do 
		print(i)
	end
2: while循环语句
    while 条件 do 
    end 

----------------------------------------
]===]



-- [===[  第003课lua字符串与表的高级使用
----------------------------------------
Lua字符串对象
1:字符串加法: 
	(1)“str1” .. “str2”  
	(2)字符串与数相加;
2: 数字转字符串:  
        local a = 10; a = "" .. a;    tostring(number)
   字符串转数字: 
		tonumber("字符串")
		tonumber("9.6")
3: 字符串接口:
    string.len(): 字符串的字节长度
	string.rep(s, n) : 返回重复n次字符串s的串
		local str = string.rep("hello", 3) -- "hellohellohello"
    string.lower(s): 将大写全部都转成小写;
    string.upper(s): 将小写转为大写; 
	string.sub(s,i,j): 从第i个到第j个之间的字符串,和其他的不一样，索引从1开始不是从0开始;
		local str = string.sub("HelloWorld", 2, 5) -- ello
	string.format(); 和C语言printf一样，格式化输出数据;
		local date = string.format("%d-%d-%d", 2017, 10, 2) -- 2017-10-2
	string.find(): 子串查找函数;
		local index = string.find("HelloWorld", "World") -- 6
	string.gsub(): 字符串替换函数, string.gsub("hello", "l", "n", 1); 替换次数可选，如果没有指定，那么就全部替换;
		local str = string.gsub("helllllloworld", "ll", "ww", 2) -- hewwwwlloworld


----------------------------------------
格式化转义码
%c - 接受一个数字, 并将其转化为ASCII码表中对应的字符
%d, %i - 接受一个数字并将其转化为有符号的整数格式
%o - 接受一个数字并将其转化为八进制数格式
%u - 接受一个数字并将其转化为无符号整数格式
%x - 接受一个数字并将其转化为十六进制数格式, 使用小写字母
%X - 接受一个数字并将其转化为十六进制数格式, 使用大写字母
%e - 接受一个数字并将其转化为科学记数法格式, 使用小写字母e
%E - 接受一个数字并将其转化为科学记数法格式, 使用大写字母E
%f - 接受一个数字并将其转化为浮点数格式
%g(%G) - 接受一个数字并将其转化为%e(%E, 对应%G)及%f中较短的一种格式
%q - 接受一个字符串并将其转化为可安全被Lua编译器读入的格式
%s - 接受一个字符串并按照给定的参数格式化该字符串

----------------------------------------
表
1: Lua没有数组,但是表可以代替数组的功能(数组部分与非数组部分);
    Lua表的数组部分的索引是从1开始的, 1, 2, 3 ...称连续的索引;
    Lua表的连续索引的长度(数组部分);  #表的名字;
    Lua表支持key, value模式; 

4: 遍历lua表;
    for i=1, #(tbtest) do      -- 遍历lua里面的数组部分的数据
    end 
    for key, value in ipairs(tbtest) do      -- 遍历lua表里面的数组部分;
    end 									 -- 一定是连续的整数索引，否者就不算数组部分
    for key, value in pairs(tbtest) do      -- Hash排序  --遍历表里面所有的数据
    end 

----------------------------------------
表的接口
1: table.insert(table, pos, value): 
	在table的数组部分指定位置(pos)插入值为value的一个元素, pos参数可选, 默认为数组部分末尾
2: table.remove(table, pos)
    函数删除并返回table数组部分位于pos位置的元素. 其后的元素会被前移. pos参数可选, 默认为table长度, 即从最后一个元素删起
3: table.sort(table, 比较函数): 对table进行排序

	local array_data = {3, 2, 5, 7, 9, 6}
	table.sort(array_data)
	--使用自己的比较函数来进行排序
	local function comp1(lhs, rhs)
		if lhs < rhs then
			return false
		else
			return true
		end
	end
	table.sort(array_data, comp1)

	lua table.sort()必须要保证稳定排序,所以在comp1中随机打乱是不允许的

4: table.getn(table)返回表中元素的个数; -->数组部分

----------------------------------------
]===]




-- [===[  第004课lua_require_模块
----------------------------------------
lua多返回值与unpack
1: 一个lua函数可以返回多个返回值:
2: 定义多个变量来接受多返回值
	--多返回值
	function  mul_return_func()
		return 3, "Hello World!!!" --多返回值
	end
	local first, secode = mul_return_func()

3: lua的unpack函数，解开表里的单个的值;
	local array_data = {1, 2, 3, 4, 5, 6}
	local _, _, _, lhs, rhs = unpack(array_data) 
	print(lhs, rhs) -- 4, 5
----------------------------------------
require 导入代码
1: 第一个代码是有lua虚拟机第一个解释执行的lua文件;
2: 第一个lua文件可以去包含和导入其他的lua文件;
    使用require关键字来导入其他lua
3: require的时候就会装载lua文件，并执行lua代码;
    require “./test” // 不用文件的后缀名;
    require “文件夹/lua文件名”;
    require “文件夹.lua文件名”;
4: lua 代码中的 return  语句:
    require “lua代码” 执行的时候如果有return 语句,那么require就返回return的对象;
5: lua导出函数:
	将lua代码要到处的函数，做成一个表，把这个表返回出去;

	如果在文件中用 local 修饰的函数或者变量，如果没有 return 导出的话，其他文件 require 导出是不能直接调用

6: 如果在其他的地方使用又要装载一次;
7: 如果require过了的lua代码，直接返回返回值,不再装载代码并执行;

----------------------------------------
module与package
1: 默认情况下lua代码编写的函数是不能被外部识别的;
2: 包: module(包名, package.seeall)
3: 外部 require 包名
    require “包名”
4: 全局require模块后，其他的lua文件无需再去require了,方便使用;

----------------------------------------
]===]


-- [===[  第005课lua_self_点_冒号_面向对象_继承
----------------------------------------
点 冒号 self
1: 代码如下:
    a = {};
    function a.test() 
    end

2: 冒号解决这个问题
    a = {}
    function a:test() :多了self这个机制
    end
    a:test() 把a这个实例作为self传递给test函数,在test函数里面访问self就能获得这个a;

3:显示传递self
	b:test(3, 4) -- test函数里面self就是b
	b.test(b, 3, 4) -- test函数显示的传递self

	self机制要正常运行，需要有两个点:
	(1)定义的函数必须使用:才会有隐式的传递self机制
	(2)调用的时候也要使用:
----------------------------------------
元表
1: 每一个表，可以为这个表设置一个元表: metatable
2: 设置这个表的元表:setmetatable(table,metatable)
	获取这个表的元表:getmetatable(table) 
3: 元表__index键
	metatable中的常用键;
	如果在表里面找不到的key,lua解释器在元表里面的__index表里进行查找;

	--元表与__index
	local a = {
		--name = "huangdong",
	}

	local meta_a = {
		__index = {
			name = "blake",
			age = 34,
			sex = 0,
		},
	} 
    setmetatable(a, meta_a)
	print(a.name)
----------------------------------------
面向对象
1: 类的表 --> 类的实例的元表:
   function ClassA:
2: 类的实例
function ClassA:new(instant) 
	if not instant then 
		instant = {} --类的实例
	end

	setmetatable(instant, {__index = self}) 
	return instant
end

面向对象的基本步骤:
	(1)定义一个类的表;
	(2)定义一个实例的表;
	(3)为这个实例的表加一个元表，并且元表__index指向了这个类的表;
	(4)利用self基础 表的实例:表的函数的时候，
	隐士的帮我们传递了实例的表为self到函数里面;

3: 类的实例调用类的方法:
    self: 绑定的实例对象;

----------------------------------------
继承
1: 子类的表是父类的一个实例
2: 子类的表作为一个原型再new了一个表;
	类的实实例-->元表-->子类的表-->元表-->父类的表;
3: 现在子类的实例找，找不到到元表找，元表找不到,到元表的元表找;
4: 子类重载父类的函数;
5: 子类调用父类的函数;
	parent.func(self) 显式的把子类的self传进去

----------------------------------------
]===]


-- [===[  math类库
----------------------------------------
math.abs(-15)					取绝对值
math.acos(0.5)					反余弦函数
math.asin(0.5)					反正弦函数
math.atan2(90.0, 45.0)			x / y的反正切值
math.atan(0.5)					反正切函数
math.ceil(5.8)					不小于x的最大整数
math.cosh(0.5)					双曲线余弦函数
math.cos(0.5)					余弦函数
math.deg(math.pi)				弧度转角度
math.exp(2)						计算以e为底x次方值
math.floor(5.6)					不大于x的最大整数
math.fmod(14, 5)				取模运算
math.frexp(10.0)				把双精度数val分解为数字部分（尾数）和以2为底的指数n，即val=x*2n
math.ldexp(10.0, 3)				计算value * 2的n次方
math.log10(100)					计算以10为基数的对数
math.log(2.71)					计算一个数字的自然对数
math.max(2.71, 100, -98, 23)	取得参数中最大值
math.min(2.71, 100, -98, 23)	取得参数中最小值
math.modf(15.98)				把数分为整数和小数
math.pow(2, 5)					得到x的y次方
math.rad(180)					角度转弧度
math.random(1, 100)				获取随机数 	
math.random(100)				在使用math.random函数之前必须使用此函数设置随机数种子
math.randomseed(os.time())		设置随机数种子
math.sinh(0.5)					双曲线正弦函数
math.sin(math.rad(30))			正弦函数
math.sqrt(16)					开平方函数
math.tanh(0.5)					双曲线正切函数
math.tan(0.5)					正切函数
----------------------------------------

]===]





-- [===[  quick-cocos2d-x-lua框架原理分析(二十八)
----------------------------------------
lua 点、冒号与self
基于一个表 可以饿存储lua函数, 第一种是冒号, 第二中是 点;
local object = {}
function object:test()
end
冒号, 省略了调用实例的参数, 在函数里面使用self替代这个实例
object:test(self) -- 省略了self参数
点号不省略表的实例
function object.test_func(self_object)
end

通过 表来模拟对象的成员函数
建立一个class 的表，然后定义函数方法;
然后定义一个class函数，新建一个表，然后将类表的函数拷贝到新的表里面, 这样就让所谓的对象实例也有了lua的方法;

过程如下:
step1:  新建一个cls 的实例, 这实例里面定义了用户的各种函数, 以及class函数为它定义的new函数;
step2: class.new  new 一个新的对象, 将这个class对象里面的函数方法都赋值给新的对象, 这样，让新的对象也具备在class对象里面定义的函数,
从而实现了

----------------------------------------
quick-cocos2d-x 代码目录结构
1: frameworks 里面是cocos2d-x里面的C/C++游戏引擎的源码;
    step1: 编译标准的cocos2d-x源码
    step2: 添加脚本启动的部分，让脚本引擎先加载main.lua进行启动;
    class 文件夹下的AppDelegate.cpp 等，初始化lua相关
2: res: 存放资源的目录;
3: src: 存放lua代码的地方，这两个文件夹都会以资源的形式打包到安装包里面,
4: runtime: 存放一些动态库
5: src代码里面分为:
app, cocos, framework(lua使用得到的代码框架，例如class), cocos是对cocos的lua封装

----------------------------------------
quick-cocos2d-x 脚本启动
frameworks\runtime-src\Classes 目录下的
	Director::getInstance()->setAnimationInterval(1.0 / 60.0f);
	// register lua module
	auto engine = LuaEngine::getInstance();
	ScriptEngineManager::getInstance()->setScriptEngine(engine);
	lua_State* L = engine->getLuaStack()->getLuaState();
	lua_module_register(L);
	register_all_packages();
	LuaStack* stack = engine->getLuaStack();
	stack->setXXTEAKeyAndSign("2dxLua", strlen("2dxLua"), "XXTEA", strlen("XXTEA"));
	if (engine->executeScriptFile("src/main.lua"))
	{
		return false;
	}

----------------------------------------
quick-cocos2d-x 脚本启动
step1: main.lua
1: 添加package.path = package.path .. ";src/" 将src加入搜索目录
2: 调用require("app.MyApp").new(), 通过类的表，来够着新的对象;
3: 继承了cc.mvc.AppBase类, ctor的时候加上packageRoot, 用户指定或app;
4: enterScene 调用得到 MainScene.lua然后进入;
	
]===]



-- [===[  2015-9-7-cocos-androd-java基础(二十九)
----------------------------------------
一:将我们的cocos2d-x的android工程拉入eclips,分为三个步骤
Step1: 将我们的游戏代码下面的proj.android加入到eclips, 在Package Expoler里面 鼠标右键，选择我们的Import, GameBilliard\proj.android下面，这个是游戏的android工程;
Step2: 将我们游戏的引擎的java工程导入到我们的eclips, cocos2d\cocos\platform\android\java,目录下，导入我们的libcocos2dx 的java工程；
Step3: project-->clean, project-->buildall;

----------------------------------------
二:AndroidManifest.xml的结构:
Android 安装管理器，是怎么知道这个引用的名称，是怎么知道这个引用的图标，是怎么知道这个应用要使用的权限，是怎么知道这个应用该启动哪个Activity? 那么一个android的应用，将这些信息编写在一个AnroidMainfest.xml的地方，然后系统通过读写这个APK的AndroidMainfest.xml里面的数据来显示相关，比如，桌面上的应用图标，每一个APK的安装包，那么都有一个AndroidMainfest.xml的文件；
1: <?xml version="1.0" encoding="utf-8"?> xml的文档，指定编码为utf-8
2:package="com.game.Billiard" 应用的包名,android通过应用的包名来区分它们是不是同一个引用, 如果包名相同，表示同一个应用；
3:版本信息，通过版本信息的读取，知道哪个是哪个版本,渠道的整包的版本更新,就是通过这个版本号来的:
	android:versionCode="1"
	android:versionName="1.0"
例如有一个包已经发布到360渠道，那么你再发一个包给360渠道要更新当前包的时候，那么360渠道的app Store, 读取这个版本号，如果发现，当前用户装的手机的应用的版本号小于服务器上 CP提供的版本号，那么360手机管家等就会提示这个应用有更新，所以，就是通过这个方法，然后渠道提示更新的；
如果你不修改版本号，更新给360，那么以前的老用户是收不到360的更新安装提示的；
4: <uses-sdk android:minSdkVersion="9"/> 支持的最小的SDK的版本号
5:  <uses-feature android:glEsVersion="0x00020000" /> 支持的openglES的版本号至少在2.0以上;
6:应用的描述信息, icon图标, 应用的名字
<application android:label="@string/app_name"  // 应用的名字
                 android:icon="@drawable/icon"> // icon的图标
为什么我们要使用string id来描述，是不同的语言环境下，使用不同的字符传

Id = 1, 语言环境为 1中文, 0为英文

Char* str_set[3][10] = {
{“Message”, “短信”, ...}
{“setting”, “设置”, ....},
{“Phone”, “电话”, ....},
...
}
Str_set[1(ID)][1(中文)] = “设置”
这个也是软件支持多国语言的根本做法；
为什么我们在icon和资源也要是使用ID，其实我们也是为了适配多种屏幕的密度，为了让各种屏幕的密度看起来能达到最佳的效果，而不是用单纯的缩放，所以我们android系统提供了，drawable下不同的dpi的资源文件，首先会去找最匹配的dpi下的资源文件，如果找到，就直接使用，如果没有找到，就找默认的dpi下的文件,drawable, drawable-hpdi,然后缩放到当前dpi下；
7:<meta-data android:name="android.app.lib_name"
	              android:value="cocos2dcpp" /> 是用户自定义的字符传,key-value,
而这个meta-data,表示的是我们要加载的native的库是libcocos2dcpp.so,因为游戏引擎会访问 android.app.lib_name key的字符串
ApplicationInfo ai = getPackageManager().getApplicationInfo(getPackageName(), PackageManager.GET_META_DATA);
            Bundle bundle = ai.metaData;
            String libName = bundle.getString("android.app.lib_name");
            System.loadLibrary(libName);

8：支持屏幕的密度:
<supports-screens android:anyDensity="true"
                      android:smallScreens="true"
                      android:normalScreens="true"
                      android:largeScreens="true"
                      android:xlargeScreens="true"/>
9: 使用的权限:
<uses-permission android:name="android.permission.INTERNET"/> // 使用网络权限;

10: Activtiy(android的窗口)的属性定义:
   a: 是哪个activity, 就是代码的类的名字;
android:name="org.cocos2dx.cpp.AppActivity" // org.cocos2dx.cpp包下面的类AppActivity.java代码里面的公共类AppActivity
android:label="@string/app_name" 窗口名字
android:screenOrientation="landscape" 屏幕方向, 横屏游戏，或竖屏游戏;
android:theme="@android:style/Theme.NoTitleBar.Fullscreen" // 窗口标题栏,状态栏, FullScreen表示全部隐藏，这个就是我们的游戏为什么看不到信号栏的原因

11:android里面一个应用启动另外一个应用的Activity都是通过发送intent,来通讯,
<action android:name="android.intent.action.MAIN" /> // 类是于main函数，那么在这里指示这个Activity为MAIN Activity,当然也就是最先启动的Activity;

12: <category android:name="android.intent.category.LAUNCHER" />, 是否在桌面上显示，如果加上这个，那么这个应用将会被显示在桌面上，如果不加，那么桌面上没有快捷方式

----------------------------------------
Android资源目录结构:
Res目录的资源，解决3个问题
1: 图片的问题 drawable drawable-xxxxx,适配不同屏幕的密度,它用统一的方式来做适配,提供了应用开发的适配解决方案；
2: 字符串的问题 values,适配不同的多国语言；
3: 界面布局xml layout, 界面布局xml文件;
在Res目录下android只允许管理这三种资源，其它的资源，例如游戏文件，例如APP的配置文件，那么就不允许放在res目录下;
Asset目录: 提供给应用开发人员，一个放自己文件的地方，而不需要通过 android标准的管理方案来管理,例如游戏的 图片，声音，脚本，配置文件,注意是只读的, res目录也是一样的，
系统为了压缩安装包的体积，会将res,目录以及assert目录以zip包的形式存放在安装好的应用包中,所以不能使用一般的fread, fwrite去读写，只能使用android系统提供好的API函数来读取里面的文件内容，那么在cocos2d-x里面，我们已经通过FileUtils解决了这个问题，所以在游戏里面，我们一定要使用FileUtils来解决我们的文件读写的问题，而做到跨平台，而不能直接使用标准的文件读写函数；

----------------------------------------
android 存放资源的方式:
1: APK的安装包携带资源;
   图片，字符串，等其它的资源，可以通过安装包的Res目录，以及Asset目录安装到系统中，供我们的游戏读取(只读),
   a;优点，一旦安装，就不会被改变;
   b:缺点,不可写,会增加安装包的体积,不能使用标准的文件读取的方式来读取,通过zip的方式，影响性能；
  这个就是为什么我们下一个游戏，第一次玩的时候，需要下载资源,为了包体的大小；
2: 在android里面，每个应用都有一个特定的目录来可读写，那么这个目录，可以通过android系统API函数调用得到,也就是我们FileUtils里面的getWritable目录;
   A: 优点: 支持标准的读写，可读可写，只有这个应用能够访问，安全(被root)；
   B: 缺点: 当我们用户选择清楚APP数据的时候，这里面的数据就被清楚了;

3: 在我们的扩展存储控件里面，需要我们在AndroidManifest.xml里申明有读写扩展存储空间的权限，如果没有申明，系统会报错，说你没有权限读写扩展空间 
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
优点: 支持标准的读写,可读可写, 清楚用户数据以后，不会被清除;
缺点: 所有人都能访问；

----------------------------------------
1: android Activity,相当于Windows的窗口,标准的过程,
创建的时候: void onCreate(final Bundle savedInstanceState)
销毁的时候: void onDestroy(); 

切换为当前(focus)窗口: void onResume();
窗口由迪当前(focos)切为非当前窗口: void onPause()

2: (普通的APP) 创建，休眠, 唤醒，销毁都是在一个叫做UI线程上完成,创建界面，创建按钮，都是在这个线程上完成的。
如果我们在其它线程里面来做UI操作，那么系统会非法,你在自己的一个Thread里面如果你去做UI线程上的标准的GUI的编程接口，那么这个时候，你就会非法；
3:android 窗口(Activity)的opengl编程环境，它是独立于UI线程，直接开辟另外一个线程，来做opengl的绘制操作以及关联opengl的绘制上下文；而我们的游戏引擎，正是使用的是opengl的绘制，所以，我们的游戏引擎是运行在GL的线程上，而不是我们的UI线程上，所以，在我们游戏里面如果要调用标准的android的GUI的编程接口，例如，启动一个对话框，例如，启动一个SDK的界面，那么就不能直接在这个线程启动，而是要切换到UI线程启动,通过什么样的方式，发送事件的方式:
1: 可以使用系统提供 runOnUiThread()（activity标准函数）;
2:可以使用handler;

----------------------------------------
Java包, java以包的方式来管理代码，包对应的就是代码所在的文件夹，包里面可以是子包; 它与文件夹的区别是使用.来代替斜杠 
1: 包,org.cocos2dx.cpp, org.cocos2dx org 
2: java代码就是以包的形式提供给大家，
编写java代码的第一行, 指明当前的代码是哪个包?
package org.cocos2dx; // 指明是哪个包;而且包不能乱命名，必须和文件夹路径一致；

3:java里面的类，包括四种,公有类，私有类，默认类，保护类
public, private, 不写, protected 
怎么样来定义java的类
权限类型 class 类名 {
}
Public: 全部可见,所有的代码都能够使用的到这个类的代码;
Protected: 只有子类可见，也就是说只有这个类的子类能够访问
private 权限，只有本类可见;
Default 权限 就是同一个包内可见;
import org.cocos2dx.lib.Cocos2dxActivity; 导入一个类来使用,例如Cocos2dxActivity这个类在包org.codcos2dx.lib 里面，import 包名.类名;
如果我们想使用这个包里面的所有的类
import 包名.*
每一个java文件，只能有一个公有类,并且名称必须要和.java的文件名称一样,这个就是java公有类的管理模式，非常好的习惯。

----------------------------------------
java 定义 变量,函数
1: 定义成员变量:
   权限 变量类型 变量名称;
2: 定义成员函数:
   权限 返回值 成员函数名称(参数， ,,,);
   实例.函数方法
3: 定义静态函数:
   权限 static 返回值 函数名称(参数, ...);
   类名.方法调用

4: 定义静态成员变量;
   权限 static 变量类型 名称；
5: final
   权限 final 类型 名称;  表示常量变量不会改变；
   权限 final 返回值 名称(参数 1, ..); 表示不会改变任何变量的值;
6: 对象空为null, 对象传递的都是引用；
   String str1 = new String("helloworld");
   String str2 =  str2, 它们都是同一个对象；
7: new 数组
   private int[] mem;   mem = new int[100];

----------------------------------------
java继承
1: java 使用 extends 关键字来继承, 没有多继承，访问权限都由方法属性指定;
2: 子类要调用父类的同名方法,使用super.方法名称;
3: 如果是当前的实例,可是使用this, 通过this也能访问父类的方法，但是，如果是子类重载了父类的方法，this访问的是子类的方法;
4: super 主要是处理重载后的方法以及相同的变量名称，决定使用哪个;

继承:
   访问,基类特有的，没有做任何修改和添加；
   This.xxxx 访问自己的方法，如果没有，那么就查父类是否有这个方法，依次类推;
   Super.xxxx就是访问的父类的方法，如果父类没有，继续访问父类的父类，只到全部找完为止；
   
----------------------------------------
java handler 事件处理
1: handler 是一个java 线程的事件处理，将一个hander加入到当前的这个线程: 
	my_handler = new Handler() {
		@Override
		public void handleMessage(final Message msg) {
			switch (msg.what) {
				case HANDLER_OPEN_IME_KEYBOARD:
				break;
				case HANDLER_CLOSE_IME_KEYBOARD:
					break;
			}
		}
	};  
如果有人(可以是同线程，也可以是不同线程) 向当前线程调用 sendMessage，那么在当前的这个线程就会处理这个事件,
	Message msg = new Message();  
	msg.what = -1; 
	msg.setBound(); // 设置可以跨线程访问的bound对象；  
	my_handler.sendMessage(msg);  

	
----------------------------------------
Handler JAVA线程的事件处理，那么谁new,谁就在当前new的时候的线程里面加了这个handler,当有人发送事件的时候，那么这个handler就会在new 的线程里面被处理；
Android的打印函数:
Log.i("TAG", "function_name2" + value);
Log.e("TAG", "function_name2" + value);
Log.w("TAG", "function_name2" + value);
Log.d("TAG", "function_name2" + value);

]===]


-- [===[  三十讲 cocos2d-x-lua绑定
----------------------------------------
lua 绑定.ini文件
1: 配置脚本环境, 去到tools/tolua,打开README.mdown,因为这个脚本必须是在 python 32位情况下，因为有一个库不支持64 bit

2: 新建一个.ini文件, 
    1:标题
    2:prefix 关系到lua函数开头的名字，如prefix=cocos2dx，那么生成的代码就是以lua_cocos2dx开头
    3:target_namespace所属于的模块
    4:macro_judgement  = #if CC_USE_PHYSICS, 判断是否有宏
    5:headers 配置bind需要的头文件, cocos_headers bind所依赖的cocos2d-x的头文件,
    6:classes 要bind的类;
    7:skip不需要暴露给lua的接口选择跳过;

----------------------------------------
bind步骤
1: 将要拷贝的头文件放在一个指定的目录 cocos\my\GameTouchNode.h
2: copy genbindings.py为 genbindings_app.py, 节省bind的时间，去掉不必要的，添加好自己的，例如 
cmd_args = {'cocos2dx_framework.ini' : ('cocos2dx_framework', 'lua_cocos2dx_framework_auto'), \
}

3:使用命令行 python genbindings_app.py，在cocos\scripting\lua-bindings\auto 生成
lua_cocos2dx_framework_auto.hpp
lua_cocos2dx_framework_auto.cpp

----------------------------------------
编译运行
1: 将xxxx_auto.hpp, xxxx_auto.cpp 添加到项目，将代码加入到项目进行编译;
2: 调用注册函数, 注册导出来的接口 
    auto engine = LuaEngine::getInstance();
    ScriptEngineManager::getInstance()->setScriptEngine(engine);
    lua_State* L = engine->getLuaStack()->getLuaState();
    lua_module_register(L);

    register_all_packages();
    register_all_cocos2dx_framework(L);
3: 在脚本中使用;
    模块的名字 target_name = fw

----------------------------------------
cocos2d-x-lua绑定(三十)
一: lua 绑定的基本流程
1: lua bind 输出目录，cocos\scripting
2: lua bind 的工作目录 tools\tolua,通过执行genbindings.py,来绑定我们ini需要我们导出的lua接口函数,导出成xxxx_auto.cpp, xxxxx_auto.hpp,在输出目录下；
整体流程: 使用C++编写好代码以后，我们编写.ini文件，将ini加入到genbinding.py脚本里面，然后根据ini的指示，导出lua接口函数给lua使用，那么这些导出函数的定义都定义和实现在cocos\spripting\auto下面，这里是机器自动生成的；

二：怎么编写.ini文件
   Step1: 配置我们的编译环境，python 32bit 环境;
64bit python是不能执行 genbinding.py 脚本的,因为脚本依赖一个库，而这个库它是没有64bit的；
如果安装成功，打开cmd,去到tools/tolua的目录下，然后就执行python genbinding.py,最好不要双击这个.py,因为错误信息看不到； 

所有的一起来bind，每次是不是要等很长时间，那么其实我们可以另外写一个脚本，将这个genbinding.py 复制成另外一个，然后修改cmd_args然后让它只执行当前的自己新加的；
   

.ini的文件格式:
  0:#表示注释
  1:titile, 保持和我们ini的文件保持一致；
  2:函数前缀,为了防止函数重名；prefix = cocos2dx_framework,
  我们生成的可以给lua直接调用的函数的名称lua_cocos2dx_framework_开头
  3:target_namespace 模板的名称
  4:macro_judgement   #if CC_USE_PHYSICS,宏定义,在生成的文件里面加上这个宏的控制与C++的代码保持一致；
  5:cocos_headers 这个是我们的cocos2d-x的头文件的路径,因为在运行我们lua binding的脚本的时候，都是通过读头文件来做到的绑定，所以，我们在做脚本读都文件的时候，
  6:extra_arguments这个变量是我们在做脚本绑定的时候找头文件的路径；如果我们发现我们有些头文件找不到，那么就要加这这个头文件所在的路径到我们的extra_arguments这里来；
  7:headers 因为我们的bind脚本是根据我们的C++的头文件解析生成出来的，*_auto.hpp, *_auto.cpp文件，我们就要指示我们需要导出的头文件的路径，我们一般会将这个路径放在cocos/my_xxx(name)/ 下面，只要头文件就可以了；
  8:我们要导出的类: classes = GameTouchNode.*,导出这个类里面所有的数据;
  9:skip, 因为不是所有的接口我们都想导出来成lua的，我们可以通过制定我们的skip来跳过那些函数接口；




----------------------------------------
http://cnblogs.com/sevenyuan/p/4511808.html
Lua和C++交互详细总结

https://www.cnblogs.com/Pickcle/p/5049467.html
cocos2d-x lua绑定解析
----------------------------------------

]===]