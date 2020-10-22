
//-------------------------------------------------------

c++11新特性
1. nullptr
2. auto
3. 区间迭代 类似js的for循环
	for(auto &i : arr) {    
		std::cout << i << std::endl;
	}
4. Lambda 表达式 类似匿名函数
	[ caputrue ] ( params ) opt -> ret { body; };

5.std::function对象作为回调函数


c++14新特性
返回值类型推导  返回值类型用auto

Lambda泛型，参数使用auto 返回值使用auto,没使用templete也实现了泛型

二进制赋值  0b0010100101

inline 变量

//-------------------------------------------------------
02从c到c++

bool类型 true false
bool aaa = false;
true 是1 false是0
bool bbb = 5;
bbb会被类型截取为真

------------------------
const常量
必须初始化，不能被改变

const int aaa = 100;
const int *p = &aaa; //这里 p是变量， *p 也就是指向的是常量
int * const p = &aaa; //这里 p是常量， *p是指向int类型的变量

const 和 define 的区别
1.const 是类型 有安全检查 define纯替换，不安全
2.const 编译时分配内存
3.const 作用域是根据变量来的，define 是从定义到程序

------------------------
结构体内存对齐
编译器有个默认对齐数 vs是8 g++是4 可以改
#pragma pack(num) 改变对齐数

//-------------------------------------------------------
03从c到c++

域作用符::
1.访问全局变量
2.访问类成员

#include <iostream>
int a = 100;
int main(){
	int a = 200;
	cout << a << endl; //输出200
	cout << ::a << endl;//输出100
	return 0;
}
------------------------
new delete 运算符
malloc free

int *p = new int[10]
delete[] p

new对象
1.分配内存
2.调用构造 malloc只分配内存

delete 
1.调用析构
2.释放内存

new 三种用法
new operator 分配内存+构造
operator new 只分配内存
placement new 不分配内存,调用了拷贝构造函数

------------------------
函数重载
相同作用域 函数名一样 参数个数 参数类型 参数顺序 只要有一个不一样就重载了
和返回值没有关系

extern "C" 按照c方式编译 ，为了c与c++混编
c语言没有名字混编，所以不支持函数重载


------------------------
函数默认形参
int fun(int a, int b = 5){

}
声明的时候指定了默认值，定义不能指定
没有声明时，定义可以指定
遵守从右到左

可能会产生二义性

//-------------------------------------------------------
04从c到c++

引用，起别名
本身不占有内存
引用一定要初始化
引用初始化后不能重新引用别的变量

int a = 1;
int &b = a;
b就是a的引用

const 引用
对const常量的引用只能用const 引用
const int aaa = 100;
const int &bbb = aaa;

------------------------
引用作为参数传递, 改变形参可以影响实参
引用传递比指针传递更自然

void swap(int &x, int &y){
	int temp = x;
	x = y;
	y = temp;
}
------------------------
引用作为返回值
这样函数放在赋值运算的左边
但是不能用局部变量作为引用返回

------------------------
引用和指针的区别

引用直接访问，指针间接访问
引用是别名，不占用空间，指针占用
引用的改变是改变变量，指针的改变是改变指针
引用初始化后不允许重新引用，指针可以


//-------------------------------------------------------
05从c到c++

内联函数 inline
为了效率，频繁堆栈，保护现场，传递参数
inline int max(int a, int b){
	return a > b ? a : b;
}//编译时展开

#define max (a) > (b) ? (a) : (b); //预处理替换

------------------------
新式类型转换
const_cast<T>(expr)
一般用于指针或者引用，移除对象的常量性,通常是为了函数能够接受这个实际参数

void Fun(int & param){

}
const int val = 100;
Fun(val);//错误
int & bbb = const_cast<int&>(val);
Fun(bbb);//正确
------------------------


static_cast<T>(expr)
编译器隐式转换可以用static_cast替换
类型下降可以用static_cast
double aaa = 3.333;
int bbb = static_cast<int>(aaa);//此时bbb是3 而且没有警告
可以将void* 空指针类型转换别的类型指针
可以将基类指针指向派生类指针
无法取出常量性，const 类型不能转换为 非const
------------------------
reinterpret_cast<T>(expr)
将数据按二进制形式转换
int i;
char *p = "hello world";
i = reinterpret_cast<int>(p);//i是p的二进制形式
------------------------
dynamic_cast<T>(expr)
将一个基类对象指针（或引用）cast到继承类指针，dynamic_cast会根据基类指针是否真正指向继承类指针来做相应处理， 即会作出一定的判断。
若对指针进行dynamic_cast，失败返回null，成功返回正常cast后的对象指针；
若对引用进行dynamic_cast，失败抛出一个异常，成功返回正常cast后的对象引用。



//-------------------------------------------------------
06面向对象介绍（一）

结构化编程的缺陷问题
面向对象的好处



//-------------------------------------------------------
07面向对象介绍（二）
面向对象的三个特点 封装 继承 多态

//-------------------------------------------------------
08类和对象（一）

类的声明
class collect
{
public:
	collect();
	~collect();
private:
protected:
};

//-------------------------------------------------------
09类和对象（二）

内联 inline
两种方式
直接在类体中实现
另一个种是实现前面加 inline

------------------------
class 和 struct 区别
struct默认公有，class默认私有
------------------------
其实成员函数的第一个隐含参数是 &this
表现上是 obj.init(param1, param2);
obj.init(&obj, param1, param2);

//-------------------------------------------------------
10类和对象（三）

块作用域
{}以内的

文件作用域
直接在文件上定义的变量
int a = 5;
用的时候前边加 cout << ::a << endl;

函数原型作用域
函数声明的地方的()就算
void Fun(int a, int b) a,b就不能起同样的名字

函数作用域


类作用域

前向声明
前向声明的类不能实例化

嵌套类
定义在类内的类

局部类
定义在函数体内的类
局部类不能有静态成员

//-------------------------------------------------------
11构造函数与析构函数（一）

构造函数
与类同名，不能有返回值
可以有多个构造函数，重载
不带参数的是默认构造函数

析构函数
析构函数不能被重载 只能有一个 没有返回值 没有参数
不显式定义，会有默认析构函数

全局对象的构造先于main函数
全局对象的析构也在main函数结束之后执行

//-------------------------------------------------------
12构造函数与析构函数（二）

转换构造函数

class Test
{
public:
	Test() {};
	Test(int a) {
		this->m_a = a;
		cout << "m_a:" << m_a << endl;

	}

	~Test() {
		cout << "~Test" << endl;
	};
	int m_a;
};
int main() {
	Test a(10);//这里执行的是普通的构造函数
	a = 20; //这里会先把20转换为一个临时对象，调用构造函数
			//然后用临时对象去给a赋值，然后把临时对象释放掉
	cout << "main over" << endl;
	return 0;
}


------------------------
赋值与初始化的区别

Test& Test::operator=(const Test& other){
	if(&other == this){
		return;
	}
	this->m_a = other.m_a;
	return *this;
}

不声明的话有默认的

------------------------
explicit
只能用于构造函数使用
如果要阻止编译器的隐式转换
在构造前加explicit;

//-------------------------------------------------------
13构造函数与析构函数（三）

构造函数初始化列表

class Test
{
public:
	Test(int a,int b):m_a(a), m_b(b){

	}
	~Test();
	int m_a;
	int m_b;
};

先调用类的成员的构造，然后才调用自身的构造
顺序是在内存中的顺序决定，和初始化列表中的顺序没有关系

------------------------

const 成员变量
必须在构造函数初始化列表中初始化

引用的成员变量
必须在构造函数初始化列表中初始化

------------------------

类内的枚举常量适用于所有的对象

class Test
{
public:
	enum Type
	{
		TYPE_A = 5;
		TYPE_B = 10;
	};
	Test();
	~Test();
	
};
int main () {
	Test::TYPE_A;
	Test aaa;
	aaa.TYPE_A;
}


//-------------------------------------------------------
14构造函数与析构函数（四）

拷贝构造函数
用一个对象去初始化另一个对象

如果自己没写，会有默认拷贝构造函数

class Test
{
public:
	Test();
	~Test();
	Test(const Test & other){
		//todo 初始化赋值，推荐放到初始化列表中
	}
};

Test t(10);
Test t2(t);//这时调用拷贝构造函数
Test t2 = t;//调用拷贝构造函数


当函数传入的实参是对象，形参会调用拷贝构造函数，生成临时对象
void Fun(const Test t){

}


当函数返回值是对象时，会在返回的时候生成临时对象，
在函数调用处如果没有接管这个临时对象，则对象调用析构释放
Test Fun(const Test& t){
	return t;
}

//-------------------------------------------------------
15构造函数与析构函数（五）

深拷贝 浅拷贝

禁止拷贝
把拷贝构造和等号重载私有，并且不实现

空类默认成员
Test()								默认构造
~Test()								默认析构
Test(const Test & other)			默认拷贝构造
Test& operator=(const Test& other)	赋值运算
Test* operator&()					取址运算符
const Test* operator&()const 		const取址运算符

//-------------------------------------------------------
16对象的使用（一）
static 成员
类的全体对象共享
要在类外初始化,同时初始化不需要加static关键字

const static int 才可以类内初始化

//-------------------------------------------------------
17对象的使用（二）

四种对象的作用域与生存周期

栈对象
堆对象
全局变量 静态全局对象
	1.全局对象的构造先于main函数
	2.已初始化的全局变量或静态全局对象存储于 data段中
	3.未初始化的全局变量等于0，存储于BSS段中
静态局部对象
	1.已初始化的静态局部变量 data段中
	2.未初始化的静态局部变量 bss

内存空间
	栈

	堆

	未初始化的数据 .bss
	已初始化的数据段 .data
	代码段 （常量区）

static 用法
修饰局部变量 此时局部变量的生存周期长于函数本身
静态的局部变量只会初始化一次，所以线程不安全

用在函数之外，修饰文件或者函数，只在当前文件可见

修饰类成员变量和成员函数


//-------------------------------------------------------
18对象的使用（三）

单例模式Singleton
禁止拷贝


也可以用auto_ptr实现

都是线程不安全


class Singleton
{
public:
	static Singleton* GetInstance() {
		//也可以用局部静态变量只初始化一次来实现
		static Singleton ins;
		return &ins;
	}
	static Singleton* GetInstance() {
		// 防止内存泄漏，需要手动释放，
		// 手动释放麻烦，可以弄一个内部类的静态变量
		// 在这个静态变量的析构里释放单例对象
		if(pObj == NULL){
			pObj = new Singleton();
		}
		return pObj;
	}
	class Garbeage
	{
	public:
		Garbeage();
		~Garbeage(){
			if(pObj != NULL){
				delete pObj;
				pObj = NULL;
			}
		};
	};
private:
	Singleton& operator=(const Singleton & other);
	Singleton(const Singleton & other);
	Singleton();
	~Singleton();
	static Singleton * pObj;
	static Garbeage garbe;
};
Singleton::Garbeage Singleton::garbe;


//-------------------------------------------------------
19对象的使用（四）

const 成员函数
只能访问数据，不能改变


class Test
{
public:
	Test();
	~Test();
	
	int GetValue(){
		return m_a;
	}
	int GetValue()const {
		return m_a;
	}//这两个函数可以重载

	int m_a;
};

const对象不能调用非const成员函数


用mutable修饰的成员 在const对象或const成员函数中可以被修改

//-------------------------------------------------------
20从一个实例看数据抽象和封装

用c和c++类的方式分别实现栈


//-------------------------------------------------------
21友元

允许非类成员函数访问类的非公有成员



友元函数 类外定义 类体内说明

class Test
{
public:
	friend void Fun(const Test & obja){
		cout << obja.m_a <<endl;
	}
	Test();
	~Test();
private:
	int m_a;
	int m_b;
};


友元类 
class Test
{
	friend class Friend;
public:
	Test();
	~Test();
	
};
这样 Friend这个类的所有成员函数都可以访问 Test类的成员

友元关系是单向的，不能传递，不能继承

//-------------------------------------------------------
22运算符重载（一）

运算符重载 本质是函数重载
如 + - * / < > 等符号

成员函数重载
函数类型 类名::operator 运算符(参数表){

}


非成员函数重载
friend 函数类型 operator 运算符(参数表){

}

//-------------------------------------------------------
23运算符重载（二）

++运算符重载
前置++
	类成员		函数类型 & operator++();
	友元方式		friend 函数类型 &operator++(类类型 &);
后置++
	类成员		函数类型 & operator++(int);
	友元方式		friend 函数类型 &operator++(类类型 &, int);


赋值运算符重载


！运算符重载

//-------------------------------------------------------
24运算符重载（三）

[]运算符重载
+运算符重载
+=运算符重载


<<运算符重载
>>运算符重载
流运算符只能使用友元函数进行重载
friend istream& operator>>(istream&, 类类型&);
friend ostream& operator<<(ostream&, const 类类型&)

//-------------------------------------------------------
25运算符重载（四）

类型转换运算符重载
必须是成员函数，不能是友元函数
没有参数
不能指定返回类型
函数原型：operator 类型名();


------------------------

->重载
这样对象也可以使用-> 得到的是返回的变量
类型 operator->(){
	return 类型对象;
}


------------------------

new重载
delete重载

Test *p = new Test();
实际上是先调用operator new 分配内存空间
然后才调用的构造函数

placement new
给与了内存，在给与的内存上操作，然后调用构造函数
char chunk[10];
Test *p = new (chunk) Test();


一旦重载了operator new 就要配对的重载operator delete

void * operator new (size_t size)
void operator delete(void *p)

void * operator new[](size_t size)
void operator delete[](void *p)

//-------------------------------------------------------
26 string

头文件 
#include<string>
using std::string;

其实真实类型是basic_string
typedef basic_string<char> string








//-------------------------------------------------------
27 vector
#include <vector>
构造
vector<T> v1;
vector<T> v2(v1);
vector<T> v3(n, i);
vector<T> v4(n);

常用成员函数
size()
clear()
empty()
push_back() 末尾添加元素
pop_back() 弹出最后一个元素
erase()
insert()
back() 最后一个元素
[]
=

迭代器
vector<int>::iterator ite;
for (std::vector<int>::iterator i = v1.begin(); i != v1.end(); ++i)
//这里用!=可移植性好, 用++i 不用i++, 因为后置++ 在++重载中会构造了一个临时对象，效率低
{
	*i //相当于vector[i]
}

对应的有 vector<int>::const_iterator;

//-------------------------------------------------------
28 map

#include <map>
内部红黑树
map内部默认会对key进行排序，所以 key的类型需要重载 < 号才能排序

map<key, value> mapName;

插入数据
mapName[key] = value;
mapName.insert(map<T1,T2>::value_type(t1, t2));
mapName.insert(pair<T1, T2>(t1, t2));
mapName.insert(make_pair<T1, T2>(t1, t2));

遍历
map<string, int>::const_iterator ite= mapName.begin();
for (; ite != mapName.end(); ++ite)
{
	ite->first;
	ite->second;
}

查找和修改
mapName[key] = value;
map<T1, T2>::iterator ite = mapName.find(key);
if(ite != mapName.end()){
	找到了
	ite->second;
} else {
	没找到
}


删除
mapName.erase(key);
mapName.erase(迭代器);



//-------------------------------------------------------
29 继承（一）

代码重用
组合和继承现有的类来创建新类

------------------------
public protected private 
三种类型的继承区别
三种类成员的访问区别

class ClassA 
{
public:
	ClassA();
	~ClassA();
	
};
class ClassB : public ClassA
{
public:
	ClassB();
	~ClassB();
	
};


------------------------
默认继承保护级别

如果没有指定继承方式
结构体默认公有继承
类默认私有继承
class Son : Father
struct Son : Father

------------------------
接口继承与实现继承
公有成员函数称为接口
公有继承了基类后，这些接口还是公有成员函数，这种称之为接口继承
私有，保护继承之后，接口不是公有，派生类希望使用基类的实现，这种称之为实现继承

------------------------
对基类数据成员重定义

对基类成员函数重定义
overwrite 重定义(和overload 不一样，overload 是重载, 条件是作用域要相同)
与基类函数一模一样

与基类函数名字一样，参数不一样
这样基类的同名函数会被隐藏

访问基类的成员
Son.Father::Fun();
Son.Father::member;


override 覆盖，virtual 虚函数

------------------------

继承与组合

希望新类使用已有类的功能时，用组合
希望新类有相同的接口时，用继承
里氏代换原则

//-------------------------------------------------------
30 继承（二）

不能自动继承的成员函数
1.构造函数
2.析构函数
3.=运算符

派生类的构造函数只需要对本类的新增成员进行初始化，对基类成员的初始化，调用基类构造
派生类构造需要给基类构造传递参数

class BaseClass
{
public:
	BaseClass(int a): m_a(a);
	~BaseClass();
	int m_a;
};

class DeriveClass
{
public:
	DeriveClass(int a, int b): BaseClass(a), m_b(100){

	};
	~DeriveClass();
	int m_b;
};


需要在构造函数初始化列表进行的:
1.const成员
2.引用成员
3.基类没有默认构造时，对基类成员初始化
4.类对象成员没有默认构造时
最先调用基类构造，再调用对象成员的构造，最后调用自身构造


拷贝构造函数
Derived(const Derived& other):类成员(other.类成员), Base(other){

}

------------------------
静态成员无所谓被继承
因为只有一份


//-------------------------------------------------------
31 继承（三）

转换与继承
使用基类的地方可以用派生类来替换

派生类到基类的转换
当派生类是以public继承基类时，编译器可以自动转换（向上转型，安全）
指针可以，引用可以，对象也可以

Base b;
Derived d;
Base * p = &d; //基类指针可以指向派生类
Derived * p = &b;//派生类指针不能指向基类对象，因为 Derived* 无法转为 Base*

Base & a = d;//可以

b = d;//可以  会产生对象切割


当派生类是以private,protected方式继承基类时, 不可以自动转换
因为类成员的访问限制进行了提升，当转换为基类时，破坏了访问限制
但是可以用 reinterpret_cast<>将派生类的指针（引用）转换为基类指针（引用）
可以把基类指针用static_cast<>转化为派生类指针 因为这样访问限制会提升,但是会不安全，因为也可以访问到基类不存在的成员
不能把派生类对象转换为基类对象


static_cast<>
编译器认可的静态转换，比如说从char到int，从double到int 
或者具有转换构造函数，或者重载了类型转换运算符 是安全的

reinterpret_cast<>
编译器不认可的静态转换，比如从 int * 转为 int
指针在32位系统4个字节，64位系统8个字节，转为 int 变成4个字节，并且不做任何对齐

const_cast<>
去掉常量性

dynamic_cast<>
用于动态转换 是一种安全的向下转型，能够将基类转换为派生类，需要运行时支持

------------------------

基类到派生类的转换

基类指针可以转为派生类指针，但是不安全
基类对象无法转换为派生类对象, 向下转型不安全，没有自动转换机制


基类对象转换为派生类对象两种方式 (将其他类型转换为类类型)
1.派生类具有转换构造函数(不过没有意义，纯语法实现)

Manager(const Employee& other): Employee(other), level_(100){

}

2.类型转换运算符重载 (将类类型转换为其他类型)
比如 派生类对象 = 基类对象;
这个操作要讲基类对象转换为其他类型，所以在基类里重载类型转换运算符


//这个例子 此函数在基类中定义，派生类要加前向声明，实现必须在派生类定义之后
Employee::operator Manager(){
	return Manager(name_, age_, deptno_, -1);//前三个是基类成员
}

//-------------------------------------------------------
32 继承（四）

多重继承
更好的代码重用，可能会有二义性

多重继承解决二义性方法，明确指明访问哪个成员
类名::成员名称

------------------------
虚继承与虚基类
用来解决菱形继承二义性问题，为最远的派生类提供唯一的基类成员

class A : virtual public B {

}

虚基类成员是由最远派生类的构造函数通过调用虚基类的构造函数进行初始化的

这时，只有最远派生类的构造调用虚基类的构造起作用，
其他的派生类构造中调用虚基类的构造不起作用

//-------------------------------------------------------
33 继承（五）笔记重新做

类/对象大小计算


虚继承对类大小影响(虚基类表指针->虚基类表)



vbtable
本类地址与虚基类表指针地址的差
虚基类地址与虚基类表指针地址的差??????没看懂20:28;

间接访问





//-------------------------------------------------------
34 虚函数与多态（一）笔记重新做

多态实现:
1.函数重载（静态绑定）
2.运算符重载（静态绑定）
3.模板（静态绑定）
4.虚函数（动态绑定）

------------------------
虚函数定义
virtual 函数类型 函数名(参数)
虚函数不能是 static
只有基类指针或引用调用虚函数才能引发动态绑定


------------------------

虚析构函数

当通过基类指针删除派生类对象时
析构应为虚析构，这样就可以先调用派生类的析构函数，然后调用基类析构

------------------------

静态函数没有this指针，没有办法找到虚函数指针，所以没有办法virtual，同样友元一样


------------------------
object slicing 与 虚函数
向上转型 对象切割

派生类的对象强制转换为基类对象类型时，虚表也变化了，变成了基类的虚表
这个对象完完全全转化为了基类对象,所以就算调用虚函数，也是基类中的虚表记录的虚函数


//-------------------------------------------------------
35 虚函数与多态（二）

纯虚函数
virtual void Fun() = 0;

有纯虚函数的类叫抽象类
抽象类不能实例化



构造函数不能是虚函数，析构函数可以是虚函数

------------------------

抽象类不能实例化，但可以声明指针或者引用
可以使用抽象类的指针支持运行时多态
派生类必须实现抽象类中的纯虚函数，如果没实现，派生类仍然为抽象类

多态的好处
更好的对程序抽象，提高对程序的扩展性


------------------------

简单工厂模式

------------------------

虚析构
如果一个类用于多态，析构就应该虚函数
这样 delete 基类指针 就会调用派生类的析构函数


如果一个类没有任何接口还是想是抽象类，就可以将析构声明为纯虚函数
这时，基类必须要实现析构函数（给出一个空实现即可）

//-------------------------------------------------------
36 对象动态创建





题目描述
在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，
每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

class Solution {
public:
    bool Find(int target, vector<vector<int> > array) {
        if(array.size() <= 0){
        	return false;
        }
        int nRow = 0;
        int nColumn = array[0].size() - 1;

        while(nRow < array.size() && nColumn < array[0].size()){
        	int current = array[nRow][nColumn];
        	if(current == target){
        		return true;
        	} else if(current < target){
        		nRow++;
        	} else {
        		nColumn--;
        	}
        }

        return false;
    }
};



题目描述
请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

class Solution {
public:
	void replaceSpace(char *str,int length) {
		if(str == NULL) return;
		int blockCount = 0;

		int strLen = 0;
		while(strLen <= length && str[strLen] != NULL){
			if(str[strLen] == ' '){
				blockCount++;
			}
			strLen++;
		}
		if(blockCount ==0)return;

		int endPos2 = blockCount * 2 + strLen;
		int endPos1 = strLen;

		while(endPos1 >= 0){
			if(str[endPos1] == ' '){
				str[endPos2--] = '0';
				str[endPos2--] = '2';
				str[endPos2--] = '%';
			} else {
				str[endPos2--] = str[endPos1];
			}
			endPos1--;
		}
	}
};


题目描述
输入一个链表，按链表值从尾到头的顺序返回一个ArrayList。

/**
*  struct ListNode {
*        int val;
*        struct ListNode *next;
*        ListNode(int x) :
*              val(x), next(NULL) {
*        }
*  };
*/
class Solution {
public:
    vector<int> printListFromTailToHead(ListNode* head) {
        stack<int> stk;
        ListNode* temp = head;
        while(temp != NULL){
        	stk.push(temp->val);
        	temp = temp->next;
        }
        vector<int> v;
        while(!stk.empty()){
        	v.push_back(stk.top());
        	stk.pop();
        }
        return v;

    }
};



题目描述
输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

/**
 * Definition for binary tree
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* reConstructBinaryTree(vector<int> pre,vector<int> vin) {
    	TreeNode * TreeHead = NULL;
    	if(pre.size() <= 0 || vin.size() <= 0){
    		return TreeHead;
    	}

    }

};


取前序的第一个，然后再中序中找到位置，进行切割，分两部分，
中序的第二部分的第一个为目标，在前序中找到，分两部分，
递归









题目描述
用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。

入栈
class Solution
{
public:
    void push(int node) {
        stack1.push(node);
    }

    int pop() {
    	int result = -1;
        if(stack1.empty() && stack2.empty()){
        	return result;
        }
        if(!stack2.empty()){
        	result = stack2.top();
        	stack2.pop();
        	return result;
        }else{
        	while(!stack1.empty()){
        		stack2.push(stack1.top());
        		stack1.pop();
        	}
	        if(!stack2.empty()){
	        	result = stack2.top();
	        	stack2.pop();
	        	
	        }
	        return result;
        }

    }

private:
    stack<int> stack1;
    stack<int> stack2;
};



题目描述
把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非减排序的数组的一个旋转，输出旋转数组的最小元素。 
例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。 NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。


头尾两个指针，左边的比右边的大，左指针就向中间移动
如果两个值一样，由后者往前找，找到不一样的值

class Solution {
public:
    int minNumberInRotateArray(vector<int> rotateArray) {

};



题目描述
大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）。
n<=39

class Solution {
public:
    int Fibonacci(int n) {
    	if(n == 0 || n == 1){
    		return n;
    	}
    	int leftCount = Fibonacci(0);
    	int rightCount = Fibonacci(1);
    	int currentCount = leftCount + rightCount;
    	for (int i = 2; i < n; ++i)
    	{
    		leftCount = rightCount;
    		rightCount = currentCount;
    		currentCount = leftCount + rightCount;
    	}
    	return currentCount;
    }
};



题目描述
一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

class Solution {
public:
    int jumpFloor(int number) {
    	if(number <= 0){
    		return 0;
    	}
    	if(number == 1 || number == 2){
    		return number;
    	}
    	int leftCount = jumpFloor(1);
    	int rightCount = jumpFloor(2);
    	int currentCount = leftCount + rightCount;

    	for (int i = 3; i < number; ++i)
    	{
    		leftCount = rightCount;
    		rightCount = currentCount;
    		currentCount = leftCount + rightCount;
    	}
    	return currentCount;
    }
};


题目描述
一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

class Solution {
public:
    int jumpFloorII(int number) {
    	//思路一
    	if(number == 0 || number == 1 || number == 2){
    		return number;
    	}
    	return 2*jumpFloorII(number - 1);

    	//思路二 等比数列求和
    	int result = 1;
    	for (int i = 0; i < number - 1; ++i)
    	{
    		result = result *2;
    	}
    	return result;
    }
};


题目描述
我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？

class Solution {
public:
    int rectCover(int number) {
    	if(number == 0 || number == 1 || number == 2){
    		return number;
    	}

    	int leftCount = rectCover(1);
    	int rightCount = rectCover(2);
    	int currentCount = leftCount + rightCount;

    	for (int i = 3; i < number; ++i)
    	{
    		leftCount = rightCount;
    		rightCount = currentCount;
    		currentCount = leftCount + rightCount;
    	}
    	return currentCount;
    }
};


题目描述
输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。

class Solution {
public:
     int  NumberOf1(int n) {
         //位与，去除最后一个1
     	int count = 0;
     	while(n != 0){
     		n = n & (n-1);
     		++count;
     	}
     	return count;
     }
};


题目描述
给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。

class Solution {
public:
    double Power(double base, int exponent) {
    	if(base == 0){
    		return 0;
    	}
    	if(exponent == 0){
    		return 1;
    	}
    	bool isBaseFU = false;
    	if(base < 0){
    		isBaseFU = true;
    		base = -base;
    	}
    	if(exponent < 0){
    		exponent = -exponent;
    		base = 1/base;
    	}

    	double result = 1;
    	for(int i = 0; i < exponent; ++i){
    		result = result * base;
    	}

    	if(isBaseFU){
    		result = -result;
    	}
    	return result;
    }
};


题目描述
输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，
所有的偶数位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。

//保证顺序
class Solution {
public:
    void reOrderArray(vector<int> &array) {
        vector<int> v1;
        for (int i = 0; i < array.size(); ++i){
        	if(array[i] %2 == 1){
        		v1.push_back(array[i]);
        	}
        }
        for (int i = 0; i < array.size(); ++i){
        	if(array[i] %2 == 0){
        		v1.push_back(array[i]);
        	}
        }
        for (int i = 0; i < array.size(); ++i){
        	array[i] = v1[i];
        }
    }
};

//不保证顺序



题目描述
输入一个链表，输出该链表中倒数第k个结点。

/*
struct ListNode {
	int val;
	struct ListNode *next;
	ListNode(int x) :
			val(x), next(NULL) {
	}
};*/
class Solution {
public:
    ListNode* FindKthToTail(ListNode* pListHead, unsigned int k) {
    	if(pListHead == NULL ||k == 0){
    		return NULL;
    	}

    	unsigned int currentCount = 0;
    	ListNode* temp = pListHead;
    	while(temp != NULL){
    		currentCount++;
    		temp = temp->next;
    		if(currentCount == k){
    			break;
    		}
    	}
    	if(currentCount <k){
    		return NULL;
    	}

    	ListNode* temp2 = pListHead;

    	while(temp != NULL){
    		temp = temp->next;
    		temp2 = temp2->next;
    	}
    	return temp2;
    }
};


题目描述
输入一个链表，反转链表后，输出新链表的表头。

/*
struct ListNode {
	int val;
	struct ListNode *next;
	ListNode(int x) :
			val(x), next(NULL) {
	}
};*/
class Solution {
public:
    ListNode* ReverseList(ListNode* pHead) {
    	if(pHead == NULL || pHead->next == NULL){
    		return pHead;
    	}
    	ListNode* newHead;

    	if(pHead->next->next == NULL){
    		newHead = pHead->next;
    		newHead->next = pHead;
    		pHead->next = NULL;
    		return newHead;
    	}

    	ListNode* pFirst = pHead;
    	ListNode* pMid = pFirst->next;
    	ListNode* pEnd = pMid->next;
    	pHead->next = NULL;

    	while(pEnd != NULL){
    		pMid->next = pFirst;
    		pFirst = pMid;
    		pMid = pEnd;
    		pEnd = pEnd->next;
    	}

    	pMid->next = pFirst;
    	return pMid;
    }
};


题目描述
输入两个单调递增的链表，输出两个链表合成后的链表，当然

/*
struct ListNode {
	int val;
	struct ListNode *next;
	ListNode(int x) :
			val(x), next(NULL) {
	}
};*/
class Solution {
public:
    ListNode* Merge(ListNode* pHead1, ListNode* pHead2)
    {
        if(pHead1 == NULL){
        	return pHead2;
        }
        if(pHead2 == NULL){
        	return pHead1;
        }

        ListNode* pNewHead = NULL;
        ListNode* pTemp1 = pHead1;
        ListNode* pTemp2 = pHead2;

        if(pTemp1->val <= pTemp2->val){
    		pNewHead = pTemp1;
    		pTemp1 = pTemp1->next;
    	} else {
    		pNewHead = pTemp2;
    		pTemp2 = pTemp2->next;
    	}
        while(pTemp1 != NULL && pTemp2 != NULL){
        	if(pTemp1->val <= pTemp2->val){
        		pNewHead->next = pTemp1;
        		pTemp1 = pTemp1->next;
        	} else {
        		pNewHead->next = pTemp2;
        		pTemp2 = pTemp2->next;
        	}
        	pNewHead = pNewHead->next;
        }

        if(pTemp1 == NULL){
        	pNewHead->next = pTemp2;
        }
        if(pTemp2 == NULL){
        	pNewHead->next = pTemp1;
        }

        return (pHead1->val <= pHead2->val) ? pHead1 : pHead2;
    }
};


题目描述
输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）

/*
struct TreeNode {
	int val;
	struct TreeNode *left;
	struct TreeNode *right;
	TreeNode(int x) :
			val(x), left(NULL), right(NULL) {
	}
};*/
class Solution {
public:
    bool HasSubtree(TreeNode* pRoot1, TreeNode* pRoot2)
    {
    	if(pRoot1 == NULL || pRoot2 == NULL){
    		return false;
    	}
    	//根节点一样，判断左右一不一样
    	//根节点不一样，就A左右子树往下找
    	bool flag = false;
    	if(pRoot1->val == pRoot2->val){
    		flag = isTreeCopy(pRoot1, pRoot2);
    	}
    	if(flag == false){
    		flag = HasSubtree(pRoot1->left, pRoot2);
    	}
    	if(flag == false){
    		flag = HasSubtree(pRoot1->right, pRoot2);
    	}
    	return flag;
    }
    bool isTreeCopy(TreeNode* pRoot1, TreeNode* pRoot2){
    	if(pRoot1 == NULL){
    		return (pRoot2 == NULL) ? true : false;
    	} else {
    		if(pRoot2 == NULL){
    			return true;
    		} else {
    			if(pRoot1->val == pRoot2->val){
    				return isTreeCopy(pRoot1->left, pRoot2->left) && isTreeCopy(pRoot1->right, pRoot2->right);
    			} else {
    				return false;
    			}
    		}
    	}
    	return false;
    }
};


题目描述
操作给定的二叉树，将其变换为源二叉树的镜像。
输入描述:
二叉树的镜像定义：源二叉树 
    	    8
    	   /  \
    	  6   10
    	 / \  / \
    	5  7 9  11
    	镜像二叉树
    	    8
    	   /  \
    	  10   6
    	 / \  / \
    	11 9 7   5

/*
struct TreeNode {
	int val;
	struct TreeNode *left;
	struct TreeNode *right;
	TreeNode(int x) :
			val(x), left(NULL), right(NULL) {
	}
};*/
class Solution {
public:
    void Mirror(TreeNode *pRoot) {
    	if(pRoot == NULL){
    		return;
    	}

    	TreeNode *pTemp = pRoot->left;
    	pRoot->left = pRoot->right;
    	pRoot->right = pTemp;

    	if(pRoot->left){
    		Mirror(pRoot->left);
    	}
    	if(pRoot->right){
    		Mirror(pRoot->right);
    	}
    }
};


题目描述
输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，
例如，如果输入如下4 X 4矩阵： 
 1  2  3  4 
 5  6  7  8 
 9 10 11 12 
13 14 15 16 
则依次打印出数字  1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.

class Solution {
public:
    vector<int> printMatrix(vector<vector<int> > matrix) {

    }
    
};



题目描述
定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。

class Solution {
public:
    void push(int value) {
        if(my_stack.empty()){
        	min_stack.push(value);
        } else {
        	if(min_stack.top() < value){
        		min_stack.push(min_stack.top());
        	} else {
        		min_stack.push(value);
        	}
        }
        my_stack.push(value);
    }
    void pop() {
        my_stack.pop();
        min_stack.pop();
    }
    int top() {

        return my_stack.top();
    }
    int min() {
        return min_stack.top();
    }
    stack<int> my_stack;
    stack<int> min_stack;
};

题目描述
输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。
假设压入栈的所有数字均不相等。例如序列1,2,3,4,5是某栈的压入顺序，
序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。
（注意：这两个序列的长度是相等的）

class Solution {
public:
    bool IsPopOrder(vector<int> pushV,vector<int> popV) {
        if(pushV.size() == 0 || popV.size() == 0) return false;

};



题目描述
从上往下打印出二叉树的每个节点，同层节点从左至右打印

/*
struct TreeNode {
	int val;
	struct TreeNode *left;
	struct TreeNode *right;
	TreeNode(int x) :
			val(x), left(NULL), right(NULL) {
	}
};*/
class Solution {
public:
    vector<int> PrintFromTopToBottom(TreeNode* root) {
    	vector<int> result;
    	queue<TreeNode*> queue_node;
    	if(root == NULL) return result;
    	queue_node.push(root);
    	while(!queue_node.empty()){
    		TreeNode* temp = queue_node.front();
    		queue_node.pop();
    		result.push_back(temp->val);
    		if(temp->left){
    			queue_node.push(temp->left);
    		}
    		if(temp->right){
				queue_node.push(temp->right);
    		}
    	}
    	return result;
    }
};


题目描述
输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。
如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。

class Solution {
public:
    bool VerifySquenceOfBST(vector<int> sequence) {
    	//左右根
    	//左比根小，根比右小
    	//最后一个是根节点，前边的是左右子树
    	//左子树的所有节点小于右子树的所有节点
    	
    	if(sequence.size() == 0){
    		return false;
    	}
    	return judgeBST(sequence, 0, sequence.size() - 1);

    }

    bool judgeBST(vector<int> array, int start, int end){
    	if(start >= end){
    		return true;
    	}

    	int rootValue = array[end];
    	int treeIndex = start;
    	while(array[treeIndex] < rootValue){
    		treeIndex++;
    	}
    	bool result = true;
    	for (int i = treeIndex; i < end; ++i)
    	{
    		if(array[i] <= rootValue){
    			result = false;
    			break;
    		}
    	}
    	if(result){
    		return judgeBST(array, start, treeIndex - 1) && judgeBST(array, treeIndex, end - 1);
    	}
    	return result;
    }
};




题目描述
输入一颗二叉树的跟节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。
路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。
(注意: 在返回值的list中，数组长度大的数组靠前)

/*
struct TreeNode {
	int val;
	struct TreeNode *left;
	struct TreeNode *right;
	TreeNode(int x) :
			val(x), left(NULL), right(NULL) {
	}
};*/
class Solution {
public:
    vector<vector<int> > FindPath(TreeNode* root,int expectNumber) {
    	vector<vector<int>> result;
    	vector<int> path;
    	if(!root){
    		return result;
    	}
    	dfsTree(root, expectNumber, result, path);
    	return result;
    }
    void dfsTree(TreeNode* root, int expectNumber,vector<vector<int>>& result, vector<int> path){
    	path.push_back(root->val);
    	if(!root->left && !root->right){
    		if(expectNumber == root->val){
    			result.push_back(path);
    		}
    	}
    	if(root->left){
    		dfsTree(root->left, expectNumber - root->val, result, path);
    	}
    	if(root->right){
    		dfsTree(root->right, expectNumber - root->val, result, path);
    	}    	
    }
};


题目描述
输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），
返回结果为复制后复杂链表的head。（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）
示例1
输入

复制
输出

复制

/*
struct RandomListNode {
    int label;
    struct RandomListNode *next, *random;
    RandomListNode(int x) :
            label(x), next(NULL), random(NULL) {
    }
};
*/
class Solution {
public:
    RandomListNode* Clone(RandomListNode* pHead)
    {

    	//每个节点进行复制，然后挂在被复制的节点后边
    	//然后复制random指针
    	//拆分链表
        
    	RandomListNode* pHeadNew = NULL;
    	if(!pHead){
    		return pHeadNew;
    	}
    	copyTreeNode(pHead, pHeadNew);
    	return pHeadNew;
    }
    void copyTreeNode(RandomListNode* pHead, RandomListNode*& pHeadNew){
    	RandomListNode* temp = pHead;
    	while(temp){
    		RandomListNode* node = new RandomListNode(temp->label);
    		//node->label = temp->label;
    		node->next = temp->next;
    		node->random = temp->random;

    		temp->next = node;
    		temp = node->next;
    	}

    	temp = pHead;
    	pHeadNew = temp->next;
    	while(temp){
    		if(temp->random){
    			temp->next->random = temp->random->next;
    		}
    		temp = temp->next->next;
    	}
    	
    	temp = pHead;
    	RandomListNode* temp2 = pHead->next;
    	while(temp2->next){
    		temp->next = temp2->next;
    		
    		temp = temp->next;
    		temp2->next = temp->next;
    		temp2 = temp2->next;
    	}

    	temp->next = NULL;
    	temp2->next = NULL;
    };
};


题目描述
输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不

/*
struct TreeNode {
	int val;
	struct TreeNode *left;
	struct TreeNode *right;
	TreeNode(int x) :
			val(x), left(NULL), right(NULL) {
	}
};*/
class Solution {
public:
    TreeNode* Convert(TreeNode* pRootOfTree)
    {
        //左根右
        TreeNode* pHead = NULL;

        if(!pRootOfTree){
        	return pHead;
        }
        vector<TreeNode*> treeQueue;
        searchTree(pRootOfTree, treeQueue);

        pHead = treeQueue[0];

        //重新排列
        for(int i = 0; i < treeQueue.size(); i++){
        	treeQueue[i]->left = (i == 0) ? NULL : treeQueue[i-1];
        	treeQueue[i]->right = (i == treeQueue.size()-1) ? NULL : treeQueue[i+1];
        }

        return pHead;

    }

    void searchTree(TreeNode* pRootOfTree,vector<TreeNode*> &treeQueue){

    	if(!pRootOfTree){
    		return;
    	}
    	if(pRootOfTree->left){
    		searchTree(pRootOfTree->left, treeQueue);
    	}
    	treeQueue.push_back(pRootOfTree);
    	if(pRootOfTree->right){
    		searchTree(pRootOfTree->right, treeQueue);
    	}
    }
};


题目描述
输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。
输入描述:
输入一个字符串,长度不超过9(可能有字符重复),字符只包括大小写字母。

class Solution {
public:
    vector<string> Permutation(string str) {
        //将第一位和后边的每一位交换，然后输出，这样递归
       	//重复的字母跳过不排列
       	vector<string> result;
       	if(str.size() == 0) return result;
       	Per(result, str, 0);
       	//按字母顺序排序
       	sort(result.begin(), result.end());
       	return result;
    }

    void Per(vector<string> & result, string str, int index){
    	//当第一位和最后一位交换完毕后，递归结束
    	if(index == str.size()-1){
    		result.push_back(str);
    		return;
    	}
    	for(int i = index; i<str.size(); ++i){
    		//依次交换
	    	if(i!=index && str[index] == str[i]){
	    		continue;
	    	}
	    	//交换
	    	swapString(str, index, i);
	    	Per(result, str, index+1);
	    	//交换回去
	    	swapString(str, index, i);
    	}
   	}

   	void swapString(string & str, int index1, int index2){
   		char temp = str[index1];
   		str[index1] = str[index2];
   		str[index2] = temp;
   	}
};



题目描述
数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。
由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。

class Solution {
public:
    int MoreThanHalfNum_Solution(vector<int> numbers) {
    	int result = 0;
    	int count = 0;
    	if(numbers.size() == 0) return result;
    	result = numbers[0];
    	for(int i = 0; i < numbers.size(); i++){
    		if(numbers[i] == result){
    			count++;
    		} else {
    			count--;
    		}
    		if(count < 0){
    			result = numbers[i];
    			count = 0;
    		}
    	}
    	return (count > 0) ? result : 0;
    }
};


题目描述
输入n个整数，找出其中最小的K个数。
例如输入4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4,。

class Solution {
public:
    vector<int> GetLeastNumbers_Solution(vector<int> input, int k) {
    	vector<int> result;
    	if(k > input.size()) return result;

    	//前k个塞进去
    	for(int i = 0; i < k; ++i){
    		result.push_back(input[i]);
    	}

    	int currentMaxIndex = getMax(result);
    	for(int j = k; j < input.size(); j++){
    		if(input[j] < result[currentMaxIndex]){
    			result[currentMaxIndex] = input[j];
    			currentMaxIndex = getMax(result);
    		}
    	}
    	return result;

    }

    int getMax(vector<int> & result){
    	int maxIndex = 0;
    	for(int i = 0; i < result.size(); ++i){
    		if(result[maxIndex] > result[i]){
    			maxIndex = i;
    		}
    	}
    	return maxIndex;
    }
};

题目描述
HZ偶尔会拿些专业问题来忽悠那些非计算机专业的同学。
今天测试组开完会后,他又发话了:在古老的一维模式识别中,常常需要计算连续子向量的最大和,当向量全为正数的时候,问题很好解决。
但是,如果向量中包含负数,是否应该包含某个负数,并期望旁边的正数会弥补它呢？
例如:{6,-3,-2,7,-15,1,2,2},连续子向量的最大和为8(从第0个开始,到第3个为止)。
给一个数组，返回它的最大连续子序列的和，你会不会被他忽悠住？(子向量的长度至少是1)

class Solution {
public:
    int FindGreatestSumOfSubArray(vector<int> array) {
    	if(array.size() <= 1){
    		return 0;
    	}
    	//动态规划，连续的一段数组的和累加出负数的话，说明这一段没意义，直接从新的地方开始
    	int totalMax = array[0];
    	int currentMax = 0;
    	// int startIndex = 0;
    	for(int i = 0; i<array.size(); i++){
    		currentMax += array[i];
    		if(currentMax < 0){
    			currentMax = 0;
    		} else if(currentMax > totalMax){
    			totalMax = currentMax;
    		}

    	}
    	//如果全是负数，取最小的一个
    	if(totalMax < 0){
    		totalMax = array[0];
    		for(int i = 0; i < array.size(); i++){
    			if(totalMax < array[i]){
    				totalMax = array[i];
    			}
    		}
    	}
    	return totalMax;
    }
};

题目描述(整数中1出现的次数（从1到n整数中1出现的次数）)
求出1~13的整数中1出现的次数,并算出100~1300的整数中1出现的次数？
为此他特别数了一下1~13中包含1的数字有1、10、11、12、13因此共出现6次,但是对于后面问题他就没辙了。
ACMer希望你们帮帮他,并把问题更加普遍化,可以很快的求出任意非负整数区间中1出现的次数（从1 到 n 中1出现的次数）。

class Solution {
public:
    int NumberOf1Between1AndN_Solution(int n)
    {
    
    }
};


题目描述(把数组排成最小的数)
输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。
例如输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323。

class Solution {
public:
    string PrintMinNumber(vector<int> numbers) {
        string resultStr = "";
        if(numbers.size() == 0) return resultStr;
        vector<string> strArray;
        for(int i = numbers; i < numbers.size(); ++i){
        	string temp = to_string(numbers[i]);
        	strArray.push_back(temp);
        }
        sort(strArray.begin(), strArray.end());
        for (int i = 0; i < strArray.size(); ++i)
        {
        	resultStr = resultStr + strArray[i];
        }
        return resultStr;
    }
};

























//main.cpp
#include<iostream>
using namespace std;
void MaxSort(int a[], int i, int n)
{
    int j = 2*i+1;//找到当前结点的左孩子
    int temp = a[i];//把当前结点的数赋给temp变量，后面会发现这个变量很有用
    while(j < n)//判断必须条件，大于或等于该结点都属于数组越界
    {
        if(j+1 <n && a[j] < a[j+1])//判断条件，第一个条件是判断是不是最后一个结点。
                                   //第二个判断条件是找出孩子结点最大的数方便与结点交换。
            ++j;//如果后面的大，那么交换的变成后面的孩子。
        if(temp > a[j])//因为我们是MaxSort所以如果父结点本身就大不用判断直接跳出循环。
            break;
        else
        {
            a[i] = a[j];//判断过程，把最大的孩子结点的数赋给父结点。并利用递归思想找出子节点的子节点。
            i = j;
            j = 2*i+1;
         }
    }
    a[i] = temp;//i已经成为了孩子结点的下标，赋值temp，也就是原本父结点的值，达成交换。
}
 
 //堆排序
void HeapSort(int a[], int n)
{
    for(int i= n/2-1;i>=0;i--)//从最后一个结点的父结点开始“向前遍历”。
        MaxSort(a,i,n);
    for(int i=n-1;i>=1;i--)
    {
        //swap(a[i],a[0]);
        MaxSort(a,0,i);
    }//逆序
}
int main()
{
    int a[10] = {5,10,7,34,23,58,2,55,35,45};
    HeapSort(a,10);
    for (int i=0;i<10;i++)
        cout << a[i] << " ";
    return 0;
}