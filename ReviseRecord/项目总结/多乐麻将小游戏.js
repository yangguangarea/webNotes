


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










