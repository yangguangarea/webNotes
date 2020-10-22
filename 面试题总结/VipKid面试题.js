class SortUtil {
    printArray(array){
        console.log('打印数组:', array);
    }

    bubbleSort (array)  {
        if(array === undefined || array === null || array.length <= 0){
            return;
        }
        for(let i = array.length - 1; i >= 0; i--){
            for(let j = 0; j < i; j++){
                if(array[j] > array[j + 1]){
                    let temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                }
            }
        }
    }

    selectionSort(array){
        if(array === undefined || array === null || array.length <= 0){
            return;
        }
        for(let i = 0; i < array.length; i++){
            let minIndex = i;
            for(let j = i; j < array.length; j++){
                if(array[minIndex] > array[j]){
                    minIndex = j;
                }
            }
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
        }
    }

    insertionSort(array){
        if(array === undefined || array === null || array.length <= 0){
            return;
        }

        // for(let i = 0; i < array.length; i++){
        //     let index = i;
        //     let currentNum = array[i+1];
        //     while(array[index] < currentNum && index >=0){
        //         array[index] = array[index - 1];
        //         index--;
        //     }
        //     array[i] = currentNum;
        // }
    }


    question2(){
        // js判断类型 typeof instanceof
    }

    question3(){
        var a = [];
        console.log(typeof(a));//ojbect
        var b = {};
        console.log(b.length);//undefined

        console.log(typeof(Array));//function
        console.log(typeof(Object));//function
        console.log(a instanceof Array);//true
        console.log(a instanceof Object);//true
        let c = 1;
        console.log(c instanceof Number);//false
        console.log(c instanceof Object);//false
    }

    question4(){
        var a = [];
        a[99] = 1;
        console.log(a.length);//100
        console.log(a[0]);//undefined
    }

    question5(){
        var a = [1,2,4,8];
        for(let i in a){
            // console.log();//0,1,2,3 这里输出的0,1,2,3是字符串
        }
        console.log('==');
        for(let i of a){
            console.log(i);//1,2,4,8
        }

        //数组使用a[2] a['2']访问到的都是下标2的元素
    }

    question6(){
        // >> 和 >>> 的区别
    }

    question7(){
        console.log(~0);
        console.log(~~0);
        console.log(-1 >> 1);
        console.log(-1 >>> 1);
        console.log(2**31-1);

        // -1
        // 0
        // -1
        // 2147483647
        // 2147483647

        // ~按位取反，因为采用补码形式,最高位是符号位
        // 负数的二进制是 将负数符号位去掉，然后-1取反，就是二进制码形式
        // 一个开头是1的负数二进制码，取反加1，加符号位就是表示的负数

    
    }

    question8(){
        // ==和===区别
    }
    question9(){
        var a = null, b = undefined, c = 0;
        console.log(a === b);
        console.log(a == b);
        console.log(a == c);

        // false
        // true
        // false
    }
    question10(){
        // 函数中的this 指向什么
        // call,apply,bind用法和区别
    }

    question11(){
        // 描述一下let var const 的含义
    }

    // question12(){
    //     console.log(a);
    //     console.log(b);
    //     var a = 1;
    //     let b = 1;
    //     const c = 1;
    //     const d;
    //     console.log(a);
    //     console.log(b);
    //     var a = 2;
    //     let b = 1;
    //     console.log(a);
    //     console.log(b);


    //     console.log(a);//undefined
    //     console.log(b);//报错，b不能在定义之前使用
    //     var a = 1;
    //     let b = 1;
    //     const c = 1;
    //     const d;//直接报错，const 必须初始化
    //     console.log(a);//1
    //     console.log(b);//1
    //     var a = 2;
    //     let b = 1;//重复定义报错
    //     console.log(a);//2
    //     console.log(b);//1

    // }

    question13(){
        // 说说对prototype和__proto__的理解
    }

    question14(){
        // 什么是闭包
    }

    question15(){
        var funcs = [];
        for(var i = 0; i < 3; i++){
            let j = i;
            funcs[i] = function(){
                console.log(`i=${i},j=${j}`);
            }
        }
        funcs[0]();// 3 0
        funcs[1]();// 3 1
        funcs[2]();// 3 2
    }

    question16(){
        // 向量 cross 和 dot 的作用，分别举出一个实际应用的例子

        // 在cc.vec2中
        // dot 当前向量与指定向量进行点乘。
        // cross 当前向量与指定向量进行叉乘。

    }

    question17(){
        // cocos creator中，列举出组件的生命周期回调函数，并说明其调用的时机
    }

    question18(){
        // cocos creator中,不同分辨率下ui如果固定显示在左上角
    }

    question19(){
        cc.sys.localStorage.setItem('key', value);//直接报错，value 未定义
        cc.sys.localStorage.getItem('key');

        cc.sys.localStorage.setItem('isPlay', false);
        var isPlay = cc.sys.localStorage.getItem('isPlay', false);
        if(isPlay){
            console.log('isPlay is true');//isPlay is true
        } else {
            console.log('isPlay is false');
        }

        //读取出的是一个字符串的'false'，所以判断是true
    }

    question20(){
        // 一张500x1000 32位的贴图，在显存里占多少字节
        // 512*1024*4 = 2M大
    }

    question21(){
        // cocos中sprite的Blend属性, Src Blend Factor 设置为SRC_ALPHA,
        // Dst Blend Factor 设置为 ONE_MINUS_SRC_ALPHA是什么意思，有什么作用
    }

    question22(sourceStr){
        // The goal of this exercise is to convert a string to a new string where
        // character in the new string is "(" if that character apperas only once
        // in the original string ")" if that character appears more than once in the original
        // stirng. Ignore capitalization detrmining if a character is a duplicate.
        // "din" => "((("
        // "recede" => "()()()"
        // "Success" => ")())())"
        // "((@" => "))(("

        let str = "din";
        let upStr = str.toUpperCase();
        let charMap = {};
        for(let i = 0; i < upStr.length; i++){
            if(charMap[upStr[i]] === undefined){
                charMap[upStr[i]] = 1;
            } else {
                charMap[upStr[i]]++;
            }
        }
        let result = '';
        for(let i = 0; i < upStr.length; i++){
            if(charMap[upStr[i]] > 1){
                result+=')';
            } else {
                result+='(';
            }
        }
        console.log(result);

    }

    question23(){
        // 字符串去重, 例如'aabuuualdjljhjhhijjzzwwwwdkj'，去掉重复的字符

        let str = 'aabuuualdjljhjhhijjzzwwwwdkj';
        let result = '';
        let strMap = {};
        
        // for(let i = 0; i < str.length; i++){
            
        //     if(strMap[str[i]] == undefined){
        //         strMap[str[i]] = true;
        //         result += str[i];
        //     } else if(strMap[str[i]] === true){
        //         continue;
        //     }
        // }

        for(let i = 0; i < str.length; i++ ){
            let lastChar = (i > 0) ? str[i - 1] : undefined;

            if(lastChar === str[i]){
                continue;
            } else {
                result += str[i];
            }
        }
        console.log(result);
    }

}

export default new SortUtil();