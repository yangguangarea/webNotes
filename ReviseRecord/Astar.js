// A星寻路
https://www.iteye.com/blog/longpo-2232330

A start  伪代码（结合代码便于理解）

point  = 起点

while(point ！= 终点）
{
    list = point相邻的点放到list里
    for（list）循环周围的点
    { 
        temp = list[index] 在list取出一个点
        if（temp在close表里 || temp不可行走)
            continue    忽然该点，不作处理
        else
            计算temp的 g , h, f的值
            if(temp 不在open表内）
            {
                把temp放入open表
                把temp的father指向point
            }
            else  temp在open内
            {
                设open[i]为temp点
                if（temp.g < open[i].g)当前的temp的g小于已存在open表内的该点的g时
                {
                    更新open[i]的g,h,f的值为temp的值
                    把open[i]的father指向point    
                }
            }
    }

   一遍遍历完后把point插入close表
    if（size（open[]) ==0)
           查找失败，停止查找
    从open表取出f值最小的点min
    point  =  min
}

查找成功

/*

----------------------------------------
3.基本概念
要实现A星算法，先要知道一些基本概念

open列表
所谓open列表，我的理解是，知道但是没有走过的路
close列表
已经走过的路
F值
这个叫做和值，指的是走到终点消耗的代价值，这里就是指的是小猫消耗的体力了
F = G + H,所以要知道F值，需要计算G和H的值
G值
从起点到该点消耗的代价
H值
从该点到终点的预估代价，


----------------------------------------
将起点加入close表
while(结束条件)
{
获取close表的最后一个节点S
获取S点周围所有符合加入条件（条件就是指上文所说的那3点）的点，加入open列表
计算open列表F值最低的格子T
T从open表中删除加入close表
}
再次循环的时候，是不是第一步获取的节点S就是最后加入的T了，如此就可以跟随着这个T，一步步的扩展路径了

结束条件：如果有这条路径存在，则是当青蛙所在的节点被加入到close后，寻路就结束了。
或者不存在这条路径，那么就是open列表中不再有节点的时候。
open列表实际上是一步步往外扩展的格子，当这个列表没有节点的时候并且终点还没有在close列表中，
那么说明所有能扩展到的格子已经都被走过了，仍然没有走到终点，此时便是没有这条路了

*/