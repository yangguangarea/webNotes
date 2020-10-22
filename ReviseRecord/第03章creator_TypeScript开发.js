/*
 * 第001课TS组件化开发
----------------------------------------
Ts 组件脚本
1:  导入ccc的装饰器:  const {ccclass, property} = cc._decorator;
2:  @ccclass 是cocos定义的一个装饰器， 使用装饰器声明为组件类, 
	不然这个类不会被编辑器识别，也就没办法挂脚本组件;
3:  Ts: 定义一个类: export default class，一个文件只能有一个default
4:  Ts 类的继承: extends 关键字; class 类名 extends 基类
5:  定义TS 类的数据成员: 变量名字: 类型 = 默认值;
6:  将组件类的简单数据成员绑定到编辑器:  @property
    boolean, number,  string, 
7:  组件类绑定creator 类型到属性 @property(cc.Label)
8:  声明一个数组: @ property([cc.Node])
9:  onload, start, update, 是组件类的标准接口，调用时期和JS是一样的;
10: 定义一个函数 参数, 返回值; 可加类型，可不加类型, 没有返回值的可以写void
    test_func(v: number) : number {  函数体 }
11: js 的表，和数组，可以直接使用; array1:Array<number>; array2:number[];
12: for循环等，可以沿用JS写法也可以用TS写法;
13: 权限修饰: public, private, protected
14: 导入其它的类: import 类名 from “路径” import ball_ctrl from "./ball_ctrl";

*/

/*
 * 第002课TS继承_重载_多态
----------------------------------------
类的构造函数
1: Ts 里面每隔类都有一个类的构造函数，new 类型的时候，会调用;
    constructor(参数);
2: 权限: public 共用类的外部可以访问;
        private 私有，只能在类的内部使用;
        protected 保护类型： 内部可以访问，子类可以访问。
    默认是public;

3: 静态成员/成员函数: 
    static 名字:类型 = 默认值;
    静态方法:  static 方法名字(参数): 返回值类型 {}, 不依赖于对象实例就可以调用;

4: any类型, 如果这个数据可以执行任意对象就可以定义成any类型;
    var a: any;

class Class1 extends Class2{
    private temp1 : number = 1;//私有 类成员变量
    public tempFucn (param:string  = "ttt"):void{
    }
    public static tempStaticFunc():void {
        //静态函数
    }
    constructor(param1,param2){
        //构造函数
    }
}
let temp = new Class1(param1, param2);

----------------------------------------
类的继承
1: class 类名 extends 基类 {}
2: 继承了基类的数据成员，和方法逻辑;
3: 继承了不一定能访问，看数据权限;
4: 重载: 同一个函数的名字，参数不一样;
5: 多态: 子类自己定义一个父类的方法；
6: super关键字, 表示父类的实例;  super.父类方法(); 可以直接调用super(),代表调用父类构造;
7: 抽象类: 不能new实例
    abstract class 类名 {}    
    抽象方法: abstract 函数名(参数) {} 强制子类要实现这个方法;
8: 当子类没有实现constructor,new的时候会调用父类的，如果子类实现了，就不会调用父类构造
----------------------------------------
Import与Export
1: export: 用于从文件导出: 函数, 对象，数据, 类型;
2: exprots { 函数 }; // 导出函数
   exports { 常量 }; // 导出常量;
   export { class1, func1...}
    直接在类前面加前缀export
3: 导出默认:  
    export default 类/函数/对象, 一个文件默认只能有一个;
4: import 引来导入
   import {mem1, mem2} from ‘模块名字’: 导入模块某一个成员，和某几个;
   import * as 模块名字 from ‘my-model’: 导入模块里面的所有符号;   
   import default_module from ‘my-model’: 导出模块的默认导出;
   import {mem1 as new_mem1, mem2 as new_mem2} 导出模块成员，并重新命名;
   import default, * as ns_model from ‘my-model’: 导入模块的默认导出和命名导出;
*/


/*
 * 第001课创建标准的TypeScript项目
----------------------------------------

*/

/*
 * 第002课创建游戏场景
----------------------------------------

*/

/*
 * 第003课TS制作游戏摇杆
----------------------------------------

*/

/*
 * 第004课TS搭建物理场景_开启物理引擎
----------------------------------------
// 开启物理引擎，一定要写道onLoad里面, 否则在start里面写是没有效果的;
// step1 开启物理引擎
cc.director.getPhysicsManager().enabled = true;

// step2 配置物理引擎的重力
cc.director.getPhysicsManager().gravity = this.gravity;

// step3: 配置调试区域;
var Bits: any = cc.PhysicsManager.DrawBits;
cc.director.getPhysicsManager().debugDrawFlags = Bits.e_pairBit |
                                                 Bits.e_centerOfMassBit | 
                                                 Bits.e_jointBit | 
                                                 Bits.e_shapeBit;
*/

/*
 * 第005课TS物理引擎控制刚体移动
----------------------------------------
cc.Node有两个属性，node.rotation 和 node.angle
rotation 是顺时针
angle是 逆时针，数学上的角度一致
*/

/*
 * 第006课TypeScript实现地图滚动
----------------------------------------
为了遥感保持屏幕位置，所以用UI的摄像机来绘制遥感
用另一个camera来绘制坦克和地图

//计算摄像机和坦克的偏移向量
this.offset = this.camera.getPosition().sub(this.node.getPosition());
//让摄像机跟随坦克
this.camera.x = this.node.x + this.offset.x;
this.camera.y = this.node.y + this.offset.y;
*/



/*
 * 第007课TypeScript打包发布微信小游戏
----------------------------------------

*/
