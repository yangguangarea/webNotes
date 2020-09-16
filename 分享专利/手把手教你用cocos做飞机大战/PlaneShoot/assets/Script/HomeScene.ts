import { randomNumber } from "./GameScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HomeScene extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {

    // }

    goGameScene() {
        cc.director.loadScene("GameScene");
    }

    // update (dt) {}
}
