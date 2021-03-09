    // 1.利用 new Object() 创建对象
    var obj1 = new Object();

    // 2.利用对象字面量创建对象
    var obj2 = {};

    // 3.利用构造函数创建对象
    function ObjFun(name, age) {
        this.name = name;
        this.age = age;
        this.printName = function() {
            console.log(this.name);
        }
    }
    ObjFun.prototype.printAge = function() {
        console.log(this.age);
    }

    var obj3 = new ObjFun('name1', 23);
    obj3.printName();
    obj3.printAge();