import GameScene from "./GameScene";
import Ememy from "./Ememy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    speedX:number = 0;
    speedY:number = 500;
    start () {

    }

    update (dt:number) {
        this.node.x += this.speedX * dt;
        this.node.y += this.speedY * dt;

        if(this.node.y > cc.winSize.height/2) {
            this.node.destroy();
            return;
        }

        let bulletBox = this.node.getBoundingBoxToWorld();
        let gamescene = this.node.parent.getComponent(GameScene);
        for(let i = 0;  i < gamescene.enemyArray.length; i++) {
            let enemy = gamescene.enemyArray[i];
            
            if(enemy.getComponent(Ememy).deadState !== 1 && enemy.getBoundingBoxToWorld().intersects(bulletBox)) {
                enemy.getComponent(Ememy).playDestory();
                gamescene.addScore(1);
                this.node.destroy();
                return;
            }
        }
    }
}
