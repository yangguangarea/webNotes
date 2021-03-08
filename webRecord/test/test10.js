class Father {
    constructor(x) {
        this.x = x;
    }
}

class Son extends Father {
    constructor(x) {
        this.x = x;
        super(x + 1);
    }
}
let son = new Son(1);