# echo "Shell 传递参数实例！";
# echo "执行的文件名：$0";
# echo "第一个参数为：$1";
# echo "第一个参数为：$2";

# echo "$HOME";


rootPath=$(cd $(dirname $0); pwd)
# echo ${rootPath}

if [ $1 == 'lua' ]
then
   lua "${rootPath}/testLua.lua"
elif [ $1 == 'js' ]
then
   node "${rootPath}/testJavaScript.js"
elif [ $1 == 'ts' ]
then
   node "${rootPath}/testTypeScript.ts"
elif [ $1 == 'sort' ]
then
   #  cd  /Users/yangguang/selfProject/MyGitHub/ReviseRecord
   clang++ "${rootPath}/sort.cpp" -std=c++11
   filePath="${rootPath}/a.out"
   # ./filePath
   ./a.out
elif [ $1 == 'offer' ]
then
   #  cd  /Users/yangguang/selfProject/MyGitHub/ReviseRecord
   clang++ "${rootPath}/offer.cpp" -std=c++11
   filePath="${rootPath}/a.out"
   # ./filePath
   ./a.out
else
   echo "没有符合的条件"
fi