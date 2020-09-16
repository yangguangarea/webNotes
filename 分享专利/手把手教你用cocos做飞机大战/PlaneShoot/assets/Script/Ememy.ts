import GameScene from "./GameScene";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Ememy extends cc.Component {

    @property(cc.SpriteFrame)
    bombSpriteArray: cc.SpriteFrame[] = [];


    speedX:number = 0;
    speedY:number = -200;

    deadState = 0;
    start () {

    }

    onDestroy() {
        this.node.parent.getComponent(GameScene).removeEnemy(this.node);
    }

    playDestory() {
        this.deadState = 1;
        let i = 0;
        this.schedule(() => {
            if(i >= this.bombSpriteArray.length) {
                this.node.destroy();
            }
            this.node.getChildByName("e1").getComponent(cc.Sprite).spriteFrame = this.bombSpriteArray[i++];
        }, 0.1);
    }

    update (dt:number) {
        this.node.x += this.speedX * dt;
        this.node.y += this.speedY * dt;

        if(this.node.y < -cc.winSize.height / 2) {
            this.node.removeFromParent();
        }


    }
}
