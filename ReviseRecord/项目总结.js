
/*
项目经验
2019.05-2019.10
项目名称：多乐麻将小游戏(cocos-creator开发)
责任描述：
1.小游戏项目的适应多种玩法的重新架构
2.新玩法的移植与开发

-----------------------------------
游戏场景
SceneOnlineGame
ScenePrivyGame
SceneCompeteGame

canvas添加第一个脚本GameLoadInit，上边挂一个空节点gameTypeNode
场景初始化之后，会先执行第一个脚本的onLoad
1.取游戏的玩法,调用对应的游戏的GameInit接口
2.创建具体玩法的预制体gameNode，添加到场景的gameTypeNode空节点中，
3.gameView中注册 sceneMediator, gameMediator

-----------------------------------
每种麻将玩法有一个 siChuanResPkg,里边分为 prefabs,spriteFrames,audioClips等等要提前用代码加载的资源
每种麻将玩法有一个 SiChuanGameInit,有一个初始化函数 gameInit 和对应的游戏销毁函数 gameDestroy
在gameInit中 1.给对话的音效配置注册玩法的参数，具体玩法的胡牌命名图片信息，胡牌种类信息
			碰杠胡等具体玩法的按钮的各种参数，比如名称，id，预制体name等等
			2.设置当前的 SiChuanGameChannel
			3.设置玩法胡牌规则 SiChuanGameRuleHu
			4.创建 SiChuanPlayService，注册到 gameService中
			5.初始化玩法的数据层 SiChuanGameModel, 然后替代公共gameModel
在gameDestroy中相反

-----------------------------------
添加了ResManager类，AppDelegate中管理，用来管理代码预加载的资源,用于进入游戏之前的预加载
把当前要进入的游戏玩法代码资源预加载到内存中，保存在一张表中，
切场景的时候同理，这里用到了判断是否有使用的同样的资源，防止重复加载，和加载后重复释放资源
(可以提一下 cc.loader.releaseRes(iterator, cc.Texture2D)
           cc.loader.releaseRes(iterator, cc.SpriteFrame)
 这两个释放顺序，引用计数以及导致的图集乱码闪烁的问题
)

-----------------------------------
protobuf 中协议拆分，覆盖
this._confs.push(['proto/commonProtocol', PROTO.COMMON]);
this._confs.push(['proto/ruleProtocol', PROTO.RULE]);
this._confs.push(['proto/siChuanGameProtocol', PROTO.SICHUANGAME]);
this._confs.push(['proto/yunNanGameProtocol', PROTO.YUNNANGAME]);


原先的GameService中与玩法有关的拆分到PlayService中，GameService中收到的消息转发一份给PlayService
留下公共的，比如加入牌桌，托管，准备等等网络协议

SiChuanPlayService中注册新的或者需要覆盖的消息协议

-----------------------------------

玩家头像mark修改任意添加，与具体玩法脱离开，之前是固定预制体
可以通过代码来添加上边的,血流的已经糊了的牌的显示

统一结算界面,分离结算界面特殊和玩法相关的部分

tile牌的具体玩法的特殊显示,比如盖牌等等

一些特效,刮风下雨

聊天配置 音效动态加载 私人场创建改为配置 私人场业务

-----------------------------------
难点

lua不同脚本中的全局变量可以直接覆盖，但是TS需要import来声明变量所在的文件
比如不同玩法的各种GameDef，就出现了id冲突，使用加后缀的方式，区分不同玩法的GameDef
然后在自己的类中进行使用

亮点

资源预加载，和管理系统
拆分界面显示，添加单独的游戏玩法节点
统一和app lua代码的结构，减小移植难度，节省后续开发时间

*/






/*

2017.12-2019.02
项目名称：战车少女（一款卡牌类游戏，cocos2d-js + cocos builder）
责任描述：
1.负责客户端部分业务的开发
2.游戏后期的各大海内外sdk渠道接入、项目打包发布
3.持续优化游戏体验和游戏流畅度


优化内容:
1.层级覆盖上，添加触摸吞噬，引擎的bug，超过十几层的时候就会出现bug
解决办法:添加了一个全局层级堆栈来管理，保证只有栈顶的层级会添加触摸吞噬

2.英雄列表等一些滚动条中数量多的做对象池
  将一些复杂的item按行进行显示，然后一层一层的进行贴图渲染，降低drawcall

3.将帧动画散图打成图集atlas, 可以合并渲染，降低drawcall

4.避免使用系统字库，将大部分字体替换为ttf字库，节省包体大小，提高效率，数字使用位图字体等
  尽量使用 bmfont 字体，不使用系统字体

5.锁帧到30，降低cpu，耗电等等


*/






/*

2018.06-2018.08
项目名称：土豪来了（养成类休闲游戏，cocos-creator开发）
责任描述：
1.将前期开发的联网版本通过仿制Pomelo框架快速实现服务器功能单机移植
2.游戏客户端的性能优化
3.游戏的多语言版本制作
4.facebook等广告sdk接入、以及umeng埋点统计等



服务器使用了Pomelo框架，Pomelo是网易基于node.js开发的
使用http通信



优点，将数据存入本地，代码基本上不需要改变，前端不需要知道后端的具体业务逻辑，直接进行拷贝代码就可以实现单机的业务更新

localService{
    加了切换，一键切换单机联网

    各种dao:服务器通过mysql存储玩家数据，然后客户端这边通过localStorage和JSON.stringify来将数据存为序列化字符串
            避免了频繁写入读取，和分割为太过于散的信息字段
    配置，python 将excel转为csv再转为json文件

    handler{
        服务器收到的客户端请求消息，做出响应，调用serverManager处理逻辑
        Notification加了两套监听队列，一个用于原有的客户端，一个用于服务器监听请求
    }

    serverManage{
        模仿了Async的两个功能
        串行且关联
        async.waterfall()
        ###串行且无关联
        async.series()

        各种管理数据，处理逻辑
    }

    openid设为本地生成的id

    autoCollectFilter:{
        判断是拿配置还是，登录之类的普通请求，然后计算离线收益等，将收益过滤，再进行请求的下发
    }
}


可以提一下接广告的事情

*/

// setWebLog("mergehousegame", "watchadsclick", [], "", {
//   userlevel: this.node["_mainData"].userInfo.level,
//   place: "treasureboxhouse",
//   rewardtype: type === 1 ? "house" : "ore",
//   attribute: type === 1 ? data.level : data.ore,
// });



// Cocos Creator ScrollView 优化系列-2-可视区域渲染
// https://www.jianshu.com/p/c5daabbb7719


cocos creator 优化技巧

微信上默认关闭了 dynamicAtlas 功能，
开启 dynamicAtlas，会有效减少 DrawCall，但会带来内存的增加。
可以通过修改引擎 dynamicAtlas 的 insertSpriteFrame 方法，
以及 CCTexture2D 的 handleLoadedTexture 方法，使得只有飞刀的资源会进入到 dynamicAtlas 中，
实现小范围的动态 batching 功能，从而可以内存增长这个副作用控制在一定的范围内。

动态合图

分帧加载

cocos2.0之后移除了自动裁剪功能，在屏幕外边的还是会进行绘制，所以有的地方需要判断节点的包围盒是否在屏幕外边
然后不进行绘制

把不需要代码加载的资源不放在resources里

如果前面使用的是 dynamicAtlas 的功能，那么可以选择 Label 使用系统字体，同时将 Label 的 CacheMode 属性更改为 BITMAP。

通过对资源的处理，减少 Cell 中使用 Mask 组件的数量，尽量不使用 Mask 组件。
由于 Mask 组件需要在 stencil 和 content 前后都添加修改 gl 状态的 render command，因此使用 Mask 会打断我们的 DrawCall 批处理。





今天给大家整理一些cocos creator 常用的一些优化技巧和手段，希望对大家的项目有所帮助。
一: 资源包体大小优化:
(1)去掉不用的资源，去掉不用的代码模块;
(2)压缩png图片，在清晰度课接受的范围内让图片的体积更小;
(3)压缩声音数据，多声道变单声道，降低采样率;
(4) 在需求的允许下降低图片的部分精度，比如，1920x1080的图片---> 960x540;
(5) 特殊的字体，不要直接带字体文件，而是使用美术字来替代, 尽可能不要带字体文件;
二：图集打包:
我们很多人喜欢用散图，这样，会影响绘制效率，所以一般我们会把散图达成图集，一次装载到显卡, 同时多个物体可以共用一个drawcall来批量完成绘制, 使用图集的时候，注意同时使用的图片放到一起，每个场景都要用的图片放一起。不要把不同时会使用的图片放到图集里面。这样不利于资源卸载
三: 动画优化:
内存大小优化： 如果动画内存过多，比如帧动画，可以考虑使用骨骼动画来代替帧动画;
运行性能优化： 大量骨骼动画，可能导致帧率较低，可以考虑在允许的范围内用帧动画替换;
避免动画中绑定代码： 动画编辑器动画时，尽量不要使用动画事件来调用代码，避免不必要的代码管理麻烦。
四：资源管理:
(1) 不用的资源，在场景切换的时候，如果资源吃紧，可以把他卸载掉;
(2) 进入到游戏场景之前，将接下来常用的资源，预先加载进来，避免运行中加载出现"长时间卡住”的现象, 场景资源多的，加资源加载过度；
(3) 对于常用的对象和物体大量的分配与释放，可以考虑 使用节点池来进行缓存;
五：代码优化:
(1)避免在运行时才生成数据，比如地图数据，路点数据，能离线生成的最好先离线生成出来;
(2)在update中避免使用 节点查找等，可以考虑用变量在初始化的时候，把常用的节点，组件保存起来;
(3)每个函数尽可能保持足够的简单, 功能单一;
(4)能自己编码实现的，尽量少用大型的框架库，比如物理引擎等。能不用就不用;
(5)复杂的算法，可以考虑预先计算好，用空间换时间;
(6)代码命名要规范，结构要清晰;
(7)不要再界面上做过多的代码绑定;
(8)避免使用生僻的语法，用法，组件等，让代码升级的时候更方便;
… … 
六: setting.js 优化
资源放到resources文件夹下，会导致setting.js变大，所以，不用代码加载的资源，千万别放resources文件夹下;
七：运行时内存优化:
分析内存的占用情况，内存大头一般都是图片资源。
图片在运行时的内存大小是固定的，和压缩算法没有关系，因为最终要解压出来， 1920x1080大小的图片内存解压开后大约是1920x1080x4(每个像素4字节),
这个内存占用，和你的图片是png,还是jpg关系不大。所以可以估算处大概内存。
根据运行时候图片的内存情况，删除不用的图片，同时可以考虑降低部分图片的分辨率来降低内存占用。
运行时后，可能节点越来越多，内存越来越大，也越来越慢，把不用的节点都要删除掉, 检查节点数目，资源等;
