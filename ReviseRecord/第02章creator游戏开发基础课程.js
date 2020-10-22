
/*
 * 第001课初识creator
----------------------------------------
资源需要代码加载的话，需要放到resources目录下
如果不需要的话放到res下

因为放到resources目录下，编译的时候，打包出来的包
里settings.js会存资源的信息，会很大

在.gitignore文件下
Fireball Projects下的 library/ temp/ local/ build/ 都是可以删掉的

----------------------------------------
cocos creator分两种代码：组件代码和模块代码

cc.Class()封装了一个继承的方法
组件要继承cc.Component类
cc.Class({
	extends: cc.Component,
	properties:{
		//属性列表，能绑定到编辑器上
	}
})
*/

/*
 * 第002课cc.Node(一)场景树
----------------------------------------
cc.Node属性
1:  name: 获取节点的名字
2:  active: 设置节点的可见性;
3:  position: 相对坐标,参照物是父亲节点;
4:  rotation: 旋转,顺时针为正, 数学逆时针为正;
5:  scale:  缩放;
6:  anchor: 锚点, 左下角(0, 0), 右上角(1, 1) 可以超过这个范围可以
7:  Size: 大小
8:  Color: 环境颜色;
9:  Opacity: 透明度, 和active不影响，Opacity = 0其实node还在运行
10: Skew: 扭曲;
11: Group: 分组;//主要用于碰撞检测
12: parent: 父亲节点的cc.Node;
13: children/childrenCount: 孩子节点的数组;
14: tag : 节点标签; //2.0以后被废除
成员方法 isVaild() //判断在C++层节点是否存在

----------------------------------------
cc.Component 
1:所有的组件都扩展自cc.Component(类, 构造函数);
2:每个cc.Component组件实例都有个成员node,指向它关联节点的cc.Node;
3: name: 每一个cc.Component组件通过name属性可以获得节点的名字; 

组件生命周期回调函数：

onLoad：脚本组件绑定的节点所在场景加载时系统回调一次
		（或者节点active从false变为true时系统回调一次）。
		可在这里获取场景中其它节点，并可以初始化一些不常改变的属性。
start：只在第一次update前系统回调一次。这里可以初始化一些经常改变的属性。
update(dt)：每一帧渲染前系统回调，主要用于处理逻辑。dt为上一帧到当前帧时间ms间隔。
lateUpdate(dt)：每一帧渲染后系统回调，用于处理逻辑。dt为上一帧到当前帧时间ms间隔。
onDestroy：组件或者节点调用了destroy()函数，在帧结束时系统回调。
			或者场景切换或销毁时系统回调。主要用于资源回收。
onEnable：组件的enabled从false变为true是系统回调一次；
			节点active从false变为true时系统回调一次。
onDisable：和onEnable相反。
 
----------------------------------------
代码组件 
1:每个代码组件实例都继承自cc.Component(构造函数),所以有一个node数据成员指向cc.Node;
2: cc.Class({...}) 定义导出了一个新的类的构造函数，它继承自cc.Component;
3: 当为每个节点添加组件的时候,会实例化(new)这个组件类，生成一个组件实例;(js语法new)
4: 当组件加载运行的时候，代码函数里面的this指向这个组件的实例;
5: 代码组件在挂载的时候扩展自cc.Component, 里面有个成员node会指向节点(cc.Node);
    所以在代码组件里面，可以使用this.node来访问这个组件实例说挂载的节点对象;
6: 代码里访问cc.Node总要属性;

----------------------------------------
cc.Node场景树相关方法
1: 代码中创建一个节点new cc.Node();
1: addChild; 加一个子节点
2: removeFromParent/ removeAllChildren;
3: setLocalZOrder/ 绘制顺序, 在下面的会绘制在屏幕的上面;
4: 遍历节点的子节点，可以for of，也可以用遍历数组的方法;
5: setPosition/getPosition, 
6: getChildByName/getChildByTag, getChildByIndex,
7: cc.find(): 全局搜索，方便，不通用, 消耗 cc.find('Canvas/xxx/xxx')

场景的Canvas节点没有parent
*/

/*
 * 第003课cc.Node(二)事件响应
----------------------------------------
触摸事件
1: 触摸事件类型: cc.Node.EventType.TOUCH_START, MOVED, ENDED(物体内), CANCEL(物体外);
2: 监听触摸事件: node.on(类型, callback, target(回掉函数的this), [useCapture捕获]);
3: 关闭触摸事件: node.off(类型, callback, target(回掉函数的this), [useCapture]);
4: node.targetOff (target): 移除target所有的注册事件;
5: 回掉函数的参数设置  function(t(cc.Touch))
6: cc.Touch: getLocation返回触摸的位置(屏幕坐标);getDelta返回距离上次的偏移;
7: cc.Event: stopPropagationImmediate/stopPropagation 停止事件的传递;
8: 事件冒泡: 触摸事件支持节点树的事件冒泡,会从当前前天往上一层一层的向父节点传送;
9: 完成物体跟随手指触摸的案例;

----------------------------------------
键盘事件
1: cc.systemEvent.on(type, function, target, useCapture);
   type: cc.SystemEvent.EventType.KEY_DOWN  按键按下;
             cc.SystemEvent.EventType.KEY_UP 按键弹起; 
2: cc.systemEvent.on(type, function, target, useCapture);
3: 监听的时候，我们需要一个cc.SystemEvent类的实例，我们有一个全局的实例cc.systemEvent,小写开头
4: 键盘回掉函数: function(event) {
      event.keyCode [cc.KEY.left, ...cc.KEY.xxxx]

----------------------------------------
自定义事件
1: 监听: this.node.on(“自定义事件名称”, function, target, useCapture);
2: 自派送: emit(“事件名称”, [detail]); 派发者,只能传递给自己,不会向上传递;
3: 冒泡派送: dispatchEvent(new cc.Event.EventCustom(“name”, 是否冒泡传递));

this.node.on("pkg_event", function(e){
	console.log("recv pkg_event", e.detail);
}, this);

// 派发者,只能传递给自己,不会向上传递
this.node.emit("pkg_event", {blake: "huang"});
// end  

// 派送者，不只是发给自己，发给我们这个体系;
// true/false, true向上传递, false不向向上传递
var e = new cc.Event.EventCustom("pkg_event", true);
e.detail = {blake: "huang"};
this.node.dispatchEvent(e);
*/


/*
 * 第004课cc.Node(三)坐标空间的转换
----------------------------------------
cc.Vec2
1: cc.Vec2 二维向量坐标, 表结构{x: 120,  y: 120};    
	cc.v2(x, y) 创建一个二维向量 cc.p() 创建一个二维向量
2: cc.pSub(dst, src): 向量相减 dst - src
3: cc.pAdd: 向量相加;
4: cc.pLength: 向量长度;

----------------------------------------
cc.Size/cc.Rect
1: cc.Size: 包含宽度和高度信息的对象 {width: 100, height: 100};
2: new cc.Size(w, h), cc.size(w, h)创建一个 大小对象;
3: cc.Rect: 矩形对象 new cc.Rect(x, y, w, h); cc.rect(x, y, w, h); {x, y, width, height}
4: contains(Point): 点是否在矩形内; rect.contains(pos);
5: intersects : 两个矩形是否相交; rect1.intersects(rect2);

cc.size 被弃用，用cc.vec2替代
----------------------------------------
creator坐标系
1: 世界(屏幕)坐标系; 原点在左下角
2: 相对(节点)坐标系,两种相对节点原点的方式(1) 左下角为原点, (2) 锚点为原点(AR)
3: 节点坐标和屏幕坐标的相互转换; 我们到底使用哪个？通常情况下带AR;
	node.convertToWorldSpace(cc.p(0, 0))//节点的坐标转到屏幕的坐标,node的左下角为原点
	node.convertToWorldSpaceAR(cc.p(0, 0));//节点的坐标转到屏幕的坐标,node的锚点为原点

	node.convertToNodeSpace(w_pos);
	node.convertToNodeSpaceAR(w_pos);
	所以不带AR，就是以节点左下角为原点来转换，带AR就是以锚点为原点进行转换
4: 获取在父亲节点坐标系下(AR为原点)的节点包围盒;
	node.getBoundingBox()
5: 获取在世界坐标系下的节点包围盒;
	node.getBoundingBoxToWorld()
6: 触摸事件对象世界坐标与节点坐标的转换;
	node.convertTouchToNodeSpaceAR(touch)，内部其实也是调用convertToNodeSpaceAR


// 我要把节点移动到世界坐标为 900, 600;
// 把世界坐标转到相对于它的父亲节点的坐标
var node_pos = this.node.parent.convertToNodeSpaceAR(cc.p(900, 600));
this.node.setPosition(node_pos); // 相对于this.node.parent这个为参照物,AR为原点的坐标系
// end 
// 获取当前节点的世界坐标;
this.node.convertToWorldSpaceAR(cc.p(0, 0));

*/


/*
 * 第005课cc.Node(四)Action的使用
----------------------------------------
1:  Action类是动作命令，我们创建Action,然后节点运行action就能够执行Action的动作;
2:  Action分为两类: (1) 瞬时就完成的ActionInstant, (2) 要一段时间后才能完成ActionIntervial;
3:  cc.Node runAction: 节点运行action; node.runAction(action);
4:  cc.moveTo, cc.moveBy  To: 目标 By: 变化
5:  cc.roateBy, cc.rotateTo,
6:  cc.scaleBy, cc.scaleTo,
	// this.node.scale = 2;
	// var sby = cc.scaleBy(1, 1.1); // 原来的基础，变化1.1 * 2
	// this.node.runAction(sby);

7:  cc.fadeOut(淡出), cc.fadeIn(淡入):  cc.fadeTo();
8:  cc.callFunc, cc.delayTime
	// function Action
	var func = cc.callFunc(function() {
		console.log("call Func actin!!!!!");
	}.bind(this));
	let func = cc.callFunc(()=>{
		console.log("call Func actin!!!!!");
	})

9:  cc.sequnce, cc.repeat, cc.repeatForever 
    var seq = cc.sequence([action1, action2]);

10: Action easing(缓动的方式):  加上缓动特效, cc.easeXXXXX查看文档设置自己想要的缓动对象
	cc.moveTo(1, 100, 0).easing(cc.easeBackOut());

11: stopAction: 停止运行action
12: stopAllActions: 停止所有的action;
*/


/*
 * 第006课cc.Component的使用详解
----------------------------------------
cc.Component属性
1: 组件类: 所有组件的基类;
2: node: 指向这个组件实例所挂载的这个节点(cc.Node);
3: name: 这个组件实例所挂载的节点的名字<组件的名字>; this.node.name 是节点的名字，两个不一样
4: properties: { 
    } 属性列表;
    (1) name: value, 数,bool, 字符串;
    (2) 位置,颜色, 大小:  cc.p(0, 0), cc.color(0, 0), cc.size(100, 100)
    (3) 组件: {
           type: 组件类型, 系统类型，也可以require自己编写的组件类型
           default: null or [] 
     }
    (4)其他: 打开cocos creator源码，找到参考，然后移动到你的代码里面;

----------------------------------------
组件添加查找删除
1: addComponent(组件的类型): 向节点上添加一个组件实例, 返回添加好的组件实例;
2: getComponent(组件类型): 查找一个为指定类型的组件实例(如果有多个，第一个匹配);
3: getComponents(组件类型): 查找这个节点上所有这个类型的组件实例;
    [inst1, inst2, inst3, ...]
4: getComponentInChildren(组件类型):  在自己与孩子节点里面查找;
5: getComponentsInChildren (组件类型): 在自己与孩子节点里面查找;
6: destroy(): 从节点中删除这个组件的实例，组件删除的时候触发onDisable 和 onDestory;

----------------------------------------
Shedule定时器操作
1: sheduleOnce(函数, time): time秒后启动一次定时器;
2: schedule(函数, time, 次数,  多长时间后开始); 执行的次数为(次数 + 1)， cc.macro.REPEAT_FOREVER
3: unschedule(函数); // 取消这个定时器操作;
5: unscheduleAllCallbacks  取消所有的定时器操作;
注意，如果节点或组件没有激活是不会调用的;

*/


/*
 * 第007课Sprite组件的使用详解
----------------------------------------
cc.Sprite
1: 游戏中显示一个图片，通常我们把这个叫做”精灵” sprite
2: cocos creator如果需要显示一个图片，那么需要在节点上挂一个精灵组件,
	为这个组件指定要显示的图片(SpriteFrame)
3: 显示一个图片的步骤:
	(1) 创建一个节点;
	(2) 添加一个组件;
	(3) 要显示的图片(SpriteFrame)拖动到SpriteFrame;
	(4) 配置图片的SIZE_MODE:  
		a: CUSTOM 图片显示的大小和CCNode的Size大小一致;
		b: RAW 原始的图片大小，一旦改变节点大小，又会变为CUSTOM;
		c: TRIMMED 大小为原始图片大小, 显示的内容是裁剪掉透明像素后的图片;
		就是裁剪了透明部分，又把尺寸放大到原来没裁剪的大小
	(5) trim: 是否裁剪掉 图片的透明区域, 如果勾选，就会把完全透明的行和列裁掉, 
		做帧动画的时候，我们一般是用原始大小不去透明度,动画，不至于抖动;
	4: 精灵更换spriteFrame;
	 	sprite组件.spriteFrame = newSpriteFrame
5: 快捷创建带精灵组件的节点;

****todo blend SRC_ALPHA
src blend factor 图像混合模式
dst blend factor 背景图像混合模式

混合的时候就是src alpha*percent + dst alpha*(1-percent)

----------------------------------------
图片模式type
1:  simple: 精灵最普通的模式, 选择该模式后,图片将缩放到指定的大小;
2:  Tiled: 平铺模式, 图片以平铺的模式，铺地板砖的模式，铺到目标大小上;
3:  Slice: 九宫格模式，指定拉伸区域; 点图片的编辑，可以添加九宫格的区域大小
4:  Filled: 设置填充的方式(圆，矩形，横向，纵向)，可以使用比例来裁剪显示图片(只显示的比例);
	FillType (圆Radius，矩形，横向，纵向)
	FillCenter,FillStart,FillRange

*/


/*
 * 第008课Button组件使用详解
----------------------------------------
cc.Button
1:添加按钮的方法
	(1)直接创建带Button组件的节点;
	(2)先创建节点，再添加组件;
2:按钮组件, 按钮是游戏中最常用的组件, 点击然后响应事件;
3: 按钮的过渡效果Transition:
	过渡: 普通状态, 鼠标滑动到物体上, 按下状态, 禁用状态
	(1)NONE 没有过渡，只有响应事件;
	(2)Color 颜色过渡, 过渡效果中使用颜色,Normal,Pressed,Hover(鼠标滑动到物体上),Disabled;
	(3)SPRITE 精灵过渡，使用图片过渡;
	(4)SCALE 缩放过渡, 选项，在disable的时候是否置灰;
4: 按钮禁用;
	enableAuto属性为true的时候，button的 interactable属性 false可以
	控制shader将button置灰，并且禁用状态
5: 按钮添加响应事件 --> 节点-->组件 --> 代码的函数;
	组件的ClickEvent上关联脚本中的函数
6: 按钮传递自定义参数; ---> 字符串对象;
	CustomEventData
7: Button响应这个触摸点击，所以Button所挂的这个节点，一定要有大小,如果你向大小(0, 0)的节点上，挂一个Button,这个是无法响应点击事件;

----------------------------------------
1: 代码添加/获取cc.Button组件;
	button = this.node.getChildByName("xxx").getComponent(cc.Button); 
	button = this.node.getChildByName("xxx").addComponent(cc.Button);
2: 代码里面添加按钮的响应事件;
3: 代码触发按钮指定的回掉函数;
4: Component.EventHandler
	var eventHandler = new cc.Component.EventHandler();
	eventHandler.target = newTarget; //节点
	eventHandler.component = "componentName"; //节点上的脚本组件名称
	eventHandler.handler = "OnClick"; //回调函数 
	eventHandler.customEventData = "my data"; //传递的参数
	button.clickEvents.push(eventHandler);

	//代码触发按钮事件
	eventHandler.emit(["param1", "param2", ....]);

	var click_events = button.clickEvents;
	for(var i = 0; i < click_events.length; i ++) {
		var comp_env_handle = click_events[i];
		// 在代码里面触发按钮的响应函数
		comp_env_handle.emit(["", "paramxxx"]);
	}

*/


/*
 * 第009课Label组件使用详解
----------------------------------------
cc.Label
1:cc.Label是显示文字的组件;
2:cc.Label属性面板:
	String: 文本显示的内容;
	Horiznotal: 水平对齐的方式: 左 右 居中;
	Vertial: 上, 下, 居中, 字与行的排版
	Font Size: 字体大小;
	LineHeight: 每行的高度;
	OverFlow:文字排版: 
		None: 没有任何特性; 
		Clamp: 超过node大小范围的截断不显示; 
		Shrink:自动缩放到节点大小;  
		Resize Height: 根据宽度自动折行;
	Font: ttf字库文件, 位图字体字库文件;
	Font Family: 字体家族,使用系统的哪种字库;
	Use System Font: 是否使用系统字体;
3: Label节点所在的锚点修改;
      
----------------------------------------
自定义字库
1: 准备好字体文件 .ttf矢量字库;
	使用矢量字体 , 优点: 灵活方便，缺点:字库文件占资源

2: 使用字体制作工具生成位图字体;
	使用位图字体;

3: 位图字体的优点与缺点:
	速度快，文件小;   支持的字符个数是有限的;

4: 自定义ttf字库与自定义位图字库: 个性化我们的字体,个性化系统没有的字库;
	自定义ttf字库，字符不限制，你这个字库里面有多少字符，就会支持, 灵活,占空间比较大
	位图字库, 字符的个数是有限制的，省空间

----------------------------------------
代码使用cc.Label
1: 代码中获取cc.Label组件;
2: 代码绑定cc.Label组件到编辑器;
	node.addComponent(cc.Label)
3: 修改cc.Label的文字内容:  label.string = “xxxxxxxxxx”;

----------------------------------------
1:  添加富文本组件;
2: 设置富文本的字符内容;
	<color=#0fffff>Text</color> 指定文字的颜色;
	<img src='cow1_1'/>   img标签,文本插入图片，图片要在指定的图集里面;
	u: 给文本加下划线
	i: 用斜体来渲染, b: 用粗体来渲染
	size: 指定字体渲染大小，大小值必须是一个整数 <size=30>enlarge me</size>
    outline: 设置文本的描边颜色和描边宽度 <outline color=red width=4>A label with outline</outline>
    
*/

/*
 * 第010课AudioSource组件的使用
----------------------------------------
cc.AudioSource
1:AudioSource组件是音频源组件, 发出声音的源头;
2: AudioSource组件面板:
	clip: 声源的播放的音频对象: AudioClip, mp3, wav, ogg,
	volume: 音量大小, [0, 1]百分比
	mute: 是否静音;
	Loop: 是否循环播放;
	Play on Load: 是否在组件加载的时候播放;
	Preload: 是否预先加载;

----------------------------------------
cc.AudioClip对象
1: 音频剪辑对象，支持的格式有mp3, wav, ogg
2: 可以在编辑器上手动关联,生成AudioCip对象;
3: 可以通过代码加载AudioCip;  (资源加载详细讲解);

----------------------------------------
AudioSource代码使用
1: 代码中获得cc.AudioSource组件: 
	编辑器关联; 
	代码获取组件;
	audio = node.getComponent(cc.AudioSource);
2: AudioSource 主要的方法:
	play(); 播放音频;
	audio.play();
	stop(); 停止声音播放;
	pause(); 暂停声音播放;
	resume(); 恢复声音播放;
	rewind(); 重头开始播放;
	其它接口见文档;  
3: AudioSource代码主要属性:
	loop: 是否循环播放
	audio.loop = false;
	isPlaying: 是否正在播放; 
	mute: 是否静音;
	如果要在开始的时候设置某些属性，可以放到start函数里面;
	因为creator的面板上的初始值会覆盖掉onLoad里的初始化的值

*/



/*
 * 第011课动画编辑器的使用
----------------------------------------
cc.Animation是操作动画的组件
cc.AnimationClip是动画的剪辑对象
动画编辑器使用
1: 创建一个节点;
2: 为这个节点添加一个动画组件 cc.Animation;
3: 为这个动画组件新建一个动画文件 --> AnimationClip对象;
4: cc.Animation 控制面板的属性:
	(1): default Anim Clip: 默认的播放的动画剪辑;
	(2): Clips: 动画剪辑的数组集合,是一个数组
	(3): Play onLoad: 是否在加载的时候开始播放;

----------------------------------------
动画编辑器的原理
1: 时间轴
2: 在不同的时刻，调整节点以及孩子节点的不同的属性的值，然后创建出补间动画;
3: 节点调动画的属性:
	位置, 缩放, 旋转, 大小, 颜色, 透明度, 锚点, 扭曲, ...;
4: 动画编辑器也可以调节节点的子节点 
5: 动画参数:
	Simaple: 1秒多少帧,默认是60帧, Speed: 速度,播放速度,越小越慢, 
	wrapMode(动画的播放模式):  Normal, Loop, PingPong, Reverse, Loop Reverse, PingPongReverse;
6: 动画
	(1)添加动画属性
	(2)添加关键帧/删除关键帧,选到关键帧，在属性编辑器上编辑和修改;
	(3)编辑补间动画曲线路径;可以修改曲线的关键点，让编辑器自动补间

----------------------------------------
Animation组件
1: 代码中获得cc.Animation组件: 
	编辑器关联; 
	代码获取组件;
	anim = node.getComponent(cc.Animation);
2: Animation组件主要的方法:
	play([name], [start_time]), 播放指定的动画，如果没有制定就播放默认的动画;

	playAdditive: 与play一样，但是不会停止当前播放的动画;
	stop([name]): 停止指定的动画，如果没有指定名字就停止当前播放的动画;
	pause/resume: 暂停唤醒动画;
	getClips: 返回组件里面带的AnimationClip数组
3: Animation重要的属性:
	defaultClip: 默认的动画剪辑;
	currentClip: 当前播放的动画剪辑;
4: Animation播放事件:  动画组件对象来监听on,不是节点
	play : 开始播放时  
	stop : 停止播放时 
	pause : 暂停播放时 
	resume : 恢复播放时
	lastframe : 假如动画循环次数大于 1，当动画播放到最后一帧时 
	finished : 动画播放完成时

	anim.on('事件名称', callback);

----------------------------------------
动画里面调用代码函数
1: 动画编辑器有一个按钮，在当前帧插入一个事件,插入一个时间到动画里面;
2: 编辑这个时间触发的函数: 名字 + 参数
3: 遍历当前动画组件所挂节点上面所有的脚本或组件，根据这个名字来触发函数;
4: 要慎用，代码和动画之间不易太多的调用;

*/



/*
 * 第012课骨骼动画组件的使用
----------------------------------------
spine骨骼动画工具
1: 骨骼动画: 把动画打散, 通过工具，调骨骼的运动等来形成动画
2: spine是一个非常流行的2D骨骼动画制作工具
3: spine 动画美术人员导出3个文件:
    (1).png文件:动画的”骨骼”的图片集;
    (2).atlas文件: 每个骨骼在图片集里面位置，大小;
    (3).json文件: 骨骼动画的anim控制文件,以及骨骼位置等信息;
4: 骨骼动画导入: 直接把三个文件拷贝到项目的资源目录下即可;
5: 使用骨骼动画: 
    (1) 直接拖动到场景;
    (2) 创建一个节点来添加sp.Skeleton组件;

----------------------------------------
sp.Skeleton 
1: sp.Skeleton: 控制面板属性:
    Skeleton Data: 骨骼的控制文件.json文件;
    Default Skin: 默认皮肤;
    Animation:  正在播放的动画;
    Loop: 是否循环播放;
    Premuliplied Alpha 是否使用贴图预乘;
   	TimeScale: 播放动画的时间比例系数;
    Debug Slots: 是否显示 Slots的调试信息;
    Debug Bone: 是否显示Bone的调试信息;
2: sp.Skeleton重要的方法: Skeleton是以管道的模式来播放动画，管道用整数编号，管道可以独立播放动画，Track;
    (1)clearTrack(trackIndex): 清理对应Track的动画
    (2)clearTracks(); 清楚所有Track动画
    (3)setAnimation(trackIndex, “anim_name”,  is_loop)清楚管道所有动画后，再从新播放
    (4)addAnimation(trackIndex, “anim_name”,  is_loop);往管道里面添加一个动画;

----------------------------------------
动画事件监听
1: setStartListener: 设置动画开始播放的事件;
2: setEndListener : 设置动画播放完成后的事件;
3: setCompleteListener: 设置动画一次播放完成后的事件; 

spine.setStartListener(callBack);

*/



/*
 * 第013课mask_layout_scrollview组件的使用
----------------------------------------
prefab预制体
1: 制作预制体: 将节点拖入到assets文件夹下;
2: 加载预知体: 代码加载(统一在资源加载时讲解)与手动绑定;
3: 预制体对象实例化: cc.instantiate;
	var item = cc.instantiate(this.item_prefab);
	this.node.addChild(item);
----------------------------------------
Mask组件
1: Mask组件是提供viewport功能的一个组件，你可以想象通过一个窗口去看外面的世界,
只能看到这个窗口大小的视区;
2: Mask的type: 
	Rect矩形, 
	ellipse圆形, segements 裁剪的边的数量，越多越接近一个圆
	image_stencle图片的Alpha值来做mask;不支持Canvas模式
3: 一个节点加上Mask组件后，它和它的孩子在这个范围内的会显示，不在这个范围内的不显示;
相当于cocos3.9里的clipNode
4.反向遮罩 inverted，不支持Canvas模式
----------------------------------------
cc.Layout 
1: 布局组件
	有些物体的布局，可以不用我们写死位置，可以根据内容来排榜
	比如垂直排版, 水平排版等，这样的话，就是不用我们自己调整给我们排好非常方便;
2: 布局组件的面板属性:
	ResizeMode:  
		Node不会对子节点和容器进行大小缩放
		Child: 对子节点的大小进行缩放;
		CONTAINER:对容器的大小进行缩放; 会重新设置node的尺寸把所有的child包起来，常用的
	布局类型: 水平，垂直, GRID(网格)布局 

----------------------------------------
cc.ScrollView
1: 滚动列表的主要结构:
	root->view(Mask裁剪超出范围的内容) ---> content(Layout)负责内容排版;

	scrollView(挂了cc.ScrollView组件){
		scrollBar(挂了scrollBar组件)
		view(view上挂了一个Mask组件,裁剪超出范围的内容){
			content(实际放item的node)(挂了一个Layout，item的排版)
		}
	}

2: 滚动列表的每个选项:
    root(w, h,制定大小，好给Layout用)
3: 代码里面使用cc.ScrollView
    step1: 将选项做成预制体
    step2: 在代码里面new 出预制体,加入到content节点下;

	var opt_item = cc.instantiate(this.opt_item_prefab);
	this.scrollview.content.addChild(opt_item);

Cocos Creator ScrollView 优化系列-2-可视区域渲染
https://www.jianshu.com/p/c5daabbb7719

----------------------------------------

*/



/*
 * 第014课cc_loader代码加载和释放资源
----------------------------------------
cc.loader
1:有三个默认的Pipeline:
	(1) assetLoader: 主要用于加载资源, 加载asset类型资源，和释放这些资源;
	(2) downloader: 主要用于下载文件, 文本,图像,脚本,声音,字体, 自定义的download;
	(3) loader:  第三个默认的Pipeline,可以加载json, image, plist, fnt, uuid;
2: 资源分为本地(assets目录下)与远程资源;
3: 加载都是异步的;

----------------------------------------
本地资源加载
1: 在代码里面加载资源必须要求资源在assets/resources/文件夹下;
    (1)根据场景的依赖关系来打包我们的资源;  去掉不用的资源
	(2)无法判断在代码里面加载的资源，是哪些？-->所有的resources目录下的资源，都会被打包
	进去,你在代码里面就能加载到它了。
	如果资源不在代码里面加载，一般不要放到resources目录下,
	如果放到了，这个资源不关你有没有用，都会被打包进去;
2: 资源的url不需要加assets/resources这个部分,路劲不需要加这个前缀;
3: cc.loader.loadRes(url, onComplete回掉函数);
	cc.loader.loadRes(url, 资源的类型, onComplete回掉函数);
	// 注意:这里不需要后缀名, assets/resources/这个也不需要
	cc.loader.loadRes("xxx/xxx", function(err, ret){
		if(err) {
			console.log(err);
			return;
		}
		console.log(ret); // audio clip
		this.audio.clip = ret;
	}.bind(this));
	// 本地加载图片
	cc.loader.loadRes("img/disk", cc.SpriteFrame, function(err, ret) {
		if (err) {
			console.log(err);
			return;
		}
		// 例如我们的游戏，在进入下一个场景之前，有一个资源加载场景，那么到了新的场景后，我们就能够找到这个加载好的资源
		this.sprite.spriteFrame = cc.loader.getRes("img/disk", cc.SpriteFrame);
		// end 
	}.bind(this));

4: loadResArray([], type类型, progressCallback， completeCallback);
5: loadResDir (url [type ] [progressCallback ] [completeCallback ]) 加载一个路径下的资源;
6: getRes(url, [type]); 获取资源id;

----------------------------------------
远程资源加载 
1: cc.loader.load(url, 结束回掉函数);
2: cc.loader.load({url: “”, type: “”}, 结束回掉函数);
3: 远程加载任意类型文件;

	// 从服务器加载json文件
	cc.loader.load({url: "http://127.0.0.1:6080/project.json", type: "json"}, function(err, ret) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(ret);
	}.bind(this));

----------------------------------------
资源卸载
1: 每个场景有个自动释放资源
    勾选上这个场景的资源会自动释放,不勾选上这个场景的资源不释放
2: 代码加载的资源，默认是不会受这个选项的影响的,除非设置
	cc.loader.setAutoRelease(url, brealse)
3: 手动释放资源
    loadRes/ releaseRes
    load / release
    releaseAsset (资源对象的object);


*/



/*
 * 第015课cc.Widget与屏幕适配
----------------------------------------
屏幕适配
1: 一款游戏能适应不同的手机分辨率，我们把这个称为屏幕适配;
2: creator屏幕适配策略:  固定高度,固定宽度, 固定宽高度;
3: cc.Canvas组件: 
	(1)决定屏幕的适配策略;
	(2)大小为屏幕的大小;
4: 美术设计分辨率:
	美术人员在一个固定的分辨率下来设计资源,我们在canvas组件配置设计分辨率;     

----------------------------------------
界面适配
1: 背景图做到能适配任何主流的手机分辨率;
2: 将界面布局分为9大停靠点:

----------------------------------------
cc.Widget组件
1: cc.Widget组件帮助解决停靠点的问题;
2: cc.Widget能帮助解决和父亲大小保持一致的问题;
3: Target停靠点，指定要相对的节点，必须是父节点或父亲以上的节点;
	不指定默认是父节点
----------------------------------------
creator界面适配案例
1: 确定设计分辨率 
2: 配置适配策略;
3: 在设计分辨率下来搭建场景;
4: 决定界面上的停靠点,借助cc.Widget组件来实现;
5: 相对于父亲的区域大小;

*/


/*
 * 第016课creator碰撞检测系统
----------------------------------------
碰撞检测系统
1: creator有碰撞检测系统 +物理碰撞系统，这个是两个独立的模块;
2: 给creator的游戏世界中的物体来进行分组，指定节点的分组与分组的碰撞矩阵;
	node有一个group的属性，用来分组
3: 代码中获取节点的分组和分组索引: group与groupIndex;
	group是组名称，字符串， groupIndex 是组的编号，是数字，从0开始
4: 为每个节点添加碰撞检测区域-->碰撞器(物体形状), 编辑碰撞区域;
	有三种组件 BoxCollider, CircleCollider, PolygonCollider(多边形)
5: 代码开启碰撞检测系统(默认是关闭碰撞检测),开启和关闭碰撞检测的调试:
	var manager = cc.director.getCollisionManager(); // 
	manager.enabled = true; // 开启碰撞
	manager.enabledDebugDraw = true; // 调试状态允许绘制碰撞器的形状
6: 碰撞检测函数响应,发生碰撞检测的节点，会去搜这个节点上挂的所有的脚本组件的函数
	然后调用这个节点上所有组件的统一的三个接口:
	onCollisionEnter: function (other, self) // 开始
	onCollisionStay: function (other, self)  // 持续
	onCollisionExit: function (other, self)    // 结束
	其中other是与这个节点碰撞的节点的碰撞器组件
	其中self是自身节点的碰撞器组件   
	是碰撞器组件，不是节点-->碰撞器组件.node

*/


/*
 * 第017课帧动画组件播放
----------------------------------------
帧动画播放组件
其实是用代码的方式来实现帧动画
1: creator播放帧动画需要通过动画编辑器去制作;
2: 为了方便控制和使用加入帧动画代码播放组件;
3: 属性设置:
	sprite_frames: 帧动画所用到的所有的帧;
	duration: 每帧的时间间隔;
	loop: 是否循环播放;
	play_onload: 是否加载组件的时候播放;
4: 接口设置:
	play_once(end_func); // 播放结束后的回掉函数;
	play_loop(); // 循环播放;

*/



/*
 * 第018课TexturePack图集打包与使用
----------------------------------------
为什么要有图集
1: 图片解码到内存, 内存加载到显卡生成OPENGL纹理;
2: 把所有的小图打到一张大图里面，可以使用一张OPENGL纹理,优化程序的性能;
3: 图集的缺点: 每次图片更新后都要重新打包。
4: 图集打包工具TexturePacker的使用
    (1)添加要打包的图片文件夹;   --> Add Folder比较方便
    (2)配置好对应的相关属性;
    (3)打包输出.plist与.png文件;

----------------------------------------
creator使用图集
1: creaetor识别图集后，点击plist展开，能显示每个小图的图片;
2: 精灵使用图集,直接将小图的spriteFrame拖入到精灵的spriteFrame属性里面;
3: 每张小图可以正常的使用;
4: 图集有变动，直接替换就可以;

----------------------------------------
图集解包
1: 图集解包工具, 将打包好的plist, png解成小的散图;
2: creator插件，来解图集, TexutureUnpack也可以解图集;
3: 插件地址:https://github.com/zilongshanren/unpack-textureatlas
4: cocos creator自定义扩展插件
	点击左上角的选项——扩展-创建新扩展插件-添加自己新的插件
	插件的目录 C:\Users\blake(你的当前的用户名)\.CocosCreator
*/



/*
 * 第019课creator高级UI的编写和实现
----------------------------------------
弹出式对话框
1:对话框的结构:
	根节点 -->
		mask: 全屏的单色精灵,监听事件,关闭对话框;
		dlg 与它的孩子: 对话框的内容,监听事件，挡住不让他传递到mask节点上;
		弹出式动画:
			mask: 渐变进来;
			对话框内容缩放,并加上easing缓动对象;
		收起式动画:
			mask: 渐变出去;
			对话框内容缩小,并加上easing 缓动对象;
2: 对话框组件脚本
	(1)show_dlg
	(2)hide_dlg

----------------------------------------
个性化时间进度条
1:  编写脚本, 来使用sprite的扇形来显示当前的进度:
	属性: 
		time_sec: 定时器的时间
		clockwise: 是否为顺时针或逆时针;
		reverse:  是否反转
	start_clock_action: 开始累积时间，看时间过去的百分比,来改变精灵显示的百分比;
	stop_clock_action: 停止计时累积;

*/



/*
 * 第020课creator物理引擎的基本配置
----------------------------------------
开启物理引擎
1: 编写脚本来开启物理引擎;
2: 将这个脚本挂载到场景的根节点;
3: 编写调试接口决定是否打开物理引擎调试;
4:  cc.director.getPhysicsManager().enabled = true;  // 打开物理引擎
	cc.director.getPhysicsManager().debugDrawFlags 调试绘制标志;
    var Bits = cc.PhysicsManager.DrawBits; //DrawBits是一些宏
	cc.director.getPhysicsManager().debugDrawFlags = Bits.e_jointBit | Bits.e_shapeBit;
	//这个Bits.e_jointBit绘制了关节链接信息和Bits.e_shapeBit绘制形状
5:  cc.PhysicsManager:
	enable: 开启   debugDrawFlags: 调试标志,   gravity: 重力加速度,二维向量

----------------------------------------
重力加速度
1: 物理引擎会有一个重力加速度,来模拟物理环境，你可以可以把重力加速度改成0，不受重力影响;
	重力加速度是一个向量  cc.vec2(0, -320)是系统默认的重力方向
2: 修改重力加速度:
    cc.director.getPhysicsManager().gravity = cc.p(0, -320);

----------------------------------------
物理刚体cc.RigidBody
1: 刚体:形状不会改变
2: 刚体分为静态,动态刚体, 不受力的刚体(Kinematic,不受作用力的影响);
3: 刚体是受到物理作用的物体,由刚体带着节点移动;
4: 刚体组件cc.RigidBody:
	enabledContactListener: 是否开启碰撞事件的监听,开启了才会调用回调，默认关闭;
	bullet: 是否为子弹属性，防止高速穿越，消耗一定的性能;
	allowSleep: 是否允许进入休眠状态，一段时间后如果物体没有任何状态改变会进入休眠状态;
				默认开启，休眠了的刚体不会主动去计算，降低一定的cpu消耗，直到被改变物理状态
	gravityScale: 该物体受重力的缩放; 比例越大，受到的重力约大
	linearDamping: 线性阻尼，衰减线性速度;
	angularDamping: 角速度阻尼,衰减角速度;
	linearVelocity: 刚体的线性速度;
	angularVelocity: 刚体的角速度;
	fixedRotation: 是否固定不旋转;
	awake: 是否立刻唤醒此刚体;
	active: 是否激活这个刚体，如果不激活，那么刚体不会参与碰撞;

----------------------------------------
刚体碰撞器cc.PhysicsXXXXCollider
1: 光有刚体还不够，还要为每个刚体添加一个物理性状;
2: 物理形状的类型:
    矩形物理碰撞器 PhysicsBoxCollider;
    圆形物理碰撞器;PhysicsCircleCollider
    多边形物理碰撞器;PhysicsPolygonCollider
	链条碰撞器:  PhysicsChainCollider; 
3: 碰撞器的物理参数:
    Tag: 碰撞器的标记,区别一个节点上多个不同的碰撞器;
    Density: 相状的密度;
	Sensor: 是否为一个碰撞感应器，如果勾选，就只做碰撞检测，不发生实际的碰撞;
			比如地图上的某个门，都可以只进行碰撞感应，不进行物理碰撞
    Friction: 摩擦系数;
    Restitution: 弹性系数[0, 1], 0没有弹性, 1完全弹性碰撞;
    Editing: 可以编辑碰撞器的形状;
4: 一定要加物理碰撞器，而不是碰撞系统的碰撞器，非常容易出错误

*/

/*
 * 第021课creator物理引擎碰撞检测
----------------------------------------
物体类型与碰撞矩阵
1: 添加物体类型: Add Layer, 每个类型对应一个名字group与groupIndex
2: 创建物体的时候要选择一个类型;
3: 配置碰撞矩阵，决定哪些物体类型碰撞;

----------------------------------------
碰撞事件监听
1: 刚体组件开启碰撞监听;
2: 当有碰撞发生的时候,遍历刚体所在的节点所挂的所有的组件，看组件是否实现了碰撞检测函数，如果是，那么调用;
3: 在需要检测碰撞的组件代码里面编写碰撞响应函数:
	onBeginContact ( contact, selfCollider, otherCollider): 碰撞开始
	onEndContact (contact, selfCollider, otherCollider): 碰撞结束  
	onPreSolve(contact, selfCollider, otherCollider); 碰撞持续,接触时被调用;
	onPostSolve (contact, selfCollider, otherCollider);  碰撞接触更新完后调用,可以获得冲量信息

4:  如果把碰撞器设置成了sensor,那么只会做碰撞检测，而不会改变物体碰撞后的运动状态;
    sensor: 用于触发器: 道具, 关卡的出口，入口等;

*/


/*
 * 第022课creator_cc.Camera组件与物理引擎官方案例
----------------------------------------
官方物理引擎案例
1: 准备好tiled地图;
2: 为tiled地图编辑好物理碰撞器;
3: 放出角色,为角色编辑好物理碰撞器;
4: 监听键盘消息:
	cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.on_key_down.bind(this), this);
	cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.on_key_up.bind(this), this);
5: 设置角色的水平和竖直速度; 竖直600,水平400
6: 设置cc.Camera组件,设置Camera跟谁玩家;

----------------------------------------
cc.Camera组件
1: 配置哪些物体受Camera组件影响;
	Targets: 受Camera影响的物体的集合;
			Camera会拍摄Targets数组中的节点
     
2: 配置Camera跟随目标:
    var w_pos = this.target.convertToWorldSpaceAR(cc.p(0, 0));
    var pos = this.node.parent.convertToNodeSpaceAR(w_pos);
	先将要跟踪的target的坐标转到世界坐标，然后在转到camera节点坐在的坐标系下的坐标
	然后设置camera的坐标为target的坐标就可以实现跟踪

*/

/*
 * 第023课creator_滚动列表动态加载数据
----------------------------------------
其实就是用三倍于显示的数量，分为三页，去滚动的加载，滚到要显示第三页的时候
就重新刷新显示的三页的数据，比如之前是显示的1-24个item，滚动窗口中显示的是16-24，
这时就把数据刷新为8-32，然后将content的起始位置往上偏移8个item的距离

----------------------------------------
auto scroll细节
1: auto scroll有自己的控制content的位置的机制,
会导致content的位置与我们加载时候的位置修改冲突，体现在快速滚动后的连续加载;
2: 处理细节:
	(1)在判断要加载的时候，先判断当前是否在auto scroll模式, 如果是返回;
	(2)监听autosocroll结束后抛出的end事件,在来计算加载;
	(3)当auto scroll滚动到最上头的时候，会有回弹，那个时候发生了加载，所以
在要加载的时候，检测到时autoscroll,关闭掉回弹的效果,等auto scroll end事件发生了以后再打开;
	this.scroll_view.elastic = false;  
	this.scroll_view._autoScrolling

*/

/*
 * 第024课creator_h5打包发布优化技巧_android环境搭建与打包发布(1.6版本以下，以上看第034课)
----------------------------------------
h5打包发布
1:引擎模块裁剪，减少引擎体积;
2: resources目录的特性，减少setting.js体积;
3: 订制启动的logo,与样式;  
4: resources特性
	a:creator里面会根据场景的依赖来打包的我们的资源, 资源没有用的，将不会被打包进来;
	b:有时候我们需要代码加载我们的资源, cocos creator独立出来一个文件夹resources(必须是要写成resources)存放我们的  资源;
c:这个资源将会被视为代码里面会加载的资源;所以resources文件夹下的资源，不管你有没有在场景里面使用，都会被打包进去;
	d:resources里面的资源的ID，将会被打包写入到setting.js;
5:代码加载资源的基本原则:
	(1)如果一个资源，不在代码里面加载，那么我们一定不要把它放到resources目录下;
	(2)如果一个资源要在代码里面加载，那么我们一定要放在resource目录下;
	(3)不管怎么样resource下的所有资源都会被打包进去,如果是真的没有用到的资源，不要放到resource目录下;
	(4)resources下的ID都会被写入setting.js导致setting.js 文件过大,我们要将没有在代码里面加载的文件移出
resources目录


*/

/*
 * 第025课creator_cc.director与资源加载策略
----------------------------------------
cc.Director对象
1: 游戏里面控制管理整个游戏全局对象，包括了场景切换等，为cc.Director对象;
2: 导演对象全局只有一个cc.director，大写的为类， 小写的cc.director为全局的导演对象;
3: cc.director来获取导演对象实例;
4: 游戏中各种管理对象都可以通过cc.director获取，比如物理引擎管理，Action管理, 碰撞检测管理等;

----------------------------------------
常用接口
1: getWinSize: 适配后的逻辑大小;
	将设计分辨率适配到真实屏幕比例后获取到的大小
	比如设计分辨率960*640，屏幕分辨率是800*640，如果以宽度适配
	所以适配的逻辑大小就是 960* (960/800*640)就是960*768
2: getWinSizeInPixels: 获取窗口的像素大小;
3: getScene: 获取当前的逻辑场景,场景对象下面是Canvas;
4: setDisplayStats: 是否显示左下角FPS信息;
5: getCollisionManager: 获取碰撞检测管理对象;
6: getPhysicsManager :获取物理引擎管理对象;
7: loadScene(scene_name):加载场景,场景的名字，系统会加载对应的场景
8: preloadScene(scene_name):预加载场景

----------------------------------------
资源加载策略
1: h5资源加载的过程:
	(1)从服务器上下载来来资源，并把资源加载到内存中,所以你在做h5游戏，
	你要把你当前游戏中要用到的资源先加载下来，否者的话,你在运行的时候去加载就来不及了(h5卡住);
2:三种资源加载策略:
	(1) h5的小游戏:采用全部提前绑定好所有的资源。编写预加载脚本preload.js,
		将要加载的资源手动关联到第一个启动的场景上面;也就是拖上去
	(2) 添加等待界面，预加载下一个场景，然后再进行切换,提前关联好下一个场景要的资源;    
		cc.loader.onProgress = function ( completedCount, totalCount,  item ){
			console.log("completedCount:" + completedCount + ",totalCount:" + totalCount );
		};
		cc.director.preloadScene("sceneName", function(){
			cc.loader.onProgress = null;
			cc,director.loadScene("sceneName");
		});
	(3) 嫌手动关联麻烦，在场景切换中加入过渡场景，代码来加载场景的资源:    
		cc.loader.loadResAll("指定资源的目录", function (err, assets) {
		}); 
   	代码加载资源会导致setting.js文件过大，一般尽量少在代码里面加载资源;

*/

/*
 * 第026课creator_jsb_fileUtils本地文件读写
----------------------------------------
FileUtils
1: jsb是javascript bind的代表，整个C/C++ 导出的绑定都在这个jsb里面,jsb 支持native，不支持h5;
2: FileUtils是本地文件读写的一个工具类,全局只有一个实例;
3: jsb.fileUtils来获取文件读写工具类的实例;
4: jsb.fileUtils.isDirectoryExist(path): 判断路径是否存在;
5: jsb.fileUtils.createDirectory(path); 创建一个路径;
6: jsb.fileUtils.getDataFromFile(path)获取二进制数据; // Uint8Array文本
7: jsb.fileUtils.writeDataToFile(data,path); 写二进制数据; // Uint8Array 对象
8: jsb.fileUtils.writeStringToFile(data,path); 写文本文件; // data String对象
9: jsb.fileUtils.getStringFromFile(path); 获取文本数据; // data String
9: jsb.fileUtils.removeFile(path); 删除掉一个文件;
   jsb.fileUtils.removeDirectory(path); 删除掉一个文件夹;
10: jsb.fileUtils.getWritablePath(); 获取文件的可写目录,是一个内部存储的目录，
	我们的手机OS会为每个APP分配一个可读写的路径，但是这个App如果卸载以后，这个数据也会被删除;
如果你要想保存到本地有又是持久的，你可以写入外部存储，外部存储的这个路径也是适用于fileUtils工具类的;
*/


/*
 * 第027课creator_websocket与socketio的使用
----------------------------------------
websocket
1: creator只支持websocket, h5的标准也只支持websocket;
2: websocket 底层是 tcp socket, 基于tcp socket上建立了连接，
	收发数据的标准，保证了用户收到的数据和发到的数据是一致的，不用考虑粘包等问题,websocket协议已经解决了;
3: websocket的使用方式:
	(1)new WebSocket(url); 服务器对应的url: “ws://127.0.0.1:6081/ws”, ip + port
	(2)支持的数据: 文本数据类型与二进制数据类型;
		sock.binaryType = "arraybuffer"/”Blob”;  
		支持arraybuffer和Blob类型,一般配置成arraybuffer,根据服务器而定;
	(3)配置好websocket的回调函数: 
		onopen(event),  onmessage(event), onclose(event), onerror(event),
	(4)不用了关闭socket或收到服务器关闭遇到错误: close方法;
4: 基于node.js来测试下websocket, node.js见服务器课程;

----------------------------------------
socket.io
1: socket.io是基于 TCP socket/Websocket封装的 上层的一个框架;
2: 使得人们能方便的使用类似事件的模式来处理网络数据包;
	网络事件的模型,server监听eventName,client发送eventName,server就能接到通知
3: creator 搭建socket.io注意:
	(1)jsb里面原生实现了SocketIO;
	(2)h5 使用js的实现socket-io.js; // 下载标准的socket.io.js,然后修改过滤掉原生平台的;
		判断 if(!CC_JSB && !cc.sys.isNative){}，因为只支持H5
4: socket.io的使用: 注意版本一定要对上,前后端版本要对上,可以使用课堂提供的版本匹配
	(1) connect: 
		var opts = {
			'reconnection':false,
			'force new connection': true,
			'transports':['websocket', 'polling']
		}
		this.sio = window.io.connect(this.ip,opts);
    (2) 系统事件: connect/disconnect/reconnect, connect_failed, 
	(3) 自定义事件: this.sio.on('xxxEventName', function(data){})
	(4) 发送数据: this.sio.emit(event, data)
	(4) 关闭 this.sio.disconnect();

*/



/*
 * 第028课creator_httpclient_GET_POST_上传下载
----------------------------------------
http GET POST
1:  Http client: GET POST是http的两种操作;
2: 获取网页数据我们一般使用http Get,GET 传递参数通过?开始每个参数之间使用&来隔开;
3: 上传数据我们一般使用POST协议来上传;
4: download下载一般也用GET来做, xhr.responseType 指的是数据的类型:
	“” (默认)DOMString 是一个UTF-16字符串, DOMString 直接映射到 一个String
	"arraybuffer" 对象被用来表示一个通用的，固定长度的二进制数据缓冲区
	"blob" Blob对象表示不可变的类似文件对象的原始数据
	"json" JavaScript object, parsed from a JSON string returned by the server
	“text” DOMString
根据你要获取的数据类型来决定，比如下载一个文件，可以采用arraybuffer模式;

----------------------------------------
http get
1: 使用http get提交参数请求;

http post
1: 使用http.js里面的post上传文件数据;

http download
1: http Get 下载文件,并保存到本地;

----------------------------------------
http 的 get post都是 先创建一个 XMLHttpRequest 对象
	var xhr = cc.loader.getXMLHttpRequest();
//设置请求超时时间
	xhr.timeout = 5000;
//设置数据类型
	xhr.responseType = "arraybuffer";
	xhr.open("GET",requestURL, true);
	xhr.open("POST",requestURL, true);
//设置请求的消息头
	xhr.setRequestHeader("Accept-Encoding","gzip,deflate","text/html;charset=UTF-8");
	// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//最后发送
xhr.send();

//设置请求的回调响应函数
	xhr.onreadystatechange = function(){}
*/



/*
 * 第029课creator网格导航寻路
----------------------------------------
cocos creator自定义扩展插件
	点击左上角的选项——扩展-创建新扩展插件-添加自己新的插件
	插件的目录 C:\Users\blake(你的当前的用户名)\.CocosCreator

----------------------------------------
NavMesh 寻路网格
	nav_agent.js
	mav_map.js
	使用原则:
		1.将地图的根节点设置分组为NAV_MAP，map要指定所有的大小
		2.将地图的障碍物设置分组为MAP_OBSTACLE
		3.启动菜单中的选项，来生成地图数据，0代表可以通过，1代表障碍物
		4.每个地图块的锚点必须是0.5,0.5
		5.map_root锚点必须是0，0
		6.地图的原点是从左下角开始的

过程:
1.先去用网格划分地图的大小，然后初始设置每个网格为非障碍物
2.扫描map里的分组为obstacle的节点，然后计算节点的四个顶点的位置是在哪个网格
3.将节点区域内的网格属性设置为障碍物
4.将map信息数组转为string,生成为一个.js文件，写入文件,这样就生成了map的代码
5.将player添加nav_agent组件，将map添加nav_map组件，
6.在代码中，比如点击屏幕坐标，转换为世界坐标，然后调用agent的导航接口,就可以将player移动到目标点

----------------------------------------
A*star寻路
	astar.js
*/


/*
 * 第030课动画编辑器编辑地图路径
----------------------------------------
用塔防游戏举例:
1.用Animation Clip 动画编辑器生成一条贝塞尔曲线的路径
2.代码中获取这个贝塞尔曲线的数据，然后每隔一定长度生成一个路径点,生成一个路径集合
3.角色使用路径集合，然后设置初始位置为路径的第一个节点位置
4.角色行走的时候，先计算下一个路径点和当前路径点的向量差，然后分解向量，算出x,y方向上的速度，
  以及需要移动的总时间，然后update()中去刷新每个路径的角色的位置
*/


/*
 * 第031课微信小游戏《趣味桌球》
----------------------------------------
开启物理引擎:第020课creator物理引擎的基本配置

----------------------------------------
物体分组
1: 台球边缘:--> Edage
2: 球袋:   --> Pocket
3: 球杆:   --> cue
4: 台球:   --> ball
5: 母球:   --> w_ball

----------------------------------------
body参数
1: 重力为0, 对物体进行分类，配置碰撞关系。
2: 球: 线性阻尼，角速度阻尼 为1;
3: 球碰撞器的弹性系数为1;
4: 球杆的能量系数: 18;
5: 球杆最小距离: 20, 最大距离 100;
6: 冲量函数 this.body.applyLinearImpulse(方向, 世界坐标的质心, true);
7: 设计分辨率: 414x736

----------------------------------------
碰撞检测
1: onBeginContact: 碰撞开始被调用;
2: onEndContact: 碰撞结束被调用;
3: onPreSolve: 碰撞接触更新前调用;
4: onPostSolve: 碰撞接触更新后调用;
5: 参数:
	contact 碰撞信息
	selfCollider:  自己的碰撞器;
	otherCollider: 撞到的谁

----------------------------------------
微信配置
1: 下载微信开发者工具最新版本 
	https://mp.weixin.qq.com/debug/wxagame/dev/devtools/download.html?t=20171228
2: 注册和认证微信开发平台+公众平台;
3: 从公众平台小程序入口注册小程序/小游戏,选游戏类，目前还没有开放出来,生成一个APPID；
    测试APPID: wx6ac3f5090a6b99c5
4: 开放平台绑定小程序/小游戏
    
----------------------------------------
打包发布小游戏
1: 打开”Cocos creator-->偏好设置”菜单,配置好微信开发工具的路径;
2: 打开 “项目-->项目设置” 裁剪好游戏引擎;
3: 项目构建发布: 
 
----------------------------------------
微信开发文档
1: 微信小游戏开发文档:
   https://mp.weixin.qq.com/debug/wxagame/dev/index.html
2: 微信公众平台:
   https://mp.weixin.qq.com/
3: 小程序 API 文档:
   https://mp.weixin.qq.com/debug/wxadoc/dev/api/
4: 微信开发者工具下载
   https://mp.weixin.qq.com/debug/wxagame/dev/devtools/download.html
5: 微信开发者工具文档
  	https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html

*/




/*
 * 第032课微信小游戏《跳一跳》
----------------------------------------
创建台阶
1: 设置分辨率: 720x1280
2: 台阶的原点:
3: 配置好4个中心点,如果跳到就到4个中心点，否则就失败;
4: 编写代码获得中心点的位置，来初始化Player;
5: 斜率: 0.5560472, 与平行四边形相当;
6: 块开始的世界坐标的位置: （180， 350）

参数
1: 监听事件,开启蓄积能量, 2秒缩放到0.5;
2: 0.5秒内，scale变形到1;
3: 0.5秒内,  旋转一周;
4: 0.5秒内,跳跃到目的地;
5: 能量蓄积:  加速度:   power: 600, 初始化: 150;
	this.speed += dt * this.power;
	this.jumpDistance += this.speed * dt;
6:带上拖尾:
    MotionStreak组件: 配置好图片;
7: ancher_offset: 100
8: 生成地图: 200, 400的距离随机
9: 地图滚动参数: y, 随着玩家滚动, x 取最左值和最右值(180, 580);
10:开始位置（180， 350）

*/



/*
 * 第033课微信小游戏_第三方服务器资源部署
----------------------------------------

1.将小游戏的wx.Downloader的服务器地址REMOTE_SERVER_ROOT设置为上传资源的服务器地址
2.发布微信小游戏后，将小游戏的res目录资源上传到服务器
3.把微信小游戏的res目录删除，然后清除缓存，https校验关闭
4.打开微信小游戏的时候，小游戏会先去本地寻找资源，没有的话就去服务器下载
*/



/*
 * 第034课creator_android_studio打包
----------------------------------------
Android studio编译工具

1: android开发工具是基于JAVA来开发的，所以需要安装JDK; java devlop kit;
2: android的应用开发程序，是基于Android SDK来开发的;
3: 游戏引擎是有C/C++开发的，所以需要使用NDK来把游戏引擎变成二进制库.so给android应用
程序调用(通过JNI);
4: ADT/android studio工具自带SDK;
5: ant android打包是基于ant来打，所以我们要安装它;


1: android studio:  谷歌中文镜像网站: https://developer.android.google.cn/studio/
2: JDK: android studio要求 JDK 8.0以上: jdk-8u162-windows-x64.exe
3: SDK: 通过SDK Manager 下载对应的SDK: 22版本或以上;
4: Github上安装下载NDK，或SDKManager下载安装NDK; 
    github  NDK: https://github.com/android-ndk/ndk/wiki
5: ANT: apache-ant-1.9.5

----------------------------------------
安装JDK
1: 运行JDK的安装包，一路next安装好JDK到默认的目录，不要擅自修改目录，把它安装到C盘;
2: 打开环境变量编辑器, 在系统变量里面添加:
    JAVA_HOME: C:\Program Files\Java\jdk1.8.0_162 (JDK的安装目录)
    CLASSPATH: .;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;
(注意点号表示当前目录,不能省略)
    在”系统变量” Path变量最前面添加 %JAVA_HOME%\bin;(注意:这里的分号不能省略)
3:测试JDK是否已经安装好:  java -verson  查看版本信息

----------------------------------------
安装SDK与NDK
1:安装android-studio;
2: 安装 NDK, SDK, 找到SDK与NDK的路径;
3: 安装ANT;
4: 配置路径到cocos creator;

----------------------------------------
android打包
1: 检查环境是否已经全装好: creator偏好设置;
2: 裁剪掉不用的模块
3: 构建项目，生成项目的编译发布环境和模板;
	版本 源码/二进制   启动的场景, 是否使用android studio
4: 点击编译, 启动编译打包生成APK;
5: 发布证书:
	调试证书与发布证书;
6: 包名: com.xxx.xxx,android应用的包名，android根据包名来确定是否为同一个应用;

***** todo
安卓构建的时候 APP ABI的区别
armeabi		//不带浮点运算指令集，很多低端cpu不支持v7a
armeabi-v7a //自带浮点数运算的指令集
arm64-v8a
x86
高版本的NDK不支持 armeabi
勾的多的话包体会增大

***** todo
jni

*/




/*
 * 第035课游戏摇杆控制角色移动
----------------------------------------
参考cocos引擎源码分析:050游戏遥感的制作与三角函数的使用
*/



/*
 * 第036课超大数值计算
----------------------------------------
两个超大数计算
1.将数字每三为分为一个数来表示
		比如1 500 000 用一个数组 [0,500,1]来保存
2.将短的数组长度补齐到更长的数组长度，将两个数组每一位遍历相加
3.调整，每一位超过1000的也就是有进位的，进位+1
4.格式化拼接成字符串进行输出
*/


/*
 * 第037_001课cocos_creator2.0摄像机
----------------------------------------
摄像机
1: 所有的物体都是由摄像机绘制出来的; 
2: culling Mask: 这个摄像机拍摄的物体的类型;勾选上哪个group就绘制哪个group分组的物体
3: depth:根据摄像机的depth来决定哪个摄像机先绘制，哪个后绘制，depth越小，越先绘制;
4: clearFlags: 摄像机清屏设置{
	color:勾上才会绘制底色的颜色
	Depth:
	stencil:
}; 
5. background color:底色，就是场景没有东西时，最底层的颜色

每一个摄像机会绘制一遍自己能绘制的物体，所以同一物体可能会被绘制多次

----------------------------------------
坐标转换
1: 当摄像机移动后，鼠标点击的位置，是摄像机下的坐标; 
2: 摄像机坐标转世界坐标: 
    camera.getCameraToWorldPoint(point, out);
3: 世界坐标转摄像机坐标: 
	camera.getWorldToCameraPoint(point, out); 
	
除非camera在cc.p(0,0)，否则就需要转换坐标

----------------------------------------
Camera 地图漫游
1: 摄像机坐标转世界坐标: 
    camera.getCameraToWorldPoint(point, out);
2: 世界坐标转摄像机坐标: 
  	camera.getWorldToCameraPoint(point, out); 

*/



/*
 * 第037_002课cc.Graphics组件使用
----------------------------------------
Graphics组件  Graphics单词是图形
1: Alpha 混合的算法;
2: LineWidth 线的宽度;
3: Line Join 接头的方式: BEVEL(斜角，就是会把角切掉一部分), MITER(斜接，是直角的), ROUND(接头是椭圆的)
4: Line Cap 模式: BUIT, Round, SQUARE
5: Stoker Color: 线的颜色
6: Fill Color: 填充颜色
7: Miter Limit: 10;

----------------------------------------
Graphics命令
1: moveTo(x,y) 移动路径起点到坐标(x, y),不创建线条
2: lineTo(x,y) 绘制直线路径
3: bezierCurveTo(c1x,c1y,c2x,c2y,x,y) 绘制三次贝赛尔曲线路径
4: quadraticCurveTo(cx,cy,x,y) 绘制二次贝赛尔曲线路径
5: arc(cx,cy,r,a0,a1,counterclockwise) 绘制圆弧路径(用于创建圆形或部分圆)。
6: ellipse(cx,cy,rx,ry) 绘制椭圆路径。
7: circle(cx,cy,r) 绘制圆形路径。
8: rect(x,y,w,h) 绘制矩形路径。
9: roundRect 绘制圆角矩形路径。
10:fillRect 绘制填充矩形。
11:clear() 擦除之前绘制的所有内容的方法。
12:close() 将笔点返回到当前路径起始点的。将画笔的起点和终点连接起来组成一个封闭的路径
13:stroke() 根据当前的画线样式，绘制当前或已经存在的路径。
14:fill() 根据当前的画线样式，填充当前或已经存在的路径。
*/


/*
 * 第038课滚动的数字
----------------------------------------
就是用两组的0-9的item重复滚动，然后在动画的最后一刻，让列表重新设置为第一组
*/


/*
 * 第039课微信SDK使用介绍
----------------------------------------
运行Demo
1: 加压代码压缩包;
2: demo有两个工程项目: wx_game与rank_game;
3: 使用cocos creator 1.10 打开项目，然后构建;
4: 构建成功以后不直接运行，使用微信web开发者工具直接打开项目;
5: 如果有错误，清理一下缓存;

----------------------------------------
登陆代码流程
1: 打开 login.js;
2: updateManager: 提示用户打开来更新微信代码流程;
3: 更新完成后, 调用login();
4: 判断是否有效，如果有效，直接登陆，否者直接进入游戏， 否则获取用户授权;
5: getWxLoginCode调用授权,  创建授权Button, 引导用户授权点击;

----------------------------------------
获取用户信息
1: 用户昵称, 用户头像;
	wx.getStorageSync('userInfo');
	user.avatarUrl: 用户头像url;
	user.nickName: 用户昵称;

----------------------------------------
由于开放数据域是一个封闭、独立的 JavaScript 作用域，所以开发者需要创建两个项目：
	主域项目工程（正常的游戏项目）
	开放数据域项目工程（通过微信 API 获取用户数据来做排行榜等功能的项目）

开放数据域
1: 用来接收微信给我们传递的事件和数据的;
2: 开放数据域监听微信传过来的事件:
	score: 用户查询;
	friend: 还有排行榜;
	Crowd: 群排行榜;
	hide: 隐藏开放数据;
3: 开放数据域项目是怎么打包到微信游戏中的?
    step1: 编译开放数据域项目,勾选上开放数据域，微信小游戏;
    step2: 将编译好的开放域的文件夹放到build-templates目录下；
    step3: 编译整个项目，编译完成后回自动将build-tempplate目录下的ranking数据 复制到编译好的项目里;

主域中创建一个节点作为开放数据域容器，
添加 WXSubContextView 组件用于设置开放数据域视窗以及更新开放数据域贴图
*/


/*
 * 第040课编辑器扩展
----------------------------------------
插件
1: international，刚好18个字母   i18n
2: 全局插件的路径: C:\Users\26862\.CocosCreator  用户目录下;
3: 项目插件路径: 安装到项目插件下;
4: package.json: 插件的基本描述;
	“main”: “main.js”,  插件的入口代码, 注册消息;
	main-menu: 扩展菜单: 菜单名字--- message  
	panel: 子窗口的样式和名字;
	“scene-script”: “gen_navmesh.js“  场景脚本, 能都使用场景相关方法在编辑器里面;
    其它字段，参考文档;
5: 参考文档《使用守则》地址:http://docs.cocos.com/creator/manual/zh/ 

----------------------------------------
菜单响应
1: main.js 里面会注册扩展的菜单与响应函数;
2: Editor.Scene.callSceneScript 调用场景脚本,   扩展包的名字，函数名字， 回掉函数(err, obj);
	脚本函数: 函数名字: function(event) {}     
	event.replay: event.reply(“OK”, obj); 
3:  调用panel 的函数. Editor.Ipc.sendToPanel(名字', '名字:函数名字');
   	Editor.Ipc.sendToMain('插件名字:message'); 

----------------------------------------
场景脚本访问节点
1: 场景树里面的节点查找函数都可以使用；
2: 节点的属性可以使用；
3: 节点相关组件都可以获取/使用;

----------------------------------------
文件生成
1: 文件与路径模块
	const Fs = require('fire-fs');
	const Path = require('fire-path'); 
	const Del = require('del');
2: Editor.projectPath, assets
3: Fs.mkdirsSync(path); 创建文件夹;
4: Fs.writeFileSync 写文件
5: 	Editor.assetdb.refresh('db://assets/maps', () => {            
		Editor.success('Gen nav map Success !!!!!!!');          
	}); 文件生成后刷新数据库生成.meta文件;

----------------------------------------
寻路生成地图插件
1: 将地图的根节点设置为 NAV_MAP；map要指定所有的大小, map_root锚点必须为0, 0
2: 将地图的障碍物为: MAP_OBSTACLE;每个障碍物的锚点必须是0.5, 0.5;
3: 启动菜单中的选项，来生成地图数据; 0代表可以通过，1代表障碍物;


*/