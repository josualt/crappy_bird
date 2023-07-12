import Enemy from "./enemy";
class EnemyGenerator {
    constructor(scene) {
      this.scene = scene;
      this.generate()
    }
  
    generate() {
      const yEnemy = Phaser.Math.Between(0, 200);
  
      this.scene.pipes.add(new Enemy(this.scene, 800, yEnemy))
      const waitTime = Phaser.Math.Between(4000, 7000);
      this.scene.time.delayedCall(waitTime, () => this.generate(), null, this)
    }
  }

  export default EnemyGenerator