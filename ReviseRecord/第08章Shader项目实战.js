// 着色器语言 GLSL (opengl-shader-language)入门大全 https://www.cnblogs.com/brainworld/p/7445290.html
// Effect语法 参考文档 https://docs.cocos.com/creator3d/manual/zh/material-system/effect-syntax.html
// cocos 自定义渲染组件 https://docs.cocos.com/creator/manual/zh/advanced-topics/custom-render.html?h=shader
// 材质系统总览 https://docs.cocos.com/creator3d/manual/zh/material-system/overview.html


// 大佬的一些shader特效的讲解 https://www.jianshu.com/p/8ff03b34b0bd

/*
 * 第01课材质系统与Shader高斯模糊
----------------------------------------
1. 材质: sprite组件有一个属性 Materials(材质)
2. Effect: 材质的属性检查器里 有 Effect 属性，可以绑定shader文件

3. shader: GPU来绘制物体的，这个流程叫 渲染流水线
    shader是给GPU的渲染流水线执行的程序，能够帮助我们定制和绘制图像
    shader是一种绘制图像的算法
    在cocos中是 xxx.effect格式的文件

4. 两大图形框架 DirectX(win系) OpenGL(手机，linux，pc)
    给GPU执行的编程语言
    OpenGL: GLSL语言
    DirectX: HSSL语言
    Cg (C for graphic): 英伟达推出的，同时支持 openGL 和DirectX
    Unity 使用 ShaderLab编写，对不同的平台进行编译，重点支持Cg语言

5. cocos支持OpenGL, 所以用的是GLSL语言
    cocos自己定义了一个格式，内嵌GLSL语言开发
    unity内嵌了CG开发shader

6. 材质:配置文件，在这个文件里边，选择一个算法，为这个算法提供你要的参数, xxx.mtl格式
7. cc.sprite 绘制图像过程:读取材质，得到shader和参数，shader设置到gpu的渲染管道，参数提交给GPU
----------------------------------------
GPU管道流水线
1.主要的运算在GPU上计算，CPU插入指令
2.大致流程:
    顶点初始化 ->
    顶点shader ->
    Tellellation曲面化 -> 让模型三角形平面 更曲面话，更光滑
    几何shader ->
    裁剪，投影 -> 以摄像机的角度，默认模型的后半部分会裁剪掉不绘制，叫cull back
                如果想要绘制前半部分，特殊处理，叫cull front,还有都不裁剪
                将3D模型投影到2D平面上，
    三角形遍历 ->
    片元着色shader ->
    输出2d图像

比如有一个矩形，有四个顶点，划分为两个三角形，有一个纹理图片，将纹理图片的
顶点和矩形对应上，然后将纹理的内容插值贴到矩形范围中

三角形是如何上色的: 三角形的三个顶点有对应的顶点坐标 (u,v)
    顶点坐标对应着纹理的坐标，两个顶点坐标形成一条直线，然后将直线进行线性插值，将对应的color贴上去
    然后通过第三个顶点，重新确定下一条直线的两个端点坐标，继续插值贴图
    然后每一条线去将纹理贴到对应的三角形中的位置,遍历所有的位置

顶点shader: 给用户提供一个可编程的接口，让用户编写代码来改变形状
片元着色shader: 给用户一个可编程的接口，让用户能编写代码，干预显示着色

----------------------------------------
creator Shader的结构模板
1. 注释  //
2. %起始到 %结束  表示shader的描述部分
    CCEffect %{
    techniques:             //技术
    - passes:               //pass指的就是creator的一次完整的管道渲染流水线，可以有多个
                            //每一次切换shader ，叫set pass call，比较消耗性能
        - vert: vs          //vert:顶点段落 对应顶点shader的代码
        frag: fs            //frag:着色段落 对应着色shader的代码
        blendState:
            targets:
            - blend: true
        rasterizerState:
            cullMode: none
        properties:         //绑定到材质面板上的属性
            texture: { value: white }
            alphaThreshold: { value: 0.5 }
    }%

3. 如果想要被编辑器识别， 命名前边不能加_ 如果加上_，就不会被编辑器识别
    #if _XXXX
    #endif
4. mat4 mvp 是当前的一个变化矩阵，将模型坐标变换到透视投影坐标
5. 引擎在提交绘制物体的时候，会给你设置好这个物体的MVP(matViewProj)矩阵
6. shader的数据是从渲染管道来，attribute描述的变量,只能在vert里使用，
    渲染管道会将对应的数据设置到你的变量上
    //attribute: 渲染管道传过来的数据，只能在顶点shader中使用
    attribute vec3 a_position;//渲染管道给你顶点坐标
    attribute lowp vec4 a_color;//渲染管道给你顶点颜色
    attribute mediump vec2 a_uv0;//渲染管道给你纹理坐标
7. varying修饰的变量，是vertex Shader传递变量给frag Shader
    varying mediump vec2 v_uv0;

    在vertex shader中定义的varying变量也需要在fragment shader中定义,而且必须同名
8. main函数是shader的入口
9. GLSL变量精度类型: 有三种 highp,mediump, lowp(高，中，低)
    precision highp float; //描述float的精度
10. uniform: GLSL里的变量，可以通过代码,外部程序可以来设置的变量,CPU传递数据给shader
    uniform 类型 名字
    uniform mat4 cc_matViewProj; // 游戏引擎绘制节点位置生成的当前物体模型投影到shader的变换矩阵;
    模型的坐标a_position * mat = 真实的绘制坐标
11. 在properties中声明的变量，在shader的代码中一定要定义
12. gl_Position是顶点的坐标，是OPNEGL规定的变量,之后要返还给渲染管道的坐标
    gl_FragColor是片元颜色, 返还给渲染管道的着色颜色

单词注解
vertex: 顶点
fragment: 碎片，片段
precision: 清晰度，精度
attribute: 属性
technique: 方法，技术
threshold: 下限，门槛
highp: high point, mediump:medium point, lowp: low point
uniform: 制服，相同的，不变的
varying: 不同的
*/


/*
 * 第02课Shader熔岩特效
----------------------------------------
cocos creator 2.1.2版本的shader编写格式

%% vs { // GLSL
precision highp float;
uniform mat4 cc_matViewProj; // 游戏引擎绘制节点位置生成的
                                当前物体模型的世界坐标透视投影到shader的变换矩阵;
                                相当于世界坐标转换到摄像机视角下的透视坐标
uniform mat4 cc_matWorld; // 模型坐标变换到世界坐标的四维矩阵
// 所以 顶点坐标 * 转换到世界坐标矩阵 * 转换到投影坐标矩阵 = 渲染的顶点坐标
// g_position = a_position * cc_matWolrd * cc_matViewProj;

// 顶点Shader 从渲染管道里面获取哪些数据;
attribute vec3 a_position; // 顶点坐标
attribute lowp vec4 a_color; // 颜色;
attribute mediump vec2 a_uv0; // 纹理坐标;
attribute vec3 a_normal; //法线
//这些能从管道中拿到的数据，在cocos2d/renderer/build/chunks/common-attribute.inc中有

varying mediump vec2 v_uv0; // 传递给着色Shader;  varying 来修饰;
varying lowp vec4 v_color;  // 传递给着色Shader, varying来修饰;

void main () {
	mat4 mvp; // 定义了一个矩阵;
	mvp = cc_matViewProj; // modle to 透视的变换矩阵;

	v_uv0 = a_uv0; // 把顶点纹理坐标，传递给我们的着色Shader;
	v_color = a_color; // 把顶点的颜色传递给我们的着色Shader;

	gl_Position = mvp * vec4(a_position, 1); // 将我们模型顶点的坐标变换以后，---》返回给渲染通道;
}

} // end vs

----------------------------------------
%% fs { // GLSL
precision highp float; // 定义了我们的float的精度;

uniform sampler2D texture; // CPU给我们指定的纹理对象; Sprite组件会设置进来;
uniform float time; // 阀值;
uniform sampler2D nosie_tex; //

varying mediump vec2 v_uv0; // vert定义了，着色也要定义，而且是同名的;
varying lowp vec4 v_color;

void main () {
	vec4 color = v_color;
	float value = texture2D(nosie_tex, v_uv0).r;
	if (value < time) {
		discard;
	}
	color *= texture2D(texture, v_uv0);
	if (value < time + 0.05) {
		color = vec4(0.9, 0.6, 0.3, color.a);
	}
	gl_FragColor = color; // 将颜色返回给渲染管道,  gl_FragColor 固定的;
}

}

----------------------------------------
熔岩特效
    1.有阈值，当小于某个阈值的时候，就丢弃不绘制 time 范围[0-1]
    2.在边缘部分，要设置对应的颜色，像烧焦的黄色,vec4(0.9, 0.6, 0.3, color.a)
    3.需要一张噪声贴图，然后将噪声的数值和阈值做比较
将参数一个个添加到shader里

//火焰融化特效 获取sprite的材质组件，每一帧去设置阈值属性
setDissolve(time: number) : void {
	this.sp = this.getComponent(cc.Sprite);
	let mat = this.sp.getMaterial(0);
	mat.setProperty("time", time);
	this.sp.setMaterial(0,mat);
}

----------------------------------------
cocos creator 2.3.3版本的shader编写格式
CCProgram fs %{
	precision highp float;

	uniform Param { // 非 simple 的uniform属性必须使用 UBO 代码块
		float time;
	};
	uniform sampler2D nosie_tex;

	#include <alpha-test>
	#include <texture>

	in vec4 v_color;

	#if USE_TEXTURE
	in vec2 v_uv0;
	uniform sampler2D texture;
	#endif

	void main () {
		vec4 o = vec4(1, 1, 1, 1);

		#if USE_TEXTURE
			CCTexture(texture, v_uv0, o);
		#endif
		vec4 color = vec4(1,1,1,1);
		float value = texture2D(nosie_tex, v_uv0).r; //取噪声图v_uv0顶点坐标的r分量

		if(value < time){ //噪声图片r值对比阈值，小于阈值就抛弃，不进行绘制
			discard;
		}
		o *= v_color;
		if(value < time + 0.05){ //[0-time]的已经被丢弃不绘制，[time, time+0.05]的范围加入熔岩颜色
			o = vec4(0.9, 0.6, 0.3, o.a);
		}
		ALPHA_TEST(o);
		gl_FragColor = o;
	}
}%

*/


/*
 * 第03课人物描边Shader
----------------------------------------
1.设置描边的颜色rgb

----------------------------------------
2.判断顶点纹理坐标v_uv0 alpha 超过0.5认为是不透明,直接渲染

----------------------------------------
3.纹理alpha < 0.5 的部分，判断透明的点的四周几个方向，
    如果至少有一个点是不透明的，说明这个位置是在边缘，设置该点为描边颜色

  void main () {
    vec4 o = vec4(1, 1, 1, 1);

    #if USE_TEXTURE
		CCTexture(texture, v_uv0, o);
    #endif
    vec4 tex_color = texture2D(texture, v_uv0);
    // 不透明，不管，直接返回
    if (tex_color.a >= 0.5)
    {
		gl_FragColor = v_color * tex_color;
		return;
    }

    //描边颜色rgb
    vec3 outlineColor = vec3(1, 1, 1);
    int strokeCount = 0;
    // int numLights = 24;
    for (int l = 0; l < 12; l++)
    {
		float angel = 360.0 - 30.0 * float(l);
		strokeCount += getIsStrokeWithAngel(angel);
		// strokeCount += getIsStrokeWithAngel(30.0);

    }
    // 四周围至少有一个点是不透明的，这个点要设成描边颜色
    if (strokeCount > 0)
    {
        tex_color.rgb = outlineColor;
        tex_color.a = 1.0;
    }
    gl_FragColor = v_color  * tex_color;
  }
----------------------------------------
4.判断描边的过程是{
    获取纹理尺寸，外部传入进来的
    计算该方向上的偏移描边宽度的位置，获取该位置的纹理color
    判断color的alpha是否大于0.5，大于则说明该点不透明
}
// 判断在这个角度上距离为outlineSize那一点是不是透明
int getIsStrokeWithAngel(float angel)
{
	vec2 textureSize = vec2(width, height);
	int stroke = 0;

	// 这个浮点数是 pi / 180，角度转弧度
	float rad = angel * 0.01745329252;
	//单位坐标
	vec2 unit = 1.0 / textureSize.xy;
	//偏移量
	vec2 offset = vec2(outlineSize * cos(rad) * unit.x, outlineSize * sin(rad) * unit.y);
	float a = texture2D(texture, v_uv0 + offset).a;
	// 我把alpha值大于0.5都视为不透明，小于0.5都视为透明
	if (a >= 0.5) {
		stroke = 1;
	}
	return stroke;
}
*/


/*
 * 第04课法线与点乘
----------------------------------------
1. 3D摄像机一般使用透视摄像机，不使用正交摄像机
2. 搭建一个3D场景:UI(Vanvas/) + 3D场景添加一个UI类型,所有UI的物体都使用这个类型，MainCamera只绘制UI
3. 物体是如何绘制出来的node+绘制3D物体的组件 MeshRenderer
   MeshRenderer将模型数据和纹理提交给GPU
4. CPU将3D模型的顶点等数据提交给渲染流水线,模型顶点数据一般由美术建模而来
    也有一些规则的模型是内置的，顶点的模型有一个专有的名字，叫Mesh(网格)
    美术建模的时候，将模型的顶点和纹理上对应起来，这个叫纹理坐标,这样就能找到对应纹理的部分贴到模型上
5. 顶点Shader做哪些事情{
	1.坐标变换:将模型坐标，通过调整位置，旋转，缩放，转换成世界坐标
			将世界坐标转换为摄像机为原点坐标系下的坐标
	2.个性定制化模型形状
    }
6. MeshRenderer做哪些事情{
	1.从组件实例里读取一个materials材质对象,材质配置好了shader算法
	2.将用户指定的模型Mesh网格数据传递给GPU
	3.每次绘制物体的时候，结合顶点->世界矩阵->透视矩阵->传递给shader数据
	4.给三角形着色的时候，MeshRenderer将纹理对象传递给shader
	5.传递一些参数给GPU渲染流水线
    }

----------------------------------------
法线与点积的经典实用
1. 法线: 每个顶点都有一个法线，法线垂直于顶点所在的那个平面
    所以相邻的两个三角平面重叠的那两个顶点，其实是不同的，只是顶点的坐标相同
2. 点积: 两个坐标 a(x1,y1,z1), b(x2,y2,z2)
    点积有两种表达式
    a * b = (x1 * x2 + y1 * y2 + z1 * z2)
    a * b = |a| * |b| * cos(夹角); // |a|是a的长度
    |a| * |b| * cos(夹角) = (x1 * x2 + y1 * y2 + z1 * z2)；
    cos(夹角) = (x1 * x2 + y1 * y2 + z1 * z2) / (|a| * |b|);
    可以求出两个向量的夹角
    cos(45) = √￣2/2;
    cos(90) = 0;
    所以可以判断出夹角是钝角还是锐角

    |a| > 0; |b| > 0; 所以cos(夹角)的正负 取决于(x1 * x2 + y1 * y2 + z1 * z2)
    所以点积>0,代表向量夹角是锐角
3. GLSL的一个函数点积: dot(vec3, vec3)
----------------------------------------

*/


/*
 * 第05课Shader《UV动画》
----------------------------------------
3D场景中可以创建一个光源,有的模型没有光源看不到

两个颜色相加，两个纹理的就叠加在一块了
vec4 color1 = texture2D(纹理1, v_uv0);
vec4 color2 = texture2D(纹理2, v_uv0);
gl_FragColor = color1 + color2;

----------------------------------------
UV动画，每帧去改变一个offset，这样，从纹理中获取的color是不同部分的
vec2 offset = vec2(time , time);
vec4 color1 = texture2D(纹理1, v_uv0 + offset);

这样就做到了纹理的滚动

当offset一直增大的时候，将会设置为纹理的边缘color作为color
想要循环滚动，需要在纹理的属性面板设置纹理的属性为
Wrap Mode: Clamp 改为 Repeat
*/


/*
 * 第06课Shader水波特效
----------------------------------------
定义一个纹理尺寸 resolution
定义一个time参数，time参数随时间变化，每帧刷新

vec2 s(vec2 p)
{
	float d=time * 0.2;
	float x = 8.0 * (p.x + d);
	float y = 8.0 * (p.y + d);

  	//cos(x-y) * cos(y)会形成一个波纹的形状
	return vec2(cos(x-y) * cos(y), sin(x + y) * sin(y));
}
void main () {
	vec2 rs = resolution.xy;//纹理的尺寸大小
	vec2 uv = v_uv0.xy;//顶点坐标

	//求一个经过波动的坐标位置
	vec2 q = uv + 2.0 / resolution.x *(s(uv) - s(uv + rs));

	vec4 color = v_color;
	color *= texture2D(texture, q); // texture2D纹理对象里面采样颜色;

	gl_FragColor = color;
}

*/


/*
 * 第07课打造滚动图片uv_image
----------------------------------------
纹理的颜色x顶点的颜色得到了实际渲染的点的颜色
图片想滚动，其实就是根据时间改变贴图color的y坐标

  void main () {
    vec4 o = vec4(1, 1, 1, 1);

    #if USE_TEXTURE
      CCTexture(texture, v_uv0, o);
    #endif

    vec2 rs = speed.xy;//外部传进来的坐标偏移
    vec2 uv = v_uv0.xy;

    //当前顶点偏移rs距离后，取那个点的color渲染
    vec2 q = uv + rs;
    vec4 color = texture2D(texture, q);
    gl_FragColor = color;
  }

*/


/*
 * 第08课渐变文字特效2
----------------------------------------
一个Label是如何显示文字到屏幕上来的
1. label有一个字体文件,叫字模型
2. 更新label内容的时候，游戏引擎会调用矢量字库(freeTyoe)里
   的API，绘制出文字的模型，生成一个texture2D纹理
3. 将这个纹理，用sprite的shader绘制出来
4. 游戏引擎从 cc.Label读取材质,给GPU装载对应的shader，叫set pass call
5. 引擎传递纹理，位置，变换矩阵等信息给shader
6. GPU绘制出label对应的texture2D纹理

----------------------------------------
drawcall:游戏引擎，绘制游戏场景里的所有的物理的时候，按批次来绘制，几个批次就是几次drawcall
合并drawcall的好处:
1.对cpu好: 不用重复的复制顶点数据，传递参数，对cpu的性能消耗变小
2.对gpu好: gpu有一个吞吐量，每次绘制的时候，一次可以处理多少个面，所以合并渲染
合批渲染的条件{
	Mesh(模型网格)要一致
	shader要一致
	纹理贴图要一致
}
动态合批技术

----------------------------------------
文字渐变
*/