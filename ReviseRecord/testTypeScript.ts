


function tearNumber(num){
    let array = [];
    while(num){
        let i = num%10;
        array.push(i);
        num = Math.floor(num/10);
    }
    array.sort();
    return array;
}

function compairArray(array1, array2){
    if(array1.length == array2.length){
        for(let i = 0; i < array1.length; i++){
            if(array1[i] != array2[i]){
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

let fun = function (){
    let i = 100000;
    let maxNumber = 999999;
    let array = [];
    for(; i < maxNumber; i++){
        let i2 = i*2;
        let i3 = i*3;
        let i4 = i*4;
        let i5 = i*5;
        let i6 = i*6;
        if(i2 < maxNumber && i3 < maxNumber && i4 < maxNumber && i5 < maxNumber && i6 < maxNumber){

            if(compairArray(tearNumber(i), tearNumber(i2)) && 
            compairArray(tearNumber(i2), tearNumber(i3)) &&
            compairArray(tearNumber(i3), tearNumber(i4)) &&
            compairArray(tearNumber(i4), tearNumber(i5)) &&
            compairArray(tearNumber(i5), tearNumber(i6))
            ){
                array.push(i);
            }
            // return i;
        }
    }
    return array;
}



let result = fun();
for(let number of result){
    console.log(number + "  ");
}

// console.log(compairArray(tearNumber(100011), tearNumber(110101)));
