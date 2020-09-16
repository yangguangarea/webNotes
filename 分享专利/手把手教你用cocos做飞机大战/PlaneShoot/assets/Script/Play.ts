import GameScene from "./GameScene";
import Ememy from "./Ememy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Play extends cc.Component {
    @property(cc.SpriteFrame)
    bombSpriteArray: cc.SpriteFrame[] = [];


    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    deadState = 0;
    onLoad () {
        this.node.zIndex = 3;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (e:cc.Touch) => {
            if(this.deadState === 1) {
                return;
            }
            this.node.x += e.getDelta().x;
            this.node.y += e.getDelta().y;
        });

        this.schedule(()=> {this.shootBullet()}, 0.1, cc.macro.REPEAT_FOREVER);
        this.shootBullet();
    }

    shootBullet() {
        let bulletNode = cc.instantiate(this.bulletPrefab);
        this.node.parent.addChild(bulletNode, 2);
        bulletNode.x = this.node.x;
        bulletNode.y = this.node.y + this.node.height / 2;
    }

    playDestory() {
        this.deadState = 1;
        let i = 0;
        this.schedule(() => {
            if(i >= this.bombSpriteArray.length) {
                this.node.parent.getComponent(GameScene).showGoHomeBtn();
                this.node.destroy();
            }
            this.node.getChildByName("ship_center").getComponent(cc.Sprite).spriteFrame = this.bombSpriteArray[i++];
        }, 0.1);
    }
    start () {

    }

    update (dt:number) {
        if(this.deadState === 1) {
            return;
        }

        let planeBox = this.node.getBoundingBoxToWorld();
        let gamescene = this.node.parent.getComponent(GameScene);
        for(let i = 0;  i < gamescene.enemyArray.length; i++) {
            let enemy = gamescene.enemyArray[i];
            if(enemy.getComponent(Ememy).deadState !== 1 && enemy.getBoundingBoxToWorld().intersects(planeBox)) {
                enemy.getComponent(Ememy).playDestory();
                this.playDestory();
                return;
            }
        }
    }
}
