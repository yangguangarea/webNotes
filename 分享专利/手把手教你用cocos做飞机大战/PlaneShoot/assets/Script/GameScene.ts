const {ccclass, property} = cc._decorator;


export function randomNumber (min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

@ccclass
export default class GameScene extends cc.Component {

    @property(cc.Prefab)
    enemyPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    enemyGroupPrefabArray: cc.Prefab[] = [];

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    enemyArray:cc.Node[] = [];

    bg1:cc.Node = null;
    bg2:cc.Node = null;
    bgSpeed:number = -100;
    score:number = 0;
    
    onLoad() {
        this.randomCreateEnemy();
        this.bg1 = this.node.getChildByName("bg1");
        this.bg2 = this.node.getChildByName("bg2");
    }

    goHomeScene() {
        cc.director.loadScene("HomeScene");
    }

    showGoHomeBtn() {
        this.node.getChildByName("goHomeBtn").active = true;
        this.node.getChildByName("goHomeBtn").zIndex = 10;
    }

    addScore(score:number) {
        this.score += score;
        this.scoreLabel.string = `${this.score}`;
    }

    removeEnemy(enemy) {
        let index = this.enemyArray.indexOf(enemy);
        if(index > -1) {
            this.enemyArray.splice(index, 1);
        }
    }


    randomCreateEnemy() {
        // let enemy = cc.instantiate(this.enemyPrefab);
        let groupIndex = Math.floor(Math.random() * (this.enemyGroupPrefabArray.length - 1));
        console.log(groupIndex);
        let enemyGroup = cc.instantiate(this.enemyGroupPrefabArray[groupIndex]);
        
        let offsetX = randomNumber(-200, 200);
        if(enemyGroup) {
            for (let index = 0; index < enemyGroup.children.length; index++) {
                let enemy = enemyGroup.children[index];
                enemy.removeFromParent(false);
                
                enemy.y = enemy.y + this.node.y + this.node.height / 2 + 50;
                enemy.x = enemy.x + offsetX;
                this.node.addChild(enemy, 3);
                this.enemyArray.push(enemy);
            }
            enemyGroup.destroy();
        }
        
        this.scheduleOnce(this.randomCreateEnemy.bind(this), 0.5);
    }

    update(dt) {
        let moveY = this.bgSpeed * dt;
        this.bg1.y += moveY;
        this.bg2.y += moveY;

        if(this.bg1.y + this.bg1.height <= -cc.winSize.height/2) {
            this.bg1.y = 1000;
        }
        if(this.bg2.y + this.bg2.height <= -cc.winSize.height/2) {
            this.bg2.y = 1000;
        }
    }
}
