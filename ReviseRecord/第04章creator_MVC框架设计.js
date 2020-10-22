
/*
 * 第001课基于MVC的游戏框架
----------------------------------------
游戏中的MVC
1: 什么是MVC
2: 游戏开发中MVC如何解决程序策划和美术沟通的;
3: 基于MVC架构我们建立几条基本的开发原则;


----------------------------------------
MVC{
	视图（View）：用户界面。
	控制器（Controller）：业务逻辑
	模型（Model）：数据保存
}

1. View 传送指令到 Controller
2. Controller 完成业务逻辑后，要求 Model 改变状态
3. Model 将新的数据发送到 View，用户得到反馈

所有通信都是单向的。

----------------------------------------
MVP{
	Model（模型）
	View（视图）
	Presenter（表示器)
}
MVP 模式将 Controller 改名为 Presenter，同时改变了通信方向。
1. 各部分之间的通信，都是双向的。
2. View 与 Model 不发生联系，都通过 Presenter 传递。
3. View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。

----------------------------------------
MVVM{
	Model（数据层）
	ViewController/View（展示层）
	ViewModel（数据模型）
}
MVVM 模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致。
唯一的区别是，它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然。
MVVM架构模式最主要是针对前端和iOS的MVC架构模式进行改进的，
减轻Controller层或者View层的压力，实现更加清晰化代码。
通过对ViewModel层的封装：封装业务逻辑处理，封装网络处理、封装数据缓存等，让逻辑处理分离出来，
并且不需要处理Model数据，使得Controller层或者View层结构简单，条理清晰。


----------------------------------------
单例模式
1: 什么是单例模式;
2: 如何实现组件单例;
    声明静态成员: static: {Instance: null}
3: 非组件单例，我们用模块来实现;
    var xxxx = {}; module.exports = xxxx;

----------------------------------------
启动脚本
1: 基类初始化游戏框架代码;
2: 子类做游戏逻辑的初始化, 将这个启动脚本做成一个单例;

*/


/*
 * 第002课事件订阅于发布系统
----------------------------------------
Event manager接口
1: 接口:
    add_event_listener(name, caller, function);
	remove_event_listener(name, caller, function);
	dispatch_event(name, udata);
2: 全局映射表:
	{
		事件名字: { caller, func };
	}
3: func(事件名字, 用户数据);

*/


/*
 * 第003课资源管理系统
----------------------------------------
H5游戏资源管理
1: 建立资源管理模块;
2: 将资源进行分类;
	(1) 预制体, 主要处理游戏预制体的;
	(2) SpriteFrame 换图加载, 比如玩家头像等;
	(3) 声音资源加载, AudioClip;
	(4) SpriteAtlas;
	(5) json文件加载, 暂时不考虑;
3: 加载策略;
4: 每个”场景”负责管理自己的资源, 所有场景公共的资源(后续扩展);
5: 每个场景资源，先加载再切换;  
6: 资源管理模块继承Component, 做界面绑定第一次预加载资源;  
7: 加一个游戏logo界面; 

----------------------------------------
资源管理接口
1: 界面上绑定第一个场景预加载的资源;
2: 预加载资源集合:
    res_set {prefabs: [], sprite_frames:[], audio_clips: [], sprite_altases: []}
3: 获取资源对象;
4: 卸载资源集合;

*/


/*
 * 第004课场景管理
----------------------------------------

*/


/*
 * 第005课UI管理系统
----------------------------------------

*/


/*
 * 第006课声音管理系统
----------------------------------------

*/


/*
 * 第007课Excel表数据配置系统
----------------------------------------

*/


/*
 * 第008课寻路导航系统
----------------------------------------

*/


/*
 * 第009课网络管理模块
----------------------------------------
H5使用websocket
1: 微信小游戏都采用的是H5的技术，所以使用websocket
2: websocket 底层有拆包封包协议，所以不用考虑粘包问题;

1.为什么cocos使用websocket
	Tcp socket不是h5的标准,是底层传输方式
	websocket是一种协议，底层调用了TCP socket
	websocket解决了TCP socket的粘包，半包问题
	底层有可能一起发送，但是websocket标记了每个数据包的大小信息，到应用层的时候，websocket重新保证了数据的可靠
	websocket简化了网络发送和接收的使用
	native平台，cocos实现了websocket的c++版本，所以兼容

2.网络模块的需要
	(1)连接管理，连接 断开
	(2)断线重连
	(3)数据收发
----------------------------------------
net_mgr 模块
1: 定义一个net_mgr 组件单例;
2: game_mgr 上添加一个组件net_mgr组件实例;
3: 配置一个url;
4: 未连接的，开启连接;
	var sock = new WebSocket(url);
	sock.binaryType = "arraybuffer";//配置数据传输模式 "blob" 或者 数据流

	//添加回调函数
	sock.onopen = 一个回调函数 //配置连接成功回调
	sock.onmessage = xxxx; //收到数据
	sock.onclose = xxx;//连接关闭
	sock.onerror = xxx;//报错

5: 连接状态管理;
6: 发送数据: send_data(data_arraybuf);
7: 接收到数据通知出去, 抛出事件
    net_disconnect:网络断开, 通知出去;
    net_connected: 网络成功连接, 通知出去;
    net_message: 收到的网络数据 arrayBuffer类型;
*/


/*
 * 第010课creator优化集锦
----------------------------------------
********记得看微信收藏的 cocos订阅号里的末尾的一大堆项目的优化合集********

优化包体大小
(1) 代码体积:
	cocos2d-js-min.js 引擎代码(1.7M)去掉不用的模块，比如物理模块
 	setting.js 里边存了resources里的资源目录,所以不用代码加载的资源，就不要放resources里
(2) 图片体积:
	分辨率大小
	压缩算法，.png, .jpg，如果不需要alpha通道，比如背景图，就使用jpg格式
	像素格式: APGB8888-> ARGB4444
	图片的重用,九宫格
	图集里，尽量没有空白区域
	用工具压缩图片质量,tinypng等很多网站都可以压缩
(3) 动画体积:
	帧动画:效率快，但是体积增加，因为图片多，用骨骼动画代替，
			不影响效果的情况下，减少帧动画的图片数量
(4) 地图数据体积:
	根据实际的需求，采用压缩算法
(5) 声音体积:
	压缩算法: .wav > .ogg, .mp3有版权问题
	算法参数:码率:编码声音数据，每秒控制在多少字节
			采样率: 减少采样率
			声道: 双声道，体积大一倍，改成单声道

----------------------------------------
优化游戏运行时的内存
(1) 分析内存的组成:
	减少图片分辨率，九宫格，平铺，缩放，地图拼接，
(2) 分析内存是否合理
	内存泄漏
drawcall
label
scrollview
nodepool

*/


/*
 * 第011课基于引用计数的资源依赖管理
----------------------------------------
第011课基干引用计敷的资湿依橡管理

1：释放资源的时候会发生什么事情
资源管理：预制体，声音，图集，精灵；
哪些资源不用了，你释放，这个是归你管理；
预制A，第一个”场景”，预制体B第二个“场景”
进入第二个的时候，释放预制体A----》预制体A，同时还要释放它的依赖；

预制体A---》资源a.png；
预制体B----》资源a.png；
预制体A使用了a.png， 预制体B使用a.png；
两个资源同时依赖一个资源，资源依赖就有冲突；

2：我们的解决方案是什么；
当我们加载一个资源的时候---》依赖来作我们的引用计数；
加载一个预制体A的时候，获取A的依赖，然后我把每个依赖都增加一次引用计数；--->保存好这个引用计数；
加载预制体B的时候，获取B的依赖，B的每隔依赖的引用计数增加1------->
A与B的依赖不相同，A的依赖[1，1，1，1，1，]B[1，1，1，1，1，][1，1，1，1，1，2]
释放A的时候，我释放A的依赖，不直接释放，而是将这些依赖的引用计数-1，只有当引用计数为0了，我在真正释放；
[1， 1， 1， 1， 1， 2] ， 释放A的时候， a.png的引用计数-1， 不为0， 不会真正释放；

*/


/*
 * 第012课TypeScript版框架移植与框架演示案例
----------------------------------------
项目逻辑
	一个运行时的空场景作为容器
	启动脚本
		游戏中重要的管理模块
			1:资源管理:ResMgr
			2:事件订阅与发布EventMgr
			3:声音管理SoundMgr
			4:网络管理NetMgr
			5: Excel表格工具
			6: 寻路导航工具
			7:UI框架:UIMgr
			8:资源预加载
			9:游戏启动模块
		游戏逻辑模块
			1: 调用框架支撑，实现游戏逻辑

目录结构
	Res: 用来存放资源
		GUI:存放GUI的图集和资源，以及UI字体等
		maps: 存放游戏地图相关资源
		charactors:用来存放游戏角色相关资源
		effects: 游戏中的粒子，等
	resources: 需要代码加载的资源
		ui_prefabs: UI视图资源存放位置
		sounds: 声音资源存放位置
		maps: 游戏地图预制体存放资源
		charactors: 角色资源和动态切换的图集动画等
	Scenes
		Game: 游戏运行的空场景，只放重要东西和启动脚本
		其它:编辑用的场景
	Scripts: 游戏脚本目录结构
		GameLanch: 游戏启动脚本
		Managers: 游戏管理类所放脚本
			Net:文件夹，存放网络协议相关(ws, http, protobuf)
		3rd:存放第三方代码
		Utils：存放工具代码
		AStar:存放A星寻路相关代码
		Game: 存放特定游戏代码
			Game: 游戏逻辑入口代码
			AStarMaps: 存放A星地图数据
			RoadMaps：存放地图路径数据
			Excels: 存放游戏的表格数据
			UI_Controllers:存放游戏的UI 控制代码

资源管理与释放
	1: 每次进入游戏之前自己加载资源，也可再游戏中动态加载
	2: 如果资源不用了，自己释放掉
	3: 资源之前依赖重复的资源，基于引用计数器

*/

