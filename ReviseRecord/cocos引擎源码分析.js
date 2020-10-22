
/*
 * 031cocos2d-x HelloWorld项目

mainloop详解
https://www.zybuluo.com/womendeaiwoming/note/1072194


----------------------------------------

1.构造AppDelegate对象
2.app->run(){
    applicationDidFinishLaunching(){
        实例化director
        创建GLView

        设置是否显示窗口参数
        设置fps
        设置屏幕适配策略
        注册脚本依赖的包

        创建场景
        运行场景
    }
    
    GLView{
        到时间间隔就 mainLoop循环{
            处理逻辑
            绘制场景
        }
        没到就sleep(1)
    }
    结束游戏，释放资源
}


----------------------------------------

AppDelegate继承了Application
中有四个函数
initGLContextAttrs()设置窗口的属性
applicationDidFinishLaunching()初始化入口
applicationDidEnterBackground()进入后台
applicationWillEnterForeground()回到前台


director类
包含八大功能{
    1.OpenGLView对象
    2.场景载入切换等管理
    3.mainLoop游戏处理流程
    4.Action管理对象
    5.事件管理对象
    6.纹理管理
    7.摄像机管理
    8.系统调试信息
}

*/

/*
 * 032cocos2d-x引用计数的内存管理

内存管理基于引用计数
retain release

需要被管理的对象继承Ret类
CCNode继承Ret

类Ret {内部实现了引用计数
    对象初始化时引用计数=0
    retain引用计数+1
    release引用计数-1
    当引用计数为0时，销毁对象
}

节点创建的时候会放入自动释放池中
autorelease() 将节点放入自动释放池中
autoReleasePool对象,内部有一个vector数组，保存所有管理的Ref
会在游戏每帧循环结束后release池中的所有对象

poolManager来管理autoReleasePool
director在mainloop中drawScene后会 poolManager调用池子的clear()


引用计数{
    优点:开发人员只需要确保自己的模块是正常的就行，不需要担心别人的使用
    缺点:retain release如果不配对使用，内存泄漏不容易查找
}

*/


/*
 * 033cocos游戏引擎中重要的对象

director{
    场景管理
    事件处理
    Action处理
    内存回收池
    定时器处理
}

----------------------------------------
场景管理
基于场景栈
getRunningScene() 获取当前运行场景
pushScene() 这样可以保存多个场景数据
popScene() 回到上层场景
runWithScene()
replaceScene()
popToRootScene()
----------------------------------------
EventDispatcher
director初始化时构造，全局唯一实例
director.getEventDispatch()

addEventListenerWithSceneGraphPriority()添加事件监听
addEventListenerWithFixedPriority和addEventListenerWithSceneGraphPriority。
后者可以实现当节点销毁时，同时销毁添加的事件监听。

removeEventListener()删除事件监听
dispatchEvent() 发布一个系统事件
dispatchCustomEvent() 发布自定义事件
----------------------------------------
ActionManager
director初始化时构造，全局唯一实例
节点调用runAction()
ActionManager管理所有的动画
----------------------------------------
Scheduler
director初始化时构造，全局唯一实例


----------------------------------------
游戏场景元素
Ref类
|
node类
|
layer，sprite，label，scene


场景树模型
scene
|
layer
|
label,sprite...

----------------------------------------
游戏纹理管理
Image类-|
        |----Texture2D类-----TextureCache
        |----spriteFrame类---spriteFrameCache


CCImage类能将 jpg png等等文件解析到内存中
Texture2D类  游戏是基于openGL，所以将CCImage中的图像数据转成Texture2D类
TextureCache类是纹理管理对象 管理所有的openGL Texture2D对象,能够通过文件名称来找到对应的纹理

一张纹理大图中有很多的纹理小图
spriteFrame记录了小图的大小，位置信息，然后通过这个信息能从大图中截取到小图
spriteFrameCache 管理了所有的spriteFrame对象
----------------------------------------
常用存储数据对象{
    Value类
    Data类
    Vector类
    ValueMap类
}
----------------------------------------
平台支撑{
    FileUtils
    VideoPlayer
    audio类
    EditBox
    系统字体
}
----------------------------------------
开发工具支撑{
    cocos studio
    TiledMap
    Spine
    粒子系统
    物理引擎
}

*/

/*
 * 034cocos2d-x-Node基本属性与精灵Sprite

#include "cocos2d.h"
USING_NS_CC 使用CC的命名空间
CCASSERT(条件，输出log) 如果条件不成立，终止程序
----------------------------------------
这个是cocos c++公用的创建函数的宏定义
CREATE_FUNC(类名);
里边1. create对象 2.init对象 3.autorelease


setParent()
addChild(childNode)
场景的父亲节点为NULL
----------------------------------------
相对坐标系(使用相对父亲节点的坐标)
setPosition(Vec2)
Vec2初始化默认为(0,0)

锚点(anchorPoint)
锚点默认(0.5,0.5)

旋转(rotate)
1.绕锚点旋转
2.顺时针为正方向
3.旋转单位是度数，不是弧度
4.父节点旋转，子节点跟着旋转

缩放(scale)默认是1
setScale()
父节点缩放，子节点跟着缩放

*/


/*
 * 035cocos2d-x场景切换

带有引用计数的Vector
是cocos在std::vector加了引用计数
pushBack(obj)
popBack()
insert()
往里存会调用retain,删除调用release
----------------------------------------
场景管理
CCDirector中有场景栈
ccdirector调用runWithScene的时候push进场景栈
这事scene保存在场景栈中，这时场景栈会将引用计数+1
同时启动动画场景startAnimation

场景切换的时候，是先创建新场景nextScene，然后nextScene赋值给runningScene

当我们一开始启动场景的时候使用runwithScene
当替换场景的时候调用repleaseWithScene

*/

/*
 * 036cocos2d-x场景遍历
----------------------------------------
遍历场景
1.对所有的child根据localZorder以及全局的一个插入顺序 排序
2.遍历<0的孩子
3.遍历自己
4.遍历>0的孩子

主循环中每帧renderScene
在renderScene中调用场景的render，再调用visit
visit是node节点的函数，作用是以当前节点为节点树根节点
进行节点树的遍历

----------------------------------------
节点内存跟踪
1.节点树中的父亲节点的children Vector引用了节点的内存
如果是场景节点，则是场景栈引用了这个内存
2.节点从场景树中删除，就会从父亲节点的children Vector
里删除，所以会调用release，如果没有人retain，也就意味节点从内存中释放

*/


/*
 * 037cocos2d-x节点属性使用总结
----------------------------------------

获取节点的父亲节点
node->getParent()
场景没有根节点，所以场景的parent是NULL

获取节点的所有孩子节点
node->getChildren()

给节点命名
node->setName()
node->getName()

通过名称查找节点
node->getChildByName()
如果节点名称有同名，只返回第一个

通过tag标记查找，tag是一个整数
node->getChildByTag()
node->setTag()
node->getTag()
tag默认为0

localZorder orderOfArrival
孩子节点有相同的localZorder时，orderOfArrival小的先绘制
node->setLocalZOrder()
node->getLocalZOrder()

位置信息,相对坐标，相对于父亲节点锚点的坐标
node->setPosition()
node->setPositionX()
node->getPosition()

锚点
node->setAnchorPoint()

缩放
node->setScale()
node->setScaleX()

旋转 顺时针，绕锚点旋转,单位是度
node->setRotation()
node->getRotation()

可见性
node->setVisible()
node->isVisible()
作用在visit()函数中，如果visible是false直接不绘制

透明度 opacity 0-255
node->setOpacity()
修改父亲节点透明度不影响孩子节点透明度
除非调用了setCascadeOpacityEnabled()
调用之后，孩子节点的透明度也会作用于孩子

删除节点
node->removeFromParent()
node->removeAllChildren()
*/


/*
 * 038cocos2d-xScheduler源码分析
----------------------------------------
cocos的timer类型有三种
1.每帧调用一次
2.固定时间触发一次
3.一段时间后触发固定的n次

----------------------------------------
cocos回调函数
1.传统的回调函数，对象实例指针+对象函数地址

2.c++11新特性std::function对象作为回调函数
通过std::bind(成员函数地址，target实例)

timer抽象出一个函数trigger
不同的回调方式去实现trigger方式
这样就做到了timer支持两种回调方式


----------------------------------------
cocos Timer类
两个类继承了Timer
1.TimerTargetSelector 传统的触发方式
2.TimerTargetCallback c++11的std:function的触发方式
使用基类指针来管理子类实例


配置定时器，间隔时间，重复次数，延时的启动
setupTimerWithInterval(seconds, repeat, delay)

Timer有两个纯虚函数trigger cancel需要子类实现
cancel是取消定时器
trigger是触发一次，里边会调用callback

Timer类的成员函数update中，进行了定时器的具体实现


director有一个全局的定时器Scheduler管理模块
每帧都会去遍历保存的所有的Scheduler

node->scheduleUpdate()中让全局定时器Scheduler调用
scheduleUpdate()，同时将callback传递进去
全局定时器Scheduler调用了schedulePerFrame,然后
将callback等信息保存在一个hash表中

mainLoop中每帧 全局定时器Scheduler会update，其中
先调用hash表中node的update()
之后遍历整个timer表

----------------------------------------
cocos提供了一组宏,利用的c++11新特性 用来生成callback
CC_CALLBACK_0(target, bind的对象, 回调传递的参数)
CC_CALLBACK_1
CC_CALLBACK_2
CC_CALLBACK_3

这里的0，1，2，3指的是CC_CALLBACK_0的this不是参数，
而是执行这个回调函数的具体对象 然后，这个0也不能理解成多少个参数，
而是指的占位符，比如某个回调函数有5个参数，
如add（int，int，int，int，int）， 
然后用CC_CALLBACK_2占上前两个参数，给后面三个参数绑定，
可以写成 CC_CALLBACK_2(LogicTest::add, this,15,15,15); 
得到的func以后使用的时候直接给前两个参数赋值就ok

如果回调函数的参数不进行绑定，那么回调有几个参数，就用CC_CALLBACK_几
*/



/*
 * 039cocos2d-xAction源码分析
----------------------------------------
Action类型
1.ActionInterval持续一段时间的动画
2.ActionInstant瞬间动画


----------------------------------------
Action中重要接口

判断动作是否完成
isDone()

将动画作用在一个节点上
startWithTarget(node)
停止动画运行
stop()

step(float dt)
update(float process)


setTag()
getTag()

----------------------------------------
FiniteTimeAction 继承Action类
FiniteTimeAction有一个成员duration

ActionInterval继承FiniteTimeAction类


ActionManager全局的动画管理，direator持有
在创建出ActionManager之后，就启动了定时器，
每帧去执行ActionManager的update()

node->runAction(动作)
内部 ActionManager->addAction
将action动画和node加入到动画管理来
ActionManager有一个hash表，保存了所有的绑定了action的target

添加动画的时候会去查找hash表的所有target有没有对应的element，没有就创建添加到hash表中
然后将对应的action添加到对应target的动画数组中
hash{
    target1{
        action1
        action2
    }
}

在ActionManager的update()中，遍历hash表，取出每一个target
然后继续遍历每一个target上的action，执行action的step()方法，
step()中调用了动画自身的update，当执行完后删除target中的action
当target中的所有action都执行完后，hash表中删除target
不同的间隔动画实现了自己的update


node->stopAction()
node->stopAllActions()
node->stopActionByTag()
删除的时候会使用标记延后删除，防止动画正在执行的时候，对象被释放

*/


/*
 * 039cocos2d-xAction源码分析
----------------------------------------
Position控制Action
1:MoveTo： 直线移动到目标位置(相对坐标)
2:MoveBy: 从当前的位置开始移动多少距离(dx, dy),
如果为正，就是向右/上,为负 左/下

----------------------------------------
Rotate控制Action
1:RotateBy:单位为度，顺时针为正，区别于数学的逆
时针为正,在原来的基础上旋转多少角度，角度的变化,
顺时针为正，逆时针就为负
2:RotateTo:单位为度,从当前角度旋转到目标角度，
-180, --> 180, 60, --> -60

----------------------------------------
Scale控制Action
1:ScaleBy与ScaleTo一样都是变换到目标比例
2:ScaleTo, 在xxx时间内变换到Scale的目标值

----------------------------------------
Opacity控制Action
1:FadeIn
2:FadeOut
3:FadeTo

----------------------------------------
回调函数Action
1:CallFunc,运行这个Action了以后，
在下一个帧的时候执行这个回掉函数,不是马上执行
runAction完了以后的下一个帧来执行这个函数

----------------------------------------
序列化Action
1:Sequence

延时
DelayTime

----------------------------------------
循环控制Action
1:Repeat
2:RepeatForever
*/


/*
 * 041cocos2d-x游戏引擎事件管理源码分析
----------------------------------------
eventDispatcher 事件派送管理
在director中创建持有

EventListener
EventListenerTouchOneByOne 子类 单点触摸的事件


事件派送中添加了一个事件的监听
node->eventDispatcher->addEventListenerWithFixedPriority(event, priority)
node->eventDispatcher->addCustomEventListener()

EventListener有很多事件类型，大致有两类，系统事件，用户事件


EventDispatcher事件管理有一个容器,监听表
listenerMap{
    listenerID1{
        listener1
        listener2
    }
    listenerID2{
    }
}
监听表以事件的id为key，每个事件都有对其监听的一组listener

添加事件监听的时候addEventListener就是去查找表中的事件id，
如有有，就push到对应事件id的队列中，没有就重新new一个，然后添加到队列中

当添加的事件FixedPriority是0的时候，是以node作为索引建立一个map
map里存放了监听对象L1,L2...

----------------------------------------
EventTouch 继承Event
引擎底层用GLView 实现了触摸事件的调用，当有触摸事件发生时
调用对应的handleTouchBegin等回调函数，回调函数内部生成一个EventTouch事件
然后调用EventDispatcher 进行事件的分发

在dispatchEvent阶段，判断事件类型，然后调用不同的事件分发
比如触摸事件，调用dispatchTouchEvent
先对监听者根据优先级priority进行排序，然后遍历所有的监听者
调用所有的listener的回调函数

在touchBegin的回调中，返回值是bool，如果返回了ture，后续的
touchMove和touchEnded才会继续监听，返回false只响应touchBegin

----------------------------------------
自定义事件的使用:
EventListenerCustom
将事件名称和回调函数绑定在一起，
然后调用addCustomEventListener添加进EventDispatcher
当然也可以使用addEventListenerWithFixedPriority添加监听

节点dispatchCustomEvent事件，然后发送事件名称和事件的参数userdata
事件中心生成一个EventCustom事件，然后根据id找到监听者，然后调用监听者的回调函数
*/


/*
 * 042cocos2d-x事件响应经典使用制作ImageButton
----------------------------------------
视频讲了button的实现原理和代码
几个按钮的状态，触摸的区域判断，禁用

*/

/*
 * 043Sprite_SpriteFrame_Texture源码分析
----------------------------------------
显示一个sprite，需要texture 和 rect
rect去显示对应texture的一个区域

step1.通过image对象将png，jpg等文件的数据解码
step2.成一个图像的数据存到内存中
step3.转成openGL可以使用的纹理对象Texture2D
step4.加入到一个textureCache的管理模块中
step5.调用openGL将纹理的矩形区域绘制到屏幕上

textureCache保存了所有的加载过的纹理对象
是全局唯一，director中包含

一个纹理只有一个对应的纹理对象
当sprite创建的时候，通过TextureCache查找文件对应的纹理
TextureCache有一个map，映射了texture2D和文件路径
如果纹理已经存在，则直接返回纹理对象，如果没有，则创建一个Image对象
负责图像的解码，然后将图像解码到内存中，然后将解码好的图像数据存入到texture2d对象中

----------------------------------------
由于一次加载比多次加载性能要好，所以尽量用大图加载
atlas图集，将多张小图打成一张大图，打包后，会生成两个文件
一个大图png，一个plist，plist中保存了小图对应的位置和尺寸
这种小图在大图中的信息叫spriteFrame
spriteFrame保存了两个信息，一个大图的texture2d的指针，一个Rect位置信息

所以sprite有对应的接口 createWithSpriteFrameName()
这时会去spriteFrameCache中查找是否有对应的spriteFrame
如果没有，就会去加载大图的texture2d，然后用texture2d来创建对应的
小图的spriteFrame，存入spriteFrameCache的表中

删除了spriteFrame也不会将对应的texture2d删除，只会从spriteFrameCache字典中删除

----------------------------------------
plist的加载与删除
addSpriteFramesWithFileName()
removeSpriteFramesFromFile()

想要将texture从内存中删除掉，要先调用removeUnUsedSpriteFrame()
然后调用removeUnUsedTexture()
这是因为spriteFrame在创建的时候会对引用的texture retain,
所以如果不先把spriteFrame删除掉，对应texture的引用计数永远大于1

*/


/*
 * 044TexturePacker工具的使用与SpriteFrame的使用
----------------------------------------
TexturePacker，可以将小图打为大图
TextureUnPacker，可以将大图打散为小图

trim mode 去掉图周围的透明部分去掉
如果是制作帧动画的时候，如果使用trim mode，可能去掉透明部分后，位置会发生便宜

使用POT模式，图集尺寸按照2的n次方

----------------------------------------
将图集加载到内存中
spriteFrame = SpriteFrameCache->addSpriteFramesWithFile(path)
用spriteFrame创建sprite


*/

/*
 * 045Label的使用与源码分析
----------------------------------------
openGL不擅长处理文字，它是把文字转成了纹理去绘制

label有四种{
    系统字体
    用户自带的ttf字库
    BMPFont美术字
    CharMap美术字
}


----------------------------------------
系统字体:
调用不同系统平台的API函数，使用系统的字库，将文字绘制到
Texture2D对象里面，创建一个sprite，从而显示出Label
Label::createWithSystemFont()

这里边，比如安卓平台，是调用安卓的api,
java先绘制到Bitmap中，然后将java的Bitmap转成JBiteArray
然后在将JBiteArray拷贝到c++中的data对象中，最后将data转为texture2d对象
最后由openGL创建sprite，所以效率比较低



----------------------------------------
用户自带的ttf字库:
1:自己必须要带一个矢量字库到游戏中;
2:使用freeType库将矢量字读出，并绘Texture2D;
Label::createWithTTF()

内部绘制的时候，将ttf读入到FreeType中，保存了字的图片和下一个字的宽度
然后将需要绘制的字符使用SpriteBacthNode批量绘制


----------------------------------------
BMPFont美术字:
1:专业的字体制作工具，它将用户选定好的字，和参数绘制到纹理上，并生成一个映射表，
每个文字对应大图上的小图,以及文字的大小等排版信息;
2:绘制的时候根据这个文字的内容绘制单个文字的图片;
Label::createWithBMFont()

实际上类似图集，,先创建一个FontAtlas,所以是批量渲染

----------------------------------------
CharMap美术字:
1:美术将文字排号，生成一个图片,要求图片里的文字的字符的编码必须是连续的，并且字体一定是等宽字。
Label::createWithCharMap()

----------------------------------------
四种文字的优点与缺点:
1:系统字:
      优点:省资源，不需要额外再自带字库等。
        缺点: 性能不如其他的高,绘制大量文字的时候成为速度的瓶颈;
2:自带字库文字:
      优点:可以使用特殊效果的字体，绘制出效果好的字。
           缺点:性能一般,资源大，需要带一个字库文件
3:BMPFont:
      优点:性能高，绘制出效果好,几乎可以做任何效果的文字。
      缺点:能使用的文字的个数是有限的。
4:CharMap:
      优点:性能高，绘制出效果好,几乎可以做任何效果的文字,制作简单。
      缺点:能使用的文字的个数是有限,必须是连续的字符，必须是等宽字体。


*/



/*
 * 046FileUitls使用与源码分析
----------------------------------------
FileUtils读写文件:
为什么不直接使用传统的文件读写?
       1:手机操作系统为了安全，文件读写不同于电脑,有严格的权限控制;
       2:android手机操作系统为了省空间，将安装包的资源打入了一个压缩包。 
       3:手机存放文件的目录比较多(安装包里，APP可写目录，SD卡目录)，所以添加了搜索路径,类是与电脑的Path。

----------------------------------------
FileUtils全局唯一对象:
FileUtils::getInstance()，new的是平台相关的继承于
FileUtils对象的对象，例如FileUtilsWin32等。
android: CCFileUtils-android.cpp;
windows: CCFileUitls-Win32.cpp;
common: CCFileUtils.h 里面的接口，由各平台自己实现

不同平台继承了CCFileUtils类，实现不同平台的文件操作功能
引擎使用的时候，实例化了不同平台的子类，用基类的指针进行操作，实现多态
        CCFileUtils
        |
|--------------------|
CCFileUitls-Win32    CCFileUtils-android

----------------------------------------
搜索路径Search Path
1:类似于电脑里面的Path环境变量，用户传来的相对路径,
结合这些搜索Path,组成一个绝对路径;
2:相对路径: xxxxxx/xxxxxx/xxxxx;
3:绝对路径: /xxxxxx/xxxxxx/xxxxxx;

obb目录

----------------------------------------
可写目录:
FileUtils::getWriteablePath,返回这个APP的可写目录,
手机的读写权限有严格的限制，所以，如果要写文件必须要
到可写目录；

1：如果是要写文件，一定要使用 getWritePathxxxx + 路径
不能用相对路径，不然在手机上，无法使用。

----------------------------------------
FileUtils加载文件
1.先判断文件路径，相对路劲还是绝对路径，找到文件所在的路径后(android除了绝对
    路径以外，还有一个'assets/'作为文件路径),如果找到多个同名的路径，就返回先找到的
    用户也可以添加搜索路径  FileUtils::addSearchPath()
2.然后打开文件，如果是在apk包外，用c++的 Ffile打开
如果在assets下需要用安卓的方法打开文件
如果是obb路径，是安卓特有的存放技术，当资源放在assets目录下，资源会打包在apk里
放在obb路径下，相当于分包，需要使用ZipFile来加载资源，可以用于更新资源包，但是不推荐用

----------------------------------------
读取数据:
1:从安装包的zip压缩包里面读取;
2:普通的模式的读取使用标准C函数
3:FileUtils线程不安全;

*/


/*
 * 047帧动画与骨骼动画使用
----------------------------------------
帧动画的原理:
1:帧动画是一组“相关联”图片，在很短的时间内，播放切换，让大脑认为是连续的;
2:帧动画的优点: 最高效,最简单的动画形式；
3:帧动画的缺点: 资源占用过大;

----------------------------------------
骨骼动画:
原理:将一个模型，根据动画的需求分成一些骨骼,将这些
骨骼通过工具，在不同的时间点来调整骨骼的位置等信息，
将这些时间点连续的播放形成动画;

优点:资源占用少；
缺点: 播放的性能比帧动画差;

骨骼动画文件: 骨骼的图片xxx.png,
骨骼动画的图片位置信息atlas文件xxx.atlas, 
骨骼动画时间轴文件xxx.json

SkeletonAnimation::createWithFile()
spine->setAnimation(动作管道，动作名称，是否循环)
spine->addAnimation(动作管道，动作名称，是否循环)
setAnimation是将当前动作管道的动作清空然后播放动作
addAnimation是在当前动作管道的动作之后添加一个动作

spine->clearTrack(动作管道) 立刻清除管道的所有动作
spine->clearTracks() 停掉所有的动作

spine可以设置很多listener的监听

*/


/*
 * 048帧动画的几种模式编码与实现
----------------------------------------
两种帧动画的播放模式
1.图片是顺序播放的
2.帧动画播放的时候图片路径是由数组传入，然后按数组的顺序播放

*/


/*
 * 049Tiled地图编辑器的使用与分析
----------------------------------------
地图编辑使用的工具是SmoothDraw

地图包含两块
1.地图形状
2.地图数据（地图连通性，路径，npc等等的位置信息）

TiledMap有多个图层
最后生成xxx.tmx文件，其实是一个类似xml的字典

cocos提供了 TMXTiledMap
TMXTiledMap继承自Node
TMXTiledMap{
    TMXLayer1
    TMXLayer2...图层
    TMXObjectGroup 存放一些类似npc的信息的群组{
        npc1
        npc2...是一个ValueMap，记录了x,y,width,gid,type等等信息
    }
}

1.先将文件读入到内存中，加载到TMXMapInfo中
用TMXMapInfo来构建TMXTiledMap，生成TMXTiledLayer，也就是瓦片图层
获得layers，然后生成TMXLayer(地图图层)，图层里的每个块都是一个sprite

*/



/*
 * 050游戏遥感的制作与三角函数的使用
----------------------------------------


1.遥感中心原点
监听触摸事件

当按下的点和中心点小于半径，就认为遥感有效

然后移动遥感的时候，计算角度，当在半径内，直接设置遥感的按钮位置
超过半径，设为半径的长度，然后角度相等，传递触摸移动事件

当松开的时候，遥感恢复到原点

2.传递的事件包括触摸的角度之类的
然后小人进行监听
然后x,y按照角度方向移动，同时判断边界或者障碍等
人物的动画角度可能有8个或者4个所以，角度要转换成8方向等

*/


/*
 * 051Camera原理与源码分析
----------------------------------------
openGL的绘制流水线
1.摆放好摄像机
2.拍摄成一张照片，设置照片的大小为屏幕大小
3.显示到屏幕上

----------------------------------------
cocos和openGL是右手坐标系
屏幕外侧是z轴正方向

----------------------------------------
摄像机种类
1.透视摄像机
类似人眼的效果一样
成像的时候相当于是要去掉z轴坐标
把3d的点映射到 z=0 的平面上
近处的比远处的点要大

2.正交摄像机
直接1对1的垂直的映射到z=0的平面上
近处的点和远处的点是一样大的

----------------------------------------
cocos为每个Scene架设了一个默认的摄像机
视角是60度，投射点是屏幕中心点
所以摄像机的z轴高度是 屏幕宽度/2 * √￣3，要投影成手机屏幕的大小

在Scene的构造函数中 创建了一个default Camera
设置了eye的高度，近面，远面，等等



每个摄像机会有CameraFlag
每个node会有一个CamerMask
CameraFlag & CamerMask来判断这个摄像机是否可见这个节点

----------------------------------------
Scene渲染 render，会遍历所有的摄像机
每一个摄像机都会拍摄一张图片到屏幕
visit的时候，会判断当前这个摄像机会判断CameraFlag & CamerMask
只有摄像机可见的时候，node才会调用draw绘制出来

所以多个摄像机会绘制同一个节点的多次
----------------------------------------
创建一个正交摄像机
Camera*c = Camera::createOrthographic(参数)
c->setCameraFlag()
node->setCameraMask()

----------------------------------------
可以通过移动摄像机跟着主角的角度走
就可以实现地图的滚动
*/